/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChange,
  SkipSelf,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import {
  flattenTreeData,
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzTreeBase,
  NzTreeBaseService,
  NzTreeHigherOrderServiceToken,
  NzTreeNode,
  NzTreeNodeKey,
  NzTreeNodeOptions
} from 'ng-zorro-antd/core/tree';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzTreeService } from './tree.service';

export function NzTreeServiceFactory(
  higherOrderService: NzTreeBaseService,
  treeService: NzTreeService
): NzTreeBaseService {
  return higherOrderService ? higherOrderService : treeService;
}

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'tree';

@Component({
  selector: 'nz-tree',
  exportAs: 'nzTree',
  animations: [treeCollapseMotion],
  template: `
    <div>
      <input [ngStyle]="HIDDEN_STYLE" />
    </div>
    <div class="ant-tree-treenode" [ngStyle]="HIDDEN_NODE_STYLE">
      <div class="ant-tree-indent">
        <div class="ant-tree-indent-unit"></div>
      </div>
    </div>
    <div class="ant-tree-list" [class.ant-select-tree-list]="nzSelectMode" style="position: relative">
      <cdk-virtual-scroll-viewport
        *ngIf="nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [itemSize]="nzVirtualItemSize"
        [minBufferPx]="nzVirtualMinBufferPx"
        [maxBufferPx]="nzVirtualMaxBufferPx"
        [style.height]="nzVirtualHeight"
      >
        <ng-container *cdkVirtualFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>

      <div
        *ngIf="!nzVirtualHeight"
        [class.ant-select-tree-list-holder-inner]="nzSelectMode"
        [class.ant-tree-list-holder-inner]="!nzSelectMode"
        [@.disabled]="beforeInit || !!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="nzFlattenNodes.length"
      >
        <ng-container *ngFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
          <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
        </ng-container>
      </div>
    </div>
    <ng-template #nodeTemplate let-treeNode>
      <nz-tree-node
        builtin
        [icon]="treeNode.icon"
        [title]="treeNode.title"
        [isLoading]="treeNode.isLoading"
        [isSelected]="treeNode.isSelected"
        [isDisabled]="treeNode.isDisabled"
        [isMatched]="treeNode.isMatched"
        [isExpanded]="treeNode.isExpanded"
        [isLeaf]="treeNode.isLeaf"
        [isStart]="treeNode.isStart"
        [isEnd]="treeNode.isEnd"
        [isChecked]="treeNode.isChecked"
        [isHalfChecked]="treeNode.isHalfChecked"
        [isDisableCheckbox]="treeNode.isDisableCheckbox"
        [isSelectable]="treeNode.isSelectable"
        [canHide]="treeNode.canHide"
        [nzTreeNode]="treeNode"
        [nzSelectMode]="nzSelectMode"
        [nzShowLine]="nzShowLine"
        [nzExpandedIcon]="nzExpandedIcon"
        [nzDraggable]="nzDraggable"
        [nzCheckable]="nzCheckable"
        [nzShowExpand]="nzShowExpand"
        [nzAsyncData]="nzAsyncData"
        [nzSearchValue]="nzSearchValue"
        [nzHideUnMatched]="nzHideUnMatched"
        [nzBeforeDrop]="nzBeforeDrop"
        [nzShowIcon]="nzShowIcon"
        [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
        (nzExpandChange)="eventTriggerChanged($event)"
        (nzClick)="eventTriggerChanged($event)"
        (nzDblClick)="eventTriggerChanged($event)"
        (nzContextMenu)="eventTriggerChanged($event)"
        (nzCheckBoxChange)="eventTriggerChanged($event)"
        (nzOnDragStart)="eventTriggerChanged($event)"
        (nzOnDragEnter)="eventTriggerChanged($event)"
        (nzOnDragOver)="eventTriggerChanged($event)"
        (nzOnDragLeave)="eventTriggerChanged($event)"
        (nzOnDragEnd)="eventTriggerChanged($event)"
        (nzOnDrop)="eventTriggerChanged($event)"
      ></nz-tree-node>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NzTreeService,
    {
      provide: NzTreeBaseService,
      useFactory: NzTreeServiceFactory,
      deps: [[new SkipSelf(), new Optional(), NzTreeHigherOrderServiceToken], NzTreeService]
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-select-tree]': `nzSelectMode`,
    '[class.ant-select-tree-show-line]': `nzSelectMode && nzShowLine`,
    '[class.ant-select-tree-icon-hide]': `nzSelectMode && !nzShowIcon`,
    '[class.ant-select-tree-block-node]': `nzSelectMode && nzBlockNode`,
    '[class.ant-tree]': `!nzSelectMode`,
    '[class.ant-tree-rtl]': `dir === 'rtl'`,
    '[class.ant-tree-show-line]': `!nzSelectMode && nzShowLine`,
    '[class.ant-tree-icon-hide]': `!nzSelectMode && !nzShowIcon`,
    '[class.ant-tree-block-node]': `!nzSelectMode && nzBlockNode`,
    '[class.draggable-tree]': `nzDraggable`
  }
})
export class NzTreeComponent
  extends NzTreeBase
  implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterViewInit
{
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzShowIcon: BooleanInput;
  static ngAcceptInputType_nzHideUnMatched: BooleanInput;
  static ngAcceptInputType_nzBlockNode: BooleanInput;
  static ngAcceptInputType_nzExpandAll: BooleanInput;
  static ngAcceptInputType_nzSelectMode: BooleanInput;
  static ngAcceptInputType_nzCheckStrictly: BooleanInput;
  static ngAcceptInputType_nzShowExpand: BooleanInput;
  static ngAcceptInputType_nzShowLine: BooleanInput;
  static ngAcceptInputType_nzCheckable: BooleanInput;
  static ngAcceptInputType_nzAsyncData: BooleanInput;
  static ngAcceptInputType_nzDraggable: BooleanInput;
  static ngAcceptInputType_nzMultiple: BooleanInput;

  @Input() @InputBoolean() @WithConfig() nzShowIcon: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzHideUnMatched: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzBlockNode: boolean = false;
  @Input() @InputBoolean() nzExpandAll = false;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() @InputBoolean() nzShowExpand: boolean = true;
  @Input() @InputBoolean() nzShowLine = false;
  @Input() @InputBoolean() nzCheckable = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzDraggable: boolean = false;
  @Input() @InputBoolean() nzMultiple = false;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzVirtualItemSize = 28;
  @Input() nzVirtualMaxBufferPx = 500;
  @Input() nzVirtualMinBufferPx = 28;
  @Input() nzVirtualHeight: string | null = null;
  @Input() nzTreeTemplate?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzBeforeDrop?: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input() nzData: NzTreeNodeOptions[] | NzTreeNode[] = [];
  @Input() nzExpandedKeys: NzTreeNodeKey[] = [];
  @Input() nzSelectedKeys: NzTreeNodeKey[] = [];
  @Input() nzCheckedKeys: NzTreeNodeKey[] = [];
  @Input() nzSearchValue: string = '';
  @Input() nzSearchFunc?: (node: NzTreeNodeOptions) => boolean;
  @ContentChild('nzTreeTemplate', { static: true }) nzTreeTemplateChild!: TemplateRef<{
    $implicit: NzTreeNode;
    origin: NzTreeNodeOptions;
  }>;
  @ViewChild(CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport })
  cdkVirtualScrollViewport!: CdkVirtualScrollViewport;
  nzFlattenNodes: NzTreeNode[] = [];
  beforeInit = true;
  dir: Direction = 'ltr';

  @Output() readonly nzExpandedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzSelectedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzCheckedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzSearchValueChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzDblClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzContextMenu = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzCheckBoxChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzExpandChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDragStart = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDragEnter = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDragOver = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDragLeave = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDrop = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzOnDragEnd = new EventEmitter<NzFormatEmitEvent>();

  HIDDEN_STYLE = {
    width: 0,
    height: 0,
    display: 'flex',
    overflow: 'hidden',
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0
  };

  HIDDEN_NODE_STYLE = {
    position: 'absolute',
    pointerEvents: 'none',
    visibility: 'hidden',
    height: 0,
    overflow: 'hidden'
  };

  destroy$ = new Subject();

  onChange: (value: NzTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  writeValue(value: NzTreeNode[]): void {
    this.handleNzData(value);
  }

  registerOnChange(fn: (_: NzTreeNode[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Render all properties of nzTree
   *
   * @param changes: all changes from @Input
   */
  renderTreeProperties(changes: { [propertyName: string]: SimpleChange }): void {
    let useDefaultExpandedKeys = false;
    let expandAll = false;
    const {
      nzData,
      nzExpandedKeys,
      nzSelectedKeys,
      nzCheckedKeys,
      nzCheckStrictly,
      nzExpandAll,
      nzMultiple,
      nzSearchValue
    } = changes;

    if (nzExpandAll) {
      useDefaultExpandedKeys = true;
      expandAll = this.nzExpandAll;
    }

    if (nzMultiple) {
      this.nzTreeService.isMultiple = this.nzMultiple;
    }

    if (nzCheckStrictly) {
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
    }

    if (nzData) {
      this.handleNzData(this.nzData);
    }

    if (nzCheckedKeys) {
      this.handleCheckedKeys(this.nzCheckedKeys);
    }

    if (nzCheckStrictly) {
      this.handleCheckedKeys(null);
    }

    if (nzExpandedKeys || nzExpandAll) {
      useDefaultExpandedKeys = true;
      this.handleExpandedKeys(expandAll || this.nzExpandedKeys);
    }

    if (nzSelectedKeys) {
      this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
    }

    if (nzSearchValue) {
      if (!(nzSearchValue.firstChange && !this.nzSearchValue)) {
        useDefaultExpandedKeys = false;
        this.handleSearchValue(nzSearchValue.currentValue, this.nzSearchFunc);
        this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
      }
    }

    // flatten data
    const currentExpandedKeys = this.getExpandedNodeList().map(v => v.key);
    const newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
    this.handleFlattenNodes(this.nzTreeService.rootNodes, newExpandedKeys);
  }

  trackByFlattenNode(_: number, node: NzTreeNode): string {
    return node.key;
  }
  // Deal with properties
  /**
   * nzData
   *
   * @param value
   */
  handleNzData(value: NzSafeAny[]): void {
    if (Array.isArray(value)) {
      const data = this.coerceTreeNodes(value);
      this.nzTreeService.initTree(data);
    }
  }

  handleFlattenNodes(data: NzTreeNode[], expandKeys: NzTreeNodeKey[] | true = []): void {
    this.nzTreeService.flattenTreeData(data, expandKeys);
  }

  handleCheckedKeys(keys: NzTreeNodeKey[] | null): void {
    this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
  }

  handleExpandedKeys(keys: NzTreeNodeKey[] | true = []): void {
    this.nzTreeService.conductExpandedKeys(keys);
  }

  handleSelectedKeys(keys: NzTreeNodeKey[], isMulti: boolean): void {
    this.nzTreeService.conductSelectedKeys(keys, isMulti);
  }

  handleSearchValue(value: string, searchFunc?: (node: NzTreeNodeOptions) => boolean): void {
    const dataList = flattenTreeData(this.nzTreeService.rootNodes, true).map(v => v.data);
    const checkIfMatched = (node: NzTreeNode): boolean => {
      if (searchFunc) {
        return searchFunc(node.origin);
      }
      return !value || !node.title.toLowerCase().includes(value.toLowerCase()) ? false : true;
    };
    dataList.forEach(v => {
      v.isMatched = checkIfMatched(v);
      v.canHide = !v.isMatched;
      if (!v.isMatched) {
        v.setExpanded(false);
        this.nzTreeService.setExpandedNodeList(v);
      } else {
        // expand
        this.nzTreeService.expandNodeAllParentBySearch(v);
      }
      this.nzTreeService.setMatchedNodeList(v);
    });
  }

  /**
   * Handle emit event
   *
   * @param event
   * handle each event
   */
  eventTriggerChanged(event: NzFormatEmitEvent): void {
    const node = event.node!;
    switch (event.eventName) {
      case 'expand':
        this.renderTree();
        this.nzExpandChange.emit(event);
        break;
      case 'click':
        this.nzClick.emit(event);
        break;
      case 'dblclick':
        this.nzDblClick.emit(event);
        break;
      case 'contextmenu':
        this.nzContextMenu.emit(event);
        break;
      case 'check':
        // Render checked state with nodes' property `isChecked`
        this.nzTreeService.setCheckedNodeList(node);
        if (!this.nzCheckStrictly) {
          this.nzTreeService.conduct(node);
        }
        // Cause check method will rerender list, so we need recover it and next the new event to user
        const eventNext = this.nzTreeService.formatEvent('check', node, event.event!);
        this.nzCheckBoxChange.emit(eventNext);
        break;
      case 'dragstart':
        // if node is expanded
        if (node.isExpanded) {
          node.setExpanded(!node.isExpanded);
          this.renderTree();
        }
        this.nzOnDragStart.emit(event);
        break;
      case 'dragenter':
        const selectedNode = this.nzTreeService.getSelectedNode();
        if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
          node.setExpanded(true);
          this.renderTree();
        }
        this.nzOnDragEnter.emit(event);
        break;
      case 'dragover':
        this.nzOnDragOver.emit(event);
        break;
      case 'dragleave':
        this.nzOnDragLeave.emit(event);
        break;
      case 'dragend':
        this.nzOnDragEnd.emit(event);
        break;
      case 'drop':
        this.renderTree();
        this.nzOnDrop.emit(event);
        break;
    }
  }

  /**
   * Click expand icon
   */
  renderTree(): void {
    this.handleFlattenNodes(
      this.nzTreeService.rootNodes,
      this.getExpandedNodeList().map(v => v.key)
    );
    this.cdr.markForCheck();
  }
  // Handle emit event end

  constructor(
    nzTreeService: NzTreeBaseService,
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(nzTreeService);
  }

  ngOnInit(): void {
    this.nzTreeService.flattenNodes$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.nzFlattenNodes =
        !!this.nzVirtualHeight && this.nzHideUnMatched && this.nzSearchValue?.length > 0
          ? data.filter(d => !d.canHide)
          : data;
      this.cdr.markForCheck();
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.renderTreeProperties(changes);
  }

  ngAfterViewInit(): void {
    this.beforeInit = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
