/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  slideMotion,
  toArray,
  DEFAULT_DROPDOWN_POSITIONS,
  InputBoolean,
  NgClassType,
  NzNoAnimationDirective
} from 'ng-zorro-antd/core';

import {
  CascaderOption,
  CascaderSearchOption,
  NzCascaderComponentAsSource,
  NzCascaderExpandTrigger,
  NzCascaderSize,
  NzCascaderTriggerType,
  NzShowSearchOptions
} from './nz-cascader-definitions';
import { NzCascaderOptionComponent } from './nz-cascader-li.component';
import { NzCascaderService } from './nz-cascader.service';

const defaultDisplayRender = (labels: string[]) => labels.join(' / ');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cascader,[nz-cascader]',
  exportAs: 'nzCascader',
  preserveWhitespaces: false,
  templateUrl: './nz-cascader.component.html',
  animations: [slideMotion],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCascaderComponent),
      multi: true
    },
    NzCascaderService
  ],
  host: {
    '[attr.tabIndex]': '"0"',
    '[class.ant-cascader-lg]': 'nzSize === "large"',
    '[class.ant-cascader-sm]': 'nzSize === "small"',
    '[class.ant-cascader-picker-disabled]': 'nzDisabled',
    '[class.ant-cascader-picker-open]': 'menuVisible',
    '[class.ant-cascader-picker-with-value]': '!!inputValue',
    '[class.ant-cascader-focused]': 'isFocused'
  },
  styles: [
    `
      .ant-cascader-menus {
        margin-top: 4px;
        margin-bottom: 4px;
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
      }
    `
  ]
})
export class NzCascaderComponent implements NzCascaderComponentAsSource, OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('input') input: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild(CdkConnectedOverlay) overlay: CdkConnectedOverlay;
  @ViewChildren(NzCascaderOptionComponent) cascaderItems: QueryList<NzCascaderOptionComponent>;

  @Input() @InputBoolean() nzShowInput = true;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() @InputBoolean() nzAllowClear = true;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzChangeOnSelect = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzColumnClassName: string;
  @Input() nzExpandTrigger: NzCascaderExpandTrigger = 'click';
  @Input() nzValueProperty = 'value';
  @Input() nzLabelRender: TemplateRef<void>;
  @Input() nzLabelProperty = 'label';
  @Input() nzNotFoundContent: string | TemplateRef<void>;
  @Input() nzSize: NzCascaderSize = 'default';
  @Input() nzShowSearch: boolean | NzShowSearchOptions;
  @Input() nzPlaceHolder = 'Please select'; // TODO: i18n?
  @Input() nzMenuClassName: string;
  @Input() nzMenuStyle: { [key: string]: string };
  @Input() nzMouseEnterDelay: number = 150; // ms
  @Input() nzMouseLeaveDelay: number = 150; // ms
  @Input() nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = ['click'] as NzCascaderTriggerType[];
  @Input() nzChangeOn: (option: CascaderOption, level: number) => boolean;
  @Input() nzLoadData: (node: CascaderOption, index?: number) => PromiseLike<any>; // tslint:disable-line:no-any

  @Input()
  get nzOptions(): CascaderOption[] | null {
    return this.cascaderService.nzOptions;
  }

  set nzOptions(options: CascaderOption[] | null) {
    this.cascaderService.withOptions(options);
  }

  @Output() readonly nzSelectionChange = new EventEmitter<CascaderOption[]>();
  @Output() readonly nzSelect = new EventEmitter<{ option: CascaderOption; index: number } | null>();
  @Output() readonly nzClear = new EventEmitter<void>();
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>(); // Not exposed, only for test
  @Output() readonly nzChange = new EventEmitter(); // Not exposed, only for test

  el: HTMLElement;
  dropDownPosition = 'bottom';
  menuVisible = false;
  isLoading = false;
  labelRenderText: string;
  labelRenderContext = {};
  onChange = Function.prototype;
  onTouched = Function.prototype;
  positions: ConnectionPositionPair[] = [...DEFAULT_DROPDOWN_POSITIONS];
  dropdownWidthStyle: string;
  isFocused = false;

  private $destroy = new Subject<void>();
  private inputString = '';
  private isOpening = false;
  private delayMenuTimer: number | null;
  private delaySelectTimer: number | null;

  get inSearchingMode(): boolean {
    return this.cascaderService.inSearchingMode;
  }

  set inputValue(inputValue: string) {
    this.inputString = inputValue;
    this.toggleSearchingMode(!!inputValue);
  }

  get inputValue(): string {
    return this.inputString;
  }

  get menuCls(): NgClassType {
    return { [`${this.nzMenuClassName}`]: !!this.nzMenuClassName };
  }

  get menuColumnCls(): NgClassType {
    return { [`${this.nzColumnClassName}`]: !!this.nzColumnClassName };
  }

  private get hasInput(): boolean {
    return !!this.inputValue;
  }

  private get hasValue(): boolean {
    return this.cascaderService.values && this.cascaderService.values.length > 0;
  }

  get showPlaceholder(): boolean {
    return !(this.hasInput || this.hasValue);
  }

  get clearIconVisible(): boolean {
    return this.nzAllowClear && !this.nzDisabled && (this.hasValue || this.hasInput);
  }

  get isLabelRenderTemplate(): boolean {
    return !!this.nzLabelRender;
  }

  constructor(
    public cascaderService: NzCascaderService,
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    this.el = elementRef.nativeElement;
    this.cascaderService.withComponent(this);
    renderer.addClass(elementRef.nativeElement, 'ant-cascader');
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-picker');
  }

  ngOnInit(): void {
    const srv = this.cascaderService;

    srv.$redraw.pipe(takeUntil(this.$destroy)).subscribe(() => {
      // These operations would not mutate data.
      this.checkChildren();
      this.buildDisplayLabel();
      this.reposition();
      this.cdr.markForCheck();
    });

    srv.$loading.pipe(takeUntil(this.$destroy)).subscribe(loading => {
      this.isLoading = loading;
    });

    srv.$optionSelected.pipe(takeUntil(this.$destroy)).subscribe(data => {
      if (!data) {
        this.onChange([]);
        this.nzSelect.emit(null);
      } else {
        const { option, index } = data;
        const shouldClose = option.isLeaf;
        if (shouldClose) {
          this.delaySetMenuVisible(false);
        }
        this.onChange(this.cascaderService.values);
        this.nzSelectionChange.emit(this.cascaderService.selectedOptions);
        this.nzSelect.emit({ option, index });
        this.cdr.markForCheck();
      }
    });

    srv.$quitSearching.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.inputString = '';
      this.dropdownWidthStyle = '';
    });
  }

  ngOnDestroy(): void {
    this.clearDelayMenuTimer();
    this.clearDelaySelectTimer();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  // tslint:disable-next-line:no-any
  writeValue(value: any): void {
    this.cascaderService.values = toArray(value);
    this.cascaderService.syncOptions(true);
  }

  delaySetMenuVisible(visible: boolean, delay: number = 100, setOpening: boolean = false): void {
    this.clearDelayMenuTimer();
    if (delay) {
      if (visible && setOpening) {
        this.isOpening = true;
      }
      this.delayMenuTimer = setTimeout(() => {
        this.setMenuVisible(visible);
        this.cdr.detectChanges();
        this.clearDelayMenuTimer();
        if (visible) {
          setTimeout(() => {
            this.isOpening = false;
          }, 100);
        }
      }, delay);
    } else {
      this.setMenuVisible(visible);
    }
  }

  setMenuVisible(visible: boolean): void {
    if (this.nzDisabled || this.menuVisible === visible) {
      return;
    }
    if (visible) {
      this.cascaderService.syncOptions();
    }

    this.menuVisible = visible;
    this.nzVisibleChange.emit(visible);
    this.cdr.detectChanges();
  }

  private clearDelayMenuTimer(): void {
    if (this.delayMenuTimer) {
      clearTimeout(this.delayMenuTimer);
      this.delayMenuTimer = null;
    }
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.labelRenderText = '';
    this.labelRenderContext = {};
    this.inputValue = '';
    this.setMenuVisible(false);
    this.cascaderService.clear();
  }

  // tslint:disable-next-line:no-any
  getSubmitValue(): any[] {
    return this.cascaderService.selectedOptions.map(o => this.cascaderService.getOptionValue(o));
  }

  focus(): void {
    if (!this.isFocused) {
      (this.input ? this.input.nativeElement : this.el).focus();
      this.isFocused = true;
    }
  }

  blur(): void {
    if (this.isFocused) {
      (this.input ? this.input.nativeElement : this.el).blur();
      this.isFocused = false;
    }
  }

  handleInputBlur(): void {
    this.menuVisible ? this.focus() : this.blur();
  }

  handleInputFocus(): void {
    this.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (
      keyCode !== DOWN_ARROW &&
      keyCode !== UP_ARROW &&
      keyCode !== LEFT_ARROW &&
      keyCode !== RIGHT_ARROW &&
      keyCode !== ENTER &&
      keyCode !== BACKSPACE &&
      keyCode !== ESCAPE
    ) {
      return;
    }

    // Press any keys above to reopen menu.
    if (!this.menuVisible && keyCode !== BACKSPACE && keyCode !== ESCAPE) {
      return this.setMenuVisible(true);
    }

    // Make these keys work as default in searching mode.
    if (this.inSearchingMode && (keyCode === BACKSPACE || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)) {
      return;
    }

    // Interact with the component.
    if (this.menuVisible) {
      event.preventDefault();
      if (keyCode === DOWN_ARROW) {
        this.moveUpOrDown(false);
      } else if (keyCode === UP_ARROW) {
        this.moveUpOrDown(true);
      } else if (keyCode === LEFT_ARROW) {
        this.moveLeft();
      } else if (keyCode === RIGHT_ARROW) {
        this.moveRight();
      } else if (keyCode === ENTER) {
        this.onEnter();
      }
    }
  }

  @HostListener('click')
  onTriggerClick(): void {
    if (this.nzDisabled) {
      return;
    }
    if (this.nzShowSearch) {
      this.focus();
    }
    if (this.isActionTrigger('click')) {
      this.delaySetMenuVisible(!this.menuVisible, 100);
    }
    this.onTouched();
  }

  @HostListener('mouseenter')
  onTriggerMouseEnter(): void {
    if (this.nzDisabled) {
      return;
    }
    if (this.isActionTrigger('hover')) {
      this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onTriggerMouseLeave(event: MouseEvent): void {
    if (this.nzDisabled) {
      return;
    }
    if (!this.menuVisible || this.isOpening) {
      event.preventDefault();
      return;
    }
    if (this.isActionTrigger('hover')) {
      const mouseTarget = event.relatedTarget as HTMLElement;
      const hostEl = this.el;
      const menuEl = this.menu && (this.menu.nativeElement as HTMLElement);
      if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))) {
        return;
      }
      this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
    }
  }

  private isActionTrigger(action: 'click' | 'hover'): boolean {
    return typeof this.nzTriggerAction === 'string'
      ? this.nzTriggerAction === action
      : this.nzTriggerAction.indexOf(action) !== -1;
  }

  onOptionClick(option: CascaderOption, columnIndex: number, event: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (option && option.disabled) {
      return;
    }
    this.el.focus();
    this.inSearchingMode
      ? this.cascaderService.setSearchOptionSelected(option as CascaderSearchOption)
      : this.cascaderService.setOptionActivated(option, columnIndex, true);
  }

  private onEnter(): void {
    const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
    const option = this.cascaderService.activatedOptions[columnIndex];
    if (option && !option.disabled) {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(option as CascaderSearchOption)
        : this.cascaderService.setOptionActivated(option, columnIndex, true);
    }
  }

  private moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
    const activeOption = this.cascaderService.activatedOptions[columnIndex];
    const options = this.cascaderService.columns[columnIndex] || [];
    const length = options.length;
    let nextIndex = -1;
    if (!activeOption) {
      // Not selected options in this column
      nextIndex = isUp ? length : -1;
    } else {
      nextIndex = options.indexOf(activeOption);
    }

    while (true) {
      nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex < 0 || nextIndex >= length) {
        break;
      }
      const nextOption = options[nextIndex];
      if (!nextOption || nextOption.disabled) {
        continue;
      }
      this.cascaderService.setOptionActivated(nextOption, columnIndex);
      break;
    }
  }

  private moveLeft(): void {
    const options = this.cascaderService.activatedOptions;
    if (options.length) {
      options.pop(); // Remove the last one
    }
  }

  private moveRight(): void {
    const length = this.cascaderService.activatedOptions.length;
    const options = this.cascaderService.columns[length];
    if (options && options.length) {
      const nextOpt = options.find(o => !o.disabled);
      if (nextOpt) {
        this.cascaderService.setOptionActivated(nextOpt, length);
      }
    }
  }

  onOptionMouseEnter(option: CascaderOption, columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
      this.delaySelectOption(option, columnIndex, true);
    }
  }

  onOptionMouseLeave(option: CascaderOption, columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
      this.delaySelectOption(option, columnIndex, false);
    }
  }

  private clearDelaySelectTimer(): void {
    if (this.delaySelectTimer) {
      clearTimeout(this.delaySelectTimer);
      this.delaySelectTimer = null;
    }
  }

  private delaySelectOption(option: CascaderOption, index: number, doSelect: boolean): void {
    this.clearDelaySelectTimer();
    if (doSelect) {
      this.delaySelectTimer = setTimeout(() => {
        this.cascaderService.setOptionActivated(option, index);
        this.delaySelectTimer = null;
      }, 150);
    }
  }

  private toggleSearchingMode(toSearching: boolean): void {
    if (this.inSearchingMode !== toSearching) {
      this.cascaderService.toggleSearchingMode(toSearching);
      this.dropdownWidthStyle = toSearching ? `${this.input.nativeElement.offsetWidth}px` : '';
    }
    if (this.inSearchingMode) {
      this.cascaderService.prepareSearchOptions(this.inputValue);
    }
  }

  isOptionActivated(option: CascaderOption, index: number): boolean {
    const activeOpt = this.cascaderService.activatedOptions[index];
    return activeOpt === option;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.closeMenu();
    }
    this.nzDisabled = isDisabled;
  }

  closeMenu(): void {
    this.blur();
    this.clearDelayMenuTimer();
    this.setMenuVisible(false);
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
    if (this.dropDownPosition !== newValue) {
      this.dropDownPosition = newValue;
      this.cdr.detectChanges();
    }
  }

  /**
   * Reposition the cascader panel. When a menu opens, the cascader expands
   * and may exceed the boundary of browser's window.
   */
  private reposition(): void {
    if (this.overlay && this.overlay.overlayRef && this.menuVisible) {
      Promise.resolve().then(() => {
        this.overlay.overlayRef.updatePosition();
      });
    }
  }

  /**
   * When a cascader options is changed, a child needs to know that it should re-render.
   */
  private checkChildren(): void {
    if (this.cascaderItems) {
      this.cascaderItems.forEach(item => item.markForCheck());
    }
  }

  private buildDisplayLabel(): void {
    const selectedOptions = this.cascaderService.selectedOptions;
    const labels: string[] = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));

    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = { labels, selectedOptions };
    } else {
      this.labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
    }
  }
}
