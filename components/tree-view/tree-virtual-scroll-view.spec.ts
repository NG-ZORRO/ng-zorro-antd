/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { cloneDeep } from 'lodash';

import { dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzTreeViewFlatDataSource } from 'ng-zorro-antd/tree-view/flat-data-source';
import { NzTreeFlattener } from 'ng-zorro-antd/tree-view/flattener';
import { NzTreeNodeComponent } from 'ng-zorro-antd/tree-view/node';
import { NzTreeNodePaddingDirective } from 'ng-zorro-antd/tree-view/padding';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view/tree-view.module';
import { NzTreeVirtualScrollViewComponent } from 'ng-zorro-antd/tree-view/tree-virtual-scroll-view';

describe('virtual scroll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollComponent>;
    let testComponent: NzTestTreeViewVirtualScrollComponent;
    let tree: NzTreeVirtualScrollViewComponent<FlatNode>;
    let viewport: CdkVirtualScrollViewport;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollComponent);
      testComponent = fixture.componentInstance;
      tree = testComponent.tree;
      viewport = tree.virtualScrollViewport;
    });

    it('should the virtual viewport initialize correctly', fakeAsync(() => {
      finishInit(fixture);
      expect(viewport.getDataLength()).toBe(100);
      expect(viewport.getDataLength()).toBe(tree.nodes.length);
      // viewport size = 180
      expect(viewport.getViewportSize()).toBe(180);
      // itemSize = 30, nums of initial nodes = 100
      expect(viewport._totalContentHeight).toBe(`${testComponent.itemSize * 100}px`);
      // maxBufferPx / 30 + 180 / itemSize = 4 + 6 = 10
      expect(fixture.debugElement.queryAll(By.css('nz-tree-node')).length).toBe(10);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        end: 10
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(0);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0');
    }));

    it('should tree view inits data correctly', fakeAsync(() => {
      finishInit(fixture);
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
    }));

    it('should render correct nodes when scroll', fakeAsync(() => {
      finishInit(fixture);
      triggerScroll(viewport, testComponent.itemSize * 10);
      fixture.detectChanges();
      flush();
      // start: 10 - minBufferPx / 30 = 8, end: 10 + 180 / 30 + maxBufferPx / 30 = 20
      expect(viewport.getRenderedRange()).toEqual({
        start: 8,
        end: 20
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(testComponent.itemSize * 10 - testComponent.minBufferPx);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-8');
      triggerScroll(viewport, testComponent.itemSize * 25);
      fixture.detectChanges();
      flush();
      expect(viewport.getRenderedRange()).toEqual({
        start: 23,
        end: 35
      });
      expect(viewport.getOffsetToRenderedContentStart()).toBe(testComponent.itemSize * 25 - testComponent.minBufferPx);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-23');
    }));

    it('should expand nodes when toggle the collapsed tree node', fakeAsync(() => {
      finishInit(fixture);
      expect(tree.nodes.length).toBe(100);
      expect(viewport.getDataLength()).toBe(100);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(tree.nodes.length).toBe(200);
      expect(viewport.getDataLength()).toBe(200);
    }));

    it('should collapse nodes when toggle the expanded tree node', fakeAsync(() => {
      finishInit(fixture);
      const firstNode = testComponent.tree.dataNodes[0];
      testComponent.tree.expand(firstNode);
      fixture.detectChanges();
      expect(tree.nodes.length).toBe(200);
      expect(viewport.getDataLength()).toBe(200);
      const nodeToggle = fixture.debugElement.query(By.css('nz-tree-node-toggle'));
      nodeToggle.nativeElement.click();
      fixture.detectChanges();
      expect(nodeToggle.nativeElement.classList).toContain('ant-tree-switcher_close');
      expect(tree.nodes.length).toBe(100);
      expect(viewport.getDataLength()).toBe(100);
    }));

    it('should nzItemSize work', fakeAsync(() => {
      testComponent.itemSize *= 2; // 60
      finishInit(fixture);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        // 180 / 60 + maxBufferPx / 60 = 3 + 2 = 5
        end: 5
      });
      triggerScroll(viewport, testComponent.itemSize * 5);
      fixture.detectChanges();
      flush();
      expect(viewport.getRenderedRange()).toEqual({
        // 5 - minBufferPx / 60 = 5 - 1 = 4
        start: 4,
        // 5 + 180 / 60 + maxBufferPx / 60 = 5 + 3 + 2 = 10
        end: 10
      });
    }));

    it('should nzMinBufferPx and nzMaxBufferPx work', fakeAsync(() => {
      testComponent.minBufferPx = testComponent.itemSize; // 30
      testComponent.maxBufferPx = testComponent.itemSize; // 30
      finishInit(fixture);
      expect(viewport.getRenderedRange()).toEqual({
        start: 0,
        // 180 / 30 + maxBufferPx / 30 = 6 + 1 = 7
        end: 7
      });
      triggerScroll(viewport, testComponent.itemSize * 5);
      fixture.detectChanges();
      flush();
      expect(viewport.getRenderedRange()).toEqual({
        // 5 - minBufferPx / itemSize = 5 - 1 = 4
        start: 4,
        // 5 + 180 / 30 + maxBufferPx / 30 = 5 + 6 + 1 = 12
        end: 12
      });
    }));

    it('should nzDirectoryTree work', fakeAsync(() => {
      finishInit(fixture);
      const treeView = fixture.debugElement.query(By.css('nz-tree-virtual-scroll-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-directory');
      testComponent.directoryTree = true;
      fixture.detectChanges();
      expect(treeView.nativeElement.classList).toContain('ant-tree-directory');
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    }));

    it('should nzBlockNode work', fakeAsync(() => {
      finishInit(fixture);
      const treeView = fixture.debugElement.query(By.css('nz-tree-virtual-scroll-view'));
      expect(treeView.nativeElement.classList).not.toContain('ant-tree-block-node');
      testComponent.blockNode = true;
      fixture.detectChanges();
      expect(treeView.nativeElement.classList).toContain('ant-tree-block-node');
    }));

    it('should nzCompareBy work', fakeAsync(() => {
      finishInit(fixture);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0');
      const newNodes = cloneDeep(tree.dataNodes).map((node, idx) => ({
        ...node,
        name: `0-${idx}-new`
      }));
      testComponent.dataSource.setFlattenedData(newNodes);
      finishInit(fixture);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0-new');
      // rerender new data depends on whether the level of nodes is same
      testComponent.compareBy = (node: FlatNode) => node.level;
      const nextNodes = cloneDeep(tree.dataNodes).map((node, idx) => ({
        ...node,
        name: `0-${idx}-next`
      }));
      testComponent.dataSource.setFlattenedData(nextNodes);
      finishInit(fixture);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0-new');
    }));
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollComponent>;
    let testComponent: NzTestTreeViewVirtualScrollComponent;
    const defaultIndent = 24;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      // expand all node
      const { tree } = testComponent;
      tree.dataNodes.forEach(node => {
        tree.expand(node);
      });
      fixture.detectChanges();
    }));

    it('should nzTreeNodePadding without value work', fakeAsync(() => {
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    }));

    it('should nzTreeNodePadding with value work', fakeAsync(() => {
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      const [firstNode, ...otherNodes] = nodes;
      const firstNode_paddingDir = firstNode.injector.get(NzTreeNodePaddingDirective);
      firstNode_paddingDir.level = 1;
      fixture.detectChanges();
      // 1 * defaultIndent = 24
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('24px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(
          `${(node.componentInstance as NzTreeNodeComponent<FlatNode>).data.level * defaultIndent}px`
        );
      });
    }));

    it('should nzTreeNodePaddingIndent work', fakeAsync(() => {
      fixture.detectChanges();
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
    }));
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

