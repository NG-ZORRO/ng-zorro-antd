import { DOWN_ARROW, ENTER, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
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
  OnDestroy,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';

import { NzAutocompleteOptionComponent } from './nz-autocomplete-option.component';
import { NzAutocompleteComponent } from './nz-autocomplete.component';

export const NZ_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzAutocompleteTriggerDirective),
  multi: true
};

@Directive({
  selector: `input[nzAutocomplete], textarea[nzAutocomplete]`,
  providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR],
  host: {
    'autocomplete': 'off',
    'aria-autocomplete': 'list',
    '(focusin)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)'
  },
})
export class NzAutocompleteTriggerDirective implements ControlValueAccessor, OnDestroy {

  private overlayRef: OverlayRef | null;
  private portal: TemplatePortal<{}>;
  private panelOpen: boolean = false;
  private positionStrategy: ConnectedPositionStrategy;
  private previousValue: string | number | null;
  private selectionChangeSubscription: Subscription;
  private overlayBackdropClickSubscription: Subscription;

  _onChange: (value: {}) => void = () => {};
  _onTouched = () => {};

  /** 用于绑定 nzAutocomplete 组件 */
  @Input() nzAutocomplete: NzAutocompleteComponent;

  /**
   * 当前被激活的 Option
   * @returns {NzAutocompleteOptionComponent | null}
   */
  get activeOption(): NzAutocompleteOptionComponent | null {
    if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
      return this.nzAutocomplete.activeItem;
    }
    return null;
  }

  constructor(private _element: ElementRef, private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              @Optional() @Inject(DOCUMENT) private _document: Document) {
  }

  openPanel(): void {
    this.attachOverlay();
  }

  closePanel(): void {
    if (this.panelOpen) {
      this.nzAutocomplete.isOpen = this.panelOpen = false;

      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.selectionChangeSubscription.unsubscribe();
        this.overlayBackdropClickSubscription.unsubscribe();
      }
    }
  }

  /**
   * 订阅 option 选择事件
   * 并设置值
   * @returns {Subscription}
   */
  private subscribeSelectionChange(): Subscription {
    return this.nzAutocomplete.selectionChange
    .subscribe((option: NzAutocompleteOptionComponent) => {
      this.setValue(option);
    });
  }

  /**
   * 订阅组件外部的单击事件
   * 并关闭弹窗
   * @returns {Subscription}
   */
  private subscribeOverlayBackdropClick(): Subscription {
    if (!this._document) {
      return of(null).subscribe();
    }
    return merge(
      fromEvent(this._document, 'click'),
      fromEvent(this._document, 'touchend')
    )
    .subscribe((event: MouseEvent | TouchEvent) => {
      const clickTarget = event.target as HTMLElement;

      // 确保不是点击组件自身
      if (clickTarget !== this._element.nativeElement && this.panelOpen) {
        this.closePanel();
      }
    });
  }

  private attachOverlay(): void {
    if (!this.nzAutocomplete) {
      return;
    }

    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.nzAutocomplete.template, this._viewContainerRef);
      this.overlayRef = this._overlay.create(this.getOverlayConfig());
    } else {
      // 如果没有设置 nzDisplayWith 则使用 Host 元素的宽度
      this.overlayRef.updateSize({width: this.nzAutocomplete.nzWidth || this.getHostWidth()});
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.selectionChangeSubscription = this.subscribeSelectionChange();
      this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
    }

    this.nzAutocomplete.isOpen = this.panelOpen = true;
    this.resetActiveItem();
    this.nzAutocomplete.setVisibility();
  }

  private destroyPanel(): void {
    if (this.overlayRef) {
      this.closePanel();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      // 如果没有设置 nzWidth 则使用 Host 元素的宽度
      width: this.nzAutocomplete.nzWidth || this.getHostWidth()
    });
  }

  private getConnectedElement(): ElementRef {
    return this._element;
  }

  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private getOverlayPosition(): PositionStrategy {
    this.positionStrategy = this._overlay.position().connectedTo(
      this.getConnectedElement(),
      {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'})
    .withFallbackPosition(
      {originX: 'start', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'}
    );
    return this.positionStrategy;
  }

  private resetActiveItem(): void {
    if (this.nzAutocomplete.activeItem) {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.getOptionIndex(this.nzAutocomplete.activeItem));
    } else {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case TAB:
        // 通过 tab 跳出时，重置输入标签 value
        if (this.activeOption.getLabel() !== this.previousValue) {
          this.setTriggerValue(this.previousValue);
        }
        this.closePanel();
        return;
      case DOWN_ARROW:
        if (this.nzAutocomplete.showPanel) {
          this.nzAutocomplete.setNextItemActive();
          this.doBackfill();
          event.preventDefault();
        }
        break;
      case UP_ARROW:
        if (this.nzAutocomplete.showPanel) {
          this.nzAutocomplete.setPreviousItemActive();
          this.doBackfill();
          event.preventDefault();
        }
        break;
      case ENTER:
        if (this.nzAutocomplete.showPanel && this.activeOption) {
          this.activeOption.selectViaInteraction();
        }
        event.preventDefault();
        break;
      default:
        return;
    }
  }

  private setValue(option: NzAutocompleteOptionComponent, isClose: boolean = true): void {
    if (option && !option.nzDisabled) {
      const value = option.getLabel();
      this.setTriggerValue(value);
      this._onChange(value);
      this._element.nativeElement.focus();
    }
    if (isClose) {
      this.closePanel();
    }
  }

  private setTriggerValue(value: string | number | null): void {
    this._element.nativeElement.value = value;
  }

  private doBackfill(): void {
    if (this.nzAutocomplete.nzBackfill) {
      // 只设置标签显示值
      this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
    }
  }

  private handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    let value: number | string | null = target.value;
    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }
    if (this.canOpen() && document.activeElement === event.target &&
      this.previousValue !== value) {
      this.previousValue = value;
      this._onChange(value);
      this.openPanel();
    }
  }

  private handleFocus(): void {
    if (this.canOpen()) {
      this.previousValue = this._element.nativeElement.value;
      this.openPanel();
    }
  }

  private handleBlur(): void {
    this._onTouched();
  }

  private canOpen(): boolean {
    const element: HTMLInputElement = this._element.nativeElement;
    return !element.readOnly && !element.disabled;
  }

  writeValue(obj: {}): void {
  }

  registerOnChange(fn: (value: {}) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  ngOnDestroy(): void {
    this.destroyPanel();
  }
}
