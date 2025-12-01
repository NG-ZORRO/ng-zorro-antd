/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { _getEventTarget, Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  signal,
  output,
  DestroyRef,
  NgZone,
  ChangeDetectorRef,
  Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge, of as observableOf } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { slideMotion, NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormItemFeedbackIconComponent, NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzOverlayModule, POSITION_MAP, POSITION_TYPE, getPlacementName } from 'ng-zorro-antd/core/overlay';
import { cancelAnimationFrame, requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import {
  NgClassInterface,
  NzSafeAny,
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  NzVariant,
  OnChangeType,
  OnTouchedType
} from 'ng-zorro-antd/core/types';
import {
  fromEventOutsideAngular,
  getStatusClassNames,
  isNotNil,
  numberAttributeWithInfinityFallback
} from 'ng-zorro-antd/core/util';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzOptionContainerComponent } from './option-container.component';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionComponent } from './option.component';
import { NzSelectArrowComponent } from './select-arrow.component';
import { NzSelectClearComponent } from './select-clear.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import {
  NzFilterOptionType,
  NzSelectItemInterface,
  NzSelectModeType,
  NzSelectOptionInterface,
  NzSelectPlacementType
} from './select.types';

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'select';

export type NzSelectSizeType = NzSizeLDSType;

