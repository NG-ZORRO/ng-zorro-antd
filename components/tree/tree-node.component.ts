/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChange,
  TemplateRef
} from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeBaseService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-tree-node',
  exportAs: 'nzTreeNode',
  template: `
    <nz-tree-indent [nzTreeLevel]="nzTreeNode.level" [nzSelectMode]="nzSelectMode" [nzIsStart]="isStart" [nzIsEnd]="isEnd"></nz-tree-indent>
    <nz-tree-node-switcher
      *ngIf="nzShowExpand"
      [nzShowExpand]="nzShowExpand"
      [nzShowLine]="nzShowLine"
      [nzExpandedIcon]="nzExpandedIcon"
      [nzSelectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [isLeaf]="isLeaf"
      [isExpanded]="isExpanded"
      [isLoading]="isLoading"
      (click)="clickExpand($event)"
    ></nz-tree-node-switcher>
    <nz-tree-node-checkbox
      *ngIf="nzCheckable"
      (click)="clickCheckBox($event)"
      [nzSelectMode]="nzSelectMode"
      [isChecked]="isChecked"
      [isHalfChecked]="isHalfChecked"
      [isDisabled]="isDisabled"
      [isDisableCheckbox]="isDisableCheckbox"
    ></nz-tree-node-checkbox>
    <nz-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="nzSearchValue"
      [treeTemplate]="nzTreeTemplate"
      [draggable]="nzDraggable"
      [showIcon]="nzShowIcon"
      [selectMode]="nzSelectMode"
      [context]="nzTreeNode"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    ></nz-tree-node-title>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.ant-select-tree-treenode]': `nzSelectMode`,
    '[class.ant-select-tree-treenode-disabled]': `nzSelectMode && isDisabled`,
    '[class.ant-select-tree-treenode-switcher-open]': `nzSelectMode && isSwitcherOpen`,
    '[class.ant-select-tree-treenode-switcher-close]': `nzSelectMode && isSwitcherClose`,
    '[class.ant-select-tree-treenode-checkbox-checked]': `nzSelectMode && isChecked`,
    '[class.ant-select-tree-treenode-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
    '[class.ant-select-tree-treenode-selected]': `nzSelectMode && isSelected`,
    '[class.ant-select-tree-treenode-loading]': `nzSelectMode && isLoading`,
    '[class.ant-tree-treenode]': `!nzSelectMode`,
    '[class.ant-tree-treenode-disabled]': `!nzSelectMode && isDisabled`,
    '[class.ant-tree-treenode-switcher-open]': `!nzSelectMode && isSwitcherOpen`,
    '[class.ant-tree-treenode-switcher-close]': `!nzSelectMode && isSwitcherClose`,
    '[class.ant-tree-treenode-checkbox-checked]': `!nzSelectMode && isChecked`,
    '[class.ant-tree-treenode-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
    '[class.ant-tree-treenode-selected]': `!nzSelectMode && isSelected`,
    '[class.ant-tree-treenode-loading]': `!nzSelectMode && isLoading`,
    '[style.display]': 'displayStyle',
    '(mousedown)': 'onMousedown($event)'
  }
})
export class NzTreeNodeComponent implements OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzShowLine: BooleanInput;
  static ngAcceptInputType_nzShowExpand: BooleanInput;
  static ngAcceptInputType_nzCheckable: BooleanInput;
  static ngAcceptInputType_nzAsyncData: BooleanInput;
  static ngAcceptInputType_nzHideUnMatched: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;
  static ngAcceptInputType_nzSelectMode: BooleanInput;
  static ngAcceptInputType_nzShowIcon: BooleanInput;

  /**
   * for global property
   */
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isMatched: boolean = false;
  @Input() isExpanded!: boolean;
  @Input() isLeaf!: boolean;
  @Input() isChecked?: boolean;
  @Input() isHalfChecked?: boolean;
  @Input() isDisableCheckbox?: boolean;
  @Input() isSelectable?: boolean;
  @Input() canHide?: boolean;
  @Input() isStart?: boolean[];
  @Input() isEnd?: boolean[];
  @Input() nzTreeNode!: NzTreeNode;
  @Input() @InputBoolean() nzShowLine?: boolean;
  @Input() @InputBoolean() nzShowExpand?: boolean;
  @Input() @InputBoolean() nzCheckable?: boolean;
  @Input() @InputBoolean() nzAsyncData?: boolean;
  @Input() @InputBoolean() nzHideUnMatched = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzShowIcon = false;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> | null = null;
  @Input() nzBeforeDrop?: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input() nzSearchValue = '';
  @Input() nzDraggable: boolean = false;
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

  /**
   * drag var
   */
  destroy$ = new Subject();
  dragPos = 2;
  dragPosClass: { [key: string]: string } = {
    '0': 'drag-over',
    '1': 'drag-over-gap-bottom',
    '-1': 'drag-over-gap-top'
  };

  /**
   * default set
   */
  get displayStyle(): string {
    // to hide unmatched nodes
    return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide ? 'none' : '';
  }

  get isSwitcherOpen(): boolean {
    return this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }

  onMousedown(event: MouseEvent): void {
    if (this.nzSelectMode) {
      event.preventDefault();
    }
  }

  /**
   * collapse node
   * @param event
   */
  clickExpand(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isLoading && !this.isLeaf) {
      // set async state
      if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.isExpanded) {
        this.nzTreeNode.isLoading = true;
      }
      this.nzTreeNode.setExpanded(!this.isExpanded);
    }
    this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
    this.nzExpandChange.emit(eventNext);
  }

  clickSelect(event: MouseEvent): void {
    event.preventDefault();
    if (this.isSelectable && !this.isDisabled) {
      this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
    }
    this.nzTreeService.setSelectedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('click', this.nzTreeNode, event);
    this.nzClick.emit(eventNext);
  }

  dblClick(event: MouseEvent): void {
    event.preventDefault();
    const eventNext = this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event);
    this.nzDblClick.emit(eventNext);
  }

  contextMenu(event: MouseEvent): void {
    event.preventDefault();
    const eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
    this.nzContextMenu.emit(eventNext);
  }

  /**
   * check node
   * @param event
   */
  clickCheckBox(event: MouseEvent): void {
    event.preventDefault();
    // return if node is disabled
    if (this.isDisabled || this.isDisableCheckbox) {
      return;
    }
    this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
    this.nzTreeNode.isHalfChecked = false;
    this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
    this.nzCheckBoxChange.emit(eventNext);
  }

  clearDragClass(): void {
    const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
    dragClass.forEach(e => {
      this.renderer.removeClass(this.elementRef.nativeElement, e);
    });
  }

  /**
   * drag event
   * @param e
   */
  handleDragStart(e: DragEvent): void {
    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer!.setData('text/plain', this.nzTreeNode.key!);
    } catch (error) {
      // empty
    }
    this.nzTreeService.setSelectedNode(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
    this.nzOnDragStart.emit(eventNext);
  }

  handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    // reset position
    this.dragPos = 2;
    this.ngZone.run(() => {
      const eventNext = this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e);
      this.nzOnDragEnter.emit(eventNext);
    });
  }

  handleDragOver(e: DragEvent): void {
    e.preventDefault();
    const dropPosition = this.nzTreeService.calcDropPosition(e);
    if (this.dragPos !== dropPosition) {
      this.clearDragClass();
      this.dragPos = dropPosition;
      // leaf node will pass
      if (!(this.dragPos === 0 && this.isLeaf)) {
        this.renderer.addClass(this.elementRef.nativeElement, this.dragPosClass[this.dragPos]);
      }
    }
    const eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
    this.nzOnDragOver.emit(eventNext);
  }

  handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.clearDragClass();
    const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
    this.nzOnDragLeave.emit(eventNext);
  }

  handleDragDrop(e: DragEvent): void {
    this.ngZone.run(() => {
      this.clearDragClass();
      const node = this.nzTreeService.getSelectedNode();
      if (!node || (node && node.key === this.nzTreeNode.key) || (this.dragPos === 0 && this.isLeaf)) {
        return;
      }
      // pass if node is leafNo
      const dropEvent = this.nzTreeService.formatEvent('drop', this.nzTreeNode, e);
      const dragEndEvent = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
      if (this.nzBeforeDrop) {
        this.nzBeforeDrop({
          dragNode: this.nzTreeService.getSelectedNode()!,
          node: this.nzTreeNode,
          pos: this.dragPos
        }).subscribe((canDrop: boolean) => {
          if (canDrop) {
            this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
          }
          this.nzOnDrop.emit(dropEvent);
          this.nzOnDragEnd.emit(dragEndEvent);
        });
      } else if (this.nzTreeNode) {
        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
        this.nzOnDrop.emit(dropEvent);
      }
    });
  }

  handleDragEnd(e: DragEvent): void {
    e.preventDefault();
    this.ngZone.run(() => {
      // if user do not custom beforeDrop
      if (!this.nzBeforeDrop) {
        const eventNext = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
        this.nzOnDragEnd.emit(eventNext);
      }
    });
  }

  /**
   * Listening to dragging events.
   */
  handDragEvent(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.nzDraggable) {
        const nativeElement = this.elementRef.nativeElement;
        this.destroy$ = new Subject();
        fromEvent<DragEvent>(nativeElement, 'dragstart')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragStart(e));
        fromEvent<DragEvent>(nativeElement, 'dragenter')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnter(e));
        fromEvent<DragEvent>(nativeElement, 'dragover')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragOver(e));
        fromEvent<DragEvent>(nativeElement, 'dragleave')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragLeave(e));
        fromEvent<DragEvent>(nativeElement, 'drop')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragDrop(e));
        fromEvent<DragEvent>(nativeElement, 'dragend')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnd(e));
      } else {
        this.destroy$.next();
        this.destroy$.complete();
      }
    });
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public nzTreeService: NzTreeBaseService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.nzTreeNode.component = this;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    const { nzDraggable } = changes;
    if (nzDraggable) {
      this.handDragEvent();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
