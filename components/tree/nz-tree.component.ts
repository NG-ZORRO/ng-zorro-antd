import { forwardRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeService } from './nz-tree.service';

@Component({
  selector   : 'nz-tree',
  templateUrl: './nz-tree.component.html',
  providers  : [
    NzTreeService,
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeComponent),
      multi      : true
    }
  ]
})
export class NzTreeComponent implements OnInit {
  _searchValue;
  _showLine = false;
  _prefixCls = 'ant-tree';
  classMap = {
    [ this._prefixCls ]               : true,
    [ this._prefixCls + '-show-line' ]: false,
    [ 'draggable-tree' ]              : false
  };
  ngModelNodes: NzTreeNode[] = [];
  defaultCheckedKeys: string[] = [];
  @ContentChild('nzTreeTemplate') nzTreeTemplate: TemplateRef<{}>;

  @Input() nzCheckStrictly: boolean = false;
  @Input() nzCheckable;
  @Input() nzShowExpand: boolean = true;
  @Input() nzAsyncData: boolean = false;
  @Input() nzDraggable;
  @Input() nzMultiple;
  @Input() nzDefaultExpandAll: boolean = false;
  @Input() nzDefaultExpandedKeys: string[] = [];
  @Input() nzDefaultSelectedKeys: string[] = [];
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input()
  set nzDefaultCheckedKeys(value: string[]) {
    this.defaultCheckedKeys = value;
    this.nzTreeService.initTreeNodes(this.ngModelNodes, this.nzDefaultCheckedKeys, this.nzCheckStrictly);
  }
  get nzDefaultCheckedKeys(): string[] {
    return this.defaultCheckedKeys;
  }

  @Input()
  set nzShowLine(value: boolean) {
    this._showLine = value;
    this.setClassMap();
  }

  get nzShowLine(): boolean {
    return this._showLine;
  }

  @Input()
  set nzSearchValue(value: string) {
    this._searchValue = value;
    this.nzTreeService.searchExpand(value);
    this.nzOnSearchNode.emit(this.nzTreeService.formatEvent('search', null, null));
  }

  get nzSearchValue(): string {
    return this._searchValue;
  }

  @Output() nzOnSearchNode: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzClick: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDblClick: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzContextMenu: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzCheckBoxChange: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzExpandChange: EventEmitter<NzFormatEmitEvent> = new EventEmitter();

  @Output() nzOnDragStart: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzOnDragEnter: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzOnDragOver: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzOnDragLeave: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzOnDrop: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzOnDragEnd: EventEmitter<NzFormatEmitEvent> = new EventEmitter();

  onChange: (value: NzTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  setClassMap(): void {
    this.classMap = {
      [ this._prefixCls ]               : true,
      [ this._prefixCls + '-show-line' ]: this.nzShowLine,
      [ 'draggable-tree' ]              : this.nzDraggable
    };
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

  // ngModel
  writeValue(value: NzTreeNode[]): void {
    if (value) {
      this.ngModelNodes = value;
      this.nzTreeService.initTreeNodes(this.ngModelNodes, this.nzDefaultCheckedKeys, this.nzCheckStrictly);
      this.onChange(value);
    }
  }

  registerOnChange(fn: (_: NzTreeNode[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  constructor(public nzTreeService: NzTreeService) {
  }

  ngOnInit(): void {
  }
}
