/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  forwardRef,
  Directive,
  ElementRef,
  ExistingProvider,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent, merge, Subscription } from 'rxjs';
import { delay, distinct, map, take, tap } from 'rxjs/operators';

import { NzAutocompleteOptionComponent } from './nz-autocomplete-option.component';
import { NzAutocompleteComponent } from './nz-autocomplete.component';

export const NZ_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzAutocompleteTriggerDirective),
  multi: true
};

export function getNzAutocompleteMissingPanelError(): Error {
  return Error(
    'Attempting to open an undefined instance of `nz-autocomplete`. ' +
      'Make sure that the id passed to the `nzAutocomplete` is correct and that ' +
      "you're attempting to open it after the ngAfterContentInit hook."
  );
}

@Directive({
  selector: `input[nzAutocomplete], textarea[nzAutocomplete]`,
  exportAs: 'nzAutocompleteTrigger',
  providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR],
  host: {
    autocomplete: 'off',
    'aria-autocomplete': 'list',
    '(focusin)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)'
  }
})
export class NzAutocompleteTriggerDirective implements ControlValueAccessor, OnDestroy {
  /** Bind nzAutocomplete component */
  @Input() nzAutocomplete: NzAutocompleteComponent;

  // tslint:disable-next-line:no-any
  _onChange: (value: any) => void = () => {};
  _onTouched = () => {};
  panelOpen: boolean = false;