/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture: ComponentFixture<NzSafeAny>): void {
  // On the first cycle we render and measure the viewport.
  fixture.detectChanges();
  flush();

  // On the second cycle we render the items.
  fixture.detectChanges();
  flush();

  // Flush the initial fake scroll event.
  tick(16); // flush animation frame
  flush();
  fixture.detectChanges();
}

/** Trigger a scroll event on the viewport (optionally setting a new scroll offset). */
function triggerScroll(viewport: CdkVirtualScrollViewport, offset?: number): void {
  if (offset !== undefined) {
    viewport.scrollToOffset(offset);
  }
  dispatchFakeEvent(viewport.scrollable!.getElementRef().nativeElement, 'scroll');
  tick(16); // flush animation frame
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
      class="virtual-scroll-tree"
      [nzDataSource]="dataSource"
      [nzLevelAccessor]="levelAccessor"
      [nzItemSize]="itemSize"
      [nzMinBufferPx]="minBufferPx"
      [nzMaxBufferPx]="maxBufferPx"
      [nzCompareBy]="compareBy"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
    >
      <nz-tree-node class="node" *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="node.expandable">
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>

      <nz-tree-node
        class="node"
        *nzTreeNodeDef="let node; when: hasChild"
        nzTreeNodePadding
        [nzExpandable]="node.expandable"
      >
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>
    </nz-tree-virtual-scroll-view>
  `,
  styles: [
    `
      .virtual-scroll-tree {
        ::ng-deep {
          .cdk-virtual-scroll-content-wrapper {
            display: flex;
            flex-direction: column;
          }

          .cdk-virtual-scroll-viewport {
            width: 200px;
            height: 180px;
          }
        }
      }

      .node {
        width: 100%;
        height: 30px;
      }
    `
  ]
})
export class NzTestTreeViewVirtualScrollComponent implements OnInit {
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
  compareBy = (value: FlatNode): NzSafeAny => value;
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
