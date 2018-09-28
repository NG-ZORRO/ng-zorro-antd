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

  // tslint:disable-next-line:no-any
  [ key: string ]: any;
}

export class NzTreeNode {
  title?: string;
  key?: string;
  level: number = 0;
  children: NzTreeNode[];
  isLeaf: boolean;
  // tslint:disable-next-line:no-any
  origin: any;
  // Parent Node
  parentNode: NzTreeNode;
  isChecked: boolean;
  isSelectable: boolean;
  isDisabled: boolean;
  isDisableCheckbox: boolean;
  isExpanded: boolean;
  isHalfChecked: boolean;
  isAllChecked: boolean;
  isSelected: boolean;
  isLoading: boolean;
  isMatched: boolean;

  constructor(option: NzTreeNodeOptions, parent: NzTreeNode = null) {
    this.title = option.title || '---';
    this.key = option.key || null;
    this.isLeaf = option.isLeaf || false;
    this.origin = option;
    this.children = [];
    this.parentNode = parent;
    // option params
    this.isChecked = option.checked || false;
    this.isSelectable = option.disabled || (option.selectable === false ? false : true);
    this.isDisabled = option.disabled || false;
    this.isDisableCheckbox = option.disableCheckbox || false;
    this.isExpanded = option.isLeaf ? false : (option.expanded || false);
    this.isAllChecked = option.checked || false;
    this.isHalfChecked = false;
    this.isSelected = (!option.disabled && option.selected) || false;
    this.isLoading = false;
    this.isMatched = false;

    /**
     * parent's checked status will affect children while initializing
     */
    if (parent) {
      this.level = parent.level + 1;
    } else {
      this.level = 0;
    }
    if (typeof(option.children) !== 'undefined' && option.children !== null) {
      option.children.forEach(
        (nodeOptions) => {
          if (option.checked && !option.disabled && !nodeOptions.disabled && !nodeOptions.disableCheckbox) {
            nodeOptions.checked = option.checked;
          }
          this.children.push(new NzTreeNode(nodeOptions, this));
        }
      );
    }
  }

  public setChecked(checked: boolean = false, halfChecked: boolean = false): void {
    this.origin.checked = checked;
    this.isChecked = checked;
    this.isAllChecked = checked;
    this.isHalfChecked = halfChecked;
  }

  public setExpanded(value: boolean): void {
    this.origin.expanded = value;
    this.isExpanded = value;
  }

  public setSelected(value: boolean): void {
    this.origin.selected = value;
    this.isSelected = value;
  }

  public getParentNode(): NzTreeNode {
    return this.parentNode;
  }

  public getChildren(): NzTreeNode[] {
    return this.children;
  }

  /**
   * 支持按索引位置插入,叶子节点不可添加
   */
  // tslint:disable-next-line:no-any
  public addChildren(children: any[], childPos: number = -1): void {
    if (!this.isLeaf) {
      children.forEach(
        (node) => {
          const refreshLevel = (n: NzTreeNode) => {
            n.getChildren().forEach(c => {
              c.level = c.getParentNode().level + 1;
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
          } catch (e) {
          }
        });
      this.origin.children = this.getChildren().map(v => v.origin);
      // remove loading state
      this.isLoading = false;
    }
  }

  public clearChildren(): void {
    this.children = [];
  }
}
