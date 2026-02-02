/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzTreeViewFlatDataSource } from './flat-data-source';
import { NzTreeFlattener } from './flattener';
import { NzTreeNodePaddingDirective } from './padding';
import { NzTreeViewModule } from './tree-view.module';
import { NzTreeVirtualScrollViewComponent } from './tree-virtual-scroll-view';
import { finishInit, triggerScroll } from './tree-virtual-scroll-view-based-children-accessor.spec';

describe('virtual scroll based nzLevelAccessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewVirtualScrollWithLevelAccessorComponent;
    let tree: NzTreeVirtualScrollViewComponent<FlatNode>;
    let viewport: CdkVirtualScrollViewport;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      tree = testComponent.tree;
      viewport = tree.virtualScrollViewport;
    });

    it('should the virtual viewport initialize correctly', async () => {
      await finishInit(fixture);
      expect(viewport.getDataLength()).toBe(100);
      expect(viewport.getDataLength()).toBe(tree.nodes.length);
      // viewport size = 180
      expect(viewport.getViewportSize()).toBe(180);
      // itemSize = 30, nums of initial nodes = 100
      expect(viewport._totalContentHeight()).toBe(`${testComponent.itemSize * 100}px`);
      // maxBufferPx / 30 + 180 / itemSize = 4 + 6 = 10
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node')).length).toBe(10);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        end: 10
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(0);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0');
    });

    it('should tree view inits data correctly', async () => {
      await finishInit(fixture);
      expect(tree.dataNodes.length).toBe(100 ** 2 + 100 ** 1);
      expect(tree.nodes.length).toBe(100);
      tree.nodes.forEach((node, index) => {
        const nodeData = {
          expandable: true,
          level: 0,
          name: `0-${index}`
        };
        expect(node).toEqual({
          data: nodeData,
          context: new CdkTreeNodeOutletContext<FlatNode>(nodeData),
          nodeDef: tree._getNodeDef(nodeData, 0)
        });
      });
    });

    it('should render correct nodes when scroll', async () => {
      await finishInit(fixture);
      await triggerScroll(viewport, testComponent.itemSize * 10);
      await fixture.whenStable();
      // start: 10 - minBufferPx / 30 = 8, end: 10 + 180 / 30 + maxBufferPx / 30 = 20
      expect(viewport.getRenderedRange()).toEqual({
        start: 8,
        end: 20
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(testComponent.itemSize * 10 - testComponent.minBufferPx);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-8');
      await triggerScroll(viewport, testComponent.itemSize * 25);
      await fixture.whenStable();
      expect(viewport.getRenderedRange()).toEqual({
        start: 23,
        end: 35
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(testComponent.itemSize * 25 - testComponent.minBufferPx);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-23');
    });

    it('should expand nodes when toggle the collapsed tree node', async () => {
      await finishInit(fixture);
      expect(tree.nodes.length).toBe(100);
      expect(viewport.getDataLength()).toBe(100);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(tree.nodes.length).toBe(200);
      expect(viewport.getDataLength()).toBe(200);
    });

    it('should collapse nodes when toggle the expanded tree node', async () => {
      await finishInit(fixture);
      const firstNode = testComponent.tree.dataNodes[0];
      testComponent.tree.expand(firstNode);
      await fixture.whenStable();
      expect(tree.nodes.length).toBe(200);
      expect(viewport.getDataLength()).toBe(200);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      await fixture.whenStable();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
      expect(tree.nodes.length).toBe(100);
      expect(viewport.getDataLength()).toBe(100);
    });

    it('should nzItemSize work', async () => {
      testComponent.itemSize *= 2; // 60
      await finishInit(fixture);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        // 180 / 60 + maxBufferPx / 60 = 3 + 2 = 5
        end: 5
      });
      await triggerScroll(viewport, testComponent.itemSize * 5);
      await fixture.whenStable();
      expect(viewport.getRenderedRange()).toEqual({
        // 5 - minBufferPx / 60 = 5 - 1 = 4
        start: 4,
        // 5 + 180 / 60 + maxBufferPx / 60 = 5 + 3 + 2 = 10
        end: 10
      });
    });

    it('should nzMinBufferPx and nzMaxBufferPx work', async () => {
      testComponent.minBufferPx = testComponent.itemSize; // 30
      testComponent.maxBufferPx = testComponent.itemSize; // 30
      await finishInit(fixture);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        // 180 / 30 + maxBufferPx / 30 = 6 + 1 = 7
        end: 7
      });
      await triggerScroll(viewport, testComponent.itemSize * 5);
      await fixture.whenStable();
      expect(viewport.getRenderedRange()).toEqual({
        // 5 - minBufferPx / itemSize = 5 - 1 = 4
        start: 4,
        // 5 + 180 / 30 + maxBufferPx / 30 = 5 + 6 + 1 = 12
        end: 12
      });
    });

    it('should nzDirectoryTree work', async () => {
      await finishInit(fixture);
      const treeView = fixture.debugElement.query(By.css('nz-tree-virtual-scroll-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-directory');
      testComponent.directoryTree = true;
      fixture.changeDetectorRef.markForCheck();
      await fixture.whenStable();
      expect(treeView.nativeElement.classList).toContain('ant-tree-directory');
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    });

    it('should nzBlockNode work', async () => {
      await finishInit(fixture);
      const treeView = fixture.debugElement.query(By.css('nz-tree-virtual-scroll-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-block-node');
      testComponent.blockNode = true;
      fixture.changeDetectorRef.markForCheck();
      await fixture.whenStable();
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    });

    it('should trackBy work', async () => {
      await finishInit(fixture);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0');
      // change name format from '0-x' to 'v1-0-x'
      testComponent.dataSource.setData(dig('v1-0'));
      await finishInit(fixture);
      // data and view both changed
      expect(tree.dataNodes[0].name).toBe('v1-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v1-0-0');

      // set trackBy to null, default use node self instead
      testComponent.trackBy = null!;
      // change name format from 'v1-0-x' to 'v2-0-x'
      testComponent.dataSource.setData(dig('v2-0'));
      await finishInit(fixture);
      // data and view both changed
      expect(tree.dataNodes[0].name).toBe('v2-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v2-0-0');

      // rerender new data depends on whether the index is the same (always same)
      testComponent.trackBy = (index: number, _node: FlatNode) => index;
      // change name format from 'v2-0-x' to 'v3-0-x'
      testComponent.dataSource.setData(dig('v3-0'));
      await finishInit(fixture);
      // data has changed but view has not changed
      expect(tree.dataNodes[0].name).toBe('v3-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v2-0-0');
    });
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollWithLevelAccessorComponent>;
    let testComponent: NzTestTreeViewVirtualScrollWithLevelAccessorComponent;
    const defaultIndent = 24;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollWithLevelAccessorComponent);
      testComponent = fixture.componentInstance;
      await finishInit(fixture);
      const { tree } = testComponent;
      tree.expand(tree.dataNodes[0]);
      await fixture.whenStable();
    });

    it('should nzTreeNodePadding without value work', () => {
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(nodes.length).toBe(10);
      const [firstNode, ...otherNodes] = nodes;
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('0px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(`${defaultIndent}px`); // level = 1, 24 * 1
      });
    });

    it('should nzTreeNodePadding with value work', async () => {
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      expect(nodes.length).toBe(10);
      const firstNode = nodes[0];
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('0px');
      const firstNode_paddingDir = firstNode.injector.get(NzTreeNodePaddingDirective);
      firstNode_paddingDir.level = 1;
      await fixture.whenStable();
      // 1 * defaultIndent = 24
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(`${defaultIndent}px`);
      });
    });

    it('should nzTreeNodePaddingIndent work', async () => {
      const newIndent = 50;
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      expect(nodes.length).toBe(10);
      nodes.forEach(node => {
        const node_paddingDir = node.injector.get(NzTreeNodePaddingDirective);
        node_paddingDir.indent = newIndent;
      });
      await fixture.whenStable();
      const [firstNode, ...otherNodes] = nodes;
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('0px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(`${newIndent}px`);
      });
    });
  });
});

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

