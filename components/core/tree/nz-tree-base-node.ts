/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeNodeBaseComponent } from './nz-tree-base.definitions';
import { NzTreeBaseService } from './nz-tree-base.service';

export type NzTreeNodeKey = string | number;

export interface FlattenNode {
  parent: FlattenNode | null;
  children: FlattenNode[];
  pos: string;
  data: NzTreeNode;
  isStart: boolean[];
  isEnd: boolean[];
}

export interface NzTreeNodeOptions {
  title: string;
  key: string;
  icon?: string;
  isLeaf?: boolean;
  checked?: boolean;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  expanded?: boolean;
  children?: NzTreeNodeOptions[];

  [key: string]: NzSafeAny;
}

export class NzTreeNode {
  private _title: string = '';
  key!: string;
  level: number = 0;
  origin!: NzTreeNodeOptions;
  // Parent Node
  parentNode: NzTreeNode | null = null;
  private _icon: string = '';
  private _children: NzTreeNode[] = [];
  private _isLeaf: boolean = false;
  private _isChecked: boolean = false;
  private _isSelectable: boolean = false;
  private _isDisabled: boolean = false;
  private _isDisableCheckbox: boolean = false;
  private _isExpanded: boolean = false;
  private _isHalfChecked: boolean = false;
  private _isSelected: boolean = false;
  private _isLoading: boolean = false;
  canHide: boolean = false;
  isMatched: boolean = false;

  service: NzTreeBaseService | null = null;
  component!: NzTreeNodeBaseComponent;

  /** New added in Tree for easy data access */
  isStart?: boolean[];
  isEnd?: boolean[];

  get treeService(): NzTreeBaseService | null {
    return this.service || (this.parentNode && this.parentNode.treeService);
  }

  /**
   * Init nzTreeNode
   *
   * @param option option user's input
   * @param parent parent node
   * @param service base nzTreeService
   */
  constructor(
    option: NzTreeNodeOptions | NzTreeNode,
    parent: NzTreeNode | null = null,
    service: NzTreeBaseService | null = null
  ) {
    if (option instanceof NzTreeNode) {
      return option;
    }
    this.service = service || null;
    this.origin = option;
    this.key = option.key;
    this.parentNode = parent;
    this._title = option.title || '---';
    this._icon = option.icon || '';
    this._isLeaf = option.isLeaf || false;
    this._children = [];
    // option params
    this._isChecked = option.checked || false;
    this._isSelectable = option.disabled || option.selectable !== false;
    this._isDisabled = option.disabled || false;
    this._isDisableCheckbox = option.disableCheckbox || false;
    this._isExpanded = option.isLeaf ? false : option.expanded || false;
    this._isHalfChecked = false;
    this._isSelected = (!option.disabled && option.selected) || false;
    this._isLoading = false;
    this.isMatched = false;

    /**
     * parent's checked status will affect children while initializing
     */
    if (parent) {
      this.level = parent.level + 1;
    } else {
      this.level = 0;
    }

    const s = this.treeService;

    /**
     * post process of current treeNode
     */
    s?.treeNodePostProcessor?.(this);

    /**
     * instantiate children tree nodes
     */
    if (typeof option.children !== 'undefined' && option.children !== null) {
      option.children.forEach(nodeOptions => {
        if (
          s &&
          !s.isCheckStrictly &&
          option.checked &&
          !option.disabled &&
          !nodeOptions.disabled &&
          !nodeOptions.disableCheckbox
        ) {
          nodeOptions.checked = option.checked;
        }
        this._children.push(new NzTreeNode(nodeOptions, this));
      });
    }
  }