  /** Current active option */
  get activeOption(): NzAutocompleteOptionComponent | undefined {
    if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
      return this.nzAutocomplete.activeItem;
    }
  }

  private overlayRef: OverlayRef | null;
  private portal: TemplatePortal<{}> | null;
  private positionStrategy: FlexibleConnectedPositionStrategy;
  private previousValue: string | number | null;
  private selectionChangeSubscription: Subscription;
  private optionsChangeSubscription: Subscription;
  private overlayBackdropClickSubscription: Subscription;
  private overlayPositionChangeSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  ngOnDestroy(): void {
    this.destroyPanel();
  }

  // tslint:disable-next-line:no-any
  writeValue(value: any): void {
    this.setTriggerValue(value);
  }

  registerOnChange(fn: (value: {}) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const element: HTMLInputElement = this.elementRef.nativeElement;
    element.disabled = isDisabled;
    this.closePanel();
  }

  openPanel(): void {
    this.previousValue = this.elementRef.nativeElement.value;
    this.attachOverlay();
    this.updateStatus();
  }

  closePanel(): void {
    if (this.panelOpen) {
      this.nzAutocomplete.isOpen = this.panelOpen = false;

      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.selectionChangeSubscription.unsubscribe();
        this.overlayBackdropClickSubscription.unsubscribe();
        this.overlayPositionChangeSubscription.unsubscribe();
        this.optionsChangeSubscription.unsubscribe();
        this.overlayRef.detach();
        this.overlayRef = null;
        this.portal = null;
      }
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

    if (keyCode === ESCAPE) {
      event.preventDefault();
    }

    if (this.panelOpen && (keyCode === ESCAPE || keyCode === TAB)) {
      // Reset value when tab / ESC close
      if (this.activeOption && this.activeOption.getLabel() !== this.previousValue) {
        this.setTriggerValue(this.previousValue);
      }
      this.closePanel();
    } else if (this.panelOpen && keyCode === ENTER) {
      if (this.nzAutocomplete.showPanel && this.activeOption) {
        event.preventDefault();
        this.activeOption.selectViaInteraction();
      }
    } else if (this.panelOpen && isArrowKey && this.nzAutocomplete.showPanel) {
      event.stopPropagation();
      event.preventDefault();
      if (keyCode === UP_ARROW) {
        this.nzAutocomplete.setPreviousItemActive();
      } else {
        this.nzAutocomplete.setNextItemActive();
      }
      if (this.activeOption) {
        this.activeOption.scrollIntoViewIfNeeded();
      }
      this.doBackfill();
    }
  }

  handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    const document = this.document as Document;
    let value: number | string | null = target.value;

    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }

    if (this.previousValue !== value) {
      this.previousValue = value;
      this._onChange(value);

      if (this.canOpen() && document.activeElement === event.target) {
        this.openPanel();
      }
    }
  }

  handleFocus(): void {
    if (this.canOpen()) {
      this.openPanel();
    }
  }

  handleBlur(): void {
    this.closePanel();
    this._onTouched();
  }

  /**
   * Subscription data source changes event
   */
  private subscribeOptionsChange(): Subscription {
    const firstStable = this.ngZone.onStable.asObservable().pipe(take(1));
    const optionChanges = this.nzAutocomplete.options.changes.pipe(
      tap(() => this.positionStrategy.reapplyLastPosition()),
      delay(0)
    );
    return merge(firstStable, optionChanges).subscribe(() => {
      this.resetActiveItem();
      if (this.panelOpen) {
        this.overlayRef!.updatePosition();
      }
    });
  }

  /**
   * Subscription option changes event and set the value
   */
  private subscribeSelectionChange(): Subscription {
    return this.nzAutocomplete.selectionChange.subscribe((option: NzAutocompleteOptionComponent) => {
      this.setValueAndClose(option);
    });
  }

  /**
   * Subscription external click and close panel
   */
  private subscribeOverlayBackdropClick(): Subscription {
    return merge<MouseEvent | TouchEvent>(
      fromEvent<MouseEvent>(this.document, 'click'),
      fromEvent<TouchEvent>(this.document, 'touchend')
    ).subscribe((event: MouseEvent | TouchEvent) => {
      const clickTarget = event.target as HTMLElement;

      // Make sure is not self
      if (
        clickTarget !== this.elementRef.nativeElement &&
        !this.overlayRef!.overlayElement.contains(clickTarget) &&
        this.panelOpen
      ) {
        this.closePanel();
      }
    });
  }

  /**
   * Subscription overlay position changes and reset dropdown position
   */
  private subscribeOverlayPositionChange(): Subscription {
    return this.positionStrategy.positionChanges
      .pipe(
        map((position: ConnectedOverlayPositionChange) => position.connectionPair.originY),
        distinct(),
        delay(0)
      )
      .subscribe((position: VerticalConnectionPos) => {
        this.nzAutocomplete.updatePosition(position);
      });
  }

  private attachOverlay(): void {
    if (!this.nzAutocomplete) {
      throw getNzAutocompleteMissingPanelError();
    }

    if (!this.portal) {
      this.portal = new TemplatePortal(this.nzAutocomplete.template, this.viewContainerRef);
    }

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayPositionChangeSubscription = this.subscribeOverlayPositionChange();
      this.selectionChangeSubscription = this.subscribeSelectionChange();
      this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
      this.optionsChangeSubscription = this.subscribeOptionsChange();
    }
    this.nzAutocomplete.isOpen = this.panelOpen = true;
  }

  private updateStatus(): void {
    if (this.overlayRef) {
      this.overlayRef.updateSize({ width: this.nzAutocomplete.nzWidth || this.getHostWidth() });
    }
    this.nzAutocomplete.setVisibility();
    this.resetActiveItem();
    if (this.activeOption) {
      this.activeOption.scrollIntoViewIfNeeded();
    }
  }

  private destroyPanel(): void {
    if (this.overlayRef) {
      this.closePanel();
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // default host element width
      width: this.nzAutocomplete.nzWidth || this.getHostWidth()
    });
  }

  private getConnectedElement(): ElementRef {
    return this.elementRef;
  }

  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
    ];
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions(positions);
    return this.positionStrategy;
  }

  private resetActiveItem(): void {
    const index = this.nzAutocomplete.getOptionIndex(this.previousValue);
    this.nzAutocomplete.clearSelectedOptions(null, true);
    if (index !== -1) {
      this.nzAutocomplete.setActiveItem(index);
      this.nzAutocomplete.activeItem.select(false);
    } else {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
    }
  }

  private setValueAndClose(option: NzAutocompleteOptionComponent): void {
    const value = option.nzValue;
    this.setTriggerValue(option.getLabel());
    this._onChange(value);
    this.elementRef.nativeElement.focus();
    this.closePanel();
  }

  private setTriggerValue(value: string | number | null): void {
    this.elementRef.nativeElement.value = value || '';
    if (!this.nzAutocomplete.nzBackfill) {
      this.previousValue = value;
    }
  }

  private doBackfill(): void {
    if (this.nzAutocomplete.nzBackfill && this.nzAutocomplete.activeItem) {
      this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
    }
  }

  private canOpen(): boolean {
    const element: HTMLInputElement = this.elementRef.nativeElement;
    return !element.readOnly && !element.disabled;
  }
}