function dig(path: string = '0', level: number = 1): TreeNode[] {
  const list: TreeNode[] = [];
  for (let i = 0; i < 100; i += 1) {
    const name = `${path}-${i}`;
    const treeNode: TreeNode = {
      name
    };

    if (level > 0) {
      treeNode.children = dig(name, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const TREE_DATA: TreeNode[] = dig();

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-virtual-scroll-view
      [nzDataSource]="dataSource"
      [nzLevelAccessor]="levelAccessor"
      [nzItemSize]="itemSize"
      [nzMinBufferPx]="minBufferPx"
      [nzMaxBufferPx]="maxBufferPx"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
      [nzTrackBy]="trackBy"
    >
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle />
        {{ node.name }}
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>
    </nz-tree-virtual-scroll-view>
  `
})
export class NzTestTreeViewVirtualScrollWithLevelAccessorComponent implements OnInit {
  @ViewChild(NzTreeVirtualScrollViewComponent, { static: true }) tree!: NzTreeVirtualScrollViewComponent<FlatNode>;
  levelAccessor = (dataNode: FlatNode): number => dataNode.level;
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level
  });
  directoryTree: boolean = false;
  blockNode: boolean = false;
  itemSize = 30;
  minBufferPx = 30 * 2;
  maxBufferPx = 30 * 4;
  trackBy: TrackByFunction<FlatNode> = (_index: number, value: FlatNode): NzSafeAny => value;
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
