/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { cloneDeep } from 'lodash';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzTreeViewFlatDataSource } from 'ng-zorro-antd/tree-view/flat-data-source';
import { NzTreeFlattener } from 'ng-zorro-antd/tree-view/flattener';
import { NzTreeNodeIndentLineDirective } from 'ng-zorro-antd/tree-view/indent';
import { NzTreeViewNestedDataSource } from 'ng-zorro-antd/tree-view/nested-data-source';
import { NzTreeNodeComponent } from 'ng-zorro-antd/tree-view/node';
import { NzTreeNodePaddingDirective } from 'ng-zorro-antd/tree-view/padding';
import { NzTreeViewComponent } from 'ng-zorro-antd/tree-view/tree-view';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view/tree-view.module';
import { getParent, getDescendants } from 'ng-zorro-antd/tree-view/utils';

describe('tree-view', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('tree-view basic', () => {
    describe('based on nzLevelAccessor', () => {
      let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
      let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;
      let nativeElement: Element;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
        testComponent = fixture.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });

      it('should init flat tree data', () => {
        const { dataNodes } = testComponent.tree;
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node:not([builtin])');
        expect(dataNodes.length).toBe(8);
        expect(shownNodes.length).toBe(2);
        const node = fixture.debugElement.query(By.css('nz-tree-node:not([builtin])'));
        expect(node.componentInstance.data.name).toBe('parent 1');
      });

      it('should highlight when tree node option is selected', () => {
        const nodeOption = fixture.debugElement.query(By.css('nz-tree-node-option'));
        nodeOption.nativeElement.click();
        fixture.detectChanges();
        expect(nodeOption.nativeElement.classList).toContain('ant-tree-node-selected');
      });

      it('should expand nodes when toggle the collapsed tree node', () => {
        const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
        nodeToggle.nativeElement.click();
        fixture.detectChanges();
        expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
      });

      it('should collapse nodes when toggle the expanded tree node', () => {
        const firstNode = testComponent.tree.dataNodes[0];
        testComponent.tree.expand(firstNode);
        fixture.detectChanges();
        const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
        nodeToggle.nativeElement.click();
        fixture.detectChanges();
        expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(2);
      });

      it('should disabled node can not be selected but can be expanded', () => {
        const firstNode = testComponent.tree.dataNodes[0];
        testComponent.tree.expand(firstNode);
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
        const disabledNode = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'))[1];
        expect((disabledNode.componentInstance as NzTreeNodeComponent<FlatNode>).data.name).toBe('parent 1-1');
        const disabledNodeOption = disabledNode.query(By.css('nz-tree-node-option'));
        const disabledNodeToggle = disabledNode.query(By.css('nz-tree-node-toggle'));
        disabledNodeOption.nativeElement.click();
        fixture.detectChanges();
        expect(disabledNodeOption.nativeElement.classList).not.toContain('ant-tree-node-selected');
        disabledNodeToggle.nativeElement.click();
        fixture.detectChanges();
        expect(disabledNodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(6);
      });

      it('should nzDirectoryTree work', () => {
        const treeView = fixture.debugElement.query(By.css('nz-tree-view'));
        expect(treeView.nativeElement.classList).not.toContain('ant-tree-directory');
        testComponent.directoryTree = true;
        fixture.detectChanges();
        expect(treeView.nativeElement.classList).toContain('ant-tree-directory');
        expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
      });

      it('should nzBlockNode work', () => {
        const treeView = fixture.debugElement.query(By.css('nz-tree-view'));
        expect(treeView.nativeElement.classList).not.toContain('ant-tree-block-node');
        testComponent.blockNode = true;
        fixture.detectChanges();
        expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
      });
    });

    describe('based on nzChildrenAccessor', () => {
      let fixture: ComponentFixture<NzTestTreeViewBasicWithChildrenAccessorComponent>;
      let testComponent: NzTestTreeViewBasicWithChildrenAccessorComponent;
      let nativeElement: Element;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestTreeViewBasicWithChildrenAccessorComponent);
        testComponent = fixture.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });

      it('should init nested tree data', () => {
        const { dataNodes } = testComponent.tree;
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node:not([builtin])');
        expect(dataNodes.length).toBe(2);
        expect(dataNodes).toEqual(TREE_DATA);
        expect(shownNodes.length).toBe(2);
      });

      it('should expand nodes when toggle the collapsed tree node', () => {
        const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
        nodeToggle.nativeElement.click();
        fixture.detectChanges();
        expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
      });

      it('should collapse nodes when toggle the expanded tree node', () => {
        const firstNode = testComponent.tree.dataNodes[0];
        testComponent.tree.expand(firstNode);
        fixture.detectChanges();
        const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
        nodeToggle.nativeElement.click();
        fixture.detectChanges();
        expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
        expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(2);
      });
    });
  });

  describe('data source', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should dataSource connect emit value when tree expansion model changed or data changed', fakeAsync(() => {
      let shownNodes: FlatNode[] = [];
      const { dataSource } = testComponent;
      const { dataNodes } = testComponent.tree;
      dataSource
        .connect(testComponent.tree)
        .pipe()
        .subscribe((value: FlatNode[]) => {
          shownNodes = value;
        });
      // expand or collapse
      testComponent.tree.expand(dataNodes[0]);
      tick();
      expect(shownNodes).toEqual([dataNodes[0], dataNodes[1], dataNodes[4], dataNodes[6]]);
      const firstNodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      firstNodeToggle.nativeElement.click();
      tick();
      expect(shownNodes).toEqual([dataNodes[0], dataNodes[6]]);
      // set new data
      const newTreeData = cloneDeep(TREE_DATA).slice(0, 1);
      testComponent.setData(newTreeData);
      tick();
      expect(shownNodes).toEqual([dataNodes[0]]);
    }));
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;
    const defaultIndent = 24;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expand(node);
      });
      fixture.detectChanges();
    });

    it('should nzTreeNodePadding without value work', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    });

    it('should nzTreeNodePadding with value work', () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      const [parent_1, ...otherNodes] = nodes;
      const parent_1_paddingDir = parent_1.injector.get(NzTreeNodePaddingDirective);
      parent_1_paddingDir.level = 1;
      fixture.detectChanges();
      // 1 * defaultIndent = 24
      expect(window.getComputedStyle(parent_1.nativeElement).paddingLeft).toBe('24px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    });

    it('should nzTreeNodePaddingIndent work', () => {
      const indent = 50;
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      nodes.forEach(node => {
        const node_paddingDir = node.injector.get(NzTreeNodePaddingDirective);
        node_paddingDir.indent = indent;
      });
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * indent}px`
        );
      });
    });
  });

  describe('checkbox component', () => {
    let fixture: ComponentFixture<NzTestTreeViewCheckBoxComponent>;
    let testComponent: NzTestTreeViewCheckBoxComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewCheckBoxComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expand(node);
      });
      fixture.detectChanges();
    });

    it('should check all children nodes when the parent is checked, vice versa', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node-checkbox'));
      const parent_1 = nodes[0];
      // checked parent
      parent_1.nativeElement.click();
      fixture.detectChanges();
      nodes.slice(0, 6).forEach(node => {
        expect(node.nativeElement.classList).toContain('ant-tree-checkbox-checked');
      });
      nodes.slice(6, nodes.length).forEach(node => {
        expect(node.nativeElement.classList).not.toContain('ant-tree-checkbox-checked');
      });
      // unchecked parent
      parent_1.nativeElement.click();
      fixture.detectChanges();
      nodes.forEach(node => {
        expect(node.nativeElement.classList).not.toContain('ant-tree-checkbox-checked');
      });
    });

    it('should indeterminate parent when its child is checked', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node-checkbox'));
      const leaf_1_1_1 = nodes[2];
      leaf_1_1_1.nativeElement.click();
      fixture.detectChanges();
      expect(leaf_1_1_1.nativeElement.classList).toContain('ant-tree-checkbox-checked');
      const parent_1_1 = nodes[1];
      const parent_1 = nodes[0];
      expect(parent_1_1.nativeElement.classList).toContain('ant-tree-checkbox-indeterminate');
      expect(parent_1.nativeElement.classList).toContain('ant-tree-checkbox-indeterminate');
      nodes.slice(3, 8).forEach(node => {
        expect(node.nativeElement.classList).not.toContain('ant-tree-checkbox-checked');
      });
    });

    it('should not be checked when the node is disabled', () => {
      const checkboxList = fixture.debugElement.queryAll(By.css('nz-tree-node-checkbox'));
      const parent_1_1 = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'))[1];
      const parent_1_1_checkbox = parent_1_1.query(By.css('nz-tree-node-checkbox'));
      // disable status
      expect(parent_1_1.nativeElement.classList).toContain('ant-tree-treenode-disabled');
      expect(parent_1_1_checkbox.nativeElement.classList).toContain('ant-tree-checkbox-disabled');

      // click
      parent_1_1.nativeElement.click();
      fixture.detectChanges();
      checkboxList.forEach(checkbox => {
        expect(checkbox.nativeElement.classList).not.toContain('ant-tree-checkbox-checked');
      });
      parent_1_1_checkbox.nativeElement.click();
      fixture.detectChanges();
      checkboxList.forEach(checkbox => {
        expect(checkbox.nativeElement.classList).not.toContain('ant-tree-checkbox-checked');
      });
    });
  });

  describe('line indent', () => {
    let fixture: ComponentFixture<NzTestTreeViewLineComponent>;
    let testComponent: NzTestTreeViewLineComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeViewLineComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expand(node);
      });
      fixture.detectChanges();
    }));

    it('should nzTreeNodeIndentLine work', () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodeIndentLineDirective));
      expect(nodes.length).toBe(8);
      const [parent_1, parent_1_1, leaf_1_1_1, leaf_1_1_2, parent_1_2, leaf_1_2_1, parent_2, leaf_2_1] = nodes.map(
        node => node.componentInstance as NzTreeNodeComponent<FlatNode>
      );
      expect(parent_1.indents).toEqual([]);
      expect(parent_1_1.indents).toEqual([true]);
      expect(leaf_1_1_1.indents).toEqual([true, true]);
      expect(leaf_1_1_2.indents).toEqual([true, true]);
      expect(parent_1_2.indents).toEqual([true]);
      expect(leaf_1_2_1.indents).toEqual([true, false]);
      expect(parent_2.indents).toEqual([]);
      expect(leaf_2_1.indents).toEqual([false]);
    });
  });
});

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  disabled?: boolean;
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-1',
        disabled: true,
        children: [{ name: 'leaf 1-1-1' }, { name: 'leaf 1-1-2' }]
      },
      {
        name: 'parent 1-2',
        children: [{ name: 'leaf 1-2-1' }]
      }
    ]
  },
  {
    name: 'parent 2',
    children: [{ name: 'leaf 2-1' }]
  }
];

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view
      [nzDataSource]="dataSource"
      [nzLevelAccessor]="levelAccessor"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
    >
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="node.expandable">
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="node.expandable">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzTestTreeViewBasicWithLevelAccessorComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;
  levelAccessor = (dataNode: FlatNode): number => dataNode.level;
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  selectListSelection = new SelectionModel<FlatNode>(true);
  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;
  directoryTree: boolean = false;
  blockNode: boolean = false;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }

  setData(data: TreeNode[]): void {
    this.dataSource.setData(data);
  }
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzChildrenAccessor]="childrenAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzTestTreeViewBasicWithChildrenAccessorComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<TreeNode>;
  childrenAccessor = (dataNode: TreeNode): TreeNode[] => dataNode.children ?? [];
  hasChild = (_: number, node: TreeNode): boolean => !!node.children?.length;
  selectListSelection = new SelectionModel<TreeNode>(true);
  dataSource!: NzTreeViewNestedDataSource<TreeNode>;
  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, TREE_DATA);
  }
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine [nzExpandable]="false">
        <nz-tree-node-checkbox
          [nzDisabled]="node.disabled"
          [nzChecked]="checklistSelection.isSelected(node)"
          (nzClick)="leafItemSelectionToggle(node)"
        ></nz-tree-node-checkbox>
        <nz-tree-node-option [nzDisabled]="node.disabled" (nzClick)="leafItemSelectionToggle(node)">
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <nz-tree-node-checkbox
          [nzDisabled]="node.disabled"
          [nzChecked]="descendantsAllSelected(node)"
          [nzIndeterminate]="descendantsPartiallySelected(node)"
          (nzClick)="itemSelectionToggle(node)"
        ></nz-tree-node-checkbox>
        <nz-tree-node-option [nzDisabled]="node.disabled" (nzClick)="itemSelectionToggle(node)">
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzTestTreeViewCheckBoxComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;
  levelAccessor = (dataNode: FlatNode): number => dataNode.level;
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  checklistSelection = new SelectionModel<FlatNode>(true);
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }

  private getDescendants(node: FlatNode): FlatNode[] {
    return getDescendants(this.tree.dataNodes, node, this.levelAccessor);
  }

  private getParentNode(node: FlatNode): FlatNode | null {
    return getParent(this.tree.dataNodes, node, this.levelAccessor);
  }

  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.getDescendants(node);
    return descendants.length > 0 && descendants.every(child => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  leafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  itemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 && descendants.every(child => this.checklistSelection.isSelected(child));
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine>
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine>
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzTestTreeViewLineComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;
  levelAccessor = (dataNode: FlatNode): number => dataNode.level;
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }
}
