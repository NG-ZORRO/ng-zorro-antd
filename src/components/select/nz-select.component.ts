/**
 * complex but work well
 * TODO: rebuild latter
 */
import { DOWN_ARROW, ENTER, TAB } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  forwardRef,
  AfterContentChecked,
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { tagAnimation } from '../core/animation/tag-animations';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';
import { NzOptionComponent } from './nz-option.component';
import { NzOptionPipe } from './nz-option.pipe';

@Component({
  selector     : 'nz-select',
  encapsulation: ViewEncapsulation.None,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSelectComponent),
      multi      : true
    }
  ],
  animations   : [
    dropDownAnimation,
    tagAnimation
  ],
  template     : `
    <div
      tabindex="0"
      #trigger
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [ngClass]="_selectionClassMap"
      (keydown.Enter)="handleKeyEnterEvent($event)"
      (keydown.Backspace)="handleKeyBackspaceEvent($event)"
      (keydown.ArrowUp)="handleKeyUpEvent($event)"
      (keydown.ArrowDown)="handleKeyDownEvent($event)">
      <div class="ant-select-selection__rendered" *ngIf="!nzShowSearch">
        <div class="ant-select-selection__placeholder">
          <ng-template [ngIf]="!_selectedOption">
            {{ nzPlaceHolder }}
          </ng-template>
        </div>
        <div class="ant-select-selection-selected-value">
          {{ _selectedOption?.nzLabel }}
        </div>
      </div>
      <div class="ant-select-selection__rendered" *ngIf="nzShowSearch">
        <div
          [hidden]="_searchText||(!nzOpen&&_selectedOption)||_selectedOptions.size"
          class="ant-select-selection__placeholder">
          <ng-template [ngIf]="(!_composing)&&_selectedOption">
            {{ _selectedOption.nzLabel }}
          </ng-template>
          <ng-template [ngIf]="(!_composing)&&(!_selectedOption)">
            {{ nzPlaceHolder }}
          </ng-template>
        </div>
        <ul *ngIf="nzMultiple">
          <li
            *ngFor="let option of _selectedOptions"
            [@tagAnimation] [attr.title]="option?.nzValue"
            class="ant-select-selection__choice" style="-webkit-user-select: none;">
            <div class="ant-select-selection__choice__content">{{ option?.nzLabel }}</div><!----><span class="ant-select-selection__choice__remove" (click)="unSelectMultipleOption(option,$event)"></span>
          </li>
          <li class="ant-select-search ant-select-search--inline">
            <div class="ant-select-search__field__wrap">
              <input
                class="ant-select-search__field"
                (compositionstart)="compositionStart()"
                (compositionend)="compositionEnd();updateWidth(searchInput,_searchText);"
                [(ngModel)]="_searchText"
                (ngModelChange)="updateFilterOption();onSearchChange($event);"
                (keydown)="updateWidth(searchInput,_searchText)"
                (input)="updateWidth(searchInput,_searchText)"
                (blur)="onTouched()"
                #searchInput>
              <span class="ant-select-search__field__mirror"></span></div>
          </li>
        </ul>
        <div
          *ngIf="!nzMultiple"
          class="ant-select-selection-selected-value"
          [hidden]="!(_selectedOption?.nzLabel)||nzOpen">
          {{ _selectedOption?.nzLabel }}
        </div>
        <div *ngIf="!nzMultiple" [hidden]="!nzOpen" class="ant-select-search ant-select-search--inline">
          <div class="ant-select-search__field__wrap">
            <input
              class="ant-select-search__field"
              (blur)="onTouched()"
              (compositionstart)="compositionStart()"
              (compositionend)="compositionEnd()"
              [(ngModel)]="_searchText"
              (ngModelChange)="updateFilterOption();onSearchChange($event);"
              #searchInput>
            <span class="ant-select-search__field__mirror"></span>
          </div>
        </div>
      </div>
      <span
        (click)="onTouched();clearSelect($event)"
        class="ant-select-selection__clear"
        style="-webkit-user-select: none;"
        *ngIf="_selectedOption?.nzLabel&&nzAllowClear&&!nzMultiple">
      </span>
      <span class="ant-select-arrow"><b></b></span></div>
    <ng-template
      cdkConnectedOverlay
      cdkConnectedOverlayHasBackdrop
      [cdkConnectedOverlayOrigin]="origin"
      (backdropClick)="closeDropDown()"
      (detach)="closeDropDown();"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayWidth]="_triggerWidth"
      [cdkConnectedOverlayOpen]="_isOpen"
    >
      <div
        [ngClass]="_dropDownClassMap" [@dropDownAnimation]="_dropDownPosition">
        <div style="overflow: auto;">
          <ul class="ant-select-dropdown-menu ant-select-dropdown-menu-vertical ant-select-dropdown-menu-root" #dropdownUl (scroll)="dropDownScroll(dropdownUl)">
            <li
              *ngFor="let option of _filterOptions"
              [class.ant-select-dropdown-menu-item-disabled]="option.nzDisabled"
              [class.ant-select-dropdown-menu-item-active]="option.nzValue == _activeFilterOption?.nzValue"
              [class.ant-select-dropdown-menu-item-selected]="(option.nzValue==(_selectedOption?.nzValue))||(isInSet(_selectedOptions,option))"
              class="ant-select-dropdown-menu-item"
              (click)="clickOption(option,$event)">
              <ng-template
                *ngIf="option.nzOptionTemplate"
                [ngTemplateOutlet]="option.nzOptionTemplate">
              </ng-template>
              <ng-template [ngIf]="!option.nzOptionTemplate">
                {{ option.nzLabel }}
              </ng-template>
            </li>
          </ul>
        </div>
      </div>
    </ng-template>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzSelectComponent implements OnInit, AfterContentInit, AfterContentChecked, ControlValueAccessor {
  private _allowClear = false;
  private _disabled = false;
  private _isTags = false;
  private _isMultiple = false;
  private _keepUnListOptions = false;
  private _showSearch = false;
  _el: HTMLElement;
  _isOpen = false;
  _prefixCls = 'ant-select';
  _classList: string[] = [];
  _dropDownClassMap;
  _dropDownPrefixCls = `${this._prefixCls}-dropdown`;
  _selectionClassMap;
  _selectionPrefixCls = `${this._prefixCls}-selection`;
  _size: string;
  _value: string[] | string;
  _placeholder = 'placeholder';
  _notFoundContent = this._locale.translate('Select.notFoundContent');
  _searchText = '';
  _triggerWidth = 0;
  _selectedOption: NzOptionComponent;
  _operatingMultipleOption: NzOptionComponent;
  _selectedOptions: Set<NzOptionComponent> = new Set();
  _options: NzOptionComponent[] = [];
  _cacheOptions: NzOptionComponent[] = [];
  _filterOptions: NzOptionComponent[] = [];
  _tagsOptions: NzOptionComponent[] = [];
  _activeFilterOption: NzOptionComponent;
  _isMultiInit = false;
  _dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  _composing = false;
  _mode;
  // ngModel Access
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('searchInput') searchInputElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @Output() nzSearchChange: EventEmitter<string> = new EventEmitter();
  @Output() nzOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() nzScrollToBottom: EventEmitter<boolean> = new EventEmitter();
  @Input() nzFilter = true;
  @Input() nzMaxMultiple = Infinity;
  @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;

  @Input()
  set nzAllowClear(value: boolean) {
    this._allowClear = toBoolean(value);
  }

  get nzAllowClear(): boolean {
    return this._allowClear;
  }

  @Input()
  set nzKeepUnListOptions(value: boolean) {
    this._keepUnListOptions = toBoolean(value);
  }

  get nzKeepUnListOptions(): boolean {
    return this._keepUnListOptions;
  }

  @Input()
  set nzMode(value: string) {
    this._mode = value;
    if (this._mode === 'multiple') {
      this.nzMultiple = true;
    } else if (this._mode === 'tags') {
      this.nzTags = true;
    } else if (this._mode === 'combobox') {
      this.nzShowSearch = true;
    }
  }

  @Input()
  set nzMultiple(value: boolean) {
    this._isMultiple = toBoolean(value);
    if (this._isMultiple) {
      this.nzShowSearch = true;
    }
  }

  get nzMultiple(): boolean {
    return this._isMultiple;
  }

  @Input()
  set nzPlaceHolder(value: string) {
    this._placeholder = value;
  }

  get nzPlaceHolder(): string {
    return this._placeholder;
  }

  @Input()
  set nzNotFoundContent(value: string) {
    this._notFoundContent = value;
  }

  get nzNotFoundContent(): string {
    return this._notFoundContent;
  }

  @Input()
  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
    this.setClassMap();
  }

  get nzSize(): string {
    return this._size;
  }

  @Input()
  set nzShowSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get nzShowSearch(): boolean {
    return this._showSearch;
  }

  @Input()
  set nzTags(value: boolean) {
    const isTags = toBoolean(value);
    this._isTags = isTags;
    this.nzMultiple = isTags;
  }

  get nzTags(): boolean {
    return this._isTags;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.closeDropDown();
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzOpen(value: boolean) {
    const isOpen = toBoolean(value);
    if (this._isOpen === isOpen) {
      return;
    }
    if (isOpen) {
      this.scrollToActive();
      this._setTriggerWidth();
    }
    this._isOpen = isOpen;
    this.nzOpenChange.emit(this._isOpen);
    this.setClassMap();
    if (this._isOpen) {
      setTimeout(() => {
        this.checkDropDownScroll();
      });
    }
  }

  get nzOpen(): boolean {
    return this._isOpen;
  }

  /** new nz-option insert or new tags insert */
  addOption = (option) => {
    this._options.push(option);
    if (!this._isTags) {
      if (option.nzValue) {
        this.updateSelectedOption(this._value);
      } else {
        this.forceUpdateSelectedOption(this._value);
      }
    }
  }

  /** nz-option remove or tags remove */
  removeOption(option: NzOptionComponent): void {
    this._options.splice(this._options.indexOf(option), 1);
    if (!this._isTags) {
      this.forceUpdateSelectedOption(this._value);
    }
  }

  /** dropdown position changed */
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this._dropDownPosition = position.connectionPair.originY;
  }

  compositionStart(): void {
    this._composing = true;
  }

  compositionEnd(): void {
    this._composing = false;
  }

  /** clear single selected option */
  clearSelect($event?: MouseEvent): void {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this._selectedOption = null;
    this.nzValue = null;
    this.onChange(null);
  }

  /** click dropdown option by user */
  clickOption(option: NzOptionComponent, $event?: MouseEvent): void {
    if (!option) {
      return;
    }
    this.chooseOption(option, true, $event);
    this.clearSearchText();
    if (!this._isMultiple) {
      this.nzOpen = false;
    }
  }

  /** choose option */
  chooseOption(option: NzOptionComponent, isUserClick: boolean = false, $event?: MouseEvent): void {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this._activeFilterOption = option;
    if (option && !option.nzDisabled) {
      if (!this.nzMultiple) {
        this._selectedOption = option;
        this._value = option.nzValue;
        if (isUserClick) {
          this.onChange(option.nzValue);
        }
      } else {
        if (isUserClick) {
          this.isInSet(this._selectedOptions, option) ? this.unSelectMultipleOption(option) : this.selectMultipleOption(option);
        }
      }
    }
  }

  updateWidth(element: HTMLInputElement, text: string): void {
    if (text) {
      /** wait for scroll width change */
      setTimeout(_ => {
        this._renderer.setStyle(element, 'width', `${element.scrollWidth}px`);
      });
    } else {
      this._renderer.removeStyle(element, 'width');
    }
  }

  /** determine if option in set */
  isInSet(set: Set<NzOptionComponent>, option: NzOptionComponent): NzOptionComponent {
    return ((Array.from(set) as NzOptionComponent[]).find((data: NzOptionComponent) => data.nzValue === option.nzValue));
  }

  /** cancel select multiple option */
  unSelectMultipleOption = (option, $event?, emitChange = true) => {
    this._operatingMultipleOption = option;
    this._selectedOptions.delete(option);
    if (emitChange) {
      this.emitMultipleOptions();
    }

    // 对Tag进行特殊处理
    if (this._isTags && (this._options.indexOf(option) !== -1) && (this._tagsOptions.indexOf(option) !== -1)) {
      this.removeOption(option);
      this._tagsOptions.splice(this._tagsOptions.indexOf(option), 1);
    }
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  /** select multiple option */
  selectMultipleOption(option: NzOptionComponent, $event?: MouseEvent): void {
    /** if tags do push to tag option */
    if (this._isTags && (this._options.indexOf(option) === -1) && (this._tagsOptions.indexOf(option) === -1)) {
      this.addOption(option);
      this._tagsOptions.push(option);
    }
    this._operatingMultipleOption = option;
    if (this._selectedOptions.size < this.nzMaxMultiple) {
      this._selectedOptions.add(option);
    }
    this.emitMultipleOptions();

    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  /** emit multiple options */
  emitMultipleOptions(): void {
    if (this._isMultiInit) {
      return;
    }
    const arrayOptions = Array.from(this._selectedOptions);
    this._value = arrayOptions.map(item => item.nzValue);
    this.onChange(this._value);
  }

  /** update selected option when add remove option etc */
  updateSelectedOption(currentModelValue: string | string[], triggerByNgModel: boolean = false): void {
    if (currentModelValue == null) {
      return;
    }
    if (this.nzMultiple) {
      const selectedOptions = this._options.filter((item) => {
        return (item != null) && (currentModelValue.indexOf(item.nzValue) !== -1);
      });
      if ((this.nzKeepUnListOptions || this.nzTags) && (!triggerByNgModel)) {
        const _selectedOptions = Array.from(this._selectedOptions);
        selectedOptions.forEach(option => {
          const _exist = _selectedOptions.some(item => item._value === option._value);
          if (!_exist) {
            this._selectedOptions.add(option);
          }
        });
      } else {
        this._selectedOptions = new Set();
        selectedOptions.forEach(option => {
          this._selectedOptions.add(option);
        });
      }

    } else {
      const selectedOption = this._options.filter((item) => {
        return (item != null) && (item.nzValue === currentModelValue);
      });
      this.chooseOption(selectedOption[ 0 ]);
    }
  }

  forceUpdateSelectedOption(value: string | string[]): void {
    /** trigger dirty check */
    setTimeout(_ => {
      this.updateSelectedOption(value);
    });
  }

  get nzValue(): string | string[] {
    return this._value;
  }

  set nzValue(value: string | string[]) {
    this._updateValue(value);
  }

  clearAllSelectedOption(emitChange: boolean = true): void {
    this._selectedOptions.forEach(item => {
      this.unSelectMultipleOption(item, null, emitChange);
    });
  }

  handleKeyEnterEvent(event: KeyboardEvent): void {
    /** when composing end */
    if (!this._composing && this._isOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.updateFilterOption(false);
      this.clickOption(this._activeFilterOption);
    }
  }

  handleKeyBackspaceEvent(event: KeyboardEvent): void {
    if ((!this._searchText) && (!this._composing) && (this._isMultiple)) {
      event.preventDefault();
      const lastOption = Array.from(this._selectedOptions).pop();
      this.unSelectMultipleOption(lastOption);
    }
  }

  handleKeyDownEvent($event: MouseEvent): void {
    if (this._isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this._activeFilterOption = this.nextOption(this._activeFilterOption, this._filterOptions.filter(w => !w.nzDisabled));
      this.scrollToActive();
    }
  }

  handleKeyUpEvent($event: MouseEvent): void {
    if (this._isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this._activeFilterOption = this.preOption(this._activeFilterOption, this._filterOptions.filter(w => !w.nzDisabled));
      this.scrollToActive();
    }
  }

  preOption(option: NzOptionComponent, options: NzOptionComponent[]): NzOptionComponent {
    return options[ options.indexOf(option) - 1 ] || options[ options.length - 1 ];
  }

  nextOption(option: NzOptionComponent, options: NzOptionComponent[]): NzOptionComponent {
    return options[ options.indexOf(option) + 1 ] || options[ 0 ];
  }

  clearSearchText(): void {
    this._searchText = '';
    this.updateFilterOption();
  }

  updateFilterOption(updateActiveFilter: boolean = true): void {
    if (this.nzFilter) {
      this._filterOptions = new NzOptionPipe().transform(this._options, {
        'searchText'     : this._searchText,
        'tags'           : this._isTags,
        'notFoundContent': this._isTags ? this._searchText : this._notFoundContent,
        'disabled'       : !this._isTags,
        'value'          : this._isTags ? this._searchText : 'disabled'
      });
    } else {
      this._filterOptions = this._options;
    }

    /** TODO: cause pre & next key selection not work */
    if (updateActiveFilter && !this._selectedOption) {
      this._activeFilterOption = this._filterOptions[ 0 ];
    }
  }

  onSearchChange(searchValue: string): void {
    this.nzSearchChange.emit(searchValue);
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      this.nzOpen = !this.nzOpen;
      if (this.nzShowSearch) {
        /** wait for search display */
        setTimeout(_ => {
          this.searchInputElementRef.nativeElement.focus();
        });
      }
    }
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    if (keyCode === TAB && this.nzOpen) {
      this.nzOpen = false;
      return;
    }
    if ((keyCode !== DOWN_ARROW && keyCode !== ENTER) || this.nzOpen) {
      return;
    }
    e.preventDefault();
    if (!this._disabled) {
      this.nzOpen = true;
      if (this.nzShowSearch) {
        /** wait for search display */
        setTimeout(_ => {
          this.searchInputElementRef.nativeElement.focus();
        });
      }
    }
  }

  closeDropDown(): void {
    if (!this.nzOpen) {
      return;
    }
    this.onTouched();
    if (this.nzMultiple) {
      this._renderer.removeStyle(this.searchInputElementRef.nativeElement, 'width');
    }
    this.clearSearchText();
    this.nzOpen = false;
  }

  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this._prefixCls,
      (this._mode === 'combobox') && `${this._prefixCls}-combobox`,
      (!this._disabled) && `${this._prefixCls}-enabled`,
      (this._disabled) && `${this._prefixCls}-disabled`,
      this._isOpen && `${this._prefixCls}-open`,
      this._showSearch && `${this._prefixCls}-show-search`,
      this._size && `${this._prefixCls}-${this._size}`
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
    this._selectionClassMap = {
      [this._selectionPrefixCls]               : true,
      [`${this._selectionPrefixCls}--single`]  : !this.nzMultiple,
      [`${this._selectionPrefixCls}--multiple`]: this.nzMultiple
    };
  }

  setDropDownClassMap(): void {
    this._dropDownClassMap = {
      [this._dropDownPrefixCls]                          : true,
      ['component-select']                               : this._mode === 'combobox',
      [`${this._dropDownPrefixCls}--single`]             : !this.nzMultiple,
      [`${this._dropDownPrefixCls}--multiple`]           : this.nzMultiple,
      [`${this._dropDownPrefixCls}-placement-bottomLeft`]: this._dropDownPosition === 'bottom',
      [`${this._dropDownPrefixCls}-placement-topLeft`]   : this._dropDownPosition === 'top'
    };
  }

  scrollToActive(): void {
    /** wait for dropdown display */
    setTimeout(_ => {
      if (this._activeFilterOption && this._activeFilterOption.nzValue) {
        const index = this._filterOptions.findIndex(option => option.nzValue === this._activeFilterOption.nzValue);
        try {
          const scrollPane = this.dropdownUl.nativeElement.children[ index ] as HTMLLIElement;
          // TODO: scrollIntoViewIfNeeded is not a standard API, why doing so?
          /* tslint:disable-next-line:no-any */
          (scrollPane as any).scrollIntoViewIfNeeded(false);
        } catch (e) {
        }
      }
    });
  }

  flushComponentState(): void {
    this.updateFilterOption();
    if (!this.nzMultiple) {
      this.updateSelectedOption(this._value);
    } else {
      if (this._value) {
        this.updateSelectedOption(this._value);
      }
    }
  }

  _setTriggerWidth(): void {
    this._triggerWidth = this._getTriggerRect().width;
    /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
    if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
      this._cdkOverlay.overlayRef.updateSize({
        width: this._triggerWidth
      });
    }
  }

  _getTriggerRect(): ClientRect {
    return this.trigger.nativeElement.getBoundingClientRect();
  }

  writeValue(value: string | string[]): void {
    this._updateValue(value, false);
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  dropDownScroll(ul: HTMLUListElement): void {
    if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
      this.nzScrollToBottom.emit(true);
    }
  }

  checkDropDownScroll(): void {
    if (this.dropdownUl && (this.dropdownUl.nativeElement.scrollHeight === this.dropdownUl.nativeElement.clientHeight)) {
      this.nzScrollToBottom.emit(true);
    }
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _locale: NzLocaleService) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    if (this._value != null) {
      this.flushComponentState();
    }
  }

  ngOnInit(): void {
    this.updateFilterOption();
    this.setClassMap();
    this.setDropDownClassMap();
  }

  ngAfterContentChecked(): void {
    if (this._cacheOptions !== this._options) {
      /** update filter option after every content check cycle */
      this.updateFilterOption();
      this._cacheOptions = this._options;
    } else {
      this.updateFilterOption(false);
    }
  }

  private _updateValue(value: string[] | string, emitChange: boolean = true): void {
    if (this._value === value) {
      return;
    }
    if ((value == null) && this.nzMultiple) {
      this._value = [];
    } else {
      this._value = value;
    }
    if (!this.nzMultiple) {
      if (value == null) {
        this._selectedOption = null;
      } else {
        this.updateSelectedOption(value);
      }
    } else {
      if (value) {
        if (value.length === 0) {
          this.clearAllSelectedOption(emitChange);
        } else {
          this.updateSelectedOption(value, true);
        }
      } else if (value == null) {
        this.clearAllSelectedOption(emitChange);
      }
    }
  }
}
