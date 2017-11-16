/**
 * complex but work well
 * TODO: rebuild latter
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  AfterContentInit,
  AfterContentChecked,
  HostListener,
  EventEmitter,
  ElementRef,
  Renderer2,
  ViewChild,
  forwardRef,
  Inject,
} from '@angular/core';
import { DOWN_ARROW, ENTER, TAB } from '@angular/cdk/keycodes';
import { NzOptionComponent } from './nz-option.component';
import { NzOptionPipe } from './nz-option.pipe';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { TagAnimation } from '../core/animation/tag-animations';
import { NzLocaleService } from '../locale/index';

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
    DropDownAnimation,
    TagAnimation
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
        <div class="ant-select-selection-selected-value">
          {{_selectedOption?.nzLabel}}
        </div>
      </div>
      <div class="ant-select-selection__rendered" *ngIf="nzShowSearch">
        <div
          [hidden]="_searchText||(!nzOpen&&_selectedOption)||_selectedOptions.size"
          class="ant-select-selection__placeholder">
          <ng-template [ngIf]="(!_composing)&&_selectedOption">
            {{_selectedOption.nzLabel}}
          </ng-template>
          <ng-template [ngIf]="(!_composing)&&(!_selectedOption)">
            {{nzPlaceHolder}}
          </ng-template>
        </div>
        <ul *ngIf="nzMultiple">
          <li
            *ngFor="let option of _selectedOptions"
            [@tagAnimation] [attr.title]="option?.nzValue"
            class="ant-select-selection__choice" style="-webkit-user-select: none;">
            <div class="ant-select-selection__choice__content">{{option?.nzLabel}}</div><!----><span class="ant-select-selection__choice__remove" (click)="unSelectMultipleOption(option,$event)"></span>
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
          {{_selectedOption?.nzLabel}}
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
          <ul class="ant-select-dropdown-menu ant-select-dropdown-menu-vertical ant-select-dropdown-menu-root" #dropdownUl>
            <li
              *ngFor="let option of _filterOptions"
              [class.ant-select-dropdown-menu-item-disabled]="option.nzDisabled"
              [class.ant-select-dropdown-menu-item-active]="option.nzValue == _activeFilterOption?.nzValue"
              [class.ant-select-dropdown-menu-item-selected]="(option.nzValue==(_selectedOption?.nzValue))||(isInSet(_selectedOptions,option))"
              class="ant-select-dropdown-menu-item"
              (click)="clickOption(option,$event)">
              {{option.nzLabel}}
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
  _el: HTMLElement;
  _prefixCls = 'ant-select';
  _classList: Array<string> = [];
  _dropDownClassMap;
  _dropDownPrefixCls = `${this._prefixCls}-dropdown`;
  _selectionClassMap;
  _selectionPrefixCls = `${this._prefixCls}-selection`;
  _size: string;
  _value: Array<string> | string;
  _placeholder = 'Placeholder';
  _notFoundContent = this._locale.translate('Select.notFoundContent');
  _isOpen = false;
  _disabled = false;
  _showSearch = false;
  _isTags = false;
  _searchText = '';
  _triggerWidth = 0;
  _selectedOption: NzOptionComponent;
  _operatingMultipleOption: NzOptionComponent;
  _selectedOptions: Set<NzOptionComponent> = new Set();
  _options: Array<NzOptionComponent> = [];
  _cacheOptions: Array<NzOptionComponent> = [];
  _filterOptions: Array<NzOptionComponent> = [];
  _tagsOptions: Array<NzOptionComponent> = [];
  _activeFilterOption: NzOptionComponent;
  _isMultiInit = false;
  _dropDownPosition: 'top' | 'bottom' = 'bottom';
  _isMultiple = false;
  _composing = false;
  _mode;
  _keepUnListOptions = false;
  _allowClear = false;
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @ViewChild('searchInput') searchInputElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @Output() nzSearchChange: EventEmitter<any> = new EventEmitter();
  @Output() nzOpenChange: EventEmitter<any> = new EventEmitter();
  @Input() nzFilter = true;
  @Input() nzMaxMultiple = Infinity;

  @Input()
  set nzAllowClear(value: boolean | string) {
    if (value === '') {
      this._allowClear = true;
    } else {
      this._allowClear = value as boolean;
    }
  }

  get nzAllowClear() {
    return this._allowClear;
  }

  @Input()
  set nzKeepUnListOptions(value: boolean | string) {
    if (value === '') {
      this._keepUnListOptions = true;
    } else {
      this._keepUnListOptions = value as boolean;
    }
  }

  get nzKeepUnListOptions() {
    return this._keepUnListOptions;
  }

  @Input()
  set nzMode(value) {
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
  set nzMultiple(value) {
    this._isMultiple = value;
    if (this._isMultiple) {
      this.nzShowSearch = true;
    }
  }

  get nzMultiple() {
    return this._isMultiple;
  }

  @Input()
  get nzPlaceHolder(): string {
    return this._placeholder;
  };

  set nzPlaceHolder(value: string) {
    this._placeholder = value;
  }

  @Input()
  get nzNotFoundContent(): string {
    return this._notFoundContent;
  };

  set nzNotFoundContent(value: string) {
    this._notFoundContent = value;
  }

  @Input()
  get nzSize(): string {
    return this._size;
  };

  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
    this.setClassMap();
  }

  @Input()
  get nzShowSearch(): boolean {
    return this._showSearch;
  };

  set nzShowSearch(value: boolean) {
    this._showSearch = value;
  }


  @Input()
  get nzTags(): boolean {
    return this._isTags;
  };

  set nzTags(value: boolean) {
    this._isTags = value;
    this.nzMultiple = value;
  }

  @Input()
  get nzDisabled(): boolean {
    return this._disabled;
  };

  set nzDisabled(value: boolean) {
    this._disabled = value;
    this.closeDropDown();
    this.setClassMap();
  }

  @Input()
  get nzOpen(): boolean {
    return this._isOpen;
  };

  set nzOpen(value: boolean) {
    if (this._isOpen === value) {
      return;
    }
    if (value === true) {
      this.scrollToActive();
      if (!this._triggerWidth) {
        this._setTriggerWidth();
      }
    }
    this._isOpen = value;
    this.nzOpenChange.emit(this._isOpen);
    this.setClassMap();
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
  removeOption(option) {
    this._options.splice(this._options.indexOf(option), 1);
    if (!this._isTags) {
      this.forceUpdateSelectedOption(this._value);
    }
  }

  /** dropdown position changed */
  onPositionChange(position) {
    this._dropDownPosition = position.connectionPair.originY;
  }

  compositionStart() {
    this._composing = true;
  }

  compositionEnd() {
    this._composing = false;
  }

  /** clear single selected option */
  clearSelect($event?) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this._selectedOption = null;
    this.nzValue = null;
    this.onChange(null);
  }

  /** click dropdown option by user */
  clickOption(option, $event?) {
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
  chooseOption(option, isUserClick = false, $event?) {
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

  updateWidth(element, text) {
    if (text) {
      /** wait for scroll width change */
      setTimeout(_ => {
        this._renderer.setStyle(element, 'width', `${element.scrollWidth}px`);
      })
    } else {
      this._renderer.removeStyle(element, 'width');
    }
  }

  /** determine if option in set */
  isInSet(set, option) {
    return ((Array.from(set) as Array<NzOptionComponent>).find((data: NzOptionComponent) => data.nzValue === option.nzValue))
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
  selectMultipleOption(option, $event?) {
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
  emitMultipleOptions() {
    if (this._isMultiInit) {
      return;
    }
    const arrayOptions = <any>Array.from(this._selectedOptions);
    this.onChange(arrayOptions.map(item => item.nzValue));
  }

  /** update selected option when add remove option etc */
  updateSelectedOption(currentModelValue, triggerByNgModel = false) {
    if (currentModelValue == null) {
      return;
    }
    if (this.nzMultiple) {
      const selectedOptions = this._options.filter((item) => {
        return (item != null) && (currentModelValue.indexOf(item.nzValue) !== -1);
      });
      if ((this.nzKeepUnListOptions || this.nzTags) && (!triggerByNgModel)) {
        selectedOptions.forEach(option => {
          if (!this._selectedOptions.has(option)) {
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

  forceUpdateSelectedOption(value) {
    /** trigger dirty check */
    setTimeout(_ => {
      this.updateSelectedOption(value);
    })
  }

  get nzValue(): string | Array<string> {
    return this._value;
  };

  set nzValue(value: Array<string> | string) {
    this._updateValue(value);
  }

  clearAllSelectedOption(emitChange = true) {
    this._selectedOptions.forEach(item => {
      this.unSelectMultipleOption(item, null, emitChange);
    });
  }

  handleKeyEnterEvent(event) {
      /** when composing end */
    if (!this._composing && this._isOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.updateFilterOption(false);
      this.clickOption(this._activeFilterOption);
    }
  }

  handleKeyBackspaceEvent(event) {
    if ((!this._searchText) && (!this._composing) && (this._isMultiple)) {
      event.preventDefault();
      const lastOption = Array.from(this._selectedOptions).pop();
      this.unSelectMultipleOption(lastOption);
    }
  }

  handleKeyDownEvent($event: MouseEvent) {
    if (this._isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this._activeFilterOption = this.nextOption(this._activeFilterOption, this._filterOptions);
      this.scrollToActive();
    }
  }

  handleKeyUpEvent($event: MouseEvent) {
    if (this._isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this._activeFilterOption = this.preOption(this._activeFilterOption, this._filterOptions);
      this.scrollToActive();
    }
  }

  preOption(option, options) {
    return options[ options.indexOf(option) - 1 ] || options[ options.length - 1 ];
  }

  nextOption(option, options) {
    return options[ options.indexOf(option) + 1 ] || options[ 0 ];
  }

  clearSearchText() {
    this._searchText = '';
    this.updateFilterOption();
  }

  updateFilterOption(updateActiveFilter = true) {
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

  onSearchChange(searchValue) {
    this.nzSearchChange.emit(searchValue);
  }


  @HostListener('click', [ '$event' ])
  onClick(e) {
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
  onKeyDown(e) {
    const keyCode = e.keyCode;
    if (keyCode === TAB && this.nzOpen) {
      this.nzOpen = false;
      return;
    }
    if ( (keyCode !== DOWN_ARROW && keyCode !== ENTER) || this.nzOpen) {
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

  closeDropDown() {
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
    })
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
    })
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
          const scrollPane: any = this.dropdownUl.nativeElement.children[ index ];
          scrollPane.scrollIntoViewIfNeeded(false);
        } catch (e) {
        }
      }
    });
  }

  flushComponentState() {
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
  }

  _getTriggerRect(): ClientRect {
    return this.trigger.nativeElement.getBoundingClientRect();
  }

  writeValue(value: any): void {
    this._updateValue(value, false);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _locale: NzLocaleService) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit() {
    if (this._value != null) {
      this.flushComponentState();
    }
  }

  ngOnInit() {
    this.updateFilterOption();
    this.setClassMap();
    this.setDropDownClassMap();
  }

  ngAfterContentChecked() {
    if (this._cacheOptions !== this._options) {
      /** update filter option after every content check cycle */
      this.updateFilterOption();
      this._cacheOptions = this._options;
    } else {
      this.updateFilterOption(false);
    }
  }

  private _updateValue(value: string[] | string, emitChange = true) {
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
