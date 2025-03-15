/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { cloneDeep } from 'lodash';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import {
  NzTreeFlatDataSource,
  NzTreeFlattener,
  NzTreeNodeComponent,
  NzTreeNodeIndentLineDirective,
  NzTreeNodePaddingDirective,
  NzTreeViewComponent,
  NzTreeViewModule
} from 'ng-zorro-antd/tree-view';

describe('tree-view based on nzTreeControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('tree control', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithTreeControlComponent>;
    let testComponent: NzTestTreeViewBasicWithTreeControlComponent;
    let treeControl: FlatTreeControl<FlatNode>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithTreeControlComponent);
      testComponent = fixture.componentInstance;
      treeControl = testComponent.treeControl;
      fixture.detectChanges();
    });

    it('should init flat tree data', () => {
      const { dataNodes } = treeControl;
      expect(dataNodes.length).toBe(8);
      expect(dataNodes).toEqual(flattenNodes);
    });

    it('should expand method can expand tree node', () => {
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(2);
      treeControl.expand(treeControl.dataNodes[0]);
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(4);
      expect(shownNodes[0].componentInstance.data.name).toBe('parent 1');
      expect(shownNodes[1].componentInstance.data.name).toBe('parent 1-1');
      expect(shownNodes[2].componentInstance.data.name).toBe('parent 1-2');
      expect(shownNodes[3].componentInstance.data.name).toBe('parent 2');
    });

    it('should expandDescendants method can expand all descendants of the tree node', () => {
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(2);
      treeControl.expandDescendants(treeControl.dataNodes[0]);
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(7);
      expect(shownNodes[0].componentInstance.data.name).toBe('parent 1');
      expect(shownNodes[1].componentInstance.data.name).toBe('parent 1-1');
      expect(shownNodes[2].componentInstance.data.name).toBe('leaf 1-1-1');
      expect(shownNodes[3].componentInstance.data.name).toBe('leaf 1-1-2');
      expect(shownNodes[4].componentInstance.data.name).toBe('parent 1-2');
      expect(shownNodes[5].componentInstance.data.name).toBe('leaf 1-2-1');
      expect(shownNodes[6].componentInstance.data.name).toBe('parent 2');
    });

    it('should expandAll method can expand all tree nodes', () => {
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(2);
      treeControl.expandAll();
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(8);
      expect(shownNodes.map(nodes => nodes.componentInstance.data)).toEqual(flattenNodes);
    });

    it('should collapse method can collapse tree node', () => {
      treeControl.expandAll();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(8);
      treeControl.collapse(treeControl.dataNodes[0]);
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(3);
      expect(shownNodes[0].componentInstance.data.name).toBe('parent 1');
      expect(shownNodes[1].componentInstance.data.name).toBe('parent 2');
      expect(shownNodes[2].componentInstance.data.name).toBe('leaf 2-1');
      treeControl.expand(treeControl.dataNodes[0]);
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toEqual(8);
    });

    it('should collapseDescendants method can collapse all descendants of the tree node', () => {
      treeControl.expandAll();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(8);
      treeControl.collapse(treeControl.dataNodes[0]);
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(3);
      expect(shownNodes[0].componentInstance.data.name).toBe('parent 1');
      expect(shownNodes[1].componentInstance.data.name).toBe('parent 2');
      expect(shownNodes[2].componentInstance.data.name).toBe('leaf 2-1');
      treeControl.expand(treeControl.dataNodes[0]);
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(8);
    });

    it('should collapseAll method can collapse all tree nodes', () => {
      treeControl.expandAll();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])')).length).toBe(8);
      treeControl.collapseAll();
      fixture.detectChanges();
      const shownNodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(shownNodes.length).toBe(2);
      expect(shownNodes[0].componentInstance.data.name).toBe('parent 1');
      expect(shownNodes[1].componentInstance.data.name).toBe('parent 2');
    });
  });

  describe('tree view basic', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithTreeControlComponent>;
    let testComponent: NzTestTreeViewBasicWithTreeControlComponent;
    let treeControl: FlatTreeControl<FlatNode>;
    let nativeElement: Element;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithTreeControlComponent);
      testComponent = fixture.componentInstance;
      treeControl = testComponent.treeControl;
      nativeElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('should highlight when tree node option is selected', () => {
      const nodeOption = fixture.debugElement.query(By.css('nz-tree-node-option'));
      nodeOption.nativeElement.click();
      fixture.detectChanges();
      expect(nodeOption.nativeElement.classList).toContain('ant-tree-node-selected');
    });

    it('should expand nodes when toggle the collapsed tree node', () => {
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(2);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_open');
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
    });

    it('should collapse nodes when toggle the expanded tree node', () => {
      treeControl.expand(treeControl.dataNodes[0]);
      fixture.detectChanges();
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(4);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
      expect(nativeElement.querySelectorAll('nz-tree-node:not([builtin])').length).toBe(2);
    });

    it('should disabled node can not be selected but can be expanded', () => {
      treeControl.expand(treeControl.dataNodes[0]);
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

  describe('flat data source', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithTreeControlComponent>;
    let testComponent: NzTestTreeViewBasicWithTreeControlComponent;
    let treeControl: FlatTreeControl<FlatNode>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithTreeControlComponent);
      testComponent = fixture.componentInstance;
      treeControl = testComponent.treeControl;
      fixture.detectChanges();
    });

    it('should dataSource getData return origin nested data', () => {
      const data = testComponent.dataSource.getData();
      expect(data).toBe(TREE_DATA);
    });

    it('should dataSource connect emit expanded nodes when tree expansion model changed or data changed', () => {
      let shownNodes: FlatNode[] = [];
      const { dataSource } = testComponent;
      const dataNodes = dataSource._flattenedData.value;
      testComponent.dataSource
        .connect(testComponent.tree)
        .pipe()
        .subscribe((value: FlatNode[]) => {
          shownNodes = value;
        });
      // expand or collapse
      treeControl.expand(dataNodes[0]);
      fixture.detectChanges();
      expect(dataSource._expandedData.value).toEqual([dataNodes[0], dataNodes[1], dataNodes[4], dataNodes[6]]);
      expect(shownNodes).toEqual([dataNodes[0], dataNodes[1], dataNodes[4], dataNodes[6]]);
      const firstNodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      firstNodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(dataSource._expandedData.value).toEqual([dataNodes[0], dataNodes[6]]);
      expect(shownNodes).toEqual([dataNodes[0], dataNodes[6]]);

      // set new data
      const newTreeData = cloneDeep(TREE_DATA).slice(0, 1);
      testComponent.dataSource.setData(newTreeData);
      expect(treeControl.dataNodes).toEqual(flattenNodes.slice(0, -2));
      fixture.detectChanges();
      expect(shownNodes).toEqual([dataNodes[0]]);
      expect(dataSource._expandedData.value).toEqual([dataNodes[0]]);
    });
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewBasicWithTreeControlComponent>;
    let testComponent: NzTestTreeViewBasicWithTreeControlComponent;
    const defaultIndent = 24;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewBasicWithTreeControlComponent);
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

  describe('line indents', () => {
    let fixture: ComponentFixture<NzTestTreeViewLineComponent>;
    let testComponent: NzTestTreeViewLineComponent;
    let treeControl: FlatTreeControl<FlatNode>;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeViewLineComponent);
      testComponent = fixture.componentInstance;
      treeControl = testComponent.treeControl;
      fixture.detectChanges();
      treeControl.expandAll();
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

interface TreeNode {
  name: string;
  disabled?: boolean;
  children?: TreeNode[];
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

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view
      [nzTreeControl]="treeControl"
      [nzDataSource]="dataSource"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
    >
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding>
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding>
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
export class NzTestTreeViewBasicWithTreeControlComponent {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  selectListSelection = new SelectionModel<FlatNode>(true);
  directoryTree: boolean = false;
  blockNode: boolean = false;
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(TREE_DATA);
  }
}

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzTreeControl]="treeControl">
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
export class NzTestTreeViewLineComponent {
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  selectListSelection = new SelectionModel<FlatNode>(true);
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(TREE_DATA);
  }
}
