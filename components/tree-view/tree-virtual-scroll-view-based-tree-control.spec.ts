/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTreeNodeOutletContext, FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzTreeFlatDataSource } from 'ng-zorro-antd/tree-view/data-source';
import { NzTreeFlattener } from 'ng-zorro-antd/tree-view/flattener';
import { NzTreeNodeComponent } from 'ng-zorro-antd/tree-view/node';
import { NzTreeNodePaddingDirective } from 'ng-zorro-antd/tree-view/padding';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view/tree-view.module';
import { NzTreeVirtualScrollViewComponent } from 'ng-zorro-antd/tree-view/tree-virtual-scroll-view';

describe('virtual scroll based nzTreeControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollWithTreeControlComponent>;
    let testComponent: NzTestTreeViewVirtualScrollWithTreeControlComponent;
    let tree: NzTreeVirtualScrollViewComponent<FlatNode>;
    let treeControl: FlatTreeControl<FlatNode, NzSafeAny>;
    let viewport: CdkVirtualScrollViewport;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollWithTreeControlComponent);
      testComponent = fixture.componentInstance;
      tree = testComponent.tree;
      treeControl = testComponent.treeControl;
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
      expect(treeControl.dataNodes.length).toBe(100 ** 2 + 100 ** 1);
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
      const firstNode = treeControl.dataNodes[0];
      treeControl.expand(firstNode);
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

    it('should trackBy of treeControl work', fakeAsync(() => {
      finishInit(fixture);
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('0-0');
      // change name format from '0-x' to 'v1-0-x'
      testComponent.dataSource.setData(dig('v1-0'));
      finishInit(fixture);
      // data and view both changed
      expect(treeControl.dataNodes[0].name).toBe('v1-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v1-0-0');

      // set treeControl.trackBy to undefined, default use node self instead
      treeControl.trackBy = undefined;
      // change name format from 'v1-0-x' to 'v2-0-x'
      testComponent.dataSource.setData(dig('v2-0'));
      finishInit(fixture);
      // data and view both changed
      expect(treeControl.dataNodes[0].name).toBe('v2-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v2-0-0');

      // rerender new data depends on whether the level of nodes is same
      treeControl.trackBy = (node: FlatNode) => node.level;
      // change name format from 'v2-0-x' to 'v3-0-x'
      testComponent.dataSource.setData(dig('v3-0'));
      finishInit(fixture);
      // data has changed but view has not changed
      expect(treeControl.dataNodes[0].name).toBe('v3-0-0');
      expect(fixture.debugElement.query(By.css('nz-tree-node')).componentInstance.data.name).toBe('v2-0-0');
    }));
  });

  describe('padding', () => {
    let fixture: ComponentFixture<NzTestTreeViewVirtualScrollWithTreeControlComponent>;
    let testComponent: NzTestTreeViewVirtualScrollWithTreeControlComponent;
    const defaultIndent = 24;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeViewVirtualScrollWithTreeControlComponent);
      testComponent = fixture.componentInstance;
      finishInit(fixture);
      const { treeControl } = testComponent;
      treeControl.expand(treeControl.dataNodes[0]);
      fixture.detectChanges();
    }));

    it('should nzTreeNodePadding without value work', () => {
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('nz-tree-node:not([builtin])'));
      expect(nodes.length).toBe(10);
      const [firstNode, ...otherNodes] = nodes;
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('0px');
      otherNodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(`${defaultIndent}px`); // level = 1, 24 * 1
      });
    });

    it('should nzTreeNodePadding with value work', () => {
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      expect(nodes.length).toBe(10);
      const firstNode = nodes[0];
      expect(window.getComputedStyle(firstNode.nativeElement).paddingLeft).toBe('0px');
      const firstNode_paddingDir = firstNode.injector.get(NzTreeNodePaddingDirective);
      firstNode_paddingDir.level = 1;
      fixture.detectChanges();
      // 1 * defaultIndent = 24
      nodes.forEach(node => {
        expect(window.getComputedStyle(node.nativeElement).paddingLeft).toBe(`${defaultIndent}px`);
      });
    });

    it('should nzTreeNodePaddingIndent work', () => {
      fixture.detectChanges();
      const newIndent = 50;
      const nodes = fixture.debugElement.queryAll(By.directive(NzTreeNodePaddingDirective));
      nodes.forEach(node => {
        const node_paddingDir = node.injector.get(NzTreeNodePaddingDirective);
        node_paddingDir.indent = newIndent;
      });
      fixture.detectChanges();
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

/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture: ComponentFixture<NzTestTreeViewVirtualScrollWithTreeControlComponent>): void {
  // set the height of the viewport to 180px, the height of node to 30px.
  fixture.debugElement.nativeElement
    .querySelector('.cdk-virtual-scroll-viewport')!
    .setAttribute('style', 'height: 180px; width: 200px;');
  fixture.debugElement.queryAll(By.directive(NzTreeNodeComponent))!.map(node => {
    node.nativeElement.setAttribute('style', 'width: 100%; height: 30px;');
  });
  // render the viewport.
  fixture.detectChanges();
  flush();

  // Flush the initial fake scroll event.
  tick(16); // flush animation frame
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
      [nzDataSource]="dataSource"
      [nzTreeControl]="treeControl"
      [nzItemSize]="itemSize"
      [nzMinBufferPx]="minBufferPx"
      [nzMaxBufferPx]="maxBufferPx"
      [nzDirectoryTree]="directoryTree"
      [nzBlockNode]="blockNode"
    >
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="node.expandable">
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="node.expandable">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>
    </nz-tree-virtual-scroll-view>
  `
})
export class NzTestTreeViewVirtualScrollWithTreeControlComponent {
  @ViewChild(NzTreeVirtualScrollViewComponent, { static: true }) tree!: NzTreeVirtualScrollViewComponent<FlatNode>;
  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  readonly trackBy = (value: FlatNode): NzSafeAny => value;
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level
  });
  treeControl = new FlatTreeControl<FlatNode, NzSafeAny>(
    node => node.level,
    node => node.expandable,
    {
      trackBy: this.trackBy
    }
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  directoryTree: boolean = false;
  blockNode: boolean = false;
  itemSize = 30;
  minBufferPx = 30 * 2;
  maxBufferPx = 30 * 4;

  constructor() {
    this.dataSource.setData(TREE_DATA);
  }
}
