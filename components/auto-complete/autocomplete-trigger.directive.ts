/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectionPositionPair,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  FlexibleConnectedPositionStrategy,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  DOCUMENT,
  ElementRef,
  ExistingProvider,
  forwardRef,
  inject,
  Injector,
  Input,
  NgZone,
  ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';

import { NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzInputGroupWhitSuffixOrPrefixDirective } from 'ng-zorro-antd/input';

import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
import { NzAutocompleteComponent } from './autocomplete.component';

/**
 * @deprecated Internally used, will be removed in v21, please do not use it.
 */
export const NZ_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzAutocompleteTriggerDirective),
  multi: true
};

/**
 * @deprecated Internally used, will not be exported in v21, please do not use it.
 */
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
    '(input)': 'handleInput($any($event))',
    '(keydown)': 'handleKeydown($any($event))',
    '(click)': 'handleClick()'
  }
})
export class NzAutocompleteTriggerDirective implements AfterViewInit, ControlValueAccessor {
  private injector = inject(Injector);
  private ngZone = inject(NgZone);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  /** Bind nzAutocomplete component */
  @Input() nzAutocomplete!: NzAutocompleteComponent;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  panelOpen: boolean = false;

  /** Current active option */
  get activeOption(): NzAutocompleteOptionComponent | null {
    if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
      return this.nzAutocomplete.activeItem;
    } else {
      return null;
    }
  }

  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal<{}> | null = null;
  private positionStrategy!: FlexibleConnectedPositionStrategy;
  private previousValue: string | number | null = null;
  private selectionChangeSubscription!: Subscription;
  private optionsChangeSubscription!: Subscription;
  private overlayOutsideClickSubscription!: Subscription;
  private document = inject(DOCUMENT);
  private nzInputGroupWhitSuffixOrPrefixDirective = inject(NzInputGroupWhitSuffixOrPrefixDirective, { optional: true });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyPanel();
    });
  }

  ngAfterViewInit(): void {
    if (this.nzAutocomplete) {
      this.nzAutocomplete.animationStateChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
        if (event.toState === 'void') {
          if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
          }
        }
      });
    }
  }

  writeValue(value: NzSafeAny): void {
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve(null).then(() => this.setTriggerValue(value));
    });
  }

  registerOnChange(fn: (value: {}) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
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
        this.overlayRef.detach();
        this.selectionChangeSubscription.unsubscribe();
        this.overlayOutsideClickSubscription.unsubscribe();
        this.optionsChangeSubscription.unsubscribe();
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
      if (this.nzAutocomplete.showPanel) {
        event.preventDefault();
        if (this.activeOption) {
          this.activeOption.selectViaInteraction();
        } else {
          this.closePanel();
        }
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
      this.onChange(value);

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

  handleClick(): void {
    if (this.canOpen() && !this.panelOpen) {
      this.openPanel();
    }
  }

  handleBlur(): void {
    this.onTouched();
  }

  /**
   * Subscription data source changes event
   */
  private subscribeOptionsChange(): Subscription {
    const optionChanges = this.nzAutocomplete.options.changes.pipe(
      tap(() => this.positionStrategy.reapplyLastPosition()),
      delay(0)
    );
    return optionChanges.subscribe(() => {
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

  private subscribeOverlayOutsideClick(): Subscription {
    return this.overlayRef!.outsidePointerEvents()
      .pipe(filter((e: MouseEvent) => !this.elementRef.nativeElement.contains(e.target)))
      .subscribe(() => {
        this.closePanel();
      });
  }

  private attachOverlay(): void {
    if (!this.nzAutocomplete) {
      throw getNzAutocompleteMissingPanelError();
    }

    if (!this.portal && this.nzAutocomplete.template) {
      this.portal = new TemplatePortal(this.nzAutocomplete.template, this.viewContainerRef);
    }

    if (!this.overlayRef) {
      this.overlayRef = createOverlayRef(this.injector, {
        positionStrategy: this.getOverlayPosition(),
        disposeOnNavigation: true,
        scrollStrategy: createRepositionScrollStrategy(this.injector),
        // default host element width
        width: this.nzAutocomplete.nzWidth || this.getHostWidth()
      });
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.selectionChangeSubscription = this.subscribeSelectionChange();
      this.optionsChangeSubscription = this.subscribeOptionsChange();
      this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
      this.overlayRef
        .detachments()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.closePanel();
        });
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

  private getConnectedElement(): ElementRef {
    return this.nzInputGroupWhitSuffixOrPrefixDirective?.elementRef ?? this.elementRef;
  }

  private getOverlayPosition(): PositionStrategy {
    return (this.positionStrategy = createFlexibleConnectedPositionStrategy(this.injector, this.getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
      ])
      .withTransformOriginOn('.ant-select-dropdown'));
  }

  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private resetActiveItem(): void {
    const index = this.nzAutocomplete.getOptionIndex(this.previousValue);
    this.nzAutocomplete.clearSelectedOptions(null, true);
    if (index !== -1) {
      this.nzAutocomplete.setActiveItem(index);
      this.nzAutocomplete.activeItem!.select(false);
    } else {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
    }
  }

  private setValueAndClose(option: NzAutocompleteOptionComponent): void {
    const value = option.nzValue;
    this.setTriggerValue(option.getLabel());
    this.onChange(value);
    this.elementRef.nativeElement.focus();
    this.closePanel();
  }

  private setTriggerValue(value: NzSafeAny): void {
    const option = this.nzAutocomplete.getOption(value);
    const displayValue = option ? option.getLabel() : value;
    this.elementRef.nativeElement.value = displayValue != null ? displayValue : '';
    if (!this.nzAutocomplete.nzBackfill) {
      this.previousValue = displayValue;
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
