/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
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
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  isNotNil,
  toBoolean,
  InputBoolean,
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzNoAnimationDirective,
  NzTreeBaseService,
  NzTreeHigherOrderServiceToken,
  NzTreeNode
} from 'ng-zorro-antd/core';

import { NzTreeService } from './nz-tree.service';

export function NzTreeServiceFactory(
  higherOrderService: NzTreeBaseService,
  treeService: NzTreeService
): NzTreeBaseService {
  return higherOrderService ? higherOrderService : treeService;
}

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
export class NzTreeComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @Input() @InputBoolean() nzShowIcon = false;
  @Input() @InputBoolean() nzShowExpand = true;
  @Input() @InputBoolean() nzShowLine = false;
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;
  @Input() @InputBoolean() nzCheckable = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzDraggable = false;
  @Input() @InputBoolean() nzExpandAll = false;
  @Input() @InputBoolean() nzHideUnMatched = false;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() @InputBoolean() nzBlockNode = false;

  /**
   * @deprecated use
   * nzExpandAll instead
   */
  @Input() @InputBoolean() nzDefaultExpandAll = false;
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

  @Input()
  @InputBoolean()
  set nzMultiple(value: boolean) {
    this._nzMultiple = toBoolean(value);
    this.nzTreeService.isMultiple = toBoolean(value);
  }

  get nzMultiple(): boolean {
    return this._nzMultiple;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set nzData(value: any[]) {
    this.initNzData(value);
  }

  /**
   * @deprecated use
   * nzExpandedKeys instead
   */
  @Input()
  set nzDefaultExpandedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzExpandedKeys', keys: value });
  }

  /**
   * @deprecated use
   * nzSelectedKeys instead
   */
  @Input()
  set nzDefaultSelectedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzSelectedKeys', keys: value });
  }

  /**
   * @deprecated use
   * nzCheckedKeys instead
   */
  @Input()
  set nzDefaultCheckedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzCheckedKeys', keys: value });
  }

  @Input()
  set nzExpandedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzExpandedKeys', keys: value });
  }

  @Input()
  set nzSelectedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzSelectedKeys', keys: value });
  }

  @Input()
  set nzCheckedKeys(value: string[]) {
    this.nzDefaultSubject.next({ type: 'nzCheckedKeys', keys: value });
  }

  @Input()
  set nzSearchValue(value: string) {
    this._searchValue = value;
    this.nzTreeService.searchExpand(value);
    if (isNotNil(value)) {
      this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
      this.nzOnSearchNode.emit(this.nzTreeService.formatEvent('search', null, null));
    }
  }

  get nzSearchValue(): string {
    return this._searchValue;
  }

  /**
   * To render nodes if root is changed
   */
  get nzNodes(): NzTreeNode[] {
    return this.nzTreeService.rootNodes;
  }

  // model bind
  @Output() readonly nzExpandedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzSelectedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzCheckedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() readonly nzSearchValueChange: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  /**
   * @deprecated use
   * nzSearchValueChange instead
   */
  @Output() readonly nzOnSearchNode: EventEmitter<NzFormatEmitEvent> = new EventEmitter();

  @Output() readonly nzClick: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzDblClick: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzContextMenu: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzCheckBoxChange: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzExpandChange: EventEmitter<NzFormatEmitEvent> = new EventEmitter();

  @Output() readonly nzOnDragStart: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzOnDragEnter: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzOnDragOver: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzOnDragLeave: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzOnDrop: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() readonly nzOnDragEnd: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  // tslint:disable-next-line:no-any
  @ContentChild('nzTreeTemplate') nzTreeTemplate: TemplateRef<any>;
  _searchValue: string;
  _nzMultiple: boolean = false;
  nzDefaultSubject = new ReplaySubject<{ type: string; keys: string[] }>(6);
  destroy$ = new Subject();
  prefixCls = 'ant-tree';
  classMap = {};

  onChange: (value: NzTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  getTreeNodes(): NzTreeNode[] {
    return this.nzTreeService.rootNodes;
  }

  getTreeNodeByKey(key: string): NzTreeNode | null {
    // flat tree nodes
    const nodes: NzTreeNode[] = [];
    const getNode = (node: NzTreeNode): void => {
      nodes.push(node);
      node.getChildren().forEach(n => {
        getNode(n);
      });
    };
    this.nzNodes.forEach(n => {
      getNode(n);
    });
    return nodes.find(n => n.key === key) || null;
  }

  /**
   * public function
   */
  getCheckedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getCheckedNodeList();
  }

  getSelectedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getSelectedNodeList();
  }

  getHalfCheckedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getHalfCheckedNodeList();
  }

  getExpandedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getExpandedNodeList();
  }

  getMatchedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getMatchedNodeList();
  }

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
    let nzNodes: NzTreeNode[] = [];
    if (Array.isArray(value)) {
      if (!this.nzTreeService.isArrayOfNzTreeNode(value)) {
        // has not been new NzTreeNode
        nzNodes = value.map(item => new NzTreeNode(item, null, this.nzTreeService));
      } else {
        nzNodes = value.map((item: NzTreeNode) => {
          item.service = this.nzTreeService;
          return item;
        });
      }
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
      this.nzTreeService.isMultiple = this.nzMultiple;
      this.nzTreeService.initTree(nzNodes);
    }
  }

  constructor(
    public nzTreeService: NzTreeBaseService,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.setClassMap();
    this.nzDefaultSubject.pipe(takeUntil(this.destroy$)).subscribe((data: { type: string; keys: string[] }) => {
      if (!data || !data.keys) {
        return;
      }
      switch (data.type) {
        case 'nzExpandedKeys':
          this.nzTreeService.calcExpandedKeys(data.keys, this.nzNodes);
          this.nzExpandedKeysChange.emit(data.keys);
          break;
        case 'nzSelectedKeys':
          this.nzTreeService.calcSelectedKeys(data.keys, this.nzNodes, this.nzMultiple);
          this.nzSelectedKeysChange.emit(data.keys);
          break;
        case 'nzCheckedKeys':
          this.nzTreeService.calcCheckedKeys(data.keys, this.nzNodes, this.nzCheckStrictly);
          this.nzCheckedKeysChange.emit(data.keys);
          break;
      }
      this.cdr.markForCheck();
    });
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
    if (changes.nzCheckStrictly) {
      this.nzTreeService.isCheckStrictly = toBoolean(changes.nzCheckStrictly.currentValue);
    }
    if (changes.nzMultiple) {
      this.nzTreeService.isMultiple = toBoolean(changes.nzMultiple.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
