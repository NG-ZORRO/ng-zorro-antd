import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { slideMotion } from '../core/animation/slide';
import { ClassMap } from '../core/interface/interface';
import { EXPANDED_DROPDOWN_POSITIONS } from '../core/overlay/overlay-position-map';
import { arrayEquals, toArray } from '../core/util/array';
import { InputBoolean } from '../core/util/convert';

import { CascaderOption, CascaderSearchOption, NzCascaderExpandTrigger, NzCascaderSize, NzCascaderTriggerType, NzShowSearchOptions } from './types';

const defaultDisplayRender = label => label.join(' / ');

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-cascader,[nz-cascader]',
  preserveWhitespaces: false,
  templateUrl        : './nz-cascader.component.html',
  animations         : [ slideMotion ],
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCascaderComponent),
      multi      : true
    }
  ],
  host               : {
    '[attr.tabIndex]'                       : '"0"',
    '[class.ant-cascader]'                  : 'true',
    '[class.ant-cascader-picker]'           : 'true',
    '[class.ant-cascader-lg]'               : 'nzSize === "large"',
    '[class.ant-cascader-sm]'               : 'nzSize === "small"',
    '[class.ant-cascader-picker-disabled]'  : 'nzDisabled',
    '[class.ant-cascader-picker-open]'      : 'menuVisible',
    '[class.ant-cascader-picker-with-value]': '!!inputValue',
    '[class.ant-cascader-focused]'          : 'isFocused'
  },
  styles             : [ `
    .ant-cascader-menus {
      margin-top: 4px;
      margin-bottom: 4px;
      top: 100%;
      left: 0;
      position: relative;
      width: 100%;
    }
  ` ]
})
export class NzCascaderComponent implements OnDestroy, ControlValueAccessor {
  @ViewChild('input') input: ElementRef;
  @ViewChild('menu') menu: ElementRef;

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
  @Input() nzNotFoundContent: string;
  @Input() nzSize: NzCascaderSize = 'default';
  @Input() nzShowSearch: boolean | NzShowSearchOptions;
  @Input() nzPlaceHolder = 'Please select';
  @Input() nzMenuClassName: string;
  @Input() nzMenuStyle: { [ key: string ]: string; };
  @Input() nzMouseEnterDelay: number = 150; // ms
  @Input() nzMouseLeaveDelay: number = 150; // ms
  @Input() nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = [ 'click' ] as NzCascaderTriggerType[];
  @Input() nzChangeOn: (option: CascaderOption, level: number) => boolean;

  // tslint:disable-next-line:no-any
  @Input() nzLoadData: (node: CascaderOption, index?: number) => PromiseLike<any>;

  @Input()
  get nzOptions(): CascaderOption[] { return this.columns[ 0 ]; }
  set nzOptions(options: CascaderOption[] | null) {
    this.columnsSnapshot = this.columns = options && options.length ? [ options ] : [];
    if (!this.isSearching) {
      if (this.defaultValue && this.columns.length) {
        this.initOptions(0);
      }
    } else {
      this.prepareSearchValue();
    }
  }

  @Output() readonly nzSelectionChange = new EventEmitter<CascaderOption[]>();
  @Output() readonly nzSelect = new EventEmitter<{ option: CascaderOption, index: number }>();
  @Output() readonly nzClear = new EventEmitter<void>();
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>(); // Not exposed, only for test
  @Output() readonly nzChange = new EventEmitter(); // Not exposed, only for test

  el: HTMLElement = this.elementRef.nativeElement;
  dropDownPosition = 'bottom';
  menuVisible = false;
  isLoading = false;
  labelRenderText: string;
  labelRenderContext = {};
  columns: CascaderOption[][] = [];
  onChange = Function.prototype;
  onTouched = Function.prototype;
  positions: ConnectionPositionPair[] = [ ...EXPANDED_DROPDOWN_POSITIONS ];
  dropdownWidthStyle: string;
  isSearching = false;
  isFocused = false;

  private isOpening = false;
  private defaultValue; // Default value written by `[ngModel]`
  private value;
  private selectedOptions: CascaderOption[] = [];
  private activatedOptions: CascaderOption[] = [];
  private columnsSnapshot: CascaderOption[][];
  private activatedOptionsSnapshot: CascaderOption[];
  private delayMenuTimer;
  private delaySelectTimer;

  set inputValue(inputValue: string) {
    this._inputValue = inputValue;
    this.toggleSearchMode();
  }
  get inputValue(): string { return this._inputValue; }
  private _inputValue = '';

