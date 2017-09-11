import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  HostListener,
  forwardRef,
  HostBinding,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BACKSPACE,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW,
  ENTER,
} from '@angular/cdk';
const ESC = 27;

import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { ConnectionPositionPair } from '../core/overlay/index';

function noop(): void { }

function toArray(value: any): any[] {
  let ret = value;
  if (value === undefined) {
      ret = [];
  } else if (!Array.isArray(value)) {
      ret = [value];
  }
  return ret;
}

function arrayEquals(array1: any[], array2: any[]): boolean {
  if (!array1 || !array2 || array1.length !== array2.length) {
      return false;
  }

  const len = array1.length;
  for (let i = 0; i < len; i++) {
      if (array1[i] !== array2[i]) {
          return false;
      }
  }
  return true;
}

const defaultDisplayRender = label => label.join(' / ');

export type CascaderExpandTrigger = 'click' | 'hover';
export type CascaderTriggerType = 'click' | 'hover';

export interface CascaderOption {
  value?: string;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CascaderOption;
  children?: CascaderOption[];
  [key: string]: any;
}


@Component({
  selector     : 'nz-cascader',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    DropDownAnimation
  ],
  template       : `
    <div
      nz-overlay-origin
      #origin="nzOverlayOrigin"
      #trigger
    >
      <div *ngIf="nzShowInput">
        <input #input
          nz-input
          [attr.autoComplete]="'off'"
          [attr.placeholder]="_hasInput() || _hasSelection() ? null : nzPlaceHolder"
          [readonly]="!nzShowSearch"
          [disabled]="nzDisabled"
          [nzSize]="nzSize"
          [ngClass]="_inputCls"
          [(ngModel)]="_inputValue"
          (blur)="_handleInputBlur($event)"
          (focus)="_handleInputFocus($event)"
          (keydown)="_handleInputKeyDown($event)"
          (change)="_handlerInputChange($event)"
        >
        <i *ngIf="_showClearIcon"
          [class]="'anticon anticon-cross-circle'"
          [ngClass]="_clearCls"
          [attr.title]="nzClearText"
          (click)="_clearSelection($event)"></i>
        <i *ngIf="nzShowArrow"
          class="anticon anticon-down"
          [ngClass]="_arrowCls"></i>
        <span [ngClass]="_pickerLabelCls">
          <ng-container *ngIf="_displayLabelIsTemplate">
            <ng-container *ngTemplateOutlet="_displayLabel; context: _displayLabelContext"></ng-container>
          </ng-container>
          <ng-container *ngIf="!_displayLabelIsTemplate">{{_displayLabel}}</ng-container>
        </span>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-template
      nz-connected-overlay
      hasBackdrop
      [origin]="origin"
      (backdropClick)="_closeMenu()"
      (detach)="_closeMenu()"
      (positionChange)="onPositionChange($event)"
      [open]="_popupVisible"
    >
      <div #menu
        [ngClass]="_menuCls"
        [@dropDownAnimation]="_dropDownPosition"
      >
        <ul *ngFor="let options of _nzColumns; let i = index;"
          [ngClass]="_columnCls"
          [attr.data-key]="i">
          <li *ngFor="let option of options"
            [attr.data-key]="_getOptionValue(option)"
            [attr.title]="option.title || _getOptionLabel(option)"
            [ngClass]="_getOptionCls(option, i)"
            (mouseenter)="_onOptionMouseEnter(option, i, $event)"
            (mouseleave)="_onOptionMouseLeave(option, i, $event)"
            (click)="_onOptionClick(option, i, $event)"
          >
            {{_getOptionLabel(option)}}
          </li>
        </ul>
      </div>
    </ng-template>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCascaderComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzCascaderComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
  _el: HTMLElement;
  _prefixCls = 'ant-cascader';
  _inputPrefixCls = 'ant-input';
  _dropDownPosition = 'bottom';
  _focused = false;
  _popupVisible = false;

  _displayLabel: string | TemplateRef<any>;
  _displayLabelIsTemplate = false;
  _displayLabelContext: any = {};

  __inputValue = '';
  get _inputValue() {
    return this.__inputValue;
  }
  set _inputValue(inputValue) {
    this.__inputValue = inputValue;
    if (inputValue.length) {
      this._addHostClass(`${this._prefixCls}-picker-with-value`);
    } else {
      this._removeHostClass(`${this._prefixCls}-picker-with-value`);
    }
  }


  // check if change happened
  _lastValue: any[];
  // selection will trigger value change
  _selectedOptions: CascaderOption[] = [];
  // activaction will not triiger value change
  _activatedOptions: CascaderOption[] = [];
  // all data columns
  _nzColumns: CascaderOption[][] = [];

  // 点击Document的事件（一般用于点击后隐藏菜单）
  private _clickOutsideHandler: Function;
  private _touchOutsideHandler: Function;
  private _delayTimer: any;

  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  /** Whether is disabled */
  @Input() nzDisabled = false;

  /** Input size, one of `large` `default` `small` */
  @Input() nzSize: 'large' | 'default' | 'small' = 'default';

  /** Input placeholder */
  @Input() nzPlaceHolder = 'Please select';

  /** Whether show input box. Defaults to `true`. */
  @Input() nzShowInput = true;

  /** Whether can search. Defaults to `false`. */
  @Input() nzShowSearch = false;

  /** Whether allow clear. Defaults to `true`. */
  @Input() nzAllowClear = true;

  /** Hover text for the clear icon */
  @Input() nzClearText = 'Clear';

  /** Whether to show arrow */
  @Input() nzShowArrow = true;

  /** Specify content to show when no result matches. */
  @Input() nzNotFoundContent = 'Not Found';

  /** Additional className of popup overlay */
  @Input() nzPopupClassName: string;

  /** Additional className of popup overlay column */
  @Input() nzColumnClassName: string;

  /** Options for first column, sub column will be load async */
  @Input() nzOptions: CascaderOption[];

  /** Whether cache children when they were loaded asych */
  @Input() nzEnableCache = true;

  /** Expand column item when click or hover, one of 'click' 'hover' */
  @Input() nzExpandTrigger: CascaderExpandTrigger = 'click';

  /** Change value on each selection if set to true */
  @Input() nzChangeOnSelect = false;

  /** Change value on selection only if this function returns `true` */
  @Input() nzChangeOn: (option: CascaderOption, level: number) => boolean;

  /** Delay time to show when mouse enter, when `nzExpandTrigger` is `hover`. */
  @Input() nzMouseEnterDelay = 150; // ms

  /** Delay time to hide when mouse enter, when `nzExpandTrigger` is `hover`. */
  @Input() nzMouseLeaveDelay = 150; // ms

  /** Triggering mode: can be Array<'click'|'hover'> */
  @Input() nzTriggerAction: CascaderTriggerType | CascaderTriggerType[] = ['click'];

  /** Render function of displaying selected options */
  @Input() nzDisplayRender: (label: string[], selectedOptions: CascaderOption[]) => string | TemplateRef<any>;

  /** Property name for getting `value` in the option */
  @Input() nzValueProperty = 'value';

  /** Property name for getting `label` in the option */
  @Input() nzLabelProperty = 'label';

  @ViewChild('menu') menu: ElementRef;

  @HostBinding('attr.tabIndex') tabIndex = '0';


  /** Event: emit on popup show or hide */
  @Output() nzVisibleChange = new EventEmitter<boolean>();

  /** Event: emit on values changed */
  @Output() nzChange = new EventEmitter<any[]>();

  /** Event: emit on values and selection changed */
  @Output() nzSelectionChange = new EventEmitter<CascaderOption[]>();

  /**
   * Event: emit on option selected, event data：{option: any, index: number}
   */
  @Output() nzSelect = new EventEmitter<{
    option: CascaderOption,
    index: number
  }>();

  /**
   * Event: emit before loading children. event data：{option: any|null, index: number, resolve, reject}
   */
  @Output() nzLoad = new EventEmitter<{
    option: CascaderOption,
    index: number,
    resolve: (children: CascaderOption[]) => void,
    reject: () => void
  }>();

  /** Event: emit on the clear button clicked */
  @Output() nzClear = new EventEmitter<any>();


  onPositionChange(position) {
    const _position = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }

  nzFocus() {
    this._focused = true;
    this._addHostClass(`${this._prefixCls}-focused`);
  }

  nzBlur() {
    this._focused = false;
    this._removeHostClass(`${this._prefixCls}-focused`);
  }

  get _pickerLabelCls(): any {
    return {
      [`${this._prefixCls}-picker-label`]: true
    };
  }

  get _arrowCls(): any {
    return {
      [`${this._prefixCls}-picker-arrow`]       : true,
      [`${this._prefixCls}-picker-arrow-expand`]: this._popupVisible
    };
  }

  get _clearCls(): any {
    return {
      [`${this._prefixCls}-picker-clear`]: true
    };
  }

  get _inputCls(): any {
    return {
      [`${this._prefixCls}-input`]        : 1,
      [`${this._inputPrefixCls}-disabled`]: this.nzDisabled,
      [`${this._inputPrefixCls}-lg`]      : this.nzSize === 'large',
      [`${this._inputPrefixCls}-sm`]      : this.nzSize === 'small',
    };
  }

  get _menuCls(): any {
    return {
      [`${this._prefixCls}-menus`]       : true,
      [`${this._prefixCls}-menus-hidden`]: !this._popupVisible,
      [`${this.nzPopupClassName}`]       : this.nzPopupClassName
    };
  }

  /** 获取菜单中列的样式 */
  get _columnCls(): any {
    return {
      [`${this._prefixCls}-menu`]  : true,
      [`${this.nzColumnClassName}`]: this.nzColumnClassName
    };
  }

  /** 获取列中Option的样式 */
  _getOptionCls(option: CascaderOption, index: number): any {
    return {
      [`${this._prefixCls}-menu-item`]         : true,
      [`${this._prefixCls}-menu-item-expand`]  : !option.isLeaf,
      [`${this._prefixCls}-menu-item-active`]  : this._isActiveOption(option, index),
      [`${this._prefixCls}-menu-item-disabled`]: option.disabled,
      [`${this._prefixCls}-menu-item-loading`] : option.loading
    };
  }



  _getLabel() {
    return this._displayLabelIsTemplate ? '' : this._displayLabel;
  }

  /** prevent input change event */
  _handlerInputChange(event: Event): void {
    event.stopPropagation();
  }

  /** input blur */
  _handleInputBlur(event: Event): void {
    if (!this.nzShowSearch) {
      return;
    }
    if (this._popupVisible) {
      this.nzFocus();
    } else {
      this.nzBlur();
    }
  }

  /** input focus */
  _handleInputFocus(event: Event): void {
    if (!this.nzShowSearch) {
      return;
    }
    this.nzFocus();
  }

  /** input key down */
  _handleInputKeyDown(event: KeyboardEvent): void {

  }

  _setInputValue(inputValue: any, fireSearch = true): void {
    if (inputValue !== this._inputValue) {
      this._inputValue = inputValue;
    }
  }


  _hasInput(): boolean {
    return this._inputValue.length > 0;
  }

  _hasSelection(): boolean {
    return this._selectedOptions.length > 0;
  }

  /** Whether the clear button is visible */
  get _showClearIcon(): boolean {
    const isSelected = this._hasSelection();
    const isHasInput = this._hasInput();
    return this.nzAllowClear && !this.nzDisabled && (isSelected || isHasInput);
  }

  /** clear the input box and selected options */
  _clearSelection(event: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this._displayLabel = '';
    this._displayLabelIsTemplate = false;
    this._selectedOptions = [];
    this._activatedOptions = [];
    this._setInputValue('', false);
    this.setPopupVisible(false);

    // trigger change event
    this._onValueChange();
  }

  get _displayRender(): (label: string[], selectedOptions: CascaderOption[]) => string | TemplateRef<any> {
    return this.nzDisplayRender || defaultDisplayRender;
  }

  _buildDisplayLabel(): void {
    const selectedOptions = this._selectedOptions;
    const labels = selectedOptions.map(o => o[this.nzLabelProperty || 'label']);
    // 设置当前控件的显示值
    this._displayLabel = this._displayRender.call(this, labels, selectedOptions);
    this._displayLabelIsTemplate = !(typeof this._displayLabel === 'string');
    this._displayLabelContext = {labels, selectedOptions};
  }

  /** 由用户来定义点击后是否变更 */
  _isChangeOn(option: CascaderOption, index: number): boolean {
    if (typeof this.nzChangeOn === 'function') {
      return this.nzChangeOn(option, index) === true;
    }
    return false;
  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode !== DOWN_ARROW &&
      keyCode !== UP_ARROW &&
      keyCode !== LEFT_ARROW &&
      keyCode !== RIGHT_ARROW &&
      keyCode !== ENTER &&
      keyCode !== BACKSPACE &&
      keyCode !== ESC) {
      return;
    }

    // Press any keys above to reopen menu
    if (!this._isPopupVisible() &&
      keyCode !== BACKSPACE &&
      keyCode !== ESC) {
      this.setPopupVisible(true);
      return;
    }
    // Press ESC to close menu
    if (keyCode === ESC) {
      this.setPopupVisible(false);
      return;
    }

    if (this._isPopupVisible()) {
      event.preventDefault();
      if (keyCode === DOWN_ARROW) {
        this._moveDown();
      }
      if (keyCode === UP_ARROW) {
        this._moveUp();
      }
      if (keyCode === LEFT_ARROW) {
        this._moveLeft();
      }
      if (keyCode === RIGHT_ARROW) {
        this._moveRight();
      }
    }
  }


  @HostListener('click', ['$event'])
  _onTriggerClick(event: MouseEvent): void {
    if (this.nzDisabled) {
      return;
    }
    this.onTouched(); // set your control to 'touched'

    if (this._isClickTiggerAction()) {
      this._delaySetPopupVisible(!this._popupVisible, 100);
    }
  }

  @HostListener('mouseenter', ['$event'])
  _onTriggerMouseEnter(event: MouseEvent): void {
    if (this.nzDisabled) {
      return;
    }
    if (this._isPointerTiggerAction()) {
      this._delaySetPopupVisible(true, this.nzMouseEnterDelay);
    }
  }

  @HostListener('mouseleave', ['$event'])
  _onTriggerMouseLeave(event: MouseEvent): void {
      if (this.nzDisabled) {
        return;
      }
      if (!this._isPopupVisible()) {
        return;
      }
      if (this._isPointerTiggerAction()) {
        const currEl = this._el;
        const popupEl = this.menu && this.menu.nativeElement as HTMLElement;
        if (currEl.contains(event.target as Node) ||
           (popupEl && popupEl.contains(event.target as Node))) {
          return; // 还在菜单内部
        }
        this._delaySetPopupVisible(false, this.nzMouseLeaveDelay);
      }
  }

  _isClickTiggerAction() {
    if (typeof this.nzTriggerAction === 'string') {
      return this.nzTriggerAction === 'click';
    }
    return this.nzTriggerAction.indexOf('click') !== -1;
  }

  _isPointerTiggerAction() {
    if (typeof this.nzTriggerAction === 'string') {
      return this.nzTriggerAction === 'hover';
    }
    return this.nzTriggerAction.indexOf('hover') !== -1;
  }

  _closeMenu(): void {
    this._clearDelayTimer();
    this.setPopupVisible(false);
  }

  /**
   * 显示或者隐藏菜单
   *
   * @param visible true-显示，false-隐藏
   * @param delay 延迟时间
   */
  _delaySetPopupVisible(visible: boolean, delay: number): void {
    this._clearDelayTimer();
    if (delay) {
      this._delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this._clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  }

  _isPopupVisible(): boolean {
    return this._popupVisible;
  }

  setPopupVisible(popupVisible: boolean): void {
    if (this.nzDisabled) {
      return;
    }

    if (this._popupVisible !== popupVisible) {
      this._popupVisible = popupVisible;

      // We must listen to `mousedown` or `touchstart`, edge case:
      // https://github.com/ant-design/ant-design/issues/5804
      // https://github.com/react-component/calendar/issues/250
      // https://github.com/react-component/trigger/issues/50
      if (popupVisible) {
        if (!this._clickOutsideHandler) {
          this._clickOutsideHandler = this._render.listen('document', 'mousedown', this._onDocumentClick.bind(this));
        }
        // always hide on mobile
        if (!this._touchOutsideHandler) {
          this._touchOutsideHandler = this._render.listen('document', 'touchstart', this._onDocumentClick.bind(this));
        }
      }
      if (!popupVisible) {
        this._clearOutsideHandler();
      }

      if (popupVisible) {
        this._beforeVisible();
      }
      this.nzVisibleChange.emit(popupVisible);
    }
  }

  /** load init data if necessary */
  _beforeVisible(): void {
    if (!this._nzColumns.length) {
      new Promise((resolve, reject) => {
        this.nzLoad.emit({
          option: null,
          index: -1,
          resolve,
          reject
        });
      }).then((children: CascaderOption[]) => {
        this._setColumnData(children, 0);
      }, (reason: any) => {
        // should not be here
      });
    }
  }

  _onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    const popupEl = this.menu && this.menu.nativeElement as HTMLElement;
    if (!this._el.contains(target) && !popupEl.contains(target)) {
      this.setPopupVisible(false);
    }
  }

  _clearOutsideHandler(): void {
    if (this._clickOutsideHandler) {
      this._clickOutsideHandler(); // Removes "listen" listener
      this._clickOutsideHandler = null;
    }

    if (this._touchOutsideHandler) {
      this._touchOutsideHandler(); // Removes "listen" listener
      this._touchOutsideHandler = null;
    }
  }

  _clearDelayTimer(): void {
    if (this._delayTimer) {
      clearTimeout(this._delayTimer);
      this._delayTimer = null;
    }
  }

  /** 获取Option的值，例如，可以指定labelProperty="name"来取Name */
  _getOptionLabel(option: CascaderOption): any {
    return option[this.nzLabelProperty || 'label'];
  }

  /** 获取Option的值，例如，可以指定valueProperty="id"来取ID */
  _getOptionValue(option: CascaderOption): any {
    return option[this.nzValueProperty || 'value'];
  }

  _isActiveOption(option: CascaderOption, index: number): boolean {
    const activeOpt = this._activatedOptions[index];
    if (activeOpt === option) {
      return true;
    }
    if (activeOpt && this._getOptionValue(activeOpt) === this._getOptionValue(option)) {
      return true;
    }
    return false;
  }

  /**
   * 设置某列的激活的菜单选项
   *
   * @param option 菜单选项
   * @param index  选项所在的列组的索引
   */
  _setActiveOption(option: CascaderOption, index: number): void {
    if (!option || option.disabled) {
      return;
    }

    this._activatedOptions[index] = option;

    // 当直接选择最后一级时，前面的选项要补全。例如，选择“城市”，则自动补全“国家”、“省份”
    for (let i = index - 1; i >= 0; i--) {
      if (!this._activatedOptions[i]) {
        this._activatedOptions[i] = this._activatedOptions[i + 1].parent;
      }
    }
    // 截断多余的选项，如选择“省份”，则只会有“国家”、“省份”，去掉“城市”、“区县”
    if (index < this._activatedOptions.length - 1) {
      this._activatedOptions = this._activatedOptions.slice(0, index + 1);
    }

    // trigger select event, and display label
    this._onSelectOption(option, index);
  }

  _onSelectOption(option: CascaderOption, index: number): void {
    // trigger `nzSelect` event
    this.nzSelect.emit({
      option: option,
      index: index
    });

    // load children directly
    if (option.children && option.children.length) {
      option.isLeaf = false;
      option.children.forEach(child => child.parent = option);
      this._setColumnData(option.children, index + 1);
    } else if (!option.isLeaf) {
      // load children async
      new Promise((resolve, reject) => {
        this.nzLoad.emit({
          option: option,
          index: index,
          resolve,
          reject
        });
      }).then((children: CascaderOption[]) => {
        children.forEach(child => child.parent = option);
        this._setColumnData(children, index + 1);
        if (this.nzEnableCache) {
          option.children = children; // next time we load children directly
        }
      }, (reason: any) => {
        option.isLeaf = true;
      });
    }

    // 生成显示
    if (option.isLeaf || this.nzChangeOnSelect || this._isChangeOn(option, index)) {
      this._selectedOptions = this._activatedOptions;
      // 设置当前控件的显示值
      this._buildDisplayLabel();
      // 触发变更事件
      this._onValueChange();
    }

    // close menu if click on leaf
    if (option.isLeaf) {
      this._delaySetPopupVisible(false, this.nzMouseLeaveDelay);
    }
  }

  _setColumnData(options: CascaderOption[], index: number): void {
    if (!arrayEquals(this._nzColumns[index], options)) {
      this._nzColumns[index] = options;
      if (index < this._nzColumns.length - 1) {
        this._nzColumns = this._nzColumns.slice(0, index + 1);
      }
    }
  }


  /**
   * 鼠标点击选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  _onOptionClick(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();

    // Keep focused state for keyboard support
    this._el.focus();

    if (option && option.disabled) {
      return;
    }
    this._setActiveOption(option, index);
  }

  /**
   * press `up` or `down` arrow to select the sibling option.
   */
  _moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this._activatedOptions.length - 1, 0);
    // 该组中已经被激活的选项
    const activeOption = this._activatedOptions[columnIndex];
    // 该组所有的选项，用于遍历获取下一个被激活的选项
    const options = this._nzColumns[columnIndex];
    if (!options || !options.length) {
      return;
    }

    const length = options.length;
    let nextOptIndex = -1;
    if (!activeOption) { // 该列还没有选中的选项
      nextOptIndex = isUp ? length : -1;
    } else {
      nextOptIndex = options.indexOf(activeOption);
    }

    while (true) {
      nextOptIndex = isUp ? nextOptIndex - 1 : nextOptIndex + 1;
      if (nextOptIndex < 0 || nextOptIndex >= length) {
        break;
      }
      const nextOption = options[nextOptIndex];
      if (!nextOption || nextOption.disabled) {
        continue;
      }
      this._setActiveOption(nextOption, columnIndex);
      break;
    }
  }

  _moveUp(): void {
    this._moveUpOrDown(true);
  }
  _moveDown(): void {
    this._moveUpOrDown(false);
  }

  /**
   * press `left` arrow to remove the last selected option.
   * If there is no option selected, emit `nzClear` event.
   */
  _moveLeft(): void {
    const options = this._selectedOptions;
    if (options.length) {
      options.pop(); // Remove the last one
      const len = options.length;
      if (len) {
        this._setActiveOption(options[len - 1],  len - 1);
      } else {
        this.nzClear.emit();
      }
    }
  }

  /**
   * press `right` arrow to select the next column option.
   */
  _moveRight(): void {
    const columns = this._nzColumns;
    const length = this._selectedOptions.length;
    if (length === 0) {
      return;
    }

    const nextColIndex = length;
    const options = columns.length > nextColIndex ? columns[nextColIndex] : null;
    if (options) { // 存在`下级选项`
      const len = options.length;
      for (let i = 0; i < len; i++) {
        const activeOpt = options[i];
        if (activeOpt && !activeOpt.disabled) {
          this._setActiveOption(activeOpt, nextColIndex);
          return;
        }
      }
    }
  }



  /**
   * 鼠标划入选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  _onOptionMouseEnter(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
      this._delaySelect(option, index, true);
    }
  }

  /**
   * 鼠标划出选项
   *
   * @param option 菜单选项
   * @param index 选项所在的列组的索引
   * @param event 鼠标事件
   */
  _onOptionMouseLeave(option: CascaderOption, index: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
      this._delaySelect(option, index, false);
    }
  }

  _delaySelect(option: CascaderOption, index: number, doSelect: boolean) {
    if (this._delayTimer) {
      clearTimeout(this._delayTimer);
      this._delayTimer = null;
    }
    if (doSelect) {
      this._delayTimer = setTimeout(() => {
        this._setActiveOption(option, index);
        this._delayTimer = null;
      }, 150);
    }
  }



  _getSubmitValue(): any[] {
    const values: any[] = [];
    this._selectedOptions.forEach(option => {
      values.push(this._getOptionValue(option));
    });
    return values;
  }

  _onValueChange(): void {
    const value = this._getSubmitValue();
    if (!arrayEquals(this._lastValue, value)) {
      this._lastValue = value;
      this.onChange(value); // Angular need this
      if (value.length === 0) {
        this.nzClear.emit(); // first trigger `clear` and then `change`
      }
      this.nzSelectionChange.emit(this._selectedOptions);
      this.nzChange.emit(value);
    }
  }




  constructor(
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _cdr: ChangeDetectorRef) {
    this._el = this._elementRef.nativeElement;

  }

  _addHostClass(classname: string): void {
    this._render.addClass(this._el, classname);
  }

  _removeHostClass(classname: string): void {
    this._render.removeClass(this._el, classname);
  }

  /**
   * Write a new value to the element.
   *
   * @Override (From ControlValueAccessor interface)
   */
  writeValue(value: any): void {
    if (value == null) {
      return;
    }

    const array: any[] = [];
    toArray(value).forEach((v: any, index: number) => {
      if (typeof v !== 'object') {
        const obj = {};
        obj[this.nzValueProperty] = v;
        obj[this.nzLabelProperty] = v;
        array[index] = obj;
      } else {
        array[index] = v;
      }
    });
    this._activatedOptions = array;
    this._selectedOptions = array;
    this._buildDisplayLabel();
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this._closeMenu();
      this._addHostClass(`${this._prefixCls}-picker-disabled`);
    } else {
      this._removeHostClass(`${this._prefixCls}-picker-disabled`);
    }
    this.nzDisabled = isDisabled;
  }

  ngOnInit() {
    // 设置第一列
    if (this.nzOptions && this.nzOptions.length) {
      this._nzColumns.push(this.nzOptions);
    }
  }

  ngOnDestroy(): void {
    if (this._delayTimer) {
      clearTimeout(this._delayTimer);
      this._delayTimer = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nzDisabled = changes['nzDisabled'];
    if (nzDisabled) {
      if (nzDisabled.currentValue) {
        this._addHostClass(`${this._prefixCls}-picker-disabled`);
      } else {
        this._removeHostClass(`${this._prefixCls}-picker-disabled`);
      }
    }

    const nzOptions = changes['nzOptions'];
    if (nzOptions && !nzOptions.isFirstChange()) {
      this._nzColumns.splice(0);
      const newOptions: CascaderOption[] = nzOptions.currentValue;
      if (newOptions && newOptions.length) {
        this._nzColumns.push(newOptions);
        this._clearSelection(null);
      }
    }
  }

  ngAfterViewInit(): void {
    this._addHostClass(this._prefixCls);
    this._addHostClass(`${this._prefixCls}-picker`);
  }
}
