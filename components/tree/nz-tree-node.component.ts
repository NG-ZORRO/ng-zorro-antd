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
  Host,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  treeCollapseMotion,
  warnDeprecation,
  InputBoolean,
  NzFormatBeforeDropEvent,
  NzNoAnimationDirective,
  NzTreeBaseService,
  NzTreeNode
} from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-tree-node',
  exportAs: 'nzTreeNode',
  templateUrl: './nz-tree-node.component.html',
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
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;
  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode }>;
  @Input() nzBeforeDrop: (confirm: NzFormatBeforeDropEvent) => Observable<boolean>;
  @Input() nzSearchValue = '';

  @Input()
  set nzDraggable(value: boolean) {
    this._nzDraggable = value;
    this.handDragEvent();
  }

  get nzDraggable(): boolean {
    return this._nzDraggable;
  }

  /**
   * @deprecated use `nzExpandAll` instead.
   */
  @Input()
  set nzDefaultExpandAll(value: boolean) {
    warnDeprecation(`'nzDefaultExpandAll' is going to be removed in 9.0.0. Please use 'nzExpandAll' instead.`);
    this._nzExpandAll = value;
    if (value && this.nzTreeNode && !this.nzTreeNode.isLeaf) {
      this.nzTreeNode.isExpanded = true;
    }
  }

  get nzDefaultExpandAll(): boolean {
    return this._nzExpandAll;
  }

  // default set
  @Input()
  set nzExpandAll(value: boolean) {
    this._nzExpandAll = value;
    if (value && this.nzTreeNode && !this.nzTreeNode.isLeaf) {
      this.nzTreeNode.isExpanded = true;
    }
  }

  get nzExpandAll(): boolean {
    return this._nzExpandAll;
  }

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
  _nzDraggable = false;
  _nzExpandAll = false;

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

  /**
   * reset node class
   */
  setClassMap(): void {
    this.prefixCls = this.nzSelectMode ? 'ant-select-tree' : 'ant-tree';
    this.nzNodeClass = {
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
   * click node to select, 200ms to dbl click
   */
  @HostListener('click', ['$event'])
  nzClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.nzTreeNode.isSelectable && !this.nzTreeNode.isDisabled) {
      this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
    }
    const eventNext = this.nzTreeService.formatEvent('click', this.nzTreeNode, event);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  @HostListener('dblclick', ['$event'])
  nzDblClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const eventNext = this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  /**
   * @param event
   */
  @HostListener('contextmenu', ['$event'])
  nzContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  /**
   * collapse node
   * @param event
   */
  _clickExpand(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.nzTreeNode.isLoading && !this.nzTreeNode.isLeaf) {
      // set async state
      if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.nzTreeNode.isExpanded) {
        this.nzTreeNode.isLoading = true;
      }
      this.nzTreeNode.isExpanded = !this.nzTreeNode.isExpanded;
      if (this.nzTreeNode.isMatched) {
        this.setDisplayForParentNodes(this.nzTreeNode);
      }
      this.setDisplayForChildNodes(this.nzTreeNode);
      const eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
      this.nzTreeService!.triggerEventChange$!.next(eventNext);
    }
  }

  private setDisplayForChildNodes(parentNode: NzTreeNode): void {
    const { children } = parentNode;
    if (children.length > 0) {
      children.map(node => {
        const canHide = !node.isMatched;
        node.canHide = canHide;
        this.setDisplayForChildNodes(node);
      });
    }
  }

  private setDisplayForParentNodes(targetNode: NzTreeNode): void {
    const parentNode = targetNode.getParentNode();
    if (parentNode) {
      parentNode.canHide = false;
      this.setDisplayForParentNodes(parentNode);
    }
  }

  /**
   * check node
   * @param event
   */
  _clickCheckBox(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // return if node is disabled
    if (this.nzTreeNode.isDisabled || this.nzTreeNode.isDisableCheckbox) {
      return;
    }
    this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
    this.nzTreeNode.isHalfChecked = false;
    if (!this.nzTreeService.isCheckStrictly) {
      this.nzTreeService.conduct(this.nzTreeNode);
    }
    const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
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
    e.stopPropagation();
    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer!.setData('text/plain', this.nzTreeNode.key!);
    } catch (error) {
      // empty
    }
    this.nzTreeService.setSelectedNode(this.nzTreeNode);
    this.nzTreeNode.isExpanded = false;
    const eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    // reset position
    this.dragPos = 2;
    this.ngZone.run(() => {
      const node = this.nzTreeService.getSelectedNode();
      if (node && node.key !== this.nzTreeNode.key && !this.nzTreeNode.isExpanded && !this.nzTreeNode.isLeaf) {
        this.nzTreeNode.isExpanded = true;
      }
      const eventNext = this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e);
      this.nzTreeService!.triggerEventChange$!.next(eventNext);
    });
  }

  handleDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
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
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  handleDragLeave(e: DragEvent): void {
    e.stopPropagation();
    this.ngZone.run(() => {
      this.clearDragClass();
    });
    const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
    this.nzTreeService!.triggerEventChange$!.next(eventNext);
  }

  handleDragDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
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
          this.nzTreeService!.triggerEventChange$!.next(dropEvent);
          this.nzTreeService!.triggerEventChange$!.next(dragEndEvent);
        });
      } else if (this.nzTreeNode) {
        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
        this.nzTreeService!.triggerEventChange$!.next(dropEvent);
      }
    });
  }

  handleDragEnd(e: DragEvent): void {
    e.stopPropagation();
    this.ngZone.run(() => {
      // if user do not custom beforeDrop
      if (!this.nzBeforeDrop) {
        const eventNext = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
        this.nzTreeService!.triggerEventChange$!.next(eventNext);
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
    // init expanded / selected / checked list
    if (this.nzTreeNode.isSelected) {
      this.nzTreeService.setNodeActive(this.nzTreeNode);
    }
    if (this.nzTreeNode.isExpanded) {
      this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
    }
    if (this.nzTreeNode.isChecked) {
      this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
    }
    // TODO
    this.nzTreeNode.component = this;
    this.nzTreeService
      .eventTriggerChanged()
      .pipe(
        filter(data => data.node!.key === this.nzTreeNode.key),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setClassMap();
        this.markForCheck();
      });
    this.setClassMap();
  }

  ngOnChanges(): void {
    this.setClassMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
