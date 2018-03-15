import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';

import { NzFormatClickEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeService } from './nz-tree.service';

@Component({
    selector: 'nz-tree-node',
    template: `
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

            <ng-container *ngIf="nzTreeNode.getChildren().length>0 && nzTreeNode.isExpanded">
                <ul class="ant-tree-child-tree ant-tree-child-tree-open"
                    [attr.data-expanded]="nzTreeNode.isExpanded">
                    <nz-tree-node *ngFor="let node of nzTreeNode.children" [nzTreeNode]="node"
                                  [nzShowLine]="nzShowLine"
                                  [nzDraggable]="nzDraggable"
                                  [nzCheckable]="nzCheckable"
                                  [nzShowExpand]="nzShowExpand"
                                  [nzSearchValue]="nzSearchValue"
                                  [nzAsyncData]="nzAsyncData"
                                  [nzMultiple]="nzMultiple"
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
            </ng-container>
        </li>
    `
})

export class NzTreeNodeComponent implements OnInit, AfterContentInit, OnDestroy {
    dragPos = 2;
    prefixCls = 'ant-tree';
    _treeNode;
    _expandAll = false;
    _defaultCheckedKeys = [];
    _defaultExpandedKeys = [];
    _defaultSelectedKeys = [];
    _searchValue = '';
    matchValue = [];
    // 拖动划过状态
    dragPosClass: object = {
        '0': 'drag-over',
        '1': 'drag-over-gap-bottom',
        '-1': 'drag-over-gap-top'
    };
    _clickNum = 0;
    _emitSubject$ = new Subject();
    _emitSubjection: Subscription;

    @ViewChild('dragElement') dragElement: ElementRef;

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

    @Input() nzShowLine: boolean;
    @Input() nzShowExpand: boolean;
    @Input() nzDraggable: boolean;
    @Input() nzMultiple: boolean;
    @Input() nzCheckable: boolean;
    @Input() nzAsyncData;
    @Input() nzTreeTemplate: TemplateRef<void>;

    @Input()
    set nzTreeNode(node: NzTreeNode) {
        if (this.nzDefaultExpandAll) {
            node.isExpanded = this.nzDefaultExpandAll;
        }
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
    set nzDefaultCheckedKeys(value: string[]) {
        this._defaultCheckedKeys = value;
        if (value && !this.nzTreeNode.isDisabled && value.indexOf(this.nzTreeNode.key) > -1) {
            this.nzTreeNode.isChecked = true;
            this.nzTreeNode.isAllChecked = true;
            this.nzTreeNode.isHalfChecked = false;
        }
    }

    get nzDefaultCheckedKeys(): string[] {
        return this._defaultCheckedKeys;
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

    constructor(private nzTreeService: NzTreeService, private el: ElementRef, private ngZone: NgZone, private _renderer: Renderer2) {
    }

    ngOnInit(): void {
        // add select list
        if (this.nzTreeNode.isSelected) {
            this.nzTreeService.setSelectedNodeList(this.nzTreeNode, this.nzMultiple);
        }
        // add check list
        if (this.nzTreeNode.isChecked) {
            this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
        }
        this._emitSubjection = this._emitSubject$.pipe(debounceTime(200)).subscribe((e: NzFormatClickEvent) => {
            if (this._clickNum % 2 === 0) {
                this.dblClick.emit(this.nzTreeService.formatEvent('dblclick', e.node, e.event));
            } else {
                if (this.nzTreeNode.isSelectable && !this.nzTreeNode.isDisabled) {
                    this.nzTreeService.initNodeActive(this.nzTreeNode, this.nzMultiple);
                }
                this.clickNode.emit(this.nzTreeService.formatEvent('click', e.node, e.event, null, true));
            }
            this._clickNum = 0;
        });
    }

    handleDragStart(e: DragEvent): void {
        e.stopPropagation();
        this.nzTreeService.setSelectedNode(this.nzTreeNode);
        this.nzTreeNode.isExpanded = false;
        this.nzDragStart.emit(this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
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
        this.nzDragEnter.emit(this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
    }

    handleDragOver(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.dragPos = this.nzTreeService.calcDropPosition(e);
        this._renderer.addClass(this.dragElement.nativeElement, this.dragPosClass[this.dragPos]);
        this.nzDragOver.emit(this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
    }

    handleDragLeave(e: DragEvent): void {
        e.stopPropagation();
        this.ngZone.run(() => {
            this._clearDragClass();
        });
        this.nzDragLeave.emit(this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
    }

    handleDragDrop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.ngZone.run(() => {
            // pass if node is leafNo
            if (this.nzTreeNode !== this.nzTreeService.getSelectedNode() && !(this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
                this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
            }
            this._clearDragClass();
        });
        this.nzDrop.emit(this.nzTreeService.formatEvent('drop', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
    }

    handleDragEnd(e: DragEvent): void {
        e.stopPropagation();
        this.ngZone.run(() => {
            this.nzTreeService.setSelectedNode(null);
        });
        this.nzDragEnd.emit(this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e, this.nzTreeService.getSelectedNode()));
    }

    ngAfterContentInit(): void {
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
        const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
        dragClass.forEach(e => {
            this._renderer.removeClass(this.dragElement.nativeElement, e);
        });
    }

    _clickNode($event: MouseEvent, node: NzTreeNode): void {
        $event.preventDefault();
        $event.stopPropagation();
        this._clickNum++;
        this._emitSubject$.next({
            'event': $event,
            'node': node
        });
    }

    _dblClickNode($event: MouseEvent, node: NzTreeNode): void {
        $event.preventDefault();
        $event.stopPropagation();
        this._emitSubject$.next({
            'event': $event,
            'node': node
        });
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
        this.nzTreeService.checkTreeNode(node);
        this.clickCheckBox.emit(this.nzTreeService.formatEvent('check', node, $event, null, false, true));
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

    ngOnDestroy(): void {
        if (this._emitSubjection) {
            this._emitSubjection.unsubscribe();
        }
    }
}
