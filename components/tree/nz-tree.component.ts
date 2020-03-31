/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
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
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import {
  FlattenNode,
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
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject } from 'rxjs';
import { NzTreeService } from './nz-tree.service';

export function NzTreeServiceFactory(higherOrderService: NzTreeBaseService, treeService: NzTreeService): NzTreeBaseService {
  return higherOrderService ? higherOrderService : treeService;
}

const NZ_CONFIG_COMPONENT_NAME = 'tree';

@Component({
  selector: 'nz-tree',
  exportAs: 'nzTree',
  template: `
    <div [ngClass]="classMap">
      <div role="tree">
        <input [ngStyle]="HIDDEN_STYLE" />
      </div>
      <div [ngClass]="classMapOfNodeList">
        <div>
          <div [ngClass]="classMapOfListContainer">
            <ng-container *ngFor="let node of nzFlattenNodes">
              <nz-tree-node
                [nzTreeNode]="node.data"
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
                [nzTreeTemplate]="treeTemplate"
                [@.disabled]="noAnimation?.nzNoAnimation"
                [nzNoAnimation]="noAnimation?.nzNoAnimation"
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
              >
              </nz-tree-node>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
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
  ]
})
export class NzTreeComponent extends NzTreeBase implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzShowIcon: boolean;
  @Input() @InputBoolean() nzShowExpand: boolean = true;
  @Input() @InputBoolean() nzShowLine = false;
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() @InputBoolean() nzCheckable = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzDraggable: boolean = false;

  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzHideUnMatched: boolean;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzBlockNode: boolean;
  @Input() @InputBoolean() nzExpandAll = false;

  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @ContentChild('nzTreeTemplate', { static: true }) nzTreeTemplateChild: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  get treeTemplate(): TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> {
    return this.nzTreeTemplate || this.nzTreeTemplateChild;
  }

  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

  @Input() @InputBoolean() nzMultiple = false;

  @Input() nzData: NzTreeNodeOptions[] | NzTreeNode[] = [];

  @Input() nzExpandedKeys: NzTreeNodeKey[] = [];

  @Input() nzSelectedKeys: NzTreeNodeKey[] = [];

  @Input() nzCheckedKeys: NzTreeNodeKey[] = [];

  @Input() nzSearchValue: string;

  @Input() nzSearchFunc: (node: NzTreeNodeOptions) => boolean;

  /**
   * To render nodes if root is changed.
   */
  get nzNodes(): NzTreeNode[] {
    return this.nzTreeService.rootNodes;
  }

  get nzFlattenNodes(): FlattenNode[] {
    return this.nzTreeService.flattenNodes;
  }

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

  destroy$ = new Subject();
  prefixCls = 'ant-tree';
  classMap = {};
  classMapOfNodeList = {};
  classMapOfListContainer = {};

  onChange: (value: NzTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  setClassMap(): void {
    this.prefixCls = this.nzSelectMode ? 'ant-select-tree' : 'ant-tree';
    this.classMapOfNodeList = {
      [this.prefixCls + '-list']: true
    };
    this.classMapOfListContainer = {
      [this.prefixCls + '-list-holder-inner']: true
    };
    this.classMap = {
      [this.prefixCls]: true,
      [this.prefixCls + '-show-line']: this.nzShowLine,
      [`${this.prefixCls}-icon-hide`]: !this.nzShowIcon,
      [`${this.prefixCls}-block-node`]: this.nzBlockNode,
      ['draggable-tree']: this.nzDraggable
    };
    this.cdr.markForCheck();
  }

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
   * @param changes: all changes from @Input
   */
  renderTreeProperties(changes: { [propertyName: string]: SimpleChange }): void {
    let useDefaultExpandedKeys = false;
    let expandAll = false;
    const { nzData, nzExpandedKeys, nzSelectedKeys, nzCheckedKeys, nzCheckStrictly, nzExpandAll, nzMultiple, nzSearchValue } = changes;

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

    if (nzCheckedKeys || nzCheckStrictly) {
      this.handleCheckedKeys(this.nzCheckedKeys);
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
        this.handleSearchValue(this.nzSearchValue, this.nzSearchFunc);
        this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
      }
    }

    // flatten data
    const currentExpandedKeys = this.getExpandedNodeList().map(v => v.key);
    const newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
    this.handleFlattenNodes(this.nzNodes, newExpandedKeys);
  }

  // Deal with properties
  /**
   * nzData
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

  handleCheckedKeys(keys: NzTreeNodeKey[]): void {
    this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
  }

  handleExpandedKeys(keys: NzTreeNodeKey[] | true = []): void {
    this.nzTreeService.conductExpandedKeys(keys);
  }

  handleSelectedKeys(keys: NzTreeNodeKey[], isMulti: boolean): void {
    this.nzTreeService.conductSelectedKeys(keys, isMulti);
  }

  handleSearchValue(value: string, searchFunc?: (node: NzTreeNodeOptions) => boolean): void {
    const dataList = flattenTreeData(this.nzNodes, true).map(v => v.data);
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
      this.nzNodes,
      this.getExpandedNodeList().map(v => v.key)
    );
    this.cdr.markForCheck();
  }
  // Handle emit event end

  constructor(
    nzTreeService: NzTreeBaseService,
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(nzTreeService);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.setClassMap();
    this.renderTreeProperties(changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