  /**
   * auto generate
   * get
   * set
   */
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
    this.update();
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
    this.update();
  }

  get children(): NzTreeNode[] {
    return this._children;
  }

  set children(value: NzTreeNode[]) {
    this._children = value;
    this.update();
  }

  get isLeaf(): boolean {
    return this._isLeaf;
  }

  set isLeaf(value: boolean) {
    this._isLeaf = value;
    this.update();
  }

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(value: boolean) {
    this._isChecked = value;
    this.origin.checked = value;
    this.afterValueChange('isChecked');
  }

  get isHalfChecked(): boolean {
    return this._isHalfChecked;
  }

  set isHalfChecked(value: boolean) {
    this._isHalfChecked = value;
    this.afterValueChange('isHalfChecked');
  }

  get isSelectable(): boolean {
    return this._isSelectable;
  }

  set isSelectable(value: boolean) {
    this._isSelectable = value;
    this.update();
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    this._isDisabled = value;
    this.update();
  }

  get isDisableCheckbox(): boolean {
    return this._isDisableCheckbox;
  }

  set isDisableCheckbox(value: boolean) {
    this._isDisableCheckbox = value;
    this.update();
  }

  get isExpanded(): boolean {
    return this._isExpanded;
  }

  set isExpanded(value: boolean) {
    this._isExpanded = value;
    this.origin.expanded = value;
    this.afterValueChange('isExpanded');
    this.afterValueChange('reRender');
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
    this.origin.selected = value;
    this.afterValueChange('isSelected');
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
    this.update();
  }

  public setSyncChecked(checked: boolean = false, halfChecked: boolean = false): void {
    this.setChecked(checked, halfChecked);
    if (this.treeService && !this.treeService.isCheckStrictly) {
      this.treeService.conduct(this);
    }
  }

  public setChecked(checked: boolean = false, halfChecked: boolean = false): void {
    this.origin.checked = checked;
    this.isChecked = checked;
    this.isHalfChecked = halfChecked;
  }

  public setExpanded(value: boolean): void {
    this._isExpanded = value;
    this.origin.expanded = value;
    this.afterValueChange('isExpanded');
  }

  public getParentNode(): NzTreeNode | null {
    return this.parentNode;
  }

  public getChildren(): NzTreeNode[] {
    return this.children;
  }

  /**
   * Support appending child nodes by position. Leaf node cannot be appended.
   */
  public addChildren(children: NzSafeAny[], childPos: number = -1): void {
    if (!this.isLeaf) {
      children.forEach(node => {
        const refreshLevel = (n: NzTreeNode): void => {
          n.getChildren().forEach(c => {
            c.level = c.getParentNode()!.level + 1;
            // flush origin
            c.origin.level = c.level;
            refreshLevel(c);
          });
        };
        let child = node;
        if (child instanceof NzTreeNode) {
          child.parentNode = this;
        } else {
          child = new NzTreeNode(node, this);
        }
        child.level = this.level + 1;
        child.origin.level = child.level;
        refreshLevel(child);
        try {
          childPos === -1 ? this.children.push(child) : this.children.splice(childPos, 0, child);
          // flush origin
        } catch {
          // noop
        }
      });
      this.origin.children = this.getChildren().map(v => v.origin);
      // remove loading state
      this.isLoading = false;
    }
    this.afterValueChange('addChildren');
    this.afterValueChange('reRender');
  }

  public clearChildren(): void {
    // refresh checked state
    this.afterValueChange('clearChildren');
    this.children = [];
    this.origin.children = [];
    this.afterValueChange('reRender');
  }

  public remove(): void {
    const parentNode = this.getParentNode();
    if (parentNode) {
      parentNode.children = parentNode.getChildren().filter(v => v.key !== this.key);
      parentNode.origin.children = parentNode.origin.children!.filter(v => v.key !== this.key);
      this.afterValueChange('remove');
      this.afterValueChange('reRender');
    }
  }

  public afterValueChange(key: string): void {
    if (this.treeService) {
      switch (key) {
        case 'isChecked':
          this.treeService.setCheckedNodeList(this);
          break;
        case 'isHalfChecked':
          this.treeService.setHalfCheckedNodeList(this);
          break;
        case 'isExpanded':
          this.treeService.setExpandedNodeList(this);
          break;
        case 'isSelected':
          this.treeService.setNodeActive(this);
          break;
        case 'clearChildren':
          this.treeService.afterRemove(this.getChildren());
          break;
        case 'remove':
          this.treeService.afterRemove([this]);
          break;
        case 'reRender':
          this.treeService.flattenTreeData(
            this.treeService.rootNodes,
            this.treeService.getExpandedNodeList().map(v => v.key!)
          );
          break;
      }
    }
    this.update();
  }

  public update(): void {
    if (this.component) {
      this.component.markForCheck();
    }
  }
}
