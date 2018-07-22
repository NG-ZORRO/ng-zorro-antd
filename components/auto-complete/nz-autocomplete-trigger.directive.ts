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
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent, merge, Subscription } from 'rxjs';
import { delay, distinct, map } from 'rxjs/operators';

import { NzAutocompleteOptionComponent } from './nz-autocomplete-option.component';
import { NzAutocompleteComponent } from './nz-autocomplete.component';

export const NZ_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide    : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzAutocompleteTriggerDirective),
  multi      : true
};

export function getNzAutocompleteMissingPanelError(): Error {
  return Error('Attempting to open an undefined instance of `nz-autocomplete`. ' +
    'Make sure that the id passed to the `nzAutocomplete` is correct and that ' +
    'you\'re attempting to open it after the ngAfterContentInit hook.');
}

@Directive({
  selector : `input[nzAutocomplete], textarea[nzAutocomplete]`,
  providers: [ NZ_AUTOCOMPLETE_VALUE_ACCESSOR ],
  host     : {
    'autocomplete'     : 'off',
    'aria-autocomplete': 'list',
    '(focusin)'        : 'handleFocus()',
    '(blur)'           : 'handleBlur()',
    '(input)'          : 'handleInput($event)',
    '(keydown)'        : 'handleKeydown($event)'
  }
})
export class NzAutocompleteTriggerDirective implements ControlValueAccessor, OnDestroy {

  private overlayRef: OverlayRef | null;
  private portal: TemplatePortal<{}>;
  private positionStrategy: FlexibleConnectedPositionStrategy;
  private previousValue: string | number | null;
  private selectionChangeSubscription: Subscription;
  private optionsChangeSubscription: Subscription;
  private overlayBackdropClickSubscription: Subscription;
  private overlayPositionChangeSubscription: Subscription;

  _onChange: (value: {}) => void = () => {};
  _onTouched = () => {};

  panelOpen: boolean = false;

  /** 用于绑定 nzAutocomplete 组件 */
  @Input() nzAutocomplete: NzAutocompleteComponent;

  /**
   * 当前被激活的 Option
   */
  get activeOption(): NzAutocompleteOptionComponent {
    if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
      return this.nzAutocomplete.activeItem;
    }
  }

  constructor(private _element: ElementRef, private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              // tslint:disable-next-line:no-any
              @Optional() @Inject(DOCUMENT) private _document: any) {
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
        this.overlayPositionChangeSubscription.unsubscribe();
        this.optionsChangeSubscription.unsubscribe();
      }
    }
  }

  /**
   * 订阅数据源改变事件
   */
  private subscribeOptionsChange(): Subscription {
    return this.nzAutocomplete.options.changes.pipe(
      delay(0)
    ).subscribe(() => {
      this.resetActiveItem();
    });
  }

  /**
   * 订阅 option 选择事件
   * 并设置值
   */
  private subscribeSelectionChange(): Subscription {
    return this.nzAutocomplete.selectionChange
    .subscribe((option: NzAutocompleteOptionComponent) => {
      this.setValueAndClose(option);
    });
  }

  /**
   * 订阅组件外部的单击事件
   * 并关闭弹窗
   */
  private subscribeOverlayBackdropClick(): Subscription {
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

  /**
   * 订阅 Overlay 位置改变事件
   * 并重新设置动画方向
   */
  private subscribeOverlayPositionChange(): Subscription {
    return this.positionStrategy.positionChanges
    .pipe(
      map((position: ConnectedOverlayPositionChange) => position.connectionPair.originY),
      distinct()
    )
    .subscribe((position: VerticalConnectionPos) => {
      this.nzAutocomplete.dropDownPosition = position;
    });
  }

  private attachOverlay(): void {
    if (!this.nzAutocomplete) {
      throw getNzAutocompleteMissingPanelError();
    }

    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.nzAutocomplete.template, this._viewContainerRef);
      this.overlayRef = this._overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayPositionChangeSubscription = this.subscribeOverlayPositionChange();
      this.selectionChangeSubscription = this.subscribeSelectionChange();
      this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
      this.optionsChangeSubscription = this.subscribeOptionsChange();
    }

    this.nzAutocomplete.isOpen = this.panelOpen = true;
    this.nzAutocomplete.setVisibility();
    this.overlayRef.updateSize({ width: this.nzAutocomplete.nzWidth || this.getHostWidth() });
    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
      }
    }, 150);
    this.resetActiveItem();
    if (this.activeOption) {
      this.activeOption.scrollIntoViewIfNeeded();
    }
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
      scrollStrategy  : this._overlay.scrollStrategies.reposition(),
      // 如果没有设置 nzWidth 则使用 Host 元素的宽度
      width           : this.nzAutocomplete.nzWidth || this.getHostWidth()
    });
  }

  private getConnectedElement(): ElementRef {
    return this._element;
  }

  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
    ];
    this.positionStrategy = this._overlay.position()
    .flexibleConnectedTo(this.getConnectedElement())
    .withPositions(positions)
    .withFlexibleDimensions(false)
    .withPush(false);
    return this.positionStrategy;
  }

  private resetActiveItem(): void {
    if (this.nzAutocomplete.activeItem && this.nzAutocomplete.getOptionIndex(this.nzAutocomplete.activeItem)) {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.getOptionIndex(this.nzAutocomplete.activeItem));
    } else {
      this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

    if (keyCode === ESCAPE) {
      event.preventDefault();
    }

    if (this.panelOpen && (keyCode === ESCAPE || keyCode === TAB)) {
      // 通过 tab / ESC 关闭，重置输入标签 value
      if (this.activeOption.getLabel() !== this.previousValue) {
        this.setTriggerValue(this.previousValue);
      }
      this.closePanel();
    } else if (this.panelOpen && keyCode === ENTER) {
      event.preventDefault();
      if (this.nzAutocomplete.showPanel && this.activeOption) {
        this.activeOption.selectViaInteraction();
      }
    } else if (this.panelOpen && isArrowKey && this.nzAutocomplete.showPanel) {
      event.stopPropagation();
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

  private setValueAndClose(option: NzAutocompleteOptionComponent): void {
    const value = option.nzValue;
    this.setTriggerValue(option.getLabel());
    this._onChange(value);
    this._element.nativeElement.focus();
    this.closePanel();
  }

  private setTriggerValue(value: string | number | null): void {
    this._element.nativeElement.value = value || '';
  }

  private doBackfill(): void {
    if (this.nzAutocomplete.nzBackfill) {
      // 只设置标签显示值
      this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
    }
  }

  handleInput(event: KeyboardEvent): void {
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

  handleFocus(): void {
    if (this.canOpen()) {
      this.previousValue = this._element.nativeElement.value;
      this.openPanel();
    }
  }

  handleBlur(): void {
    this._onTouched();
  }

  private canOpen(): boolean {
    const element: HTMLInputElement = this._element.nativeElement;
    return !element.readOnly && !element.disabled;
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
    const element: HTMLInputElement = this._element.nativeElement;
    element.disabled = isDisabled;
    this.closePanel();
  }

  ngOnDestroy(): void {
    this.destroyPanel();
  }
}
