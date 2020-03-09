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

import {
  FlattenNode,
  InputBoolean,
  NzConfigService,
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzNoAnimationDirective,
  NzTreeBase,
  NzTreeBaseService,
  NzTreeHigherOrderServiceToken,
  NzTreeNode,
  WithConfig
} from 'ng-zorro-antd/core';
import { flattenTreeData, NzTreeNodeKey } from 'ng-zorro-antd/core/tree/nz-tree-base-util';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTreeService } from './nz-tree.service';

export function NzTreeServiceFactory(higherOrderService: NzTreeBaseService, treeService: NzTreeService): NzTreeBaseService {
  return higherOrderService ? higherOrderService : treeService;
}

const NZ_CONFIG_COMPONENT_NAME = 'tree';

@Component({
  selector: 'nz-tree',
  exportAs: 'nzTree',
  templateUrl: './nz-tree.component.html',
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
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;
  @Input() @InputBoolean() nzCheckable = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzDraggable: boolean = false;

  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzHideUnMatched: boolean;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzBlockNode: boolean;
  @Input() @InputBoolean() nzExpandAll = false;

  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode }>;
  @ContentChild('nzTreeTemplate', { static: true }) nzTreeTemplateChild: TemplateRef<{ $implicit: NzTreeNode }>;
  get treeTemplate(): TemplateRef<{ $implicit: NzTreeNode }> {
    return this.nzTreeTemplate || this.nzTreeTemplateChild;
  }

  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

  @Input() @InputBoolean() nzMultiple = false;

  // tslint:disable-next-line:no-any
  @Input() nzData: any[] = [];

  @Input() nzExpandedKeys: string[] = [];

  @Input() nzSelectedKeys: string[] = [];

  @Input() nzCheckedKeys: string[] = [];

  @Input() nzSearchValue: string;
  // set nzSearchValue(value: string) {
  //   this._searchValue = value;
  //   this.nzTreeService.searchExpand(value);
  //   if (isNotNil(value)) {
  //     this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
  //   }
  // }

  // get nzSearchValue(): string {
  //   return this._searchValue;
  // }

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

  _searchValue: string;
  nzDefaultSubject = new ReplaySubject<{ type: string; keys: string[] }>(6);
  nzOnChanges = new BehaviorSubject<{ [propertyName: string]: SimpleChange }>({});
  destroy$ = new Subject();
  prefixCls = 'ant-tree';
  classMap = {};
  classMapOfNodeList = {
    [this.prefixCls + '-list']: true
  };

  onChange: (value: NzTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  setClassMap(): void {
    this.classMap = {
      [this.prefixCls]: true,
      [this.prefixCls + '-show-line']: this.nzShowLine,
      [`${this.prefixCls}-icon-hide`]: !this.nzShowIcon,
      [`${this.prefixCls}-block-node`]: this.nzBlockNode,
      ['draggable-tree']: this.nzDraggable,
      ['ant-select-tree']: this.nzSelectMode
    };
  }

  writeValue(value: NzTreeNode[]): void {
    this.initNzData(value);
  }

  registerOnChange(fn: (_: NzTreeNode[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // tslint:disable-next-line:no-any
  initNzData(value: any[]): void {
    if (Array.isArray(value)) {
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
      this.nzTreeService.isMultiple = this.nzMultiple;
      const data = this.coerceTreeNodes(value);
      console.warn(flattenTreeData(data, this.nzExpandAll || this.nzExpandedKeys), value);
      this.nzTreeService.initTree(this.coerceTreeNodes(value));
    }
  }

  /**
   * Render all properties of nzTree
   */
  renderTreeProperties(changes: { [propertyName: string]: SimpleChange }): void {
    const { nzData, nzExpandedKeys, nzSelectedKeys, nzCheckedKeys, nzCheckStrictly, nzExpandAll, nzMultiple } = changes;
    if (nzData) {
      this.handleNzData(this.nzData);
    }

    if (nzCheckedKeys || nzCheckStrictly) {
      this.handleCheckedKeys(this.nzCheckedKeys);
    }

    if (nzExpandedKeys || nzExpandAll) {
      this.nzTreeService.expandAll = this.nzExpandAll;
      this.handleExpandedKeys(this.nzExpandAll || this.nzExpandedKeys);
    }

    if (nzSelectedKeys || nzMultiple) {
      this.nzTreeService.isMultiple = this.nzMultiple;
      this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
    }

    // flatten data
    this.handleFlattenNodes(this.nzNodes, this.nzExpandAll || this.nzExpandedKeys);
    console.error('data: ', { ...changes }, [...this.nzNodes], [...this.nzFlattenNodes], [...(this.nzCheckedKeys || [])]);
  }

  // Deal with properties
  /**
   * nzData
   * @param value
   */
  // tslint:disable-next-line:no-any
  handleNzData(value: any[]): void {
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
    this.nzTreeService.conductSelect(keys, isMulti);
  }

  // Handle emit event
  eventTriggerChanged(event: NzFormatEmitEvent): void {
    switch (event.eventName) {
      case 'expand':
        this.renderFlattenNodes();
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
      default:
        break;
    }
  }

  /**
   * Click expand icon
   * @param event
   */
  renderFlattenNodes(): void {
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

  ngOnInit(): void {
    this.setClassMap();
    this.nzTreeService
      .eventTriggerChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        switch (data.eventName) {
          case 'expand':
            this.nzExpandChange.emit(data);
            break;
          case 'click':
            this.nzClick.emit(data);
            break;
          case 'check':
            this.nzCheckBoxChange.emit(data);
            break;
          case 'dblclick':
            this.nzDblClick.emit(data);
            break;
          case 'contextmenu':
            this.nzContextMenu.emit(data);
            break;
          // drag drop
          case 'dragstart':
            this.nzOnDragStart.emit(data);
            break;
          case 'dragenter':
            this.nzOnDragEnter.emit(data);
            break;
          case 'dragover':
            this.nzOnDragOver.emit(data);
            break;
          case 'dragleave':
            this.nzOnDragLeave.emit(data);
            break;
          case 'drop':
            this.nzOnDrop.emit(data);
            break;
          case 'dragend':
            this.nzOnDragEnd.emit(data);
            break;
        }
      });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.renderTreeProperties(changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
