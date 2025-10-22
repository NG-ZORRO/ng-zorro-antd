/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  OverlayModule
} from '@angular/cdk/overlay';
import { _getEventTarget } from '@angular/cdk/platform';
import { SlicePipe } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  NgZone,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormItemFeedbackIconComponent, NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import {
  DEFAULT_CASCADER_POSITIONS,
  getPlacementName,
  NzOverlayModule,
  POSITION_MAP,
  POSITION_TYPE
} from 'ng-zorro-antd/core/overlay';
import { NzTreeBase, NzTreeNode } from 'ng-zorro-antd/core/tree';
import {
  NgClassInterface,
  NgStyleInterface,
  NzSafeAny,
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  NzVariant
} from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, getStatusClassNames, isNotNil, toArray } from 'ng-zorro-antd/core/util';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCascaderI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzSelectClearComponent,
  NzSelectItemComponent,
  NzSelectPlaceholderComponent,
  NzSelectPlacementType,
  NzSelectSearchComponent
} from 'ng-zorro-antd/select';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzCascaderOptionComponent } from './cascader-option.component';
import { NzCascaderTreeService } from './cascader-tree.service';
import { NzCascaderService } from './cascader.service';
import {
  NzCascaderComponentAsSource,
  NzCascaderExpandTrigger,
  NzCascaderOption,
  NzCascaderPlacement,
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
  template: `
    @if (nzShowInput) {
      <div #selectContainer class="ant-select-selector">
        @if (nzPrefix; as prefix) {
          <div class="ant-select-prefix">
            <ng-container *nzStringTemplateOutlet="prefix">{{ prefix }}</ng-container>
          </div>
        }
        <span class="ant-select-selection-wrap">
          @if (nzMultiple) {
            <div class="ant-select-selection-overflow">
              @for (node of selectedNodes | slice: 0 : nzMaxTagCount; track node) {
                <div class="ant-select-selection-overflow-item">
                  <nz-select-item
                    deletable
                    [disabled]="nzDisabled"
                    [label]="nzDisplayWith(getAncestorOptionList(node))"
                    (delete)="removeSelected(node)"
                  />
                </div>
              }
              @if (selectedNodes.length > nzMaxTagCount) {
                <div class="ant-select-selection-overflow-item">
                  <nz-select-item [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'" />
                </div>
              }

              <div class="ant-select-selection-overflow-item ant-select-selection-overflow-item-suffix">
                <nz-select-search
                  [showInput]="!!nzShowSearch"
                  (isComposingChange)="isComposingChange($event)"
                  [value]="inputValue"
                  (valueChange)="inputValue = $event"
                  [mirrorSync]="true"
                  [disabled]="nzDisabled"
                  [autofocus]="nzAutoFocus"
                  [focusTrigger]="menuVisible"
                />
              </div>
            </div>
          } @else {
            <nz-select-search
              [showInput]="!!nzShowSearch"
              (isComposingChange)="isComposingChange($event)"
              [value]="inputValue"
              (valueChange)="inputValue = $event"
              [mirrorSync]="false"
              [disabled]="nzDisabled"
              [autofocus]="nzAutoFocus"
              [focusTrigger]="menuVisible"
            />

            @if (showLabelRender) {
              <nz-select-item
                [disabled]="nzDisabled"
                [label]="labelRenderText"
                [contentTemplateOutlet]="isLabelRenderTemplate ? nzLabelRender : null"
                [contentTemplateOutletContext]="labelRenderContext"
              />
            }
          }

          @if (showPlaceholder) {
            <nz-select-placeholder
              [placeholder]="nzPlaceHolder || locale?.placeholder!"
              [style.display]="inputValue || isComposing ? 'none' : 'block'"
            />
          }
        </span>
      </div>

      @if (nzShowArrow) {
        <span class="ant-select-arrow" [class.ant-select-arrow-loading]="isLoading">
          @if (!isLoading) {
            <nz-icon [nzType]="$any(nzSuffixIcon)" [class.ant-cascader-picker-arrow-expand]="menuVisible" />
          } @else {
            <nz-icon nzType="loading" />
          }

          @if (hasFeedback && !!status) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </span>
      }
      @if (clearIconVisible) {
        <nz-select-clear (clear)="clearSelection($event)" />
      }
    }
    <ng-content></ng-content>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="overlayOrigin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-cascader-dropdown'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-select-dropdown ant-cascader-dropdown"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottomLeft'"
        [class.ant-select-dropdown-placement-bottomRight]="dropdownPosition === 'bottomRight'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'topLeft'"
        [class.ant-select-dropdown-placement-topRight]="dropdownPosition === 'topRight'"
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
          [class]="nzMenuClassName"
          [style]="nzMenuStyle"
        >
          @if (shouldShowEmpty) {
            <ul class="ant-cascader-menu" [style.width]="dropdownWidthStyle" [style.height]="dropdownHeightStyle">
              <li class="ant-cascader-menu-item ant-cascader-menu-item-disabled">
                <nz-embed-empty
                  class="ant-cascader-menu-item-content"
                  [nzComponentName]="'cascader'"
                  [specificContent]="nzNotFoundContent"
                />
              </li>
            </ul>
          } @else {
            @for (options of cascaderService.columns; track options; let i = $index) {
              <ul
                class="ant-cascader-menu"
                role="menuitemcheckbox"
                [class]="nzColumnClassName"
                [style.height]="dropdownHeightStyle"
              >
                @for (option of options; track option) {
                  <li
                    nz-cascader-option
                    [expandIcon]="nzExpandIcon"
                    [columnIndex]="i"
                    [nzLabelProperty]="nzLabelProperty"
                    [optionTemplate]="nzOptionRender"
                    [activated]="isOptionActivated(option, i)"
                    [highlightText]="inSearchingMode ? inputValue : ''"
                    [node]="option"
                    [dir]="dir"
                    [checkable]="nzMultiple"
                    (mouseenter)="onOptionMouseEnter(option, i, $event)"
                    (mouseleave)="onOptionMouseLeave(option, i, $event)"
                    (click)="onOptionClick(option, i, $event)"
                    (check)="onOptionCheck(option, i)"
                  ></li>
                }
              </ul>
            }
          }
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
    { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' },
    NzCascaderService,
    NzCascaderTreeService
  ],
  host: {
    '[attr.tabIndex]': '"0"',
    '[class.ant-select-in-form-item]': '!!nzFormStatusService',
    '[class.ant-select-lg]': 'finalSize() === "large"',
    '[class.ant-select-sm]': 'finalSize() === "small"',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-show-arrow]': 'nzShowArrow',
    '[class.ant-select-show-search]': '!!nzShowSearch',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-borderless]': `nzVariant === 'borderless'`,
    '[class.ant-select-filled]': `nzVariant === 'filled'`,
    '[class.ant-select-underlined]': `nzVariant === 'underlined'`,
    '[class.ant-select-open]': 'menuVisible',
    '[class.ant-select-focused]': 'isFocused',
    '[class.ant-select-multiple]': 'nzMultiple',
    '[class.ant-select-single]': '!nzMultiple',
    '[class.ant-select-rtl]': `dir === 'rtl'`
  },
  hostDirectives: [NzSpaceCompactItemDirective],
  imports: [
    SlicePipe,
    OverlayModule,
    FormsModule,
    NzIconModule,
    NzEmptyModule,
    NzFormItemFeedbackIconComponent,
    NzOverlayModule,
    NzNoAnimationDirective,
    NzSelectClearComponent,
    NzSelectItemComponent,
    NzSelectPlaceholderComponent,
    NzSelectSearchComponent,
    NzCascaderOptionComponent,
    NzStringTemplateOutletDirective
  ]
})
export class NzCascaderComponent
  extends NzTreeBase
  implements NzCascaderComponentAsSource, OnInit, OnChanges, ControlValueAccessor
{
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private i18nService = inject(NzI18nService);
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ViewChild('selectContainer', { static: false }) selectContainer!: ElementRef;

  @ViewChild(NzSelectSearchComponent)
  set input(inputComponent: NzSelectSearchComponent | undefined) {
    this.input$.next(inputComponent?.inputElement);
  }

  get input(): ElementRef<HTMLInputElement> | undefined {
    return this.input$.getValue();
  }

  /** Used to store the native `<input type="search" />` element since it might be set asynchronously. */
  private input$ = new BehaviorSubject<ElementRef<HTMLInputElement> | undefined>(undefined);

  @ViewChild('menu', { static: false }) menu!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: false }) overlay!: CdkConnectedOverlay;
  @ViewChildren(NzCascaderOptionComponent) cascaderItems!: QueryList<NzCascaderOptionComponent>;

  @Input() nzOpen?: boolean;
  @Input() nzOptions: NzCascaderOption[] | null = [];
  @Input() nzOptionRender: TemplateRef<{ $implicit: NzCascaderOption; index: number }> | null = null;
  @Input({ transform: booleanAttribute }) nzShowInput = true;
  @Input({ transform: booleanAttribute }) nzShowArrow = true;
  @Input({ transform: booleanAttribute }) nzAllowClear = true;
  @Input({ transform: booleanAttribute }) nzAutoFocus = false;
  @Input({ transform: booleanAttribute }) nzChangeOnSelect = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzColumnClassName?: string;
  @Input() nzExpandTrigger: NzCascaderExpandTrigger = 'click';
  @Input() nzValueProperty: string = 'value';
  @Input() nzLabelProperty: string = 'label';
  @Input() nzLabelRender: TemplateRef<typeof this.labelRenderContext> | null = null;
  @Input() @WithConfig() nzVariant: NzVariant = 'outlined';
  @Input() nzNotFoundContent?: string | TemplateRef<void>;
  @Input() @WithConfig() nzSize: NzCascaderSize = 'default';
  @Input() @WithConfig() nzBackdrop = false;
  @Input() nzShowSearch: boolean | NzShowSearchOptions = false;
  @Input() nzPlaceHolder: string = '';
  @Input() nzMenuClassName?: string;
  @Input() nzMenuStyle: NgStyleInterface | null = null;
  /**
   * Duration in milliseconds before opening the menu when the mouse enters the trigger.
   * @default 150
   */
  @Input({ transform: numberAttribute }) nzMouseLeaveDelay: number = 150;
  /**
   * Duration in milliseconds before closing the menu when the mouse leaves the trigger.
   * @default 150
   */
  @Input({ transform: numberAttribute }) nzMouseEnterDelay: number = 150;
  @Input() nzStatus: NzStatus = '';
  @Input({ transform: booleanAttribute }) nzMultiple: boolean = false;
  @Input() nzMaxTagCount: number = Infinity;
  @Input() nzPlacement: NzCascaderPlacement = 'bottomLeft';

  @Input() nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = ['click'] as NzCascaderTriggerType[];
  @Input() nzChangeOn?: (option: NzCascaderOption, level: number) => boolean;
  @Input() nzLoadData?: (node: NzCascaderOption, index: number) => PromiseLike<NzSafeAny> | Observable<NzSafeAny>;
  @Input() nzDisplayWith: (nodes: NzCascaderOption[]) => string | undefined = (nodes: NzCascaderOption[]) => {
    return defaultDisplayRender(nodes.map(n => this.cascaderService.getOptionLabel(n!)));
  };
  // TODO: RTL
  @Input() nzPrefix: string | TemplateRef<void> | null = null;
  @Input() nzSuffixIcon: string | TemplateRef<void> = 'down';
  @Input() nzExpandIcon: string | TemplateRef<void> = '';

  get treeService(): NzCascaderTreeService {
    return this.nzTreeService as NzCascaderTreeService;
  }

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();
  @Output() readonly nzSelectionChange = new EventEmitter<NzCascaderOption[]>();
  @Output() readonly nzRemoved = new EventEmitter<NzCascaderOption>();
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

  el: HTMLElement = this.elementRef.nativeElement;
  menuVisible = false;
  isLoading = false;
  labelRenderText?: string;
  labelRenderContext = {};
  onChange = Function.prototype;
  onTouched = Function.prototype;
  positions: ConnectionPositionPair[] = [...DEFAULT_CASCADER_POSITIONS];

  /**
   * Dropdown width in pixel.
   */
  dropdownWidthStyle?: string;
  dropdownHeightStyle: 'auto' | '' = '';
  dropdownPosition: NzCascaderPlacement = 'bottomLeft';
  isFocused = false;

  locale!: NzCascaderI18nInterface;
  dir: Direction = 'ltr';

  isComposing = false;

  protected get overlayOrigin(): ElementRef {
    return this.elementRef;
  }

  protected finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  private size = signal<NzSizeLDSType>(this.nzSize);
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private inputString = '';
  private isOpening = false;
  private delayMenuTimer?: ReturnType<typeof setTimeout>;
  private delaySelectTimer?: ReturnType<typeof setTimeout>;
  private isNzDisableFirstChange: boolean = true;
  selectedNodes: NzTreeNode[] = [];

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

  private get hasInput(): boolean {
    return !!this.inputValue;
  }

  private get hasValue(): boolean {
    return this.cascaderService.values && this.cascaderService.values.length > 0;
  }

  get showLabelRender(): boolean {
    return !this.hasInput && !!this.selectedNodes.length;
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

  private get openControlled(): boolean {
    return this.nzOpen !== undefined;
  }

  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
  public cascaderService = inject(NzCascaderService);

  constructor() {
    super(inject(NzCascaderTreeService));
    this.cascaderService.withComponent(this);
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-select');
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-cascader');

    this.destroyRef.onDestroy(() => {
      this.clearDelayMenuTimer();
      this.clearDelaySelectTimer();
    });

    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
      this.size.set(this.nzSize);
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    const srv = this.cascaderService;

    srv.$redraw.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      // These operations would not mutate data.
      this.checkChildren();
      this.setDisplayLabel();
      this.cdr.detectChanges();
      this.reposition();
      this.setDropdownStyles();
    });

    srv.$loading.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(loading => {
      this.isLoading = loading;
    });

    srv.$nodeSelected.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(node => {
      if (!node) {
        this.emitValue([]);
        this.nzSelectionChange.emit([]);
      } else {
        const shouldClose =
          // keep menu opened if multiple mode
          !this.nzMultiple &&
          (node.isLeaf || (this.nzChangeOnSelect && this.nzExpandTrigger === 'hover')) &&
          !this.openControlled;
        if (shouldClose) {
          this.delaySetMenuVisible(false);
        }
        this.nzSelectionChange.emit(this.getAncestorOptionList(node));
        this.cdr.markForCheck();
      }
    });

    srv.$quitSearching.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.inputValue = '';
      this.dropdownWidthStyle = '';
    });

    this.i18nService.localeChange.pipe(startWith(), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.setLocale();
    });

    this.size.set(this.nzSize);

    this.dir = this.directionality.value;
    this.directionality.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dir = this.directionality.value;
      srv.$redraw.next();
    });

    this.setupSelectionChangeListener();
    this.setupChangeListener();
    this.setupKeydownListener();
    this.setupFocusListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOpen, nzStatus, nzSize, nzPlacement, nzOptions } = changes;
    if (nzOpen && this.openControlled) {
      this.setMenuVisible(nzOpen.currentValue);
    }
    if (nzOptions) {
      this.updateOptions();
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
    if (nzPlacement) {
      const { currentValue } = nzPlacement;
      this.dropdownPosition = currentValue as NzCascaderPlacement;
      const listOfPlacement = ['bottomLeft', 'topLeft', 'bottomRight', 'topRight'];
      if (currentValue && listOfPlacement.includes(currentValue)) {
        this.positions = [POSITION_MAP[currentValue as POSITION_TYPE]];
      } else {
        this.positions = listOfPlacement.map(e => POSITION_MAP[e as POSITION_TYPE]);
      }
    }
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: NzSafeAny): void {
    if (isNotNil(value)) {
      if (this.nzMultiple) {
        this.cascaderService.values = toArray(value);
      } else {
        this.cascaderService.values = [toArray(value)];
      }
      // need clear selected nodes when user set value before updating
      this.clearSelectedNodes();
      this.updateSelectedNodes(true, false);
    } else {
      this.cascaderService.values = [];
      this.clearSelectedNodes();
      this.selectedNodes = [];
      this.cascaderService.$redraw.next();
    }
  }

  private setupSelectionChangeListener(): void {
    merge(this.nzSelectionChange, this.nzRemoved, this.nzClear)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateSelectedNodes();
        this.emitValue(this.cascaderService.values);
        this.cascaderService.$redraw.next();
      });
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
      this.cascaderService.$redraw.next();
      this.updateSelectedNodes(true);
      this.scrollToActivatedOptions();
    } else {
      this.inputValue = '';
    }

    this.menuVisible = visible;
    this.nzVisibleChange.emit(visible);
    this.cdr.detectChanges();
  }

  private clearDelayMenuTimer(): void {
    if (this.delayMenuTimer) {
      clearTimeout(this.delayMenuTimer);
      this.delayMenuTimer = undefined;
    }
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.clearSelectedNodes();
    this.labelRenderText = '';
    this.labelRenderContext = {};
    this.inputValue = '';
    if (!this.openControlled) {
      this.setMenuVisible(false);
    }
    this.cascaderService.clear();
    this.nzClear.emit();
  }

  clearSelectedNodes(): void {
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
  }

  emitValue(values: NzSafeAny[] | null): void {
    if (this.nzMultiple) {
      this.onChange(values);
    } else {
      this.onChange(values?.length ? values[0] : []);
    }
  }

  /**
   * @internal
   */
  getSubmitValue(): NzSafeAny[] {
    if (this.nzMultiple) {
      return this.cascaderService.values;
    } else {
      return this.cascaderService.values?.length ? this.cascaderService.values[0] : [];
    }
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

  isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
  }

  @HostListener('click')
  onTriggerClick(): void {
    if (this.nzDisabled || this.openControlled) {
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
    if (this.nzDisabled || !this.isActionTrigger('hover') || this.openControlled) {
      return;
    }

    this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
  }

  @HostListener('mouseleave', ['$event'])
  onTriggerMouseLeave(event: MouseEvent): void {
    if (
      this.nzDisabled ||
      !this.menuVisible ||
      this.isOpening ||
      !this.isActionTrigger('hover') ||
      this.openControlled
    ) {
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

  onOptionMouseEnter(node: NzTreeNode, columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover') {
      if (!node.isLeaf) {
        this.delaySetOptionActivated(node, columnIndex, false);
      } else {
        this.cascaderService.setNodeDeactivatedSinceColumn(columnIndex);
      }
    }
  }

  onOptionMouseLeave(node: NzTreeNode, _columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.nzExpandTrigger === 'hover' && !node.isLeaf) {
      this.clearDelaySelectTimer();
    }
  }

  /**
   * Get ancestor options of a node
   */
  protected getAncestorOptionList(node: NzTreeNode | null): NzCascaderOption[] {
    const ancestors = this.treeService.getAncestorNodeList(node);
    return this.treeService.toOptions(ancestors);
  }

  updateSelectedNodes(init: boolean = false, updateValue = true): void {
    const value = this.cascaderService.values;
    const multiple = this.nzMultiple;

    /**
     * Update selected nodes and emit value
     * @param shouldUpdateValue if false, only update selected nodes
     */
    const updateNodesAndValue = (shouldUpdateValue: boolean): void => {
      this.selectedNodes = [...(this.nzMultiple ? this.getCheckedNodeList() : this.getSelectedNodeList())].sort(
        (a, b) => {
          const indexA = value.indexOf(a.key);
          const indexB = value.indexOf(b.key);
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          if (indexA !== -1) {
            return -1;
          }
          if (indexB !== -1) {
            return 1;
          }
          return 0;
        }
      );
      if (shouldUpdateValue) {
        this.cascaderService.values = this.selectedNodes.map(node =>
          this.getAncestorOptionList(node).map(o => this.cascaderService.getOptionValue(o))
        );
      }
      this.cascaderService.$redraw.next();
    };

    if (init) {
      const defaultValue = value[0];
      const lastColumnIndex = defaultValue?.length ? defaultValue.length - 1 : 0;
      this.treeService.fieldNames = {
        value: this.nzValueProperty,
        label: this.nzLabelProperty
      };
      this.treeService.isMultiple = multiple;
      this.treeService.isCheckStrictly = false;

      /**
       * check whether the node is checked or selected according to the value
       */
      const checkNodeStates = (): void => {
        if (multiple) {
          this.treeService.conductCheckPaths(value, this.treeService.isCheckStrictly);
        } else {
          this.treeService.conductSelectedPaths(value);
        }
      };

      const initColumnWithIndex = (columnIndex = 0): void => {
        const activatedOptionSetter = (): void => {
          const currentValue = defaultValue?.[columnIndex];

          if (!isNotNil(currentValue)) {
            this.cascaderService.$redraw.next();
            return;
          }

          const node =
            this.cascaderService.columns[columnIndex].find(
              n => this.cascaderService.getOptionValue(n.origin) === currentValue
            ) || null;

          if (isNotNil(node)) {
            this.cascaderService.setNodeActivated(node, columnIndex, false, multiple, false);

            // Load next level options till leaf node
            if (columnIndex < lastColumnIndex) {
              initColumnWithIndex(columnIndex + 1);
            }
          }

          checkNodeStates();
          updateNodesAndValue(false);
        };

        if (this.cascaderService.isLoaded(columnIndex) || !this.nzLoadData) {
          activatedOptionSetter();
        } else {
          const node = this.cascaderService.activatedNodes[columnIndex - 1];
          this.cascaderService.loadChildren(node, columnIndex - 1, activatedOptionSetter);
        }
      };

      // if nzLoadData set, load first level data asynchronously
      if (this.nzLoadData) {
        initColumnWithIndex();
      } else {
        const nodes = this.coerceTreeNodes(this.nzOptions || []);
        this.treeService.initTree(nodes);
        this.cascaderService.setColumnData(nodes, 0);
        initColumnWithIndex();
      }
    }

    updateNodesAndValue(updateValue);
  }

  onOptionClick(node: NzTreeNode, columnIndex: number, event: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (node && node.isDisabled) {
      return;
    }

    this.el.focus();

    // for multiple mode, click the leaf node can be seen as check action
    if (this.nzMultiple && node.isLeaf) {
      this.onOptionCheck(node, columnIndex, true);
    } else {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(node, this.nzMultiple)
        : this.cascaderService.setNodeActivated(node, columnIndex, !this.nzMultiple);
    }
  }

  onOptionCheck(node: NzTreeNode, columnIndex: number, performActivate = false): void {
    if (!this.nzMultiple || node.isDisabled || node.isDisableCheckbox) {
      return;
    }

    node.isChecked = !node.isChecked;
    node.isHalfChecked = false;
    this.treeService.setCheckedNodeList(node);
    this.treeService.conduct(node, this.treeService.isCheckStrictly);

    if (this.inSearchingMode) {
      this.cascaderService.setSearchOptionSelected(node, true);
    } else if (performActivate) {
      this.cascaderService.setNodeActivated(node, columnIndex, true, true);
    } else {
      // only update selected nodes and not set node activated by default
      this.cascaderService.setNodeSelected(node, columnIndex, true);
    }
  }

  removeSelected(node: NzTreeNode, emitEvent = true): void {
    node.isSelected = false;
    node.isChecked = false;
    if (this.nzMultiple) {
      this.treeService.conduct(node, this.treeService.isCheckStrictly);
    }
    this.treeService.setSelectedNodeList(node, this.nzMultiple);
    if (emitEvent) {
      this.nzRemoved.emit(node.origin);
    }
  }

  onClickOutside(event: MouseEvent): void {
    const target = _getEventTarget(event);
    if (!this.el.contains(target as Node) && !this.openControlled) {
      this.closeMenu();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const placement = getPlacementName(position);
    this.dropdownPosition = placement as NzSelectPlacementType;
  }

  private updateOptions(): void {
    const nodes = this.coerceTreeNodes(this.nzOptions || []);
    this.treeService.initTree(nodes);
    this.cascaderService.setColumnData(nodes, 0);
    this.updateSelectedNodes(true);

    if (this.inSearchingMode) {
      this.cascaderService.setSearchingMode(this.inSearchingMode);
      this.cascaderService.prepareSearchOptions(this.inputValue);
    }
  }

  private isActionTrigger(action: 'click' | 'hover'): boolean {
    return typeof this.nzTriggerAction === 'string'
      ? this.nzTriggerAction === action
      : this.nzTriggerAction.indexOf(action) !== -1;
  }

  private onEnter(): void {
    const columnIndex = Math.max(this.cascaderService.activatedNodes.length - 1, 0);
    const node = this.cascaderService.activatedNodes[columnIndex];
    if (node && !node.isDisabled) {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(node)
        : this.cascaderService.setNodeActivated(node, columnIndex, true);
    }
  }

  private moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this.cascaderService.activatedNodes.length - 1, 0);
    const activatedNode = this.cascaderService.activatedNodes[columnIndex];
    const options = this.cascaderService.columns[columnIndex] || [];
    const length = options.length;
    let nextIndex = -1;
    if (!activatedNode) {
      // Not selected options in this column
      nextIndex = isUp ? length : -1;
    } else {
      nextIndex = options.indexOf(activatedNode);
    }

    while (true) {
      nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex < 0 || nextIndex >= length) {
        break;
      }
      const nextOption = options[nextIndex];
      if (!nextOption || nextOption.isDisabled) {
        continue;
      }
      this.cascaderService.setNodeActivated(nextOption, columnIndex);
      break;
    }
  }

  private prevColumn(): void {
    if (this.cascaderService.activatedNodes.length) {
      this.cascaderService.activatedNodes.pop(); // Remove the last one
      this.cascaderService.setNodeDeactivatedSinceColumn(this.cascaderService.activatedNodes.length); // collapse menu
      if (!this.cascaderService.activatedNodes.length) {
        this.setMenuVisible(false);
      }
    }
  }

  private nextColumn(): void {
    const length = this.cascaderService.activatedNodes.length;
    const options = this.cascaderService.columns[length];
    if (options && options.length) {
      const nextOpt = options.find(o => !o.isDisabled);
      if (nextOpt) {
        this.cascaderService.setNodeActivated(nextOpt, length);
      }
    }
  }

  private clearDelaySelectTimer(): void {
    if (this.delaySelectTimer) {
      clearTimeout(this.delaySelectTimer);
      this.delaySelectTimer = undefined;
    }
  }

  private delaySetOptionActivated(node: NzTreeNode, columnIndex: number, performSelect: boolean): void {
    this.clearDelaySelectTimer();
    this.delaySelectTimer = setTimeout(() => {
      this.cascaderService.setNodeActivated(node, columnIndex, performSelect, this.nzMultiple);
      this.delaySelectTimer = undefined;
    }, 150);
  }

  private toggleSearchingMode(toSearching: boolean): void {
    if (this.inSearchingMode !== toSearching) {
      this.cascaderService.setSearchingMode(toSearching);
    }

    if (this.inSearchingMode) {
      this.cascaderService.prepareSearchOptions(this.inputValue);
    }
  }

  isOptionActivated(node: NzTreeNode, index: number): boolean {
    return this.cascaderService.activatedNodes[index] === node;
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
    // if select none, clear previous state
    if (!this.hasValue && this.cascaderService.columns.length) {
      this.cascaderService.dropBehindColumns(0);
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
    if (this.nzMultiple) {
      return;
    }

    const node = this.selectedNodes.length ? this.selectedNodes[0] : null;
    const selectedOptions = this.getAncestorOptionList(node);
    const labels: string[] = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));

    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = { labels, selectedOptions };
    }
    this.labelRenderText = defaultDisplayRender.call(this, labels);
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
        switchMap(input => fromEventOutsideAngular(input?.nativeElement, 'change')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => event.stopPropagation());
  }

  private setupFocusListener(): void {
    this.input$
      .pipe(
        switchMap(input => fromEventOutsideAngular(input?.nativeElement, 'focus')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.handleInputFocus());

    this.input$
      .pipe(
        switchMap(input => fromEventOutsideAngular(input?.nativeElement, 'blur')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.handleInputBlur());
  }

  private setupKeydownListener(): void {
    fromEventOutsideAngular<KeyboardEvent>(this.el, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
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
        if (!this.menuVisible && keyCode !== BACKSPACE && keyCode !== ESCAPE && !this.openControlled) {
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
          switch (keyCode) {
            case DOWN_ARROW:
              this.moveUpOrDown(false);
              break;
            case UP_ARROW:
              this.moveUpOrDown(true);
              break;
            case LEFT_ARROW:
              if (this.dir === 'rtl') {
                this.nextColumn();
              } else {
                this.prevColumn();
              }
              break;
            case RIGHT_ARROW:
              if (this.dir === 'rtl') {
                this.prevColumn();
              } else {
                this.nextColumn();
              }
              break;
            case ENTER:
              this.onEnter();
              break;
            case BACKSPACE:
              this.prevColumn();
              break;
          }
          // `@HostListener`s run `markForCheck()` internally before calling the actual handler so
          // we call `markForCheck()` to be backwards-compatible.
          this.cdr.markForCheck();
        });
      });
  }
}