  get menuCls(): ClassMap {
    return {
      [ `${this.nzMenuClassName}` ]: !!this.nzMenuClassName
    };
  }

  get menuColumnCls(): ClassMap {
    return {
      [ `${this.nzColumnClassName}` ]: !!this.nzColumnClassName
    };
  }

  //#region Menu

  delaySetMenuVisible(visible: boolean, delay: number, setOpening: boolean = false): void {
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
    if (this.nzDisabled) {
      return;
    }

    if (this.menuVisible !== visible) {
      this.menuVisible = visible;
      this.cdr.detectChanges();
      if (visible) {
        this.loadRootOptions();
      }
      this.nzVisibleChange.emit(visible);
    }
  }

  private clearDelayMenuTimer(): void {
    if (this.delayMenuTimer) {
      clearTimeout(this.delayMenuTimer);
      this.delayMenuTimer = null;
    }
  }

  private loadRootOptions(): void {
    if (!this.columns.length) {
      const root = {};
      this.loadChildrenAsync(root, -1);
    }
  }

  //#endregion

  //#region Init

  private isLoaded(index: number): boolean {
    return this.columns[ index ] && this.columns[ index ].length > 0;
  }

  private findOption(option: CascaderOption, index: number): CascaderOption {
    const options: CascaderOption[] = this.columns[ index ];
    if (options) {
      const value = typeof option === 'object' ? this.getOptionValue(option) : option;
      return options.find(o => value === this.getOptionValue(o));
    }
    return null;
  }

  // tslint:disable-next-line:no-any
  private activateOnInit(index: number, value: any): void {
    let option = this.findOption(value, index);
    if (!option) {
      option = typeof value === 'object' ? value : {
        [ `${this.nzValueProperty}` ]: value,
        [ `${this.nzLabelProperty}` ]: value
      };
    }
    this.setOptionActivated(option, index, false, false);
  }

  private initOptions(index: number): void {
    const vs = this.defaultValue;
    const lastIndex = vs.length - 1;

    const load = () => {
      this.activateOnInit(index, vs[ index ]);
      if (index < lastIndex) {
        this.initOptions(index + 1);
      }
      if (index === lastIndex) {
        this.afterWriteValue();
      }
    };

    if (this.isLoaded(index) || !this.nzLoadData) {
      load();
    } else {
      const node = this.activatedOptions[ index - 1 ] || {};
      this.loadChildrenAsync(node, index - 1, load, this.afterWriteValue);
    }
  }

  //#endregion

  //#region Mutating data

  private setOptionActivated(option: CascaderOption, columnIndex: number, select: boolean = false, loadChildren: boolean = true): void {
    if (!option || option.disabled) {
      return;
    }

    this.activatedOptions[ columnIndex ] = option;

    // Set parent option and all ancestor options as active.
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (!this.activatedOptions[ i ]) {
        this.activatedOptions[ i ] = this.activatedOptions[ i + 1 ].parent;
      }
    }

    // Set child options and all success options as inactive.
    if (columnIndex < this.activatedOptions.length - 1) {
      this.activatedOptions = this.activatedOptions.slice(0, columnIndex + 1);
    }

    // Load child options.
    if (option.children && option.children.length && !option.isLeaf) {
      option.children.forEach(child => child.parent = option);
      this.setColumnData(option.children, columnIndex + 1);
    } else if (!option.isLeaf && loadChildren) {
      this.loadChildrenAsync(option, columnIndex);
    }

    if (select) {
      this.setOptionSelected(option, columnIndex);
    }

