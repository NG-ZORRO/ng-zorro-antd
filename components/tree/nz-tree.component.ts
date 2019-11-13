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
  warnDeprecation,
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

import { NzTreeService } from './nz-tree.service';

export function NzTreeServiceFactory(
  higherOrderService: NzTreeBaseService,
  treeService: NzTreeService
): NzTreeBaseService {
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

  /**
   * @deprecated 9.0.0 use `nzExpandAll` instead.
   */
  @Input()
  @InputBoolean()
  set nzDefaultExpandAll(value: boolean) {
    warnDeprecation(`'nzDefaultExpandAll' would be removed in 9.0.0. Please use 'nzExpandAll' instead.`);
    this.nzExpandAll = value;
    this._nzDefaultExpandAll = value;
  }

  get nzDefaultExpandAll(): boolean {
    return this._nzDefaultExpandAll;
  }

  private _nzDefaultExpandAll = false;

  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

  @Input() @InputBoolean() nzMultiple = false;

  @Input()
  // tslint:disable-next-line:no-any
  set nzData(value: any[]) {
    this.initNzData(value);
  }

  /**
   * @deprecated 9.0.0 - use `nzExpandedKeys` instead.
   */
  @Input()
  set nzDefaultExpandedKeys(value: string[]) {
    warnDeprecation(`'nzDefaultExpandedKeys' would be removed in 9.0.0. Please use 'nzExpandedKeys' instead.`);
    this.nzDefaultSubject.next({ type: 'nzExpandedKeys', keys: value });
  }

  /**
   * @deprecated 9.0.0 - use `nzSelectedKeys` instead.
   */
  @Input()
  set nzDefaultSelectedKeys(value: string[]) {
    warnDeprecation(`'nzDefaultSelectedKeys' would be removed in 9.0.0. Please use 'nzSelectedKeys' instead.`);
    this.nzDefaultSubject.next({ type: 'nzSelectedKeys', keys: value });
  }

  /**
   * @deprecated 9.0.0 - use `nzCheckedKeys` instead.
   */
  @Input()
  set nzDefaultCheckedKeys(value: string[]) {
    warnDeprecation(`'nzDefaultCheckedKeys' would be removed in 9.0.0. Please use 'nzCheckedKeys' instead.`);
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
      /**
       * @deprecated 9.0.0 - use `nzOnSearchNode` instead.
       * Hide warning, need remove next version
       */
      this.nzOnSearchNode.emit(this.nzTreeService.formatEvent('search', null, null));
    }
  }

  get nzSearchValue(): string {
    return this._searchValue;
  }

  /**
   * To render nodes if root is changed.
   */
  get nzNodes(): NzTreeNode[] {
    return this.nzTreeService.rootNodes;
  }

  @Output() readonly nzExpandedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzSelectedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly nzCheckedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() readonly nzSearchValueChange = new EventEmitter<NzFormatEmitEvent>();

  /**
   * @deprecated use `nzSearchValueChange` instead.
   */
  @Output() readonly nzOnSearchNode = new EventEmitter<NzFormatEmitEvent>();

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

  _searchValue: string;
  nzDefaultSubject = new ReplaySubject<{ type: string; keys: string[] }>(6);
  destroy$ = new Subject();
  prefixCls = 'ant-tree';
  classMap = {};

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
      this.nzTreeService.initTree(this.coerceTreeNodes(value));
    }
  }

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
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
    }
    if (changes.nzMultiple) {
      this.nzTreeService.isMultiple = this.nzMultiple;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
