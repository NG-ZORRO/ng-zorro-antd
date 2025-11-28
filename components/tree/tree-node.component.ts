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
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import {
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzTreeBaseService,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd/core/tree';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-tree-node[builtin]',
  exportAs: 'nzTreeBuiltinNode',
  template: `
    <nz-tree-indent
      [nzTreeLevel]="nzTreeNode.level"
      [nzSelectMode]="nzSelectMode"
      [nzIsStart]="isStart"
      [nzIsEnd]="isEnd"
    ></nz-tree-indent>
    @if (nzShowExpand) {
      <nz-tree-node-switcher
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
    }
    @if (nzCheckable) {
      <nz-tree-node-checkbox
        builtin
        (click)="clickCheckbox($event)"
        [nzSelectMode]="nzSelectMode"
        [isChecked]="isChecked"
        [isHalfChecked]="isHalfChecked"
        [isDisabled]="isDisabled"
        [isDisableCheckbox]="isDisableCheckbox"
      ></nz-tree-node-checkbox>
    }
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
      [showIndicator]="showIndicator"
      [dragPosition]="dragPos"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    ></nz-tree-node-title>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    '[class.dragging]': `draggingKey === nzTreeNode.key`,
    '[style.display]': 'displayStyle'
  },
  imports: [
    NzTreeIndentComponent,
    NzTreeNodeSwitcherComponent,
    NzTreeNodeBuiltinCheckboxComponent,
    NzTreeNodeTitleComponent
  ]
})
export class NzTreeNodeBuiltinComponent implements OnInit, OnChanges {
  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  nzTreeService = inject(NzTreeBaseService);
  private ngZone = inject(NgZone);
  private renderer = inject(Renderer2);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  @Input() icon: string = '';
  @Input() title: string = '';
  @Input({ transform: booleanAttribute }) isLoading: boolean = false;
  @Input({ transform: booleanAttribute }) isSelected: boolean = false;
  @Input({ transform: booleanAttribute }) isDisabled: boolean = false;
  @Input({ transform: booleanAttribute }) isMatched: boolean = false;
  @Input({ transform: booleanAttribute }) isExpanded!: boolean;
  @Input({ transform: booleanAttribute }) isLeaf!: boolean;
  @Input({ transform: booleanAttribute }) isChecked?: boolean;
  @Input({ transform: booleanAttribute }) isHalfChecked?: boolean;
  @Input({ transform: booleanAttribute }) isDisableCheckbox?: boolean;
  @Input({ transform: booleanAttribute }) isSelectable?: boolean;
  @Input({ transform: booleanAttribute }) canHide?: boolean;
  @Input() isStart: boolean[] = [];
  @Input() isEnd: boolean[] = [];
  @Input() nzTreeNode!: NzTreeNode;
  @Input({ transform: booleanAttribute }) nzShowLine?: boolean;
  @Input({ transform: booleanAttribute }) nzShowExpand?: boolean;
  @Input({ transform: booleanAttribute }) nzCheckable?: boolean;
  @Input({ transform: booleanAttribute }) nzAsyncData?: boolean;
  @Input({ transform: booleanAttribute }) nzHideUnMatched = false;
  @Input({ transform: booleanAttribute }) nzNoAnimation = false;
  @Input({ transform: booleanAttribute }) nzSelectMode = false;
  @Input({ transform: booleanAttribute }) nzShowIcon = false;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> | null = null;
  @Input() nzBeforeDrop?: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input() nzSearchValue = '';
  @Input({ transform: booleanAttribute }) nzDraggable: boolean = false;
  @Output() readonly nzClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzDblClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzContextMenu = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzCheckboxChange = new EventEmitter<NzFormatEmitEvent>();
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
  destroy$ = new Subject<void>();
  dragPos = 2;
  dragPosClass: Record<string, string> = {
    0: 'drag-over',
    1: 'drag-over-gap-bottom',
    '-1': 'drag-over-gap-top'
  };
  draggingKey: string | null = null;
  showIndicator = false;
  /**
   * default set
   */
  get displayStyle(): string {
    // to hide unmatched nodes
    return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide
      ? 'none'
      : '';
  }

  get isSwitcherOpen(): boolean {
    return this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }

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
    const eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
    this.nzContextMenu.emit(eventNext);
  }

  clickCheckbox(event: MouseEvent): void {
    event.preventDefault();
    // return if the node is disabled
    if (this.isDisabled || this.isDisableCheckbox) {
      return;
    }
    this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
    this.nzTreeNode.isHalfChecked = false;
    this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
    this.nzCheckboxChange.emit(eventNext);
  }

  clearDragClass(): void {
    const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over', 'drop-target'];
    dragClass.forEach(e => this.renderer.removeClass(this.el, e));
  }

  handleDragStart(e: DragEvent): void {
    try {
      // i.e., throw error
      // firefox-need-it
      e.dataTransfer!.setData('text/plain', this.nzTreeNode.key!);
    } catch {
      // noop
    }
    this.nzTreeService.setSelectedNode(this.nzTreeNode);
    this.draggingKey = this.nzTreeNode.key;
    const eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
    this.nzOnDragStart.emit(eventNext);
  }

  handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    // reset position
    this.showIndicator = this.nzTreeNode.key !== this.nzTreeService.getSelectedNode()?.key;
    this.renderIndicator(2);
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
      this.renderIndicator(dropPosition);
      // leaf node will pass
      if (!(this.dragPos === 0 && this.isLeaf)) {
        this.renderer.addClass(this.el, this.dragPosClass[this.dragPos]);
        this.renderer.addClass(this.el, 'drop-target');
      }
    }
    const eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
    this.nzOnDragOver.emit(eventNext);
  }

  handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.renderIndicator(2);
    this.clearDragClass();
    const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
    this.nzOnDragLeave.emit(eventNext);
  }

  handleDragDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.ngZone.run(() => {
      this.showIndicator = false;
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
      if (!this.nzBeforeDrop) {
        // clear dragging state
        this.draggingKey = null;
        const eventNext = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
        this.nzOnDragEnd.emit(eventNext);
      } else {
        // clear dragging state
        this.draggingKey = null;
        this.markForCheck();
      }
    });
  }

  /**
   * Listening to dragging events.
   */
  handDragEvent(): void {
    if (this.nzDraggable) {
      this.destroy$ = new Subject();
      fromEventOutsideAngular<DragEvent>(this.el, 'dragstart')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragStart(e));
      fromEventOutsideAngular<DragEvent>(this.el, 'dragenter')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragEnter(e));
      fromEventOutsideAngular<DragEvent>(this.el, 'dragover')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragOver(e));
      fromEventOutsideAngular<DragEvent>(this.el, 'dragleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragLeave(e));
      fromEventOutsideAngular<DragEvent>(this.el, 'drop')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragDrop(e));
      fromEventOutsideAngular<DragEvent>(this.el, 'dragend')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.handleDragEnd(e));
    } else {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }

  ngOnInit(): void {
    this.nzTreeNode.component = this;

    fromEventOutsideAngular(this.el, 'mousedown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (this.nzSelectMode) {
          event.preventDefault();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDraggable } = changes;
    if (nzDraggable) {
      this.handDragEvent();
    }
  }

  private renderIndicator(dropPosition: number): void {
    this.ngZone.run(() => {
      this.showIndicator = dropPosition !== 2;
      if (this.nzTreeNode.key === this.nzTreeService.getSelectedNode()?.key || (dropPosition === 0 && this.isLeaf)) {
        return;
      }
      this.dragPos = dropPosition;
      this.cdr.markForCheck();
    });
  }
}