@Component({
  selector: 'nz-select',
  exportAs: 'nzSelect',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSelectComponent),
      multi: true
    },
    { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideMotion],
  template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="!!noAnimation?.nzNoAnimation?.()"
      [nzNoAnimation]="noAnimation?.nzNoAnimation?.()"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      [prefix]="nzPrefix"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    />
    @if (showArrow || (hasFeedback && !!status) || isMaxMultipleCountSet) {
      <nz-select-arrow
        [showArrow]="nzShowArrow"
        [loading]="nzLoading"
        [search]="nzOpen && nzShowSearch"
        [suffixIcon]="nzSuffixIcon"
        [feedbackIcon]="feedbackIconTpl"
        [nzMaxMultipleCount]="nzMaxMultipleCount"
        [listOfValue]="listOfValue"
        [isMaxMultipleCountSet]="isMaxMultipleCountSet"
      >
        <ng-template #feedbackIconTpl>
          @if (hasFeedback && !!status) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </ng-template>
      </nz-select-arrow>
    }

    @if (nzAllowClear && !nzDisabled && listOfValue.length) {
      <nz-select-clear [clearIcon]="nzClearIcon" (clear)="onClearSelection()" />
    }
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [style]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottomLeft'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'topLeft'"
        [class.ant-select-dropdown-placement-bottomRight]="dropdownPosition === 'bottomRight'"
        [class.ant-select-dropdown-placement-topRight]="dropdownPosition === 'topRight'"
        [@slideMotion]="'enter'"
        [@.disabled]="!!noAnimation?.nzNoAnimation?.()"
        [nzNoAnimation]="noAnimation?.nzNoAnimation?.()"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        [isMaxMultipleCountReached]="isMaxMultipleCountReached"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      />
    </ng-template>
  `,
  host: {
    class: 'ant-select',
    '[class.ant-select-in-form-item]': '!!nzFormStatusService',
    '[class.ant-select-lg]': 'finalSize() === "large"',
    '[class.ant-select-sm]': 'finalSize() === "small"',
    '[class.ant-select-show-arrow]': `showArrow`,
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-show-search]': `(nzShowSearch || nzMode !== 'default') && !nzDisabled`,
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-borderless]': `nzVariant === 'borderless'`,
    '[class.ant-select-filled]': `nzVariant === 'filled'`,
    '[class.ant-select-underlined]': `nzVariant === 'underlined'`,
    '[class.ant-select-open]': 'nzOpen',
    '[class.ant-select-focused]': 'nzOpen || focused',
    '[class.ant-select-single]': `nzMode === 'default'`,
    '[class.ant-select-multiple]': `nzMode !== 'default'`,
    '[class.ant-select-rtl]': `dir === 'rtl'`
  },
  hostDirectives: [NzSpaceCompactItemDirective],
  imports: [
    NzSelectTopControlComponent,
    CdkOverlayOrigin,
    NzNoAnimationDirective,
    NzSelectArrowComponent,
    NzFormItemFeedbackIconComponent,
    NzSelectClearComponent,
    CdkConnectedOverlay,
    NzOverlayModule,
    NzOptionContainerComponent
  ]
})
export class NzSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platform = inject(Platform);
  private readonly focusMonitor = inject(FocusMonitor);
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  @Input() nzId: string | null = null;
  @Input() nzSize: NzSelectSizeType = 'default';
  @Input() nzStatus: NzStatus = '';
  @Input() @WithConfig() nzVariant: NzVariant = 'outlined';
  @Input() @WithConfig() nzOptionHeightPx = 32;
  @Input() nzOptionOverflowSize = 8;
  @Input() nzDropdownClassName: string[] | string | null = null;
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzDropdownStyle: Record<string, string> | null = null;
  @Input() nzNotFoundContent: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzPlacement: NzSelectPlacementType | null = null;
  @Input() nzMaxTagCount = Infinity;
  @Input() nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() nzCustomTemplate: TemplateRef<{ $implicit: NzSelectItemInterface }> | null = null;
  @Input() nzPrefix: TemplateRef<NzSafeAny> | string | null = null;
  @Input()
  @WithConfig()
  nzSuffixIcon: TemplateRef<NzSafeAny> | string | null = null;
  @Input() nzClearIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzRemoveIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTokenSeparators: string[] = [];
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: NzSafeAny[] }> | null = null;
  @Input({ transform: numberAttributeWithInfinityFallback }) nzMaxMultipleCount = Infinity;
  @Input() nzMode: NzSelectModeType = 'default';
  @Input() nzFilterOption: NzFilterOptionType = defaultFilterOption;
  @Input() compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  @Input({ transform: booleanAttribute }) nzAllowClear = false;
  @Input({ transform: booleanAttribute }) nzShowSearch = false;
  @Input({ transform: booleanAttribute }) nzLoading = false;
  @Input({ transform: booleanAttribute }) nzAutoFocus = false;
  @Input({ transform: booleanAttribute }) nzAutoClearSearchValue = true;
  @Input({ transform: booleanAttribute }) nzServerSearch = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzOpen = false;
  @Input({ transform: booleanAttribute }) nzSelectOnTab = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzBackdrop = false;
  @Input() nzOptions: NzSelectOptionInterface[] = [];
  @Input({ transform: booleanAttribute }) nzShowArrow: boolean = true;

  get showArrow(): boolean {
    return this.nzShowArrow || !!this.nzSuffixIcon;
  }

  get isMultiple(): boolean {
    return this.nzMode === 'multiple' || this.nzMode === 'tags';
  }

  get isMaxMultipleCountSet(): boolean {
    return this.isMultiple && this.nzMaxMultipleCount !== Infinity;
  }

  get isMaxMultipleCountReached(): boolean {
    return this.nzMaxMultipleCount !== Infinity && this.listOfValue.length === this.nzMaxMultipleCount;
  }

  @Output() readonly nzOnSearch = new EventEmitter<string>();
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzBlur = new EventEmitter<void>();
  @Output() readonly nzFocus = new EventEmitter<void>();
  readonly nzOnClear = output<void>();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef }) originElement!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay!: CdkConnectedOverlay;
  @ViewChild(NzSelectTopControlComponent, { static: true }) nzSelectTopControlComponent!: NzSelectTopControlComponent;
  @ContentChildren(NzOptionComponent, { descendants: true }) listOfNzOptionComponent!: QueryList<NzOptionComponent>;
  @ContentChildren(NzOptionGroupComponent, { descendants: true })
  listOfNzOptionGroupComponent!: QueryList<NzOptionGroupComponent>;
  @ViewChild(NzOptionGroupComponent, { static: true, read: ElementRef }) nzOptionGroupComponentElement!: ElementRef;
  @ViewChild(NzSelectTopControlComponent, { static: true, read: ElementRef })
  nzSelectTopControlComponentElement!: ElementRef;

  protected finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  private size = signal<NzSizeLDSType>(this.nzSize);
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private listOfValue$ = new BehaviorSubject<NzSafeAny[]>([]);
  private listOfTemplateItem$ = new BehaviorSubject<NzSelectItemInterface[]>([]);
  private listOfTagAndTemplateItem: NzSelectItemInterface[] = [];
  private searchValue: string = '';
  private isReactiveDriven = false;
  private value: NzSafeAny | NzSafeAny[];
  private requestId: number = -1;
  private isNzDisableFirstChange: boolean = true;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  dropdownPosition: NzSelectPlacementType = 'bottomLeft';
  triggerWidth: number | null = null;
  listOfContainerItem: NzSelectItemInterface[] = [];
  listOfTopItem: NzSelectItemInterface[] = [];
  activatedValue: NzSafeAny | null = null;
  listOfValue: NzSafeAny[] = [];
  focused = false;
  dir: Direction = 'ltr';
  positions: ConnectionPositionPair[] = [];

  // status
  prefixCls: string = 'ant-select';
  statusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;

  generateTagItem(value: string): NzSelectItemInterface {
    return {
      nzValue: value,
      nzLabel: value,
      type: 'item'
    };
  }

  onItemClick(value: NzSafeAny): void {
    this.activatedValue = value;
    if (this.nzMode === 'default') {
      if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
        this.updateListOfValue([value]);
      }
      this.setOpenState(false);
    } else {
      const targetIndex = this.listOfValue.findIndex(o => this.compareWith(o, value));
      if (targetIndex !== -1) {
        const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
        this.updateListOfValue(listOfValueAfterRemoved);
      } else if (this.listOfValue.length < this.nzMaxMultipleCount) {
        const listOfValueAfterAdded = [...this.listOfValue, value];
        this.updateListOfValue(listOfValueAfterAdded);
      }
      this.focus();
      if (this.nzAutoClearSearchValue) {
        this.clearInput();
      }
    }
  }

  onItemDelete(item: NzSelectItemInterface): void {
    const listOfSelectedValue = this.listOfValue.filter(v => !this.compareWith(v, item.nzValue));
    this.updateListOfValue(listOfSelectedValue);
    this.clearInput();
  }

  updateListOfContainerItem(): void {
    let listOfContainerItem = this.listOfTagAndTemplateItem
      .filter(item => !item.nzHide)
      .filter(item => {
        if (!this.nzServerSearch && this.searchValue) {
          return this.nzFilterOption(this.searchValue, item);
        } else {
          return true;
        }
      });
    if (this.nzMode === 'tags' && this.searchValue) {
      const matchedItem = this.listOfTagAndTemplateItem.find(item => item.nzLabel === this.searchValue);
      if (!matchedItem) {
        const tagItem = this.generateTagItem(this.searchValue);
        listOfContainerItem = [tagItem, ...listOfContainerItem];
        this.activatedValue = tagItem.nzValue;
      } else {
        this.activatedValue = matchedItem.nzValue;
      }
    }
    const activatedItem =
      listOfContainerItem.find(item => item.nzLabel === this.searchValue) ||
      listOfContainerItem.find(item => this.compareWith(item.nzValue, this.activatedValue)) ||
      listOfContainerItem.find(item => this.compareWith(item.nzValue, this.listOfValue[0])) ||
      listOfContainerItem[0];
    this.activatedValue = (activatedItem && activatedItem.nzValue) || null;
    let listOfGroupLabel: Array<string | number | TemplateRef<NzSafeAny> | null> = [];
    if (this.isReactiveDriven) {
      listOfGroupLabel = [...new Set(this.nzOptions.filter(o => o.groupLabel).map(o => o.groupLabel!))];
    } else {
      if (this.listOfNzOptionGroupComponent) {
        listOfGroupLabel = this.listOfNzOptionGroupComponent.map(o => o.nzLabel);
      }
    }
    /** insert group item **/
    listOfGroupLabel.forEach(label => {
      const index = listOfContainerItem.findIndex(item => label === item.groupLabel);
      if (index > -1) {
        const groupItem = { groupLabel: label, type: 'group', key: label } as NzSelectItemInterface;
        listOfContainerItem.splice(index, 0, groupItem);
      }
    });
    this.listOfContainerItem = [...listOfContainerItem];
    this.updateCdkConnectedOverlayPositions();
  }

  clearInput(): void {
    this.nzSelectTopControlComponent.clearInputValue();
  }

  updateListOfValue(listOfValue: NzSafeAny[]): void {
    const covertListToModel = (list: NzSafeAny[], mode: NzSelectModeType): NzSafeAny[] | NzSafeAny => {
      if (mode === 'default') {
        if (list.length > 0) {
          return list[0];
        } else {
          return null;
        }
      } else {
        return list;
      }
    };
    const model = covertListToModel(listOfValue, this.nzMode);
    if (this.value !== model) {
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.value = model;
      this.onChange(this.value);
    }
  }

  onTokenSeparate(listOfLabel: string[]): void {
    const listOfMatchedValue = this.listOfTagAndTemplateItem
      .filter(item => listOfLabel.findIndex(label => label === item.nzLabel) !== -1)
      .map(item => item.nzValue)
      .filter(item => this.listOfValue.findIndex(v => this.compareWith(v, item)) === -1);
    /**
     * Limit the number of selected items to nzMaxMultipleCount
     */
    const limitWithinMaxCount = <T>(value: T[]): T[] =>
      this.isMaxMultipleCountSet ? value.slice(0, this.nzMaxMultipleCount) : value;

    if (this.nzMode === 'multiple') {
      const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue]);
      this.updateListOfValue(updateValue);
    } else if (this.nzMode === 'tags') {
      const listOfUnMatchedLabel = listOfLabel.filter(
        label => this.listOfTagAndTemplateItem.findIndex(item => item.nzLabel === label) === -1
      );
      const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
      this.updateListOfValue(updateValue);
    }
    this.clearInput();
  }

  onKeyDown(e: KeyboardEvent): void {
    if (this.nzDisabled) {
      return;
    }
    const listOfFilteredOptionNotDisabled = this.listOfContainerItem
      .filter(item => item.type === 'item')
      .filter(item => !item.nzDisabled);
    const activatedIndex = listOfFilteredOptionNotDisabled.findIndex(item =>
      this.compareWith(item.nzValue, this.activatedValue)
    );
    switch (e.keyCode) {
      case UP_ARROW:
        e.preventDefault();
        if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
          const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
          this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
        }
        break;
      case DOWN_ARROW:
        e.preventDefault();
        if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
          const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
          this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
        } else {
          this.setOpenState(true);
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.nzOpen) {
          if (isNotNil(this.activatedValue) && activatedIndex !== -1) {
            this.onItemClick(this.activatedValue);
          }
        } else {
          this.setOpenState(true);
        }
        break;
      case SPACE:
        if (!this.nzOpen) {
          this.setOpenState(true);
          e.preventDefault();
        }
        break;
      case TAB:
        if (this.nzSelectOnTab) {
          if (this.nzOpen) {
            e.preventDefault();
            if (isNotNil(this.activatedValue)) {
              this.onItemClick(this.activatedValue);
            }
          }
        } else {
          this.setOpenState(false);
        }
        break;
      case ESCAPE:
        /**
         * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
         */
        break;
      default:
        if (!this.nzOpen) {
          this.setOpenState(true);
        }
    }
  }

  setOpenState(value: boolean): void {
    if (this.nzOpen !== value) {
      this.nzOpen = value;
      this.nzOpenChange.emit(value);
      this.onOpenChange();
      this.cdr.markForCheck();
    }
  }

  onOpenChange(): void {
    this.updateCdkConnectedOverlayStatus();
    if (this.nzAutoClearSearchValue) {
      this.clearInput();
    }
  }

  onInputValueChange(value: string): void {
    this.searchValue = value;
    this.updateListOfContainerItem();
    this.nzOnSearch.emit(value);
    this.updateCdkConnectedOverlayPositions();
  }

  onClearSelection(): void {
    this.updateListOfValue([]);
    this.nzOnClear.emit();
  }

  onClickOutside(event: MouseEvent): void {
    const target = _getEventTarget(event);
    if (!this.host.nativeElement.contains(target as Node)) {
      this.setOpenState(false);
    }
  }

  focus(): void {
    this.nzSelectTopControlComponent.focus();
  }

  blur(): void {
    this.nzSelectTopControlComponent.blur();
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const placement = getPlacementName(position);
    this.dropdownPosition = placement as NzSelectPlacementType;
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.platform.isBrowser && this.originElement.nativeElement) {
      const triggerWidth = this.triggerWidth;
      cancelAnimationFrame(this.requestId);
      this.requestId = requestAnimationFrame(() => {
        // Blink triggers style and layout pipelines anytime the `getBoundingClientRect()` is called, which may cause a
        // frame drop. That's why it's scheduled through the `requestAnimationFrame` to unload the composite thread.
        this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
        if (triggerWidth !== this.triggerWidth) {
          // The `requestAnimationFrame` will trigger change detection, but we're inside an `OnPush` component which won't have
          // the `ChecksEnabled` state. Calling `markForCheck()` will allow Angular to run the change detection from the root component
          // down to the `nz-select`. But we'll trigger only local change detection if the `triggerWidth` has been changed.
          this.cdr.detectChanges();
        }
      });
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    requestAnimationFrame(() => {
      this.cdkConnectedOverlay?.overlayRef?.updatePosition();
    });
  }

  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  protected nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });

  constructor() {
    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.requestId);
      this.focusMonitor.stopMonitoring(this.host);
    });

    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
      this.size.set(this.nzSize);
      this.cdr.markForCheck();
    });
  }

  writeValue(modelValue: NzSafeAny | NzSafeAny[]): void {
    /** https://github.com/angular/angular/issues/14988 **/
    if (this.value !== modelValue) {
      this.value = modelValue;
      const covertModelToList = (model: NzSafeAny[] | NzSafeAny, mode: NzSelectModeType): NzSafeAny[] => {
        if (model === null || model === undefined) {
          return [];
        } else if (mode === 'default') {
          return [model];
        } else {
          return model;
        }
      };
      const listOfValue = covertModelToList(modelValue, this.nzMode);
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
    this.isNzDisableFirstChange = false;
    if (this.nzDisabled) {
      this.setOpenState(false);
    }
    this.cdr.markForCheck();
  }

  ngOnChanges({ nzOpen, nzDisabled, nzOptions, nzStatus, nzPlacement, nzSize }: SimpleChanges): void {
    if (nzOpen) {
      this.onOpenChange();
    }
    if (nzDisabled && this.nzDisabled) {
      this.setOpenState(false);
    }
    if (nzOptions) {
      this.isReactiveDriven = true;
      const listOfOptions = this.nzOptions || [];
      const listOfTransformedItem = listOfOptions.map(item => {
        return {
          template: item.label instanceof TemplateRef ? item.label : null,
          nzTitle: this.getTitle(item.title, item.label),
          nzLabel: typeof item.label === 'string' || typeof item.label === 'number' ? item.label : null,
          nzValue: item.value,
          nzDisabled: item.disabled || false,
          nzHide: item.hide || false,
          nzCustomContent: item.label instanceof TemplateRef,
          groupLabel: item.groupLabel || null,
          type: 'item',
          key: item.key === undefined ? item.value : item.key
        };
      });
      this.listOfTemplateItem$.next(listOfTransformedItem);
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
    if (nzPlacement) {
      const { currentValue } = nzPlacement;
      this.dropdownPosition = currentValue as NzSelectPlacementType;
      const listOfPlacement = ['bottomLeft', 'topLeft', 'bottomRight', 'topRight'];
      if (currentValue && listOfPlacement.includes(currentValue)) {
        this.positions = [POSITION_MAP[currentValue as POSITION_TYPE]];
      } else {
        this.positions = listOfPlacement.map(e => POSITION_MAP[e as POSITION_TYPE]);
      }
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : observableOf(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    this.focusMonitor
      .monitor(this.host, true)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          this.nzBlur.emit();
          Promise.resolve().then(() => {
            this.onTouched();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
          this.nzFocus.emit();
        }
      });
    combineLatest([this.listOfValue$, this.listOfTemplateItem$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
        const listOfTagItem = listOfSelectedValue
          .filter(() => this.nzMode === 'tags')
          .filter(value => listOfTemplateItem.findIndex(o => this.compareWith(o.nzValue, value)) === -1)
          .map(
            value => this.listOfTopItem.find(o => this.compareWith(o.nzValue, value)) || this.generateTagItem(value)
          );
        this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
        this.listOfTopItem = this.listOfValue
          .map(
            v =>
              [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find(item => this.compareWith(v, item.nzValue))!
          )
          .filter(item => !!item);
        this.updateListOfContainerItem();
      });

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    fromEventOutsideAngular(this.host.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if ((this.nzOpen && this.nzShowSearch) || this.nzDisabled) {
          return;
        }

        this.ngZone.run(() => this.setOpenState(!this.nzOpen));
      });

    // Caretaker note: we could've added this listener within the template `(overlayKeydown)="..."`,
    // but with this approach, it'll run change detection on each keyboard click, and also it'll run
    // `markForCheck()` internally, which means the whole component tree (starting from the root and
    // going down to the select component) will be re-checked and updated (if needed).
    // This is safe to do that manually since `setOpenState()` calls `markForCheck()` if needed.
    this.cdkConnectedOverlay.overlayKeydown.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event.keyCode === ESCAPE) {
        this.setOpenState(false);
      }
    });
  }

  ngAfterContentInit(): void {
    if (!this.isReactiveDriven) {
      merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes)
        .pipe(
          startWith(true),
          switchMap(() =>
            merge(
              ...[
                this.listOfNzOptionComponent.changes,
                this.listOfNzOptionGroupComponent.changes,
                ...this.listOfNzOptionComponent.map(option => option.changes),
                ...this.listOfNzOptionGroupComponent.map(option => option.changes)
              ]
            ).pipe(startWith(true))
          ),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          const listOfOptionInterface = this.listOfNzOptionComponent.toArray().map(item => {
            const { template, nzLabel, nzValue, nzKey, nzDisabled, nzHide, nzCustomContent, groupLabel } = item;
            return {
              template,
              nzLabel,
              nzValue,
              nzDisabled,
              nzHide,
              nzCustomContent,
              groupLabel,
              nzTitle: this.getTitle(item.nzTitle, item.nzLabel),
              type: 'item',
              key: nzKey === undefined ? nzValue : nzKey
            };
          });
          this.listOfTemplateItem$.next(listOfOptionInterface);
          this.cdr.markForCheck();
        });
    }
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.host.nativeElement, status);
      } else {
        this.renderer.removeClass(this.host.nativeElement, status);
      }
    });
  }

  private getTitle(title: NzSelectOptionInterface['title'], label: NzSelectOptionInterface['label']): string {
    let rawTitle: string = undefined!;
    if (title === undefined) {
      if (typeof label === 'string' || typeof label === 'number') {
        rawTitle = label.toString();
      }
    } else if (typeof title === 'string' || typeof title === 'number') {
      rawTitle = title.toString();
    }

    return rawTitle;
  }
}
