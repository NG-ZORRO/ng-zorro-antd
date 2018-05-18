export interface NzTreeNodeOptions {
  title: string;
  key: string;
  isLeaf?: boolean;
  checked?: boolean;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  expanded?: boolean;
  children?: NzTreeNodeOptions[];
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
    this.isExpanded = option.expanded || false;

    this.isAllChecked = option.checked || false;
    this.isHalfChecked = false;
    this.isSelected = option.selected || false;
    this.isLoading = false;
    this.isMatched = false;

    /**
     * 初始化时父节点checked状态影响全部子节点
     */
    if (parent) {
      this.level = parent.level + 1;
    } else {
      this.level = 0;
    }
    if (typeof(option.children) !== 'undefined' && option.children !== null) {
      option.children.forEach(
        (nodeOptions) => {
          if (option.checked && !option.disabled) {
            nodeOptions.checked = option.checked;
          }
          this.children.push(new NzTreeNode(nodeOptions, this));
        }
      );
    }
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
    if (this.isLeaf) {
      // remove loading state
      this.isLoading = false;
    } else {
      children.forEach(
        (node) => {
          let tNode = node;
          if (tNode instanceof NzTreeNode) {
            tNode.parentNode = this;
          } else {
            tNode = new NzTreeNode(node, this);
          }
          tNode.level = this.level + 1;
          try {
            childPos === -1 ? this.children.push(tNode) : this.children.splice(childPos, 0, tNode);
          } catch (e) {

          }
        });
      // remove loading state
      this.isLoading = false;
    }
  }

  public clearChildren(): void {
    this.children = [];
  }
}
