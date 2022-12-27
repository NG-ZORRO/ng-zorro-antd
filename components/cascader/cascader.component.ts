/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, EMPTY, fromEvent, Observable, of as observableOf } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { DEFAULT_CASCADER_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import {
  BooleanInput,
  NgClassInterface,
  NgClassType,
  NgStyleInterface,
  NzSafeAny,
  NzStatus,
  NzValidateStatus
} from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean, toArray } from 'ng-zorro-antd/core/util';
import { NzCascaderI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

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
const defaultDisplayRender = (labels: string[]): string => labels.join(' / ');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cascader, [nz-cascader]',
  exportAs: 'nzCascader',
  preserveWhitespaces: false,
  template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" #trigger>
      <ng-container *ngIf="nzShowInput">
        <div #selectContainer class="ant-select-selector">
          <span class="ant-select-selection-search">
            <input
              #input
              type="search"
              class="ant-select-selection-search-input"
              [style.opacity]="nzShowSearch ? '' : '0'"
              [attr.autoComplete]="'off'"
              [attr.expanded]="menuVisible"
              [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
              [readonly]="!nzShowSearch"
              [disabled]="nzDisabled"
              [(ngModel)]="inputValue"
              (blur)="handleInputBlur()"
              (focus)="handleInputFocus()"
            />
          </span>
          <span *ngIf="showLabelRender" class="ant-select-selection-item" [title]="labelRenderText">
            <ng-container *ngIf="!isLabelRenderTemplate; else labelTemplate">{{ labelRenderText }}</ng-container>
            <ng-template #labelTemplate>
              <ng-template
                [ngTemplateOutlet]="nzLabelRender"
                [ngTemplateOutletContext]="labelRenderContext"
              ></ng-template>
            </ng-template>
          </span>
          <span
            *ngIf="!showLabelRender"
            class="ant-select-selection-placeholder"
            [style.visibility]="!inputValue ? 'visible' : 'hidden'"
            >{{ showPlaceholder ? nzPlaceHolder || locale?.placeholder : null }}</span
          >
        </div>
        <span class="ant-select-arrow" [class.ant-select-arrow-loading]="isLoading" *ngIf="nzShowArrow">
          <span
            *ngIf="!isLoading"
            nz-icon
            [nzType]="$any(nzSuffixIcon)"
            [class.ant-cascader-picker-arrow-expand]="menuVisible"
          ></span>
          <span *ngIf="isLoading" nz-icon nzType="loading"></span>
          <nz-form-item-feedback-icon *ngIf="hasFeedback && !!status" [status]="status"></nz-form-item-feedback-icon>
        </span>
        <span class="ant-select-clear" *ngIf="clearIconVisible">
          <span nz-icon nzType="close-circle" nzTheme="fill" (click)="clearSelection($event)"></span>
        </span>
      </ng-container>
      <ng-content></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-cascader-dropdown'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
    >
      <div
        class="ant-select-dropdown ant-cascader-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-cascader-dropdown-rtl]="dir === 'rtl'"
        [@slideMotion]="'enter'"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="onTriggerMouseEnter()"
        (mouseleave)="onTriggerMouseLeave($event)"
      >
        <div
          #menu
          class="ant-cascader-menus"
          [class.ant-cascader-rtl]="dir === 'rtl'"
          [class.ant-cascader-menus-hidden]="!menuVisible"
          [class.ant-cascader-menu-empty]="shouldShowEmpty"
          [ngClass]="menuCls"
          [ngStyle]="nzMenuStyle"
        >
          <ul
            *ngIf="shouldShowEmpty; else hasOptionsTemplate"
            class="ant-cascader-menu"
            [style.width]="dropdownWidthStyle"
            [style.height]="dropdownHeightStyle"
          >
            <li class="ant-cascader-menu-item ant-cascader-menu-item-disabled">
              <nz-embed-empty
                class="ant-cascader-menu-item-content"
                [nzComponentName]="'cascader'"
                [specificContent]="nzNotFoundContent"
              ></nz-embed-empty>
            </li>
          </ul>
          <ng-template #hasOptionsTemplate>
            <ul
              *ngFor="let options of cascaderService.columns; let i = index"
              class="ant-cascader-menu"
              role="menuitemcheckbox"
              [ngClass]="menuColumnCls"
              [style.height]="dropdownHeightStyle"
              [style.width]="dropdownWidthStyle"
            >
              <li
                nz-cascader-option
                *ngFor="let option of options"
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
              ></li>
            </ul>
          </ng-template>
        </div>
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
    NzCascaderService,
    NzDestroyService
  ],
  host: {
    '[attr.tabIndex]': '"0"',
    '[class.ant-select-in-form-item]': '!!nzFormStatusService',
    '[class.ant-select-lg]': 'nzSize === "large"',
    '[class.ant-select-sm]': 'nzSize === "small"',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-show-arrow]': 'nzShowArrow',
    '[class.ant-select-show-search]': '!!nzShowSearch',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-open]': 'menuVisible',
    '[class.ant-select-focused]': 'isFocused',
    '[class.ant-select-single]': 'true',
    '[class.ant-select-rtl]': `dir ==='rtl'`
  }
})
export class NzCascaderComponent
  implements NzCascaderComponentAsSource, OnInit, OnDestroy, OnChanges, ControlValueAccessor
{
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzShowInput: BooleanInput;
  static ngAcceptInputType_nzShowArrow: BooleanInput;
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzChangeOnSelect: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @ViewChild('selectContainer', { static: false }) selectContainer!: ElementRef;

  @ViewChild('input', { static: false })
  set input(input: ElementRef<HTMLInputElement> | undefined) {
    this.input$.next(input);
  }
  get input(): ElementRef<HTMLInputElement> | undefined {
    return this.input$.getValue();
  }
  /** Used to store the native `<input type="search" />` element since it might be set asynchronously. */
  private input$ = new BehaviorSubject<ElementRef<HTMLInputElement> | undefined>(undefined);

  @ViewChild('menu', { static: false }) menu!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: false }) overlay!: CdkConnectedOverlay;
  @ViewChildren(NzCascaderOptionComponent) cascaderItems!: QueryList<NzCascaderOptionComponent>;

  @Input() nzOptionRender: TemplateRef<{ $implicit: NzCascaderOption; index: number }> | null = null;
  @Input() @InputBoolean() nzShowInput = true;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() @InputBoolean() nzAllowClear = true;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzChangeOnSelect = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzColumnClassName?: string;
  @Input() nzExpandTrigger: NzCascaderExpandTrigger = 'click';
  @Input() nzValueProperty = 'value';
  @Input() nzLabelRender: TemplateRef<void> | null = null;
  @Input() nzLabelProperty = 'label';
  @Input() nzNotFoundContent?: string | TemplateRef<void>;
  @Input() @WithConfig() nzSize: NzCascaderSize = 'default';
  @Input() @WithConfig() nzBackdrop = false;
  @Input() nzShowSearch: boolean | NzShowSearchOptions = false;
  @Input() nzPlaceHolder: string = '';
  @Input() nzMenuClassName?: string;
  @Input() nzMenuStyle: NgStyleInterface | null = null;
  @Input() nzMouseEnterDelay: number = 150; // ms
  @Input() nzMouseLeaveDelay: number = 150; // ms
  @Input() nzStatus: NzStatus = '';

  @Input() nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = ['click'] as NzCascaderTriggerType[];
  @Input() nzChangeOn?: (option: NzCascaderOption, level: number) => boolean;
  @Input() nzLoadData?: (node: NzCascaderOption, index: number) => PromiseLike<NzSafeAny>;
  // TODO: RTL
  @Input() nzSuffixIcon: string | TemplateRef<void> = 'down';
  @Input() nzExpandIcon: string | TemplateRef<void> = '';

  @Input()
  get nzOptions(): NzCascaderOption[] | null {
    return this.cascaderService.nzOptions;
  }

  set nzOptions(options: NzCascaderOption[] | null) {
    this.cascaderService.withOptions(options);
  }

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();
  @Output() readonly nzSelectionChange = new EventEmitter<NzCascaderOption[]>();
  @Output() readonly nzSelect = new EventEmitter<{ option: NzCascaderOption; index: number } | null>();
  @Output() readonly nzClear = new EventEmitter<void>();

  prefixCls: string = 'ant-select';
  statusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;

  /**
   * If the dropdown should show the empty content.
   * `true` if there's no options.
   */
  shouldShowEmpty: boolean = false;

  el: HTMLElement;
  menuVisible = false;
  isLoading = false;
  labelRenderText?: string;
  labelRenderContext = {};
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

  private inputString = '';
  private isOpening = false;
  private delayMenuTimer: number | null = null;
  private delaySelectTimer: number | null = null;
  private isNzDisableFirstChange: boolean = true;

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

  get showLabelRender(): boolean {
    return this.hasValue;
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
    public nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private i18nService: NzI18nService,
    private destroy$: NzDestroyService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
    @Optional() public nzFormStatusService?: NzFormStatusService,
    @Optional() private nzFormNoStatusService?: NzFormNoStatusService
  ) {
    this.el = elementRef.nativeElement;
    this.cascaderService.withComponent(this);
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-select');
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-cascader');
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : observableOf(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntil(this.destroy$)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    const srv = this.cascaderService;

    srv.$redraw.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // These operations would not mutate data.
      this.checkChildren();
      this.setDisplayLabel();
      this.cdr.detectChanges();
      this.reposition();
      this.setDropdownStyles();
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
        const shouldClose = option.isLeaf || (this.nzChangeOnSelect && this.nzExpandTrigger === 'hover');
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
    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = this.directionality.value;
      srv.$redraw.next();
    });

    this.setupChangeListener();
    this.setupKeydownListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzStatus } = changes;
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
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

  writeValue(value: NzSafeAny): void {
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
      (this.input?.nativeElement || this.el).focus();
      this.isFocused = true;
    }
  }

  blur(): void {
    if (this.isFocused) {
      (this.input?.nativeElement || this.el).blur();
      this.isFocused = false;
    }
  }

  handleInputBlur(): void {
    this.menuVisible ? this.focus() : this.blur();
  }

  handleInputFocus(): void {
    this.focus();
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
      : this.cascaderService.setOptionActivated(option, columnIndex, true);
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
      this.cascaderService.setOptionActivated(option, columnIndex, performSelect);
      this.delaySelectTimer = null;
    }, 150);
  }

  private toggleSearchingMode(toSearching: boolean): void {
    if (this.inSearchingMode !== toSearching) {
      this.cascaderService.toggleSearchingMode(toSearching);
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
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    if (this.nzDisabled) {
      this.closeMenu();
    }
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
        this.cdr.markForCheck();
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

  private setDisplayLabel(): void {
    const selectedOptions = this.cascaderService.selectedOptions;
    const labels: string[] = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));

    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = { labels, selectedOptions };
    } else {
      this.labelRenderText = defaultDisplayRender.call(this, labels);
    }
  }

  private setDropdownStyles(): void {
    const firstColumn = this.cascaderService.columns[0];

    this.shouldShowEmpty =
      (this.inSearchingMode && (!firstColumn || !firstColumn.length)) || // Should show empty when there's no searching result
      (!(this.nzOptions && this.nzOptions.length) && !this.nzLoadData); // Should show when there's no options and developer does not use nzLoadData
    this.dropdownHeightStyle = this.shouldShowEmpty ? 'auto' : '';

    if (this.input) {
      this.dropdownWidthStyle =
        this.inSearchingMode || this.shouldShowEmpty ? `${this.selectContainer.nativeElement.offsetWidth}px` : '';
    }
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }

  private setLocale(): void {
    this.locale = this.i18nService.getLocaleData('global');
    this.cdr.markForCheck();
  }

  private scrollToActivatedOptions(): void {
    // The `scrollIntoView` is a native DOM API, which doesn't require Angular to run
    // a change detection when a promise microtask is resolved.
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        // scroll only until option menu view is ready
        this.cascaderItems
          .toArray()
          .filter(e => e.activated)
          .forEach(e => {
            e.nativeElement.scrollIntoView({ block: 'start', inline: 'nearest' });
          });
      });
    });
  }

  private setupChangeListener(): void {
    this.input$
      .pipe(
        switchMap(input =>
          input
            ? new Observable<Event>(subscriber =>
                this.ngZone.runOutsideAngular(() => fromEvent(input.nativeElement, 'change').subscribe(subscriber))
              )
            : EMPTY
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(event => event.stopPropagation());
  }

  private setupKeydownListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<KeyboardEvent>(this.el, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
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
            // The `setMenuVisible` runs `detectChanges()`, so we don't need to run `markForCheck()` additionally.
            return this.ngZone.run(() => this.setMenuVisible(true));
          }

          // Make these keys work as default in searching mode.
          if (this.inSearchingMode && (keyCode === BACKSPACE || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)) {
            return;
          }

          if (!this.menuVisible) {
            return;
          }

          event.preventDefault();

          this.ngZone.run(() => {
            // Interact with the component.
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
            // `@HostListener`s run `markForCheck()` internally before calling the actual handler so
            // we call `markForCheck()` to be backwards-compatible.
            this.cdr.markForCheck();
          });
        });
    });
  }
}
