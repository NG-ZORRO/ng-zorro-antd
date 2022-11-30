/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, ESCAPE, TAB } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, of as observableOf, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import {
  NzFormatEmitEvent,
  NzTreeBase,
  NzTreeBaseService,
  NzTreeHigherOrderServiceToken,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd/core/tree';
import {
  BooleanInput,
  NgClassInterface,
  NgStyleInterface,
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  OnChangeType,
  OnTouchedType
} from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

import { NzTreeSelectService } from './tree-select.service';

export function higherOrderServiceFactory(injector: Injector): NzTreeBaseService {
  return injector.get(NzTreeSelectService);
}

export type NzPlacementType = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | '';
const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'treeSelect';
const TREE_SELECT_DEFAULT_CLASS = 'ant-select-dropdown ant-select-tree-dropdown';
const listOfPositions = [
  POSITION_MAP.bottomLeft,
  POSITION_MAP.bottomRight,
  POSITION_MAP.topRight,
  POSITION_MAP.topLeft
];

@Component({
  selector: 'nz-tree-select',
  exportAs: 'nzTreeSelect',
  animations: [slideMotion],
  template: `
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayPositions]="nzPlacement ? positions : []"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [ngClass]="dropdownClassName"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [class.ant-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [ngStyle]="nzDropdownStyle"
      >
        <nz-tree
          #treeRef
          [hidden]="isNotFound"
          nzNoAnimation
          nzSelectMode
          nzBlockNode
          [nzData]="nzNodes"
          [nzMultiple]="nzMultiple"
          [nzSearchValue]="inputValue"
          [nzHideUnMatched]="nzHideUnMatched"
          [nzShowIcon]="nzShowIcon"
          [nzCheckable]="nzCheckable"
          [nzAsyncData]="nzAsyncData"
          [nzShowExpand]="nzShowExpand"
          [nzShowLine]="nzShowLine"
          [nzExpandedIcon]="nzExpandedIcon"
          [nzExpandAll]="nzDefaultExpandAll"
          [nzExpandedKeys]="expandedKeys"
          [nzCheckedKeys]="nzCheckable ? value : []"
          [nzSelectedKeys]="!nzCheckable ? value : []"
          [nzTreeTemplate]="treeTemplate"
          [nzCheckStrictly]="nzCheckStrictly"
          [nzVirtualItemSize]="nzVirtualItemSize"
          [nzVirtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [nzVirtualMinBufferPx]="nzVirtualMinBufferPx"
          [nzVirtualHeight]="nzVirtualHeight"
          (nzExpandChange)="onExpandedKeysChange($event)"
          (nzClick)="nzTreeClick.emit($event)"
          (nzCheckedKeysChange)="updateSelectedNodes()"
          (nzSelectedKeysChange)="updateSelectedNodes()"
          (nzCheckBoxChange)="nzTreeCheckBoxChange.emit($event)"
          (nzSearchValueChange)="setSearchValues($event)"
        ></nz-tree>
        <span *ngIf="nzNodes.length === 0 || isNotFound" class="ant-select-not-found">
          <nz-embed-empty [nzComponentName]="'tree-select'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
        </span>
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="ant-select-selector">
      <ng-container *ngIf="isMultiple">
        <nz-select-item
          *ngFor="let node of selectedNodes | slice: 0:nzMaxTagCount; trackBy: trackValue"
          [deletable]="true"
          [disabled]="node.isDisabled || nzDisabled"
          [label]="nzDisplayWith(node)"
          (delete)="removeSelected(node, true)"
        ></nz-select-item>

        <nz-select-item
          *ngIf="selectedNodes.length > nzMaxTagCount"
          [contentTemplateOutlet]="nzMaxTagPlaceholder"
          [contentTemplateOutletContext]="selectedNodes | slice: nzMaxTagCount"
          [deletable]="false"
          [disabled]="false"
          [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'"
        ></nz-select-item>
      </ng-container>

      <nz-select-search
        [nzId]="nzId"
        [showInput]="nzShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposing = $event"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="nzDisabled"
        [focusTrigger]="nzOpen"
      ></nz-select-search>

      <nz-select-placeholder
        *ngIf="nzPlaceHolder && selectedNodes.length === 0"
        [placeholder]="nzPlaceHolder"
        [style.display]="placeHolderDisplay"
      ></nz-select-placeholder>

      <nz-select-item
        *ngIf="!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === ''"
        [deletable]="false"
        [disabled]="false"
        [label]="nzDisplayWith(selectedNodes[0])"
      ></nz-select-item>

      <nz-select-arrow *ngIf="!isMultiple"></nz-select-arrow>
      <nz-select-arrow
        *ngIf="!isMultiple || (hasFeedback && !!status)"
        [showArrow]="!isMultiple"
        [feedbackIcon]="feedbackIconTpl"
      >
        <ng-template #feedbackIconTpl>
          <nz-form-item-feedback-icon *ngIf="hasFeedback && !!status" [status]="status"></nz-form-item-feedback-icon>
        </ng-template>
      </nz-select-arrow>
      <nz-select-clear
        *ngIf="nzAllowClear && !nzDisabled && selectedNodes.length"
        (clear)="onClearSelection()"
      ></nz-select-clear>
    </div>
  `,
  providers: [
    NzTreeSelectService,
    {
      provide: NzTreeHigherOrderServiceToken,
      useFactory: higherOrderServiceFactory,
      deps: [[new Self(), Injector]]
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeSelectComponent),
      multi: true
    }
  ],
  host: {
    class: 'ant-select',
    '[class.ant-select-in-form-item]': '!!nzFormStatusService',
    '[class.ant-select-lg]': 'nzSize==="large"',
    '[class.ant-select-rtl]': 'dir==="rtl"',
    '[class.ant-select-sm]': 'nzSize==="small"',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-single]': '!isMultiple',
    '[class.ant-select-show-arrow]': '!isMultiple',
    '[class.ant-select-show-search]': '!isMultiple',
    '[class.ant-select-multiple]': 'isMultiple',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]': 'nzOpen',
    '[class.ant-select-focused]': 'nzOpen || focused',
    '(click)': 'trigger()',
    '(keydown)': 'onKeydown($event)'
  }
})
export class NzTreeSelectComponent extends NzTreeBase implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzShowExpand: BooleanInput;
  static ngAcceptInputType_nzShowLine: BooleanInput;
  static ngAcceptInputType_nzDropdownMatchSelectWidth: BooleanInput;
  static ngAcceptInputType_nzCheckable: BooleanInput;
  static ngAcceptInputType_nzHideUnMatched: BooleanInput;
  static ngAcceptInputType_nzShowIcon: BooleanInput;
  static ngAcceptInputType_nzShowSearch: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAsyncData: BooleanInput;
  static ngAcceptInputType_nzMultiple: BooleanInput;
  static ngAcceptInputType_nzDefaultExpandAll: BooleanInput;
  static ngAcceptInputType_nzCheckStrictly: BooleanInput;

  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @InputBoolean() nzShowExpand: boolean = true;
  @Input() @InputBoolean() nzShowLine: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzDropdownMatchSelectWidth: boolean = true;
  @Input() @InputBoolean() nzCheckable: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzHideUnMatched: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzShowIcon: boolean = false;
  @Input() @InputBoolean() nzShowSearch: boolean = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzMultiple = false;
  @Input() @InputBoolean() nzDefaultExpandAll = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() nzVirtualItemSize = 28;
  @Input() nzVirtualMaxBufferPx = 500;
  @Input() nzVirtualMinBufferPx = 28;
  @Input() nzVirtualHeight: string | null = null;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzNotFoundContent?: string;
  @Input() nzNodes: NzTreeNodeOptions[] | NzTreeNode[] = [];
  @Input() nzOpen = false;
  @Input() @WithConfig() nzSize: NzSizeLDSType = 'default';
  @Input() nzPlaceHolder = '';
  @Input() nzDropdownStyle: NgStyleInterface | null = null;
  @Input() nzDropdownClassName?: string;
  @Input() @WithConfig() nzBackdrop = false;
  @Input() nzStatus: NzStatus = '';
  @Input() nzPlacement: NzPlacementType = '';
  @Input()
  set nzExpandedKeys(value: string[]) {
    this.expandedKeys = value;
  }
  get nzExpandedKeys(): string[] {
    return this.expandedKeys;
  }

  @Input() nzDisplayWith: (node: NzTreeNode) => string | undefined = (node: NzTreeNode) => node.title;
  @Input() nzMaxTagCount!: number;
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: NzTreeNode[] }> | null = null;
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzCleared = new EventEmitter<void>();
  @Output() readonly nzRemoved = new EventEmitter<NzTreeNode>();
  @Output() readonly nzExpandChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeCheckBoxChange = new EventEmitter<NzFormatEmitEvent>();

  @ViewChild(NzSelectSearchComponent, { static: false }) nzSelectSearchComponent!: NzSelectSearchComponent;
  @ViewChild('treeRef', { static: false }) treeRef!: NzTreeComponent;
  @ViewChild(CdkOverlayOrigin, { static: true }) cdkOverlayOrigin!: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay!: CdkConnectedOverlay;

  @Input() nzTreeTemplate!: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @ContentChild('nzTreeTemplate', { static: true }) nzTreeTemplateChild!: TemplateRef<{
    $implicit: NzTreeNode;
    origin: NzTreeNodeOptions;
  }>;
  get treeTemplate(): TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> {
    return this.nzTreeTemplate || this.nzTreeTemplateChild;
  }

  prefixCls: string = 'ant-select';
  statusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;

  dropdownClassName = TREE_SELECT_DEFAULT_CLASS;
  triggerWidth?: number;
  isComposing = false;
  isDestroy = true;
  isNotFound = false;
  focused = false;
  inputValue = '';
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  selectedNodes: NzTreeNode[] = [];
  expandedKeys: string[] = [];
  value: string[] = [];
  dir: Direction = 'ltr';
  positions: ConnectionPositionPair[] = [];

  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;

  onChange: OnChangeType = _value => {};
  onTouched: OnTouchedType = () => {};

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.selectedNodes.length ? 'none' : 'block';
  }

  get isMultiple(): boolean {
    return this.nzMultiple || this.nzCheckable;
  }

  constructor(
    nzTreeService: NzTreeSelectService,
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    private focusMonitor: FocusMonitor,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
    @Optional() public nzFormStatusService?: NzFormStatusService,
    @Optional() private nzFormNoStatusService?: NzFormNoStatusService
  ) {
    super(nzTreeService);

    this.renderer.addClass(this.elementRef.nativeElement, 'ant-select');
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-select');
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

    this.isDestroy = false;
    this.subscribeSelectionChange();

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;

    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          Promise.resolve().then(() => {
            this.onTouched();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.closeDropDown();
    this.destroy$.next();
    this.destroy$.complete();
  }

  isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.closeDropDown();
    this.isNzDisableFirstChange = false;
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

  ngOnChanges(changes: SimpleChanges): void {
    const { nzNodes, nzDropdownClassName, nzStatus, nzPlacement } = changes;
    if (nzNodes) {
      this.updateSelectedNodes(true);
    }
    if (nzDropdownClassName) {
      const className = this.nzDropdownClassName && this.nzDropdownClassName.trim();
      this.dropdownClassName = className ? `${TREE_SELECT_DEFAULT_CLASS} ${className}` : TREE_SELECT_DEFAULT_CLASS;
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }

    if (nzPlacement && this.nzPlacement) {
      if (POSITION_MAP[this.nzPlacement]) {
        this.positions = [POSITION_MAP[this.nzPlacement]];
      }
    }
  }

  writeValue(value: string[] | string): void {
    if (isNotNil(value)) {
      if (this.isMultiple && Array.isArray(value)) {
        this.value = value;
      } else {
        this.value = [value as string];
      }
      this.updateSelectedNodes(true);
    } else {
      this.value = [];
      this.selectedNodes.forEach(node => {
        this.removeSelected(node, false);
      });
      this.selectedNodes = [];
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string[] | string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.nzDisabled) {
      return;
    }
    switch (event.keyCode) {
      case ESCAPE:
        /**
         * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
         */
        break;
      case TAB:
        this.closeDropDown();
        break;
      default:
        if (!this.nzOpen) {
          this.openDropdown();
        }
    }
  }

  trigger(): void {
    if (this.nzDisabled || (!this.nzDisabled && this.nzOpen)) {
      this.closeDropDown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    if (!this.nzDisabled) {
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
      this.updateCdkConnectedOverlayStatus();
      if (this.nzShowSearch || this.isMultiple) {
        this.focusOnInput();
      }
    }
  }

  closeDropDown(): void {
    this.onTouched();
    this.nzOpen = false;
    this.inputValue = '';
    this.isNotFound = false;
    this.nzOpenChange.emit(this.nzOpen);
    this.cdr.markForCheck();
  }

  onKeyDownInput(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (this.isMultiple && !eventTarget.value && keyCode === BACKSPACE) {
      e.preventDefault();
      if (this.selectedNodes.length) {
        const removeNode = this.selectedNodes[this.selectedNodes.length - 1];
        this.removeSelected(removeNode);
      }
    }
  }

  onExpandedKeysChange(value: NzFormatEmitEvent): void {
    this.nzExpandChange.emit(value);
    this.expandedKeys = [...value.keys!];
  }

  setInputValue(value: string): void {
    this.inputValue = value;
    this.updatePosition();
  }

  removeSelected(node: NzTreeNode, emit: boolean = true): void {
    node.isSelected = false;
    node.isChecked = false;
    if (this.nzCheckable) {
      this.nzTreeService.conduct(node, this.nzCheckStrictly);
    } else {
      this.nzTreeService.setSelectedNodeList(node, this.nzMultiple);
    }

    if (emit) {
      this.nzRemoved.emit(node);
    }
  }

  focusOnInput(): void {
    if (this.nzSelectSearchComponent) {
      this.nzSelectSearchComponent.focus();
    }
  }

  subscribeSelectionChange(): void {
    merge(
      this.nzTreeClick.pipe(
        tap((event: NzFormatEmitEvent) => {
          const node = event.node!;
          if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
            node.isChecked = !node.isChecked;
            node.isHalfChecked = false;
            if (!this.nzCheckStrictly) {
              this.nzTreeService.conduct(node);
            }
          }
          if (this.nzCheckable) {
            node.isSelected = false;
          }
        }),
        filter((event: NzFormatEmitEvent) => {
          const node = event.node!;
          return this.nzCheckable ? !node.isDisabled && !node.isDisableCheckbox : !node.isDisabled && node.isSelectable;
        })
      ),
      this.nzCheckable ? this.nzTreeCheckBoxChange : observableOf(),
      this.nzCleared,
      this.nzRemoved
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateSelectedNodes();
        const value = this.selectedNodes.map(node => node.key!);
        this.value = [...value];
        if (this.nzShowSearch || this.isMultiple) {
          this.inputValue = '';
          this.isNotFound = false;
        }
        if (this.isMultiple) {
          this.onChange(value);
          this.focusOnInput();
          this.updatePosition();
        } else {
          this.closeDropDown();
          this.onChange(value.length ? value[0] : null);
        }
      });
  }

  updateSelectedNodes(init: boolean = false): void {
    if (init) {
      const nodes = this.coerceTreeNodes(this.nzNodes);
      this.nzTreeService.isMultiple = this.isMultiple;
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
      this.nzTreeService.initTree(nodes);
      if (this.nzCheckable) {
        this.nzTreeService.conductCheck(this.value, this.nzCheckStrictly);
      } else {
        this.nzTreeService.conductSelectedKeys(this.value, this.isMultiple);
      }
    }

    this.selectedNodes = [...(this.nzCheckable ? this.getCheckedNodeList() : this.getSelectedNodeList())];
  }

  updatePosition(): void {
    reqAnimFrame(() => {
      this.cdkConnectedOverlay?.overlayRef?.updatePosition();
    });
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  onClearSelection(): void {
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
    this.nzCleared.emit();
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropDown();
    }
  }

  setSearchValues($event: NzFormatEmitEvent): void {
    Promise.resolve().then(() => {
      this.isNotFound = (this.nzShowSearch || this.isMultiple) && !!this.inputValue && $event.matchedKeys!.length === 0;
    });
  }

  updateCdkConnectedOverlayStatus(): void {
    if (!this.nzPlacement || !listOfPositions.includes(POSITION_MAP[this.nzPlacement])) {
      this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }
  }

  trackValue(_index: number, option: NzTreeNode): string {
    return option.key!;
  }
}
