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
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChange,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  InputBoolean,
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzNoAnimationDirective,
  NzTreeBaseService,
  NzTreeNode,
  NzTreeNodeOptions,
  treeCollapseMotion
} from 'ng-zorro-antd/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-tree-node',
  exportAs: 'nzTreeNode',
  template: `
    <div #dragElement role="treeitem" [ngClass]="nzNodeClass" [style.display]="displayStyle">
      <nz-tree-indent
        [nzTreeLevel]="nzTreeNode.level"
        [nzPrefixCls]="prefixCls"
        [nzIsStart]="nzTreeNode.isStart"
        [nzIsEnd]="nzTreeNode.isEnd"
      ></nz-tree-indent>
      <ng-container *ngIf="nzShowExpand">
        <!-- render switcher -->
        <span [ngClass]="nzNodeSwitcherClass" (click)="clickExpand($event)">
          <ng-container *ngIf="isShowSwitchIcon">
            <ng-container *ngIf="!nzTreeNode.isLoading">
              <ng-template
                *ngIf="isTemplateRef(nzExpandedIcon)"
                [ngTemplateOutlet]="nzExpandedIcon"
                [ngTemplateOutletContext]="{ $implicit: nzTreeNode, origin: nzTreeNode.origin }"
              >
              </ng-template>
              <i
                *ngIf="!isTemplateRef(nzExpandedIcon)"
                nz-icon
                nzType="caret-down"
                [class.ant-select-tree-switcher-icon]="nzSelectMode"
                [class.ant-tree-switcher-icon]="!nzSelectMode"
              >
              </i>
            </ng-container>
            <i *ngIf="nzTreeNode.isLoading" nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
          </ng-container>
          <ng-container *ngIf="nzShowLine">
            <ng-container *ngIf="!nzTreeNode.isLoading">
              <ng-template
                *ngIf="isTemplateRef(nzExpandedIcon)"
                [ngTemplateOutlet]="nzExpandedIcon"
                [ngTemplateOutletContext]="{ $implicit: nzTreeNode, origin: nzTreeNode.origin }"
              >
              </ng-template>
              <ng-container *ngIf="!isTemplateRef(nzExpandedIcon)">
                <i
                  *ngIf="isShowLineIcon"
                  nz-icon
                  [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
                  class="ant-tree-switcher-line-icon"
                ></i>
                <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
              </ng-container>
            </ng-container>
            <i *ngIf="nzTreeNode.isLoading" nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
          </ng-container>
        </span>
      </ng-container>
      <ng-container *ngIf="nzCheckable">
        <span [ngClass]="nzNodeCheckboxClass" (click)="clickCheckBox($event)">
          <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span>
        </span>
      </ng-container>
      <span
        title="{{ nzTreeNode.title }}"
        [attr.draggable]="canDraggable"
        [attr.aria-grabbed]="canDraggable"
        [ngClass]="nzNodeContentClass"
        [class.draggable]="canDraggable"
        (dblclick)="dblClick($event)"
        (click)="clickSelect($event)"
        (contextmenu)="contextMenu($event)"
      >
        <ng-template [ngTemplateOutlet]="nzTreeTemplate" [ngTemplateOutletContext]="{ $implicit: nzTreeNode, origin: nzTreeNode.origin }">
        </ng-template>
        <ng-container *ngIf="!nzTreeTemplate">
          <span
            *ngIf="nzTreeNode.icon && nzShowIcon"
            [class.ant-tree-icon__open]="isSwitcherOpen"
            [class.ant-tree-icon__close]="isSwitcherClose"
            [class.ant-tree-icon_loading]="nzTreeNode.isLoading"
            [ngClass]="nzNodeContentLoadingClass"
          >
            <span [ngClass]="nzNodeContentIconClass">
              <i nz-icon *ngIf="nzIcon" [nzType]="nzIcon"></i>
            </span>
          </span>
          <span class="ant-tree-title" [innerHTML]="nzTreeNode.title | nzHighlight: matchedValue:'':'font-highlight'"> </span>
        </ng-container>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  animations: [treeCollapseMotion]
})
export class NzTreeNodeComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('dragElement', { static: false }) dragElement: ElementRef;

  /**
   * for global property
   */
  @Input() nzTreeNode: NzTreeNode;
  @Input() @InputBoolean() nzShowLine: boolean;
  @Input() @InputBoolean() nzShowExpand: boolean;
  @Input() @InputBoolean() nzCheckable: boolean;
  @Input() @InputBoolean() nzAsyncData: boolean;
  @Input() @InputBoolean() nzHideUnMatched = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzSelectMode = false;
  @Input() @InputBoolean() nzShowIcon = false;
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input() nzSearchValue = '';
  @Input() nzDraggable: boolean;

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

  // default var
  prefixCls = 'ant-tree';
  nzNodeClass = {};
  nzNodeSwitcherClass = {};
  nzNodeContentClass = {};
  nzNodeCheckboxClass = {};
  nzNodeContentIconClass = {};
  nzNodeContentLoadingClass = {};

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
    return this.nzSearchValue &&
      this.nzHideUnMatched &&
      !this.nzTreeNode.isMatched &&
      !this.nzTreeNode.isExpanded &&
      this.nzTreeNode.canHide
      ? 'none'
      : '';
  }

  get matchedValue(): string {
    return this.nzTreeNode.isMatched ? this.nzSearchValue : '';
  }

  get nzIcon(): string {
    return this.nzTreeNode.icon;
  }

  get canDraggable(): boolean | null {
    return this.nzDraggable && !this.nzTreeNode.isDisabled ? true : null;
  }

  get isShowLineIcon(): boolean {
    return !this.nzTreeNode.isLeaf && this.nzShowLine;
  }

  get isShowSwitchIcon(): boolean {
    return !this.nzTreeNode.isLeaf && !this.nzShowLine;
  }

  get isSwitcherOpen(): boolean {
    return this.nzTreeNode.isExpanded && !this.nzTreeNode.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.nzTreeNode.isExpanded && !this.nzTreeNode.isLeaf;
  }

  /**
   * reset node class
   */
  setClassMap(): void {
    this.prefixCls = this.nzSelectMode ? 'ant-select-tree' : 'ant-tree';
    this.nzNodeClass = {
      [`${this.prefixCls}-treenode`]: true,
      [`${this.prefixCls}-treenode-disabled`]: this.nzTreeNode.isDisabled,
      [`${this.prefixCls}-treenode-switcher-open`]: this.isSwitcherOpen,
      [`${this.prefixCls}-treenode-switcher-close`]: this.isSwitcherClose,
      [`${this.prefixCls}-treenode-checkbox-checked`]: this.nzTreeNode.isChecked,
      [`${this.prefixCls}-treenode-checkbox-indeterminate`]: this.nzTreeNode.isHalfChecked,
      [`${this.prefixCls}-treenode-selected`]: this.nzTreeNode.isSelected,
      [`${this.prefixCls}-treenode-loading`]: this.nzTreeNode.isLoading
    };
    this.nzNodeSwitcherClass = {
      [`${this.prefixCls}-switcher`]: true,
      [`${this.prefixCls}-switcher-noop`]: this.nzTreeNode.isLeaf,
      [`${this.prefixCls}-switcher_open`]: this.isSwitcherOpen,
      [`${this.prefixCls}-switcher_close`]: this.isSwitcherClose
    };

    this.nzNodeCheckboxClass = {
      [`${this.prefixCls}-checkbox`]: true,
      [`${this.prefixCls}-checkbox-checked`]: this.nzTreeNode.isChecked,
      [`${this.prefixCls}-checkbox-indeterminate`]: this.nzTreeNode.isHalfChecked,
      [`${this.prefixCls}-checkbox-disabled`]: this.nzTreeNode.isDisabled || this.nzTreeNode.isDisableCheckbox
    };

    this.nzNodeContentClass = {
      [`${this.prefixCls}-node-content-wrapper`]: true,
      [`${this.prefixCls}-node-content-wrapper-open`]: this.isSwitcherOpen,
      [`${this.prefixCls}-node-content-wrapper-close`]: this.isSwitcherClose,
      [`${this.prefixCls}-node-selected`]: this.nzTreeNode.isSelected
    };
    this.nzNodeContentIconClass = {
      [`${this.prefixCls}-iconEle`]: true,
      [`${this.prefixCls}-icon__customize`]: true
    };
    this.nzNodeContentLoadingClass = {
      [`${this.prefixCls}-iconEle`]: true
    };
  }

  @HostListener('mousedown', ['$event'])
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
    if (!this.nzTreeNode.isLoading && !this.nzTreeNode.isLeaf) {
      // set async state
      if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.nzTreeNode.isExpanded) {
        this.nzTreeNode.isLoading = true;
      }
      this.nzTreeNode.setExpanded(!this.nzTreeNode.isExpanded);
    }
    this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
    this.nzExpandChange.emit(eventNext);
  }

  clickSelect(event: MouseEvent): void {
    event.preventDefault();
    if (this.nzTreeNode.isSelectable && !this.nzTreeNode.isDisabled) {
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
    if (this.nzTreeNode.isDisabled || this.nzTreeNode.isDisableCheckbox) {
      return;
    }
    this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
    this.nzTreeNode.isHalfChecked = false;
    this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
    this.nzCheckBoxChange.emit(eventNext);
  }

  /**
   * drag event
   * @param e
   */
  clearDragClass(): void {
    const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
    dragClass.forEach(e => {
      this.renderer.removeClass(this.dragElement.nativeElement, e);
    });
  }

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
      if (!(this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
        this.renderer.addClass(this.dragElement.nativeElement, this.dragPosClass[this.dragPos]);
      }
    }
    const eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
    this.nzOnDragOver.emit(eventNext);
  }

  handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.ngZone.run(() => {
      this.clearDragClass();
    });
    const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
    this.nzOnDragLeave.emit(eventNext);
  }

  handleDragDrop(e: DragEvent): void {
    this.ngZone.run(() => {
      this.clearDragClass();
      const node = this.nzTreeService.getSelectedNode();
      if (!node || (node && node.key === this.nzTreeNode.key) || (this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
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
        this.destroy$ = new Subject();
        fromEvent<DragEvent>(this.elRef.nativeElement, 'dragstart')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragStart(e));
        fromEvent<DragEvent>(this.elRef.nativeElement, 'dragenter')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnter(e));
        fromEvent<DragEvent>(this.elRef.nativeElement, 'dragover')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragOver(e));
        fromEvent<DragEvent>(this.elRef.nativeElement, 'dragleave')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragLeave(e));
        fromEvent<DragEvent>(this.elRef.nativeElement, 'drop')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragDrop(e));
        fromEvent<DragEvent>(this.elRef.nativeElement, 'dragend')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnd(e));
      } else {
        this.destroy$.next();
        this.destroy$.complete();
      }
    });
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public nzTreeService: NzTreeBaseService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elRef: ElementRef,
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
    this.setClassMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
