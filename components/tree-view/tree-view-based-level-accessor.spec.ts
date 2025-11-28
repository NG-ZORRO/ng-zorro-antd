/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { cloneDeep } from 'lodash';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzTreeViewFlatDataSource } from './flat-data-source';
import { NzTreeFlattener } from './flattener';
import { NzTreeNodeIndentLineDirective } from './indent';
import { NzTreeNodeComponent } from './node';
import { NzTreeNodePaddingDirective } from './padding';
import { NzTreeViewComponent } from './tree-view';
import { waitForNextAnimationFrame } from './tree-view-based-children-accessor.spec';
import { NzTreeViewModule } from './tree-view.module';

describe('tree-view based on nzLevelAccessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('tree view basic', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;
    let nativeElement: Element;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      nativeElement = fixture.debugElement.nativeElement;
      await fixture.whenStable();
    });

    it('should init flat tree data', () => {
      const { dataNodes } = testComponent.tree;
      const shownNodes = nativeElement.querySelectorAll('nz-tree-node:not([builtin])');
      expect(dataNodes.length).toBe(8);
      expect(shownNodes.length).toBe(2);
      const node = fixture.debugElement.query(By.css('nz-tree-node:not([builtin])'));
      expect(node.componentInstance.data.name).toBe('parent 1');
    });

    it('should highlight when tree node option is selected', async () => {
      const nodeOption = fixture.debugElement.query(By.css('nz-tree-node-option'));
      nodeOption.nativeElement.click();
      await fixture.whenStable();
      expect(nodeOption.nativeElement.classList).toContain('ant-tree-node-selected');
    });

    it('should expand nodes when toggle the collapsed tree node', async () => {
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
    });

    it('should collapse nodes when toggle the expanded tree node', async () => {
      const firstNode = testComponent.tree.dataNodes[0];
      testComponent.tree.expand(firstNode);
      await fixture.whenStable();
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(2);
    });

    it('should disabled node can not be selected but can be expanded', async () => {
      const firstNode = testComponent.tree.dataNodes[0];
      testComponent.tree.expand(firstNode);
      await fixture.whenStable();
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
      const disabledNode = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'))[1];
      expect((disabledNode.componentInstance as NzTreeNodeComponent<FlatNode>).data.name).toBe('parent 1-1');
      const disabledNodeOption = disabledNode.query(By.css('nz-tree-node-option'));
      const disabledNodeToggle = disabledNode.query(By.css('nz-tree-node-toggle'));
      disabledNodeOption.nativeElement.click();
      await fixture.whenStable();
      expect(disabledNodeOption.nativeElement.classList).not.toContain('ant-tree-node-selected');
      disabledNodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(disabledNodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(6);
    });

    it('should nzDirectoryTree work', async () => {
      const treeView = fixture.debugElement.query(By.css('nz-tree-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-directory');
      testComponent.directoryTree = true;
      fixture.changeDetectorRef.markForCheck();
      await fixture.whenStable();
      expect(treeView.nativeElement.classList).toContain('ant-tree-directory');
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    });

    it('should nzBlockNode work', async () => {
      const treeView = fixture.debugElement.query(By.css('nz-tree-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-block-node');
      testComponent.blockNode = true;
      fixture.changeDetectorRef.markForCheck();
      await fixture.whenStable();
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    });
  });

  describe('flattener', () => {
    let flattener: NzTreeFlattener<TreeNode, FlatNode>;
    const transformer = (node: TreeNode, level: number): FlatNode => ({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      disabled: !!node.disabled
    });

    it('should flattenNodes method transform nested nodes to flatten nodes', () => {
      flattener = new NzTreeFlattener(
        transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
      );
      expect(flattener.flattenNodes(TREE_DATA)).toEqual(flattenNodes);
    });

    it('should support getChildren by Observable', () => {
      flattener = new NzTreeFlattener(
        transformer,
        node => node.level,
        node => node.expandable,
        node => of(node.children!)
      );
      expect(flattener.flattenNodes(TREE_DATA)).toEqual(flattenNodes);
    });
  });

  describe('flat data source', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('should dataSource getData return origin nested data', () => {
      const data = testComponent.dataSource.getData();
      expect(data).toBe(TREE_DATA);
    });

    it('should dataSource connect emit the same data whatever tree expansion model changed or data changed', async () => {
      let shownNodes: FlatNode[] = [];
      const { dataSource } = testComponent;
      const dataNodes = dataSource.getFlattenData();
      dataSource
        .connect(testComponent.tree)
        .pipe()
        .subscribe((value: FlatNode[]) => {
          shownNodes = value;
        });
      // expand or collapse
      testComponent.tree.expand(dataNodes[0]);
      await fixture.whenStable();
      expect(shownNodes).toEqual(dataNodes);
      const firstNodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      firstNodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(shownNodes).toEqual(dataNodes);
      // set new data
      const newTreeData = cloneDeep(TREE_DATA).slice(0, 1);
      testComponent.setData(newTreeData);
      expect(testComponent.tree.dataNodes).toEqual(flattenNodes.slice(0, -2));
      await fixture.whenStable();
      expect(shownNodes.length).toBe(6);
    });
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewBasicWithLevelAccessorComponent;
    const defaultIndent = 24;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      await fixture.whenStable();
      // expand all node
      const { tree } = testComponent;
      tree.expandAll();
      await fixture.whenStable();
    });

    it('should nzTreeNodePadding without value work', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(nodes.length).toBe(8);
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    });

    it('should nzTreeNodePadding with value work', async () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      expect(nodes.length).toBe(8);
      const [parent_1, ...otherNodes] = nodes;
      const parent_1_paddingDir = parent_1.injector.get(NzTreeNodePaddingDirective);
      parent_1_paddingDir.level = 1;
      await fixture.whenStable();
      // 1 * defaultIndent = 24
      expect(window.getComputedStyle(parent_1.nativeElement).paddingLeft).toBe('24px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    });

    it('should nzTreeNodePaddingIndent work', async () => {
      const indent = 50;
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      expect(nodes.length).toBe(8);
      nodes.forEach(node => {
        const node_paddingDir = node.injector.get(NzTreeNodePaddingDirective);
        node_paddingDir.indent = indent;
      });
      await fixture.whenStable();
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * indent}px`
        );
      });
    });
  });

  describe('line indents', () => {
    let fixture: ComponentFixture<NzTestTreeViewLineComponent>;
    let testComponent: NzTestTreeViewLineComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestTreeViewLineComponent);
      testComponent = fixture.componentInstance;
      await fixture.whenStable();
      // expand all node
      const { tree } = testComponent;
      tree.expandAll();
      // wait for auditTime(0, animationFrameScheduler)
      await waitForNextAnimationFrame();
      await fixture.whenStable();
    });

    it('should nzTreeNodeIndentLine work', () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodeIndentLineDirective));
      expect(nodes.length).toBe(8);
      const [parent_1, parent_1_1, leaf_1_1_1, leaf_1_1_2, parent_1_2, leaf_1_2_1, parent_2, leaf_2_1] = nodes.map(
        node => node.componentInstance as NzTreeNodeComponent<FlatNode>
      );
      expect(parent_1.indents()).toEqual([]);
      expect(parent_1_1.indents()).toEqual([true]);
      expect(leaf_1_1_1.indents()).toEqual([true, true]);
      expect(leaf_1_1_2.indents()).toEqual([true, true]);
      expect(parent_1_2.indents()).toEqual([true]);
      expect(leaf_1_2_1.indents()).toEqual([true, false]);
      expect(parent_2.indents()).toEqual([]);
      expect(leaf_2_1.indents()).toEqual([false]);
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

const flattenNodes = [
  { expandable: true, name: 'parent 1', level: 0, disabled: false },
  { expandable: true, name: 'parent 1-1', level: 1, disabled: true },
  { expandable: false, name: 'leaf 1-1-1', level: 2, disabled: false },
  { expandable: false, name: 'leaf 1-1-2', level: 2, disabled: false },
  { expandable: true, name: 'parent 1-2', level: 1, disabled: false },
  { expandable: false, name: 'leaf 1-2-1', level: 2, disabled: false },
  { expandable: true, name: 'parent 2', level: 0, disabled: false },
  { expandable: false, name: 'leaf 2-1', level: 1, disabled: false }
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
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
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
export class NzTestTreeViewBasicWithLevelAccessorComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;
  readonly levelAccessor = (dataNode: FlatNode): number => dataNode.level;
  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  private treeFlattener = new NzTreeFlattener(
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
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine [nzExpandable]="false">
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine [nzExpandable]="true">
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