    this.cdr.detectChanges();
  }

  private loadChildrenAsync(option: CascaderOption, columnIndex: number, success?: () => void, failure?: () => void): void {
    if (this.nzLoadData) {
      this.isLoading = columnIndex < 0;
      option.loading = true;
      this.nzLoadData(option, columnIndex).then(() => {
        option.loading = this.isLoading = false;
        if (option.children) {
          option.children.forEach(child => child.parent = columnIndex < 0 ? undefined : option);
          this.setColumnData(option.children, columnIndex + 1);
          this.cdr.detectChanges();
        }
        if (success) {
          success();
        }
      }, () => {
        option.loading = this.isLoading = false;
        option.isLeaf = true;
        this.cdr.detectChanges();
        if (failure) {
          failure();
        }
      });
    }
  }

  private setOptionSelected(option: CascaderOption, columnIndex: number): void {
    const shouldPerformSelection = (o: CascaderOption, i: number): boolean => {
      return typeof this.nzChangeOn === 'function' ? this.nzChangeOn(o, i) === true : false;
    };

    this.nzSelect.emit({ option, index: columnIndex });

    if (option.isLeaf || this.nzChangeOnSelect || shouldPerformSelection(option, columnIndex)) {
      this.selectedOptions = this.activatedOptions;
      this.buildDisplayLabel();
      this.onValueChange();
    }

    if (option.isLeaf) {
      this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
    }
  }

  private setColumnData(options: CascaderOption[], columnIndex: number): void {
    if (!arrayEquals(this.columns[ columnIndex ], options)) {
      this.columns[ columnIndex ] = options;
      if (columnIndex < this.columns.length - 1) {
        this.columns = this.columns.slice(0, columnIndex + 1);
      }
    }
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.labelRenderText = '';
    this.labelRenderContext = {};
    this.selectedOptions = [];
    this.activatedOptions = [];
    this.inputValue = '';
    this.setMenuVisible(false);

    this.onValueChange();
  }

  // tslint:disable-next-line:no-any
  getSubmitValue(): any[] {
    const values = [];
    this.selectedOptions.forEach(option => {
      values.push(this.getOptionValue(option));
    });
    return values;
  }

  private onValueChange(): void {
    const value = this.getSubmitValue();
    if (!arrayEquals(this.value, value)) {
      this.defaultValue = null;
      this.value = value;
      this.onChange(value);
      if (value.length === 0) {
        this.nzClear.emit();
      }
      this.nzSelectionChange.emit(this.selectedOptions);
      this.nzChange.emit(value);
    }
  }

  afterWriteValue(): void {
    this.selectedOptions = this.activatedOptions;
    this.value = this.getSubmitValue();
    this.buildDisplayLabel();
  }

  //#endregion

  //#region Mouse and keyboard event handlers, view children

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

  handleInputBlur(event: Event): void {
    this.menuVisible ? this.focus() : this.blur();
  }

  handleInputFocus(event: Event): void {
    this.focus();
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (keyCode !== DOWN_ARROW &&
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
    if (this.isSearching && (keyCode === BACKSPACE || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)) {
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

  @HostListener('click', [ '$event' ])
  onTriggerClick(event: MouseEvent): void {
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

  @HostListener('mouseenter', [ '$event' ])
  onTriggerMouseEnter(event: MouseEvent): void {
    if (this.nzDisabled) {
      return;
    }
    if (this.isActionTrigger('hover')) {
      this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
    }
  }

  @HostListener('mouseleave', [ '$event' ])
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
      const menuEl = this.menu && this.menu.nativeElement as HTMLElement;
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
    this.isSearching
      ? this.setSearchOptionActivated(option as CascaderSearchOption, event)
      : this.setOptionActivated(option, columnIndex, true);
  }

  private onEnter(): void {
    const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
    const option = this.activatedOptions[ columnIndex ];
    if (option && !option.disabled) {
      this.isSearching
        ? this.setSearchOptionActivated(option as CascaderSearchOption, null)
        : this.setOptionSelected(option, columnIndex);
    }
  }

  private moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
    const activeOption = this.activatedOptions[ columnIndex ];
    const options = this.columns[ columnIndex ] || [];
    const length = options.length;
    let nextIndex = -1;
    if (!activeOption) { // Not selected options in this column
      nextIndex = isUp ? length : -1;
    } else {
      nextIndex = options.indexOf(activeOption);
    }

    while (true) {
      nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex < 0 || nextIndex >= length) {
        break;
      }
      const nextOption = options[ nextIndex ];
      if (!nextOption || nextOption.disabled) {
        continue;
      }
      this.setOptionActivated(nextOption, columnIndex);
      break;
    }
  }

  private moveLeft(): void {
    const options = this.activatedOptions;
    if (options.length) {
      options.pop(); // Remove the last one
    }
  }

  private moveRight(): void {
    const length = this.activatedOptions.length;
    const options = this.columns[ length ];
    if (options && options.length) {
      const nextOpt = options.find(o => !o.disabled);
      if (nextOpt) {
        this.setOptionActivated(nextOpt, length);
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
        this.setOptionActivated(option, index);
        this.delaySelectTimer = null;
      }, 150);
    }
  }

  //#endregion

  //#region Search

  private toggleSearchMode(): void {
    const willBeInSearch = !!this._inputValue;

    // Take a snapshot before entering search mode.
    if (!this.isSearching && willBeInSearch) {
      this.isSearching = true;
      this.activatedOptionsSnapshot = this.activatedOptions;
      this.activatedOptions = [];
      this.labelRenderText = '';

      if (this.input) {
        const width = this.input.nativeElement.offsetWidth;
        this.dropdownWidthStyle = `${width}px`;
      }
    }

    // Restore the snapshot after leaving search mode.
    if (this.isSearching && !willBeInSearch) {
      this.isSearching = false;
      this.activatedOptions = this.activatedOptionsSnapshot;
      this.columns = this.columnsSnapshot;
      this.dropdownWidthStyle = '';
      if (this.activatedOptions) {
        this.buildDisplayLabel();
      }
    }

    if (this.isSearching) {
      this.prepareSearchValue();
    }
  }

  private prepareSearchValue(): void {
    const results: CascaderSearchOption[] = [];
    const path: CascaderOption[] = [];

    const defaultFilter = (inputValue: string, p: CascaderOption[]): boolean => {
      return p.some(n => {
        const label = this.getOptionLabel(n);
        return label && label.indexOf(inputValue) !== -1;
      });
    };

    const filter: (inputValue: string, p: CascaderOption[]) => boolean =
      this.nzShowSearch instanceof Object && (this.nzShowSearch as NzShowSearchOptions).filter
        ? (this.nzShowSearch as NzShowSearchOptions).filter
        : defaultFilter;

    const sorter: (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number =
      this.nzShowSearch instanceof Object && (this.nzShowSearch as NzShowSearchOptions).sorter;

    const loopParent = (node: CascaderOption, forceDisabled = false) => {
      const disabled = forceDisabled || node.disabled;
      path.push(node);
      node.children.forEach((sNode) => {
        if (!sNode.parent) { sNode.parent = node; } // Build parent reference when doing searching
        if (!sNode.isLeaf) { loopParent(sNode, disabled); }
        if (sNode.isLeaf || !sNode.children || !sNode.children.length) { loopChild(sNode, disabled); }
      });
      path.pop();
    };

    const loopChild = (node: CascaderOption, forceDisabled = false) => {
      path.push(node);
      const cPath = Array.from(path);
      if (filter(this._inputValue, cPath)) {
        const disabled = forceDisabled || node.disabled;
        const option: CascaderSearchOption = {
          disabled,
          isLeaf                  : true,
          path                    : cPath,
          [ this.nzLabelProperty ]: cPath.map(p => this.getOptionLabel(p)).join(' / ')
        };
        results.push(option);
      }
      path.pop();
    };

    this.columnsSnapshot[ 0 ].forEach(node => (node.isLeaf || !node.children || !node.children.length)
      ? loopChild(node)
      : loopParent(node));
    if (sorter) {
      results.sort((a, b) => sorter(a.path, b.path, this._inputValue));
    }
    this.columns = [ results ];
  }

  setSearchOptionActivated(result: CascaderSearchOption, event: Event): void {
    this.activatedOptions = [ result ];
    this.delaySetMenuVisible(false, 200);

    setTimeout(() => {
      this.inputValue = '';
      const index = result.path.length - 1;
      const destinationNode = result.path[ index ];
      // NOTE: optimize this.
      const mockClickParent = (node: CascaderOption, columnIndex: number) => {
        if (node && node.parent) {
          mockClickParent(node.parent, columnIndex - 1);
        }
        this.onOptionClick(node, columnIndex, event);
      };
      mockClickParent(destinationNode, index);
    }, 300);
  }

  //#endregion

  //#region Helpers

  private get hasInput(): boolean {
    return !!this.inputValue;
  }

  private get hasValue(): boolean {
    return !!this.value && !!this.value.length;
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

  // tslint:disable-next-line:no-any
  getOptionLabel(option: CascaderOption): any {
    return option[ this.nzLabelProperty || 'label' ];
  }

  // tslint:disable-next-line:no-any
  getOptionValue(option: CascaderOption): any {
    return option[ this.nzValueProperty || 'value' ];
  }

  isOptionActivated(option: CascaderOption, index: number): boolean {
    const activeOpt = this.activatedOptions[ index ];
    return activeOpt === option;
  }

  private buildDisplayLabel(): void {
    const selectedOptions = this.selectedOptions;
    const labels: string[] = selectedOptions.map(o => this.getOptionLabel(o));
    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = { labels, selectedOptions };
    } else {
      this.labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
    }
    // When components inits with default value, this would make display label appear correctly.
    this.cdr.detectChanges();
  }

  //#endregion

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

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
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
    const vs = this.defaultValue = toArray(value);
    if (vs.length) {
      this.initOptions(0);
    } else {
      this.value = vs;
      this.activatedOptions = [];
      this.afterWriteValue();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
    if (this.dropDownPosition !== newValue) {
      this.dropDownPosition = newValue;
      this.cdr.detectChanges();
    }
  }
}
