import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
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
      <nz-tree-node *ngFor="let node of nzTreeData" [nzTreeNode]="node"
                    [nzShowLine]="nzShowLine"
                    [nzTreeTemplate]="nzTreeTemplate"
                    [nzShowExpand]="nzShowExpand"
                    [nzSearchValue]="nzSearchValue"
                    [nzAsyncData]="nzAsyncData"
                    [nzMultiple]="nzMultiple"
                    [nzDraggable]="nzDraggable"
                    [nzCheckable]="nzCheckable"
                    [nzBeforeDrop]="nzBeforeDrop"
                    [nzDefaultExpandAll]="nzDefaultExpandAll"
                    [nzDefaultCheckedKeys]="nzDefaultCheckedKeys"
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
    NzTreeService
  ]
})
export class NzTreeComponent implements OnInit {
  _root: NzTreeNode[] = [];
  _searchValue;
  _showLine = false;
  _prefixCls = 'ant-tree';
  classMap = {
    [ this._prefixCls ]             : true,
    [this._prefixCls + '-show-line']: false,
    ['draggable-tree']              : false
  };

  @ContentChild('nzTreeTemplate') nzTreeTemplate: TemplateRef<{}>;

  @Input() nzCheckable;
  @Input() nzShowExpand: boolean = true;
  @Input() nzAsyncData: boolean = false;
  @Input() nzDraggable;
  @Input() nzMultiple;
  @Input() nzDefaultExpandAll: boolean = false;
  @Input() nzDefaultCheckedKeys: string[];
  @Input() nzDefaultExpandedKeys: string[];
  @Input() nzDefaultSelectedKeys: string[];
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
  // tslint:disable-next-line:no-any
  set nzTreeData(value: any[]) {
    this._root = this.nzTreeService.initTreeNodes(value);
  }

  // tslint:disable-next-line:no-any
  get nzTreeData(): any[] {
    return this._root;
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

  setClassMap(): void {
    this.classMap = {
      [ this._prefixCls ]             : true,
      [this._prefixCls + '-show-line']: this.nzShowLine,
      ['draggable-tree']              : this.nzDraggable
    };
  }

  constructor(private nzTreeService: NzTreeService) {
  }

  ngOnInit(): void {
  }
}
