import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeService } from './nz-tree.service';

@Component({
  selector  : 'nz-tree-node',
  template  : `
    <li #dragElement
        [class.ant-tree-treenode-disabled]="nzTreeNode.isDisabled"
        (dblclick)="_dblClickNode($event,nzTreeNode)"
        (click)="_clickNode($event,nzTreeNode)"
        (contextmenu)="_contextMenuNode($event,nzTreeNode)"
    >
      <ng-container *ngIf="nzShowExpand">
                <span
                  class="ant-tree-switcher"
                  [class.ant-tree-switcher_open]="nzTreeNode.isExpanded && !nzTreeNode.isLeaf && !nzTreeNode.isLoading"
                  [class.ant-tree-switcher_close]="!nzTreeNode.isExpanded && !nzTreeNode.isLeaf && !nzTreeNode.isLoading"
                  [class.ant-tree-switcher-noop]="nzTreeNode.isLeaf && !nzTreeNode.isLoading"
                  [class.ant-tree-switcher-disabled]="nzTreeNode.isDisabled && !nzTreeNode.isLoading"
                  [class.ant-tree-iconEle]="nzTreeNode.isLoading && !nzTreeNode.isLeaf"
                  [class.ant-tree-icon_loading]="nzTreeNode.isLoading && !nzTreeNode.isLeaf"
                  [class.ant-tree-icon__open]="nzTreeNode.isLoading && nzTreeNode.isExpanded && !nzTreeNode.isLeaf"
                  [class.ant-tree-icon__close]="nzTreeNode.isLoading && !nzTreeNode.isExpanded && !nzTreeNode.isLeaf"
                  (click)="_clickExpand($event, nzTreeNode)"></span>
      </ng-container>
      <ng-container #checkbox *ngIf="nzCheckable">
                    <span
                      class="ant-tree-checkbox"
                      [class.ant-tree-checkbox-checked]="nzTreeNode.isChecked && nzTreeNode.isAllChecked"
                      [class.ant-tree-checkbox-disabled]="nzTreeNode.isDisabled || nzTreeNode.isDisableCheckbox"
                      [class.ant-tree-checkbox-indeterminate]="nzTreeNode.isHalfChecked"
                      (click)="_clickCheckBox($event, nzTreeNode)">
                        <span class="ant-tree-checkbox-inner"></span>
                    </span>
      </ng-container>
      <ng-container *ngIf="!nzTreeTemplate">
                <span
                  title="{{nzTreeNode.title}}"
                  class="ant-tree-node-content-wrapper"
                  [class.ant-tree-node-selected]="nzTreeNode.isSelected"
                  [class.ant-tree-node-content-wrapper-open]="nzTreeNode.isExpanded && nzTreeNode.getChildren().length>0"
                  [class.ant-tree-node-content-wrapper-close]="!nzTreeNode.isExpanded && nzTreeNode.getChildren().length>0"
                  [class.ant-tree-node-content-wrapper-normal]="nzTreeNode.getChildren().length>0"
                  [attr.draggable]="nzDraggable"
                  [attr.aria-grabbed]="nzDraggable">
                        <span class="ant-tree-title">
                            <ng-container *ngIf="matchValue.length==2">
                                <span>
                                    {{matchValue[0]}}<span class="font-red">{{nzSearchValue}}</span>{{matchValue[1]}}
                                </span>
                            </ng-container>
                            <ng-container *ngIf="matchValue.length!=2">
                                {{nzTreeNode.title}}
                            </ng-container>
                        </span>
                    </span>
      </ng-container>
      <ng-template
        [ngTemplateOutlet]="nzTreeTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzTreeNode }">
      </ng-template>

      <ul class="ant-tree-child-tree ant-tree-child-tree-open"
          [attr.data-expanded]="nzTreeNode.isExpanded"
          [@expandState]="(nzTreeNode.getChildren().length>0 && nzTreeNode.isExpanded)?'active':'inactive'">
        <nz-tree-node *ngFor="let node of nzTreeNode.children" [nzTreeNode]="node"
                      [nzShowLine]="nzShowLine"
                      [nzDraggable]="nzDraggable"
                      [nzCheckable]="nzCheckable"
                      [nzShowExpand]="nzShowExpand"
                      [nzSearchValue]="nzSearchValue"
                      [nzAsyncData]="nzAsyncData"
                      [nzMultiple]="nzMultiple"
                      [nzBeforeDrop]="nzBeforeDrop"
                      [nzCheckStrictly]="nzCheckStrictly"
                      [nzDefaultExpandAll]="nzDefaultExpandAll"
                      [nzDefaultCheckedKeys]="nzDefaultCheckedKeys"
                      [nzDefaultExpandedKeys]="nzDefaultExpandedKeys"
                      [nzDefaultSelectedKeys]="nzDefaultSelectedKeys"
                      [nzTreeTemplate]="nzTreeTemplate"
                      (clickNode)="clickNode.emit($event)"
                      (dblClick)="dblClick.emit($event)"
                      (contextMenu)="contextMenu.emit($event)"
                      (clickCheckBox)="clickCheckBox.emit($event)"
                      (clickExpand)="clickExpand.emit($event)"
                      (nzDragStart)="nzDragStart.emit($event)"
                      (nzDragEnter)="nzDragEnter.emit($event)"
                      (nzDragOver)="nzDragOver.emit($event)"
                      (nzDragLeave)="nzDragLeave.emit($event)"
                      (nzDrop)="nzDrop.emit($event)"
                      (nzDragEnd)="nzDragEnd.emit($event)"
        ></nz-tree-node>
      </ul>
    </li>
  `,
  animations: [
    trigger('expandState', [
      state('inactive', style({
        opacity: '0',
        height : 0,
        display: 'none'
      })),
      state('active', style({
        opacity: '1',
        height : '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ]
})

export class NzTreeNodeComponent implements OnInit, AfterViewInit {
  dragPos = 2;
  prefixCls = 'ant-tree';
  _treeNode;
  _checkStrictly;
  _expandAll = false;
  _defaultCheckedKeys = [];
  _defaultExpandedKeys = [];
  _defaultSelectedKeys = [];
  _searchValue = '';
  matchValue = [];
  // 拖动划过状态
  dragPosClass: object = {
    '0' : 'drag-over',
    '1' : 'drag-over-gap-bottom',
    '-1': 'drag-over-gap-top'
  };

  @ViewChild('dragElement') dragElement: ElementRef;

  @Input() nzShowLine: boolean;
  @Input() nzShowExpand: boolean;
  @Input() nzDraggable: boolean;
  @Input() nzMultiple: boolean;
  @Input() nzCheckable: boolean;
  @Input() nzAsyncData;
  @Input() nzCheckStrictly: boolean;
  @Input() nzDefaultCheckedKeys: string[];
  @Input() nzTreeTemplate: TemplateRef<void>;
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;

  @Input()
  set nzTreeNode(node: NzTreeNode) {
    this._treeNode = node;
  }

  get nzTreeNode(): NzTreeNode {
    return this._treeNode;
  }

  @Input()
  set nzDefaultExpandAll(value: boolean) {
    if (value && this.nzTreeNode) {
      this.nzTreeNode.isExpanded = value;
    }
    this._expandAll = value;
  }

  get nzDefaultExpandAll(): boolean {
    return this._expandAll;
  }

  @Input()
  set nzDefaultExpandedKeys(value: string[]) {
    this._defaultExpandedKeys = value;
    if (value && value.indexOf(this.nzTreeNode.key) > -1) {
      this.nzTreeNode.isExpanded = true;
    }
  }

  get nzDefaultExpandedKeys(): string[] {
    return this._defaultExpandedKeys;
  }

  @Input()
  set nzDefaultSelectedKeys(value: string[]) {
    this._defaultSelectedKeys = value;
    if (value && !this.nzTreeNode.isDisabled && this.nzMultiple && value.indexOf(this.nzTreeNode.key) > -1) {
      this.nzTreeNode.isSelected = true;
    }
  }

  get nzDefaultSelectedKeys(): string[] {
    return this._defaultSelectedKeys;
  }

  @Input()
  set nzSearchValue(value: string) {
    if (value && this.nzTreeNode.title.includes(value)) {
      this.nzTreeNode.isMatched = true;
      this.matchValue = [];
      // match the search value
      const index = this.nzTreeNode.title.indexOf(value);
      this.matchValue.push(this.nzTreeNode.title.slice(0, index));
      this.matchValue.push(this.nzTreeNode.title.slice(index + value.length, this.nzTreeNode.title.length));
    } else {
      // close the node if title does't contain search value
      this.nzTreeNode.isMatched = false;
      this.matchValue = [];
    }
    this._searchValue = value;
  }

  get nzSearchValue(): string {
    return this._searchValue;
  }

  @Output() clickNode: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() dblClick: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() contextMenu: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() clickCheckBox: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() clickExpand: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDragStart: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDragEnter: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDragOver: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDragLeave: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDrop: EventEmitter<NzFormatEmitEvent> = new EventEmitter();
  @Output() nzDragEnd: EventEmitter<NzFormatEmitEvent> = new EventEmitter();

  constructor(private nzTreeService: NzTreeService, private ngZone: NgZone, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.nzTreeNode.isChecked) {
      // associate nodes
      if (this.nzCheckStrictly) {
        this.nzTreeService.setCheckedNodeListStrict(this.nzTreeNode);
      } else {
        this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
      }
    }
    // add select list
    if (this.nzTreeNode.isSelected) {
      this.nzTreeService.setSelectedNodeList(this.nzTreeNode, this.nzMultiple);
    }
  }

  handleDragStart(e: DragEvent): void {
    e.stopPropagation();
    this.nzTreeService.setSelectedNode(this.nzTreeNode);
    this.nzTreeNode.isExpanded = false;
    this.nzDragStart.emit(this.nzTreeService.formatEvent('dragstart', null, e));
  }

  handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.ngZone.run(() => {
      this.nzTreeService.targetNode = this.nzTreeNode;
      if ((this.nzTreeNode !== this.nzTreeService.getSelectedNode()) && !this.nzTreeNode.isLeaf) {
        this.nzTreeNode.isExpanded = true;
      }
    });
    this.nzDragEnter.emit(this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e));
  }

  handleDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.dragPos !== this.nzTreeService.calcDropPosition(e)) {
      this._clearDragClass();
      this.dragPos = this.nzTreeService.calcDropPosition(e);
      if (!(this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
        // leaf node can not be inserted
        this.renderer.addClass(this.dragElement.nativeElement, this.dragPosClass[ this.dragPos ]);
      }
    }
    this.nzDragOver.emit(this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e));
  }

  handleDragLeave(e: DragEvent): void {
    e.stopPropagation();
    this.ngZone.run(() => {
      this._clearDragClass();
    });
    this.nzDragLeave.emit(this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e));
  }

  handleDragDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.dragPos = this.nzTreeService.calcDropPosition(e);
    this.ngZone.run(() => {
      // pass if node is leafNo
      if (this.nzTreeNode !== this.nzTreeService.getSelectedNode() && !(this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
        if (this.nzBeforeDrop) {
          this.nzBeforeDrop({
            dragNode: this.nzTreeService.getSelectedNode(),
            node    : this.nzTreeNode,
            pos     : this.dragPos
          }).subscribe((canDrop: boolean) => {
            if (canDrop) {
              this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
            }
            this.nzDrop.emit(this.nzTreeService.formatEvent('drop', this.nzTreeNode, e));
            this.nzDragEnd.emit(this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e));
          });
        } else {
          this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
          this.nzDrop.emit(this.nzTreeService.formatEvent('drop', this.nzTreeNode, e));
        }
      }
      this._clearDragClass();
    });
  }

  handleDragEnd(e: DragEvent): void {
    e.stopPropagation();
    this.ngZone.run(() => {
      // if user do not custom beforeDrop
      if (!this.nzBeforeDrop) {
        this.nzTreeService.setSelectedNode(null);
        this.nzDragEnd.emit(this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e));
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.nzDraggable) {
      this.ngZone.runOutsideAngular(() => {
        fromEvent(this.dragElement.nativeElement, 'dragstart').subscribe((e: DragEvent) => this.handleDragStart(e));
        fromEvent(this.dragElement.nativeElement, 'dragenter').subscribe((e: DragEvent) => this.handleDragEnter(e));
        fromEvent(this.dragElement.nativeElement, 'dragover').subscribe((e: DragEvent) => this.handleDragOver(e));
        fromEvent(this.dragElement.nativeElement, 'dragleave').subscribe((e: DragEvent) => this.handleDragLeave(e));
        fromEvent(this.dragElement.nativeElement, 'drop').subscribe((e: DragEvent) => this.handleDragDrop(e));
        fromEvent(this.dragElement.nativeElement, 'dragend').subscribe((e: DragEvent) => this.handleDragEnd(e));
      });
    }
  }

  _clearDragClass(): void {
    const dragClass = [ 'drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over' ];
    dragClass.forEach(e => {
      this.renderer.removeClass(this.dragElement.nativeElement, e);
    });
  }

  _clickNode($event: MouseEvent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.nzTreeNode.isSelectable && !this.nzTreeNode.isDisabled) {
      this.nzTreeService.initNodeActive(this.nzTreeNode, this.nzMultiple);
    }
    this.clickNode.emit(this.nzTreeService.formatEvent('click', node, $event));
  }

  _dblClickNode($event: MouseEvent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dblClick.emit(this.nzTreeService.formatEvent('dblclick', node, $event));
  }

  _contextMenuNode($event: MouseEvent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.contextMenu.emit(this.nzTreeService.formatEvent('contextmenu', node, $event));
  }

  _clickCheckBox($event: MouseEvent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    // return if node is disabled
    if (node.isDisableCheckbox || node.isDisabled) {
      return;
    }
    node.isChecked = !node.isChecked;
    if (this.nzCheckStrictly) {
      node.isAllChecked = node.isChecked;
      node.isHalfChecked = false;
      this.nzTreeService.setCheckedNodeListStrict(this.nzTreeNode);
    } else {
      this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
      this.nzTreeService.checkTreeNode(node);
    }
    this.clickCheckBox.emit(this.nzTreeService.formatEvent('check', node, $event));
  }

  _clickExpand($event: MouseEvent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.nzTreeNode.isLoading) {
      if (!node.isLeaf) {
        // set async state
        if (this.nzAsyncData && this.nzTreeNode.getChildren().length === 0 && !this.nzTreeNode.isExpanded) {
          this.nzTreeNode.isLoading = true;
        }
        node.isExpanded = !this.nzTreeNode.isExpanded;
      }
      if (!this.nzTreeNode.isLeaf) {
        this.clickExpand.emit(this.nzTreeService.formatEvent('expand', node, $event));
      }
    }
  }
}
