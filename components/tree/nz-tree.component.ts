import { forwardRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeService } from './nz-tree.service';

@Component({
  selector : 'nz-tree',
  template : `
    <ul
      class="ant-tree"
      [ngClass]="classMap"
      role="tree-node" unselectable="on">
      <nz-tree-node *ngFor="let node of ngModelNodes" [nzTreeNode]="node"
                    [nzShowLine]="nzShowLine"
                    [nzTreeTemplate]="nzTreeTemplate"
                    [nzShowExpand]="nzShowExpand"
                    [nzSearchValue]="nzSearchValue"
                    [nzAsyncData]="nzAsyncData"
                    [nzMultiple]="nzMultiple"
                    [nzDraggable]="nzDraggable"
                    [nzCheckable]="nzCheckable"
                    [nzBeforeDrop]="nzBeforeDrop"
                    [nzCheckStrictly]="nzCheckStrictly"
                    [nzDefaultExpandAll]="nzDefaultExpandAll"
                    [nzDefaultExpandedKeys]="nzDefaultExpandedKeys"
                    [nzDefaultSelectedKeys]="nzDefaultSelectedKeys"
                    (clickCheckBox)="nzCheckBoxChange.emit($event)"
                    (clickExpand)="nzExpandChange.emit($event)"
                    (clickNode)="nzClick.emit($event)"
                    (dblClick)="nzDblClick.emit($event)"
                    (contextMenu)="nzContextMenu.emit($event)"
                    (nzDragStart)="nzOnDragStart.emit($event)"
                    (nzDragEnter)="nzOnDragEnter.emit($event)"
                    (nzDragOver)="nzOnDragOver.emit($event)"
                    (nzDragLeave)="nzOnDragLeave.emit($event)"
                    (nzDrop)="nzOnDrop.emit($event)"
                    (nzDragEnd)="nzOnDragEnd.emit($event)"
      ></nz-tree-node>
    </ul>
  `,
  providers: [
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
    [ this._prefixCls ]             : true,
    [this._prefixCls + '-show-line']: false,
    ['draggable-tree']              : false
  };
  ngModelNodes: NzTreeNode[] = [];
  @ContentChild('nzTreeTemplate') nzTreeTemplate: TemplateRef<{}>;

  @Input() nzCheckStrictly: boolean = false;
  @Input() nzCheckable;
  @Input() nzShowExpand: boolean = true;
  @Input() nzAsyncData: boolean = false;
  @Input() nzDraggable;
  @Input() nzMultiple;
  @Input() nzDefaultExpandAll: boolean = false;
  @Input() nzDefaultCheckedKeys: string[] = [];
  @Input() nzDefaultExpandedKeys: string[] = [];
  @Input() nzDefaultSelectedKeys: string[] = [];
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

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
    if (value) {
      this.nzTreeService.searchExpand(value);
      this.nzOnSearchNode.emit(this.nzTreeService.formatEvent('search', null, null));
    }
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
      [ this._prefixCls ]             : true,
      [this._prefixCls + '-show-line']: this.nzShowLine,
      ['draggable-tree']              : this.nzDraggable
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
