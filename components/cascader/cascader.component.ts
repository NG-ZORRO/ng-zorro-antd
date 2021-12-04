/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  HostListener,
  Input,
  NgZone,
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
import { fromEvent, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { DEFAULT_CASCADER_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { BooleanInput, NgClassType, NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, toArray } from 'ng-zorro-antd/core/util';
import { NzCascaderI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';

import { NzCascaderLabelRenderContext } from '.';
import { NzCascaderOptionComponent } from './cascader-li.component';
import { NzCascaderService } from './cascader.service';
import {
  NzCascaderComponentAsSource,
  NzCascaderExpandTrigger,
  NzCascaderOption,
  NzCascaderSearchOption,
  NzCascaderSize,
  NzCascaderTriggerType,
  NzShowSearchOptions
} from './typings';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'cascader';
const defaultDisplayRender = (labels: Array<string | undefined>): string => labels.join(' / ');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cascader, [nz-cascader]',
  exportAs: 'nzCascader',
  preserveWhitespaces: false,
  template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" #trigger>
      <div *ngIf="nzShowInput" class="ant-select-selector">
        <ng-container *ngIf="nzMultiple">
          <nz-select-item
            *ngFor="let node of cascaderService.selectedOptions | slice: 0:nzMaxTagCount; index as i"
            [deletable]="true"
            [disabled]="nzDisabled"
            [label]="nzDisplayWith($any(node))"
            (delete)="cascaderService.removeSelectedOption($any(node)[node.length - 1], node.length - 1, true)"
            [contentTemplateOutlet]="nzLabelRender"
            [contentTemplateOutletContext]="$any(labelRenderContext)[i]"
          ></nz-select-item>

          <nz-select-item
            *ngIf="cascaderService.selectedOptions.length > nzMaxTagCount"
            [contentTemplateOutlet]="nzMaxTagPlaceholder"
            [contentTemplateOutletContext]="cascaderService.selectedOptions | slice: nzMaxTagCount"
            [deletable]="false"
            [disabled]="false"
            [label]="'+ ' + (cascaderService.selectedOptions.length - nzMaxTagCount) + ' ...'"
          ></nz-select-item>
        </ng-container>

        <nz-select-search
          [nzId]="nzId"
          [showInput]="$any(nzShowSearch)"
          (keydown)="onKeyDown($event)"
          (isComposingChange)="isComposing = $event"
          (valueChange)="setInputValue($event)"
          [value]="inputValue"
          [mirrorSync]="nzMultiple"
          [disabled]="nzDisabled"
          [autofocus]="nzAutoFocus"
          [focusTrigger]="menuVisible"
        ></nz-select-search>

        <nz-select-placeholder
          *ngIf="showPlaceholder"
          [placeholder]="nzPlaceHolder ?? locale?.placeholder!"
          [style.display]="placeHolderDisplay"
        ></nz-select-placeholder>

        <nz-select-item
          *ngIf="!nzMultiple"
          [deletable]="false"
          [disabled]="false"
          [label]="nzDisplayWith(cascaderService.selectedOptions)"
          [contentTemplateOutlet]="nzLabelRender"
          [contentTemplateOutletContext]="labelRenderContext"
        ></nz-select-item>

        <nz-select-arrow [suffixIcon]="nzSuffixIcon" *ngIf="!nzMultiple && nzShowArrow"></nz-select-arrow>

        <nz-select-clear
          *ngIf="nzAllowClear && !nzDisabled && cascaderService.selectedOptions.length"
          (clear)="clearSelection($event)"
        ></nz-select-clear>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-cascader-menus'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
    >
      <div
        #menu
        class="ant-cascader-menus"
        [class.ant-cascader-menu-rtl]="dir === 'rtl'"
        [class.ant-cascader-menus-hidden]="!menuVisible"
        [ngClass]="menuCls"
        [ngStyle]="nzMenuStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@slideMotion]="'enter'"
        (mouseleave)="onTriggerMouseLeave($event)"
      >
        <ul
          *ngIf="shouldShowEmpty; else hasOptionsTemplate"
          class="ant-cascader-menu"
          [style.width]="dropdownWidthStyle"
          [style.height]="dropdownHeightStyle"
        >
          <li class="ant-cascader-menu-item ant-cascader-menu-item-expanded ant-cascader-menu-item-disabled">
            <nz-embed-empty [nzComponentName]="'cascader'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
          </li>
        </ul>
        <ng-template #hasOptionsTemplate>
          <ul
            *ngFor="let options of cascaderService.columns; let i = index"
            class="ant-cascader-menu"
            [ngClass]="menuColumnCls"
            [style.height]="dropdownHeightStyle"
            [style.width]="dropdownWidthStyle"
          >
            <li
              nz-cascader-option
              *ngFor="let option of options"
              [nzCheckable]="nzMultiple"
              [expandIcon]="nzExpandIcon"
              [columnIndex]="i"
              [nzLabelProperty]="nzLabelProperty"
              [optionTemplate]="nzOptionRender"
              [activated]="isOptionActivated(option, i)"
              [highlightText]="inSearchingMode ? inputValue : ''"
              [option]="option"
              [dir]="dir"
              (mouseenter)="onOptionMouseEnter(option, i, $event)"
              (mouseleave)="onOptionMouseLeave(option, i, $event)"
              (click)="onOptionClick(option, i, $event)"
              (nzCheckboxChange)="onOptionCheck(option, i, $event)"
            ></li>
          </ul>
        </ng-template>
      </div>
    </ng-template>
  `,
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
    '[class.ant-select-lg]': 'nzSize==="large"',
    '[class.ant-select-rtl]': 'dir==="rtl"',
    '[class.ant-select-sm]': 'nzSize==="small"',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-single]': '!nzMultiple',
    '[class.ant-select-show-arrow]': '!nzMultiple',
    '[class.ant-select-show-search]': '!nzMultiple',
    '[class.ant-select-multiple]': 'nzMultiple',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]': 'menuVisible',
    '[class.ant-select-focused]': 'menuVisible || isFocused',
    '[attr.tabIndex]': '"0"',
    '(focus)': 'handleInputFocus()',
    '(blur)': 'handleInputBlur()'
  }
})
export class NzCascaderComponent implements NzCascaderComponentAsSource, OnInit, OnDestroy, ControlValueAccessor {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzShowInput: BooleanInput;
  static ngAcceptInputType_nzShowArrow: BooleanInput;
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzChangeOnSelect: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @ViewChild(NzSelectSearchComponent) input!: NzSelectSearchComponent;
  @ViewChild('menu', { static: false }) menu!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: false }) overlay!: CdkConnectedOverlay;
  @ViewChildren(NzCascaderOptionComponent) cascaderItems!: QueryList<NzCascaderOptionComponent>;

  @Input() nzId: string | null = null;
  @Input() nzOptionRender: TemplateRef<{ $implicit: NzCascaderOption; index: number }> | null = null;
  @Input() @InputBoolean() nzShowInput = true;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() @InputBoolean() nzAllowClear = true;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzChangeOnSelect = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzMultiple: boolean = false;
  @Input() nzColumnClassName?: string;
  @Input() nzExpandTrigger: NzCascaderExpandTrigger = 'click';
  @Input() nzValueProperty = 'value';
  @Input() nzLabelRender: TemplateRef<void> | null = null;
  @Input() nzLabelProperty = 'label';
  @Input() nzNotFoundContent?: string | TemplateRef<void>;
  @Input() @WithConfig() nzSize: NzCascaderSize = 'default';
  @Input() @WithConfig() nzBackdrop = false;
  @Input() nzShowSearch: boolean | NzShowSearchOptions = false;
  @Input() nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzMaxTagCount!: number;
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: NzCascaderOption[] }> | null = null;
  @Input() nzMenuClassName?: string;
  @Input() nzMenuStyle: NgStyleInterface | null = null;
  @Input() nzMouseEnterDelay: number = 150; // ms
  @Input() nzMouseLeaveDelay: number = 150; // ms
  @Input() nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = ['click'] as NzCascaderTriggerType[];
  @Input() nzChangeOn?: (option: NzCascaderOption, level: number) => boolean;
  @Input() nzLoadData?: (node: NzCascaderOption, index: number) => PromiseLike<NzSafeAny>;
  @Input() nzDisplayWith: (nodes: NzCascaderOption[]) => string | undefined = (nodes: NzCascaderOption[]) => {
    return defaultDisplayRender(nodes.map(n => this.cascaderService.getOptionLabel(n!)));
  };
  // TODO: RTL
  @Input() nzSuffixIcon: string | TemplateRef<void> = 'down';
  @Input() nzExpandIcon: string | TemplateRef<void> = '';

  @Input()
  get nzOptions(): NzCascaderOption[] | null {
    return this.cascaderService.nzOptions;
  }

  set nzOptions(options: NzCascaderOption[] | null) {
    this.cascaderService.withOptions(options, this.nzMultiple);
  }

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();
  @Output() readonly nzSelectionChange = new EventEmitter<NzCascaderOption[]>();
  @Output() readonly nzSelect = new EventEmitter<{ option: NzCascaderOption; index: number } | null>();
  @Output() readonly nzClear = new EventEmitter<void>();

  /**
   * If the dropdown should show the empty content.
   * `true` if there's no options.
   */
  shouldShowEmpty: boolean = false;

  el: HTMLElement;
  menuVisible = false;
  isLoading = false;
  labelRenderText?: string;
  /** For multiple output */
  labelRenderTextArray?: string[];
  labelRenderContext: NzCascaderLabelRenderContext | NzCascaderLabelRenderContext[] = {};
  onChange = Function.prototype;
  onTouched = Function.prototype;
  positions: ConnectionPositionPair[] = [...DEFAULT_CASCADER_POSITIONS];

  /**
   * Dropdown's with in pixel.
   */
  dropdownWidthStyle?: string;
  dropdownHeightStyle: 'auto' | '' = '';
  isFocused = false;

  locale!: NzCascaderI18nInterface;
  dir: Direction = 'ltr';
  isComposing = false;

  private destroy$ = new Subject<void>();
  private inputString = '';
  private isOpening = false;
  private delayMenuTimer: number | null = null;
  private delaySelectTimer: number | null = null;

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

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.cascaderService.selectedOptions.length ? 'none' : 'block';
  }

  constructor(
    public cascaderService: NzCascaderService,
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private i18nService: NzI18nService,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    renderer: Renderer2,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    this.el = elementRef.nativeElement;
    this.cascaderService.withComponent(this);
    renderer.addClass(elementRef.nativeElement, 'ant-select');
    renderer.addClass(elementRef.nativeElement, 'ant-cascader');
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-picker');
  }

  ngOnInit(): void {
    const srv = this.cascaderService;

    srv.$redraw.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // These operations would not mutate data.
      this.checkChildren();
      this.setLabelRenderContext();
      this.reposition();
      this.setDropdownStyles();

      this.cdr.markForCheck();
    });

    srv.$loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.isLoading = loading;
    });

    srv.$optionSelected.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) {
        this.onChange([]);
        this.nzSelect.emit(null);
        this.nzSelectionChange.emit([]);
      } else {
        const { option, index } = data;
        const shouldClose =
          (option.isLeaf || (this.nzChangeOnSelect && this.nzExpandTrigger === 'hover')) && !this.nzMultiple;
        if (shouldClose) {
          this.delaySetMenuVisible(false);
        }
        this.onChange(this.cascaderService.values);
        this.nzSelectionChange.emit(this.cascaderService.selectedOptions);
        this.nzSelect.emit({ option, index });
        this.cdr.markForCheck();
      }
    });

    srv.$quitSearching.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.inputString = '';
      this.dropdownWidthStyle = '';
    });

    this.i18nService.localeChange.pipe(startWith(), takeUntil(this.destroy$)).subscribe(() => {
      this.setLocale();
    });

    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = this.directionality.value;
      srv.$redraw.next();
    });

    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          // `HTMLElement.focus()` is a native DOM API which doesn't require Angular to run change detection.
          if (event.target !== this.input.inputElement.nativeElement) {
            this.input.focus();
          }
        });
    });

    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          Promise.resolve().then(() => {
            this.isFocused = false;
            this.cdr.markForCheck();
          });
        } else {
          Promise.resolve().then(() => {
            this.isFocused = true;
            this.cdr.markForCheck();
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearDelayMenuTimer();
    this.clearDelaySelectTimer();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: NzSafeAny): void {
    this.cascaderService.values = toArray(value);
    this.cascaderService.syncOptions(this.nzMultiple, true);
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
      this.cascaderService.syncOptions(this.nzMultiple);
      this.scrollToActivatedOptions();
    }

    if (!visible) {
      this.inputValue = '';
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
    this.nzClear.emit();
  }

  getSubmitValue(): NzSafeAny[] {
    return this.cascaderService.selectedOptions.map(o => this.cascaderService.getOptionValue(o));
  }

  focus(): void {
    if (!this.isFocused) {
      (this.input ? this.input : this.el).focus();
      this.isFocused = true;
      this.cdr.markForCheck();
    }
  }

  blur(): void {
    if (this.isFocused) {
      (this.input ? this.input : this.el).blur();
      this.isFocused = false;
      this.cdr.markForCheck();
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
    if (this.nzDisabled || !this.isActionTrigger('hover')) {
      return;
    }

    this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
  }

  @HostListener('mouseleave', ['$event'])
  onTriggerMouseLeave(event: MouseEvent): void {
    if (this.nzDisabled || !this.menuVisible || this.isOpening || !this.isActionTrigger('hover')) {
      event.preventDefault();
      return;
    }
    const mouseTarget = event.relatedTarget as HTMLElement;
    const hostEl = this.el;
    const menuEl = this.menu && (this.menu.nativeElement as HTMLElement);
    if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))) {
      return;
    }
    this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
  }

  onOptionMouseEnter(option: NzCascaderOption, columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover') {
      if (!option.isLeaf) {
        this.delaySetOptionActivated(option, columnIndex, false);
      } else {
        this.cascaderService.setOptionDeactivatedSinceColumn(columnIndex);
      }
    }
  }

  onOptionMouseLeave(option: NzCascaderOption, _columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
      this.clearDelaySelectTimer();
    }
  }

  onOptionClick(option: NzCascaderOption, columnIndex: number, event: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (option && option.disabled) {
      return;
    }
    this.el.focus();
    this.inSearchingMode
      ? this.cascaderService.setSearchOptionSelected(option as NzCascaderSearchOption)
      : this.cascaderService.setOptionActivated(option, columnIndex, !this.nzMultiple);
  }

  onOptionCheck(option: NzCascaderOption, columnIndex: number, event: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.cascaderService.checkedOptionsKeySet.has(option.value)) {
      this.cascaderService.removeSelectedOption(option, columnIndex, this.nzMultiple);
      this.cascaderService.checkedOptionsKeySet.delete(option.value);
    } else {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(option as NzCascaderSearchOption)
        : this.cascaderService.setOptionActivated(option, columnIndex, true, true);
    }
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.el.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  private isActionTrigger(action: 'click' | 'hover'): boolean {
    return typeof this.nzTriggerAction === 'string'
      ? this.nzTriggerAction === action
      : this.nzTriggerAction.indexOf(action) !== -1;
  }

  private onEnter(): void {
    const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
    const option = this.cascaderService.activatedOptions[columnIndex];
    if (option && !option.disabled) {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(option as NzCascaderSearchOption)
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

  private clearDelaySelectTimer(): void {
    if (this.delaySelectTimer) {
      clearTimeout(this.delaySelectTimer);
      this.delaySelectTimer = null;
    }
  }

  private delaySetOptionActivated(option: NzCascaderOption, columnIndex: number, performSelect: boolean): void {
    this.clearDelaySelectTimer();
    this.delaySelectTimer = setTimeout(() => {
      this.cascaderService.setOptionActivated(option, columnIndex, performSelect, this.nzMultiple);
      this.delaySelectTimer = null;
    }, 150);
  }

  private toggleSearchingMode(toSearching: boolean): void {
    if (this.inSearchingMode !== toSearching) {
      this.cascaderService.toggleSearchingMode(toSearching, this.nzMultiple);
    }

    if (this.inSearchingMode) {
      this.cascaderService.prepareSearchOptions(this.inputValue);
    }
  }

  isOptionActivated(option: NzCascaderOption, index: number): boolean {
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

  setInputValue(value: string): void {
    this.inputValue = value;
  }
  private setDropdownStyles(): void {
    const firstColumn = this.cascaderService.columns[0];

    this.shouldShowEmpty =
      (this.inSearchingMode && (!firstColumn || !firstColumn.length)) || // Should show empty when there's no searching result
      (!(this.nzOptions && this.nzOptions.length) && !this.nzLoadData); // Should show when there's no options and developer does not use nzLoadData
    this.dropdownHeightStyle = this.shouldShowEmpty ? 'auto' : '';

    if (this.input) {
      this.dropdownWidthStyle =
        this.inSearchingMode || this.shouldShowEmpty ? `${this.input.inputElement.nativeElement.offsetWidth}px` : '';
    }
  }

  private setLocale(): void {
    this.locale = this.i18nService.getLocaleData('global');
    this.cdr.markForCheck();
  }

  private scrollToActivatedOptions(): void {
    // scroll only until option menu view is ready
    Promise.resolve().then(() => {
      this.cascaderItems
        .toArray()
        .filter(e => e.activated)
        .forEach(e => {
          e.nativeElement?.scrollIntoView({ block: 'start', inline: 'nearest' });
        });
    });
  }
  private isMultiLabel(
    //@ts-ignore
    labelRenderContext: NzCascaderLabelRenderContext | NzCascaderLabelRenderContext[]
  ): labelRenderContext is NzCascaderLabelRenderContext[] {
    return this.nzMultiple;
  }

  private isSingleLabel(
    //@ts-ignore
    labelRenderContext: NzCascaderLabelRenderContext | NzCascaderLabelRenderContext[]
  ): labelRenderContext is NzCascaderLabelRenderContext {
    return !this.nzMultiple;
  }
  private setLabelRenderContext(): void {
    if (
      this.isMultiLabel(this.labelRenderContext) &&
      this.cascaderService.isMultipleSelections(this.cascaderService.selectedOptions)
    ) {
      this.labelRenderContext = [];
      this.cascaderService.selectedOptions.forEach(options => {
        (this.labelRenderContext as NzCascaderLabelRenderContext[]).push({
          labels: options.map(o => this.cascaderService.getOptionLabel(o)),
          selectedOptions: options
        });
      });
    }
    if (this.isSingleLabel(this.labelRenderContext)) {
      this.labelRenderContext = {
        labels: this.cascaderService.selectedOptions.map(o => this.cascaderService.getOptionLabel(o)),
        selectedOptions: this.cascaderService.selectedOptions
      };
    }
  }
}
