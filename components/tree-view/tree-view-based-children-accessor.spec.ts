/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { cloneDeep } from 'lodash';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzTreeNodeIndentLineDirective } from 'ng-zorro-antd/tree-view/indent';
import { NzTreeViewNestedDataSource } from 'ng-zorro-antd/tree-view/nested-data-source';
import { NzTreeNodeComponent } from 'ng-zorro-antd/tree-view/node';
import { NzTreeNodePaddingDirective } from 'ng-zorro-antd/tree-view/padding';
import { NzTreeViewComponent } from 'ng-zorro-antd/tree-view/tree-view';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view/tree-view.module';

describe('tree-view based on nzChildrenAccessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('tree view basic', () => {
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
      expect((disabledNode.componentInstance as NzTreeNodeComponent<TreeNode>).data.name).toBe('parent 1-1');
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

  describe('nested data source', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithChildrenAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithChildrenAccessorComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithChildrenAccessorComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should dataSource getData return origin nested data', () => {
      const data = testComponent.dataSource.getData();
      expect(data).toBe(TREE_DATA);
    });

    it('should dataSource connect emit origin nested data when tree expansion model changed or data changed', () => {
      let data: TreeNode[] = [];
      const { dataSource } = testComponent;
      const dataNodes = dataSource.getData();
      dataSource
        .connect(testComponent.tree)
        .pipe()
        .subscribe((value: TreeNode[]) => {
          data = value;
        });
      // expand or collapse
      testComponent.tree.expand(dataNodes[0]);
      fixture.detectChanges();
      expect(data).toEqual(TREE_DATA);
      const firstNodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      firstNodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(data).toEqual(TREE_DATA);

      // set new data
      const newTreeData = cloneDeep(TREE_DATA).slice(0, 1);
      testComponent.setData(newTreeData);
      expect(testComponent.tree.dataNodes).toBe(newTreeData);
      fixture.detectChanges();
      expect(data).toEqual(newTreeData);
    });
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithChildrenAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithChildrenAccessorComponent;
    const defaultIndent = 24;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithChildrenAccessorComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expandDescendants(node);
      });
      fixture.detectChanges();
    });

    it('should nzTreeNodePadding without value work', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<TreeNode>).level * defaultIndent}px`
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
          `${(node.componentInstance as NzTreeNodeComponent<TreeNode>).level * defaultIndent}px`
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
          `${(node.componentInstance as NzTreeNodeComponent<TreeNode>).level * indent}px`
        );
      });
    });
  });

  describe('line indents', () => {
    let fixture: ComponentFixture<NzTestTreeViewLineComponent>;
    let testComponent: NzTestTreeViewLineComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeViewLineComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expandDescendants(node);
      });
      fixture.detectChanges();
    }));

    it('should nzTreeNodeIndentLine work', () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodeIndentLineDirective));
      expect(nodes.length).toBe(8);
      const [parent_1, parent_1_1, leaf_1_1_1, leaf_1_1_2, parent_1_2, leaf_1_2_1, parent_2, leaf_2_1] = nodes.map(
        node => node.componentInstance as NzTreeNodeComponent<TreeNode>
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
      [nzChildrenAccessor]="childrenAccessor"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
    >
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
  directoryTree: boolean = false;
  blockNode: boolean = false;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, TREE_DATA);
  }

  setData(data: TreeNode[]): void {
    this.dataSource.setData(data);
  }
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzChildrenAccessor]="childrenAccessor">
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
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<TreeNode>;
  childrenAccessor = (dataNode: TreeNode): TreeNode[] => dataNode.children ?? [];
  hasChild = (_: number, node: TreeNode): boolean => !!node.children?.length;
  dataSource!: NzTreeViewNestedDataSource<TreeNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, TREE_DATA);
  }
}
