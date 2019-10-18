import { Component, OnInit, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';

import {
  dispatchMouseEvent,
  dispatchTouchEvent,
  NzTreeBaseService,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd/core';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzTreeComponent } from './nz-tree.component';
import { NzTreeModule } from './nz-tree.module';

describe('nz-tree', () => {
  let treeService: NzTreeBaseService | null;
  describe('basic tree', () => {
    let treeInstance: NzTestTreeBasicControlledComponent;
    let treeElement: HTMLElement;
    let fixture: ComponentFixture<NzTestTreeBasicControlledComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [NzTestTreeBasicControlledComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(NzTestTreeBasicControlledComponent);
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should set nzDefaultXXX correctly', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      tick(300);
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getTreeNodes().length).toEqual(3);
      // checked
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[0].title).toEqual('0-0-0');
      // half expanded
      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[0].title).toEqual('0-0');
      // expanded
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      // selected
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList()[0].title).toEqual('0-0-0-0');

      // won't affect
      treeInstance.defaultExpandedKeys = [];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(0);
    }));

    it('should set icon or function correctly', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      tick(300);
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.anticon-smile').length).toEqual(1);
      let node = treeInstance.treeComponent.getTreeNodeByKey('0-0');
      if (!node) {
        return;
      }
      node.icon = 'frown';
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.anticon-frown').length).toEqual(1);
      node.setSyncChecked(true, false);
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      // check expanded
      node.setExpanded(true);
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(3);
      // check selected
      node.setSelected(true);
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(2);
      // checked
      node = treeInstance.treeComponent.getTreeNodeByKey('0-1-0-0');
      if (!node) {
        return;
      }
      node.setSyncChecked(true, false);
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(2);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
    }));

    it('test new NzTreeNode of nzData', fakeAsync(() => {
      treeInstance.nodes = [
        {
          title: '0-0',
          key: '0-0',
          expanded: true,
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              expanded: true,
              checked: true,
              children: [
                { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              selected: true,
              children: [
                { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
                { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
                { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2',
              isLeaf: true
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
            { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
            { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
          ]
        }
      ].map(v => {
        return new NzTreeNode(v, null);
      });
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      // reset node will clear default value except checked nodes list
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      expect(treeInstance.treeComponent.getMatchedNodeList().length).toEqual(0);
      // // checked nodes no effect
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[0].title).toEqual('0-0-0');

      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[0].title).toEqual('0-0');
    }));

    it('test click event', fakeAsync(() => {
      fixture.detectChanges();
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // click 0-0-0 to select
      let targetNode = treeElement.querySelectorAll('nz-tree-node')[1];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      // 0-0-0 / 0-0-0-0 are selected
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(2);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(2);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      // cancel 0-0-0 selected
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(clickSpy).toHaveBeenCalledTimes(2);

      // double click 0-0-0, only response once
      targetNode = treeElement.querySelectorAll('nz-tree-node')[1];
      dispatchMouseEvent(targetNode, 'dblclick');
      fixture.detectChanges();
      // 0-0-0-0 are selected
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(clickSpy).toHaveBeenCalledTimes(3); // will detect dblclick

      // click disabled node
      targetNode = treeElement.querySelectorAll('nz-tree-node')[
        treeElement.querySelectorAll('nz-tree-node').length - 1
      ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);

      // set nzMultiple to false, click 0-0-0-0 will just active one node
      treeInstance.multiple = false;
      fixture.detectChanges();
      targetNode = treeElement.querySelectorAll('nz-tree-node')[0];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList()[0].title).toEqual('0-0');

      // cancel selected
      targetNode = treeElement.querySelectorAll('nz-tree-node')[0];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(0);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(0);
    }));

    it('test expand event', fakeAsync(() => {
      fixture.detectChanges();
      // expand 0-0,now 3 nodes expanded
      const targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[0];
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(3);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(3);
    }));

    it('test check event', fakeAsync(() => {
      fixture.detectChanges();
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      fixture.detectChanges();
      // uncheck 0-0-0
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[1];
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(0);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(0);

      // check 0-0-0, will make 0-0 indeterminate
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[1];
      dispatchMouseEvent(targetNode, 'click');
      tick(300);
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(fixture.componentInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
    }));

    it('test check event with nzCheckStrictly', fakeAsync(() => {
      fixture.detectChanges();
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      treeInstance.checkStrictly = true;
      treeInstance.nodes = [
        {
          title: 'parent',
          key: '0',
          children: [
            {
              title: 'child 1',
              key: '0-0',
              isLeaf: true
            },
            {
              title: 'child 2',
              key: '0-1',
              isLeaf: true
            }
          ]
        }
      ];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // check node will not affect other nodes
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[0];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(1);

      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[1];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(2);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(2);
    }));

    it('test contextmenu event', fakeAsync(() => {
      fixture.detectChanges();
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // contextmenu 0-0-0
      const targetNode = treeElement.querySelectorAll('nz-tree-node')[1];
      dispatchMouseEvent(targetNode, 'contextmenu');
      fixture.detectChanges();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    }));

    it('test disabled node check event', fakeAsync(() => {
      fixture.detectChanges();
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // contextmenu 0-0-0
      const targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[
        treeElement.querySelectorAll('li').length - 1
      ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(clickSpy).toHaveBeenCalledTimes(0);
    }));

    it('test expand all node', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.expandAll = true;
      fixture.detectChanges();
      // all parent node will be expanded
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(4);
    }));

    it('test search value', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.searchValue = '0-0';
      fixture.detectChanges();
      // matched node's parent node will be expanded
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(4);

      // Notice *ngIf, should expand all nodes
      // To avoid *ngIf to hide nodes
      treeInstance.expandAll = true;
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getMatchedNodeList().length).toEqual(11);
      expect(treeElement.querySelectorAll('.font-highlight').length).toEqual(11);
    }));

    it('test async loading', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.asyncData = true;
      treeInstance.nodes = [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true }
      ];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[0];
      dispatchMouseEvent(targetNode, 'click');
      tick();
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(1);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(1);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);
      // add children to clear loading state
      fixture.componentInstance.treeComponent.getExpandedNodeList()[0].addChildren([
        {
          title: 'Child Node',
          key: `0-0`
        }
      ]);
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(0);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);

      // add nzTreeNode children to clear loading state
      targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[2];
      dispatchMouseEvent(targetNode, 'click');
      tick();
      fixture.detectChanges();
      // getExpandedNodeList return ['0', '1']
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(1);
      fixture.componentInstance.treeComponent.getExpandedNodeList()[1].addChildren([
        new NzTreeNode({
          title: 'Child Node',
          key: `1-0`
        })
      ]);
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(0);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(2);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
    }));

    it('test set nzTreeNode', fakeAsync(() => {
      // get 0-0 node
      const node = fixture.componentInstance.treeComponent.getTreeNodes()[0];
      node.title = '0-0-reset';
      fixture.detectChanges();
      expect(treeElement.querySelectorAll("[title='0-0-reset']").length).toEqual(1);
      node.isDisabled = true;
      fixture.componentInstance.expandAll = true;
      fixture.detectChanges();
      expect(
        treeElement.querySelector('.ant-tree-treenode-disabled')!.querySelectorAll("[title='0-0-reset']").length
      ).toEqual(1);
    }));
  });

  describe('test draggable node', () => {
    let treeInstance: NzTestTreeDraggableComponent;
    let treeElement: HTMLElement;
    let fixture: ComponentFixture<NzTestTreeDraggableComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [NzTestTreeDraggableComponent],
        providers: [NzTreeBaseService]
      }).compileComponents();
      fixture = TestBed.createComponent(NzTestTreeDraggableComponent);
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('test nzBlockNode property', () => {
      fixture.detectChanges();
      const tree = treeElement.querySelector('.ant-tree') as HTMLElement;
      expect(tree!.classList).toContain('ant-tree-block-node');
    });

    it('test drag event', fakeAsync(() => {
      fixture.detectChanges();
      const dragStartSpy = spyOn(treeInstance, 'onDragStart');
      const dragEnterSpy = spyOn(treeInstance, 'onDragEnter');
      const dragOverSpy = spyOn(treeInstance, 'onDragOver');
      const dragLeaveSpy = spyOn(treeInstance, 'onDragLeave');
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragEndSpy = spyOn(treeInstance, 'onDragEnd');
      let dragNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      let dropNode = treeElement.querySelector("[title='0-0']") as HTMLElement;
      let passNode = treeElement.querySelector("[title='0-0-0']") as HTMLElement;

      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragenter');
      fixture.detectChanges();

      // drag - dragenter
      dragNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      dropNode = treeElement.querySelector("[title='0-0']") as HTMLElement;
      expect(dragNode.previousElementSibling!.classList).toContain('ant-tree-switcher_close');
      expect(dropNode.previousElementSibling!.classList).toContain('ant-tree-switcher_open');
      expect(dragStartSpy).toHaveBeenCalledTimes(1);
      expect(dragEnterSpy).toHaveBeenCalledTimes(1);

      // dragover
      dispatchTouchEvent(passNode, 'dragover');
      fixture.detectChanges();
      passNode = treeElement.querySelector("[title='0-0-0']") as HTMLElement;
      expect(passNode.parentElement!.classList).toContain('drag-over');
      expect(dragOverSpy).toHaveBeenCalledTimes(1);

      // dragleave
      dispatchTouchEvent(passNode, 'dragleave');
      fixture.detectChanges();
      passNode = treeElement.querySelector("[title='0-0-0']") as HTMLElement;
      expect(passNode.parentElement!.classList.contains('drag-over')).toEqual(false);
      expect(dragLeaveSpy).toHaveBeenCalledTimes(1);

      // drop 0-1 to 0-0
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector("[title='0-0']") as HTMLElement;
      expect(dropSpy).toHaveBeenCalledTimes(1);
      expect(dropNode.parentElement!.querySelector("[title='0-1']")).toBeDefined();

      // dragend
      dispatchTouchEvent(dropNode, 'dragend');
      fixture.detectChanges();
      expect(dragEndSpy).toHaveBeenCalledTimes(1);

      // drag 0-0 child node to 0-1
      dragNode = treeElement.querySelector("[title='0-0-0']") as HTMLElement;
      dropNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      expect(dropSpy).toHaveBeenCalledTimes(2);
      expect(dropNode.parentElement!.querySelector("[title='0-0-0']")).toBeDefined();
    }));

    // can not dispatchTouchEvent with pos, test alone
    it('test drag drop with dragPos', () => {
      // init selected node
      let treeNodes = treeInstance.treeComponent.getTreeNodes();
      const dragNode = treeElement.querySelectorAll('li')[1]; // 0-0-0
      dispatchTouchEvent(dragNode, 'dragstart');
      fixture.detectChanges();
      // drop 0-0-0 to 0-0 pre
      let targetNode = treeNodes[0]; // 0-0

      treeService = treeNodes[1].treeService;
      treeService!.dropAndApply(targetNode, -1);
      // get treeNodes again
      treeNodes = treeInstance.treeComponent.getTreeNodes();
      // now ['0-0-0', '0-0', '0-1', '0-2']
      expect(treeNodes[0].title).toEqual('0-0-0');
      expect(treeNodes[0].level).toEqual(0);
      fixture.detectChanges();
      // drop 0-0-0 to 0-0-1 next
      treeService!.selectedNode = treeNodes[0];
      targetNode = treeNodes[1].getChildren()[0]; // 0-0-1
      treeService!.dropAndApply(targetNode, 1);
      // get treeNodes again
      treeNodes = treeInstance.treeComponent.getTreeNodes();

      expect(treeNodes[0].getChildren()[1].title).toEqual('0-0-0');
      expect(treeNodes[0].getChildren()[1].level).toEqual(1);
      // drop 0-0-1 to 0-0-0 next
      treeService!.selectedNode = treeNodes[0].getChildren()[0];
      targetNode = treeNodes[0].getChildren()[1]; // 0-0-1
      treeService!.dropAndApply(targetNode, 1);
      expect(treeNodes[0].getChildren()[0].title).toEqual('0-0-0');
    });

    it('test wrong drag event', fakeAsync(() => {
      // drop node self
      fixture.detectChanges();
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragEndSpy = spyOn(treeInstance, 'onDragEnd');
      const dragNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      let dropNode = treeElement.querySelector("[title='0-2']") as HTMLElement;

      // drop 0-1 to 0-2(leaf node)
      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector("[title='0-2']") as HTMLElement;
      expect(dropSpy).toHaveBeenCalledTimes(0);
      expect(dropNode.parentElement!.querySelector("[title='0-1']")).toBeNull();
      // dragend
      dispatchTouchEvent(dropNode, 'dragend');
      fixture.detectChanges();
      expect(dragEndSpy).toHaveBeenCalledTimes(1);
      // drop to itself
      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dragNode, 'dragover');
      dispatchTouchEvent(dragNode, 'drop');
      fixture.detectChanges();
      expect(dropSpy).toHaveBeenCalledTimes(0);
      // dragend
      dispatchTouchEvent(dropNode, 'dragend');
      fixture.detectChanges();
      expect(dragEndSpy).toHaveBeenCalledTimes(2);
    }));

    it('test drag event nzBeforeDrop', () => {
      const dragNode = treeElement.querySelector("[title='0-2']") as HTMLElement;
      let dropNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      treeInstance.beforeDrop = (): Observable<boolean> => {
        return of(true);
      };
      fixture.detectChanges();

      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      // drop 0-2 to 0-1
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector("[title='0-1']") as HTMLElement;
      expect(dropNode.parentElement!.querySelector("[title='0-2']")).toBeDefined();
    });
  });

  describe('test older node property', () => {
    let treeInstance: NzTestTreeOlderComponent;
    let treeElement: HTMLElement;
    let fixture: ComponentFixture<NzTestTreeOlderComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [NzTestTreeOlderComponent],
        providers: [NzTreeBaseService]
      }).compileComponents();
      fixture = TestBed.createComponent(NzTestTreeOlderComponent);
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('parent tree-node should not disappear when children contains searchValue', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.checkedKeys = [...fixture.componentInstance.checkedKeys];
      fixture.componentInstance.expandKeys = [...fixture.componentInstance.expandKeys];
      fixture.componentInstance.selectedKeys = [...fixture.componentInstance.selectedKeys];
      fixture.componentInstance.searchValue = '100011';
      fixture.detectChanges();
      let targetNode = treeElement.querySelectorAll('.ant-tree-switcher_open')[0];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-icon-hide')[0].children.length).toBe(3);

      fixture.componentInstance.checkedKeys = [...fixture.componentInstance.checkedKeys];
      fixture.componentInstance.expandKeys = [...fixture.componentInstance.expandKeys];
      fixture.componentInstance.selectedKeys = [...fixture.componentInstance.selectedKeys];
      fixture.componentInstance.searchValue = '10001';
      fixture.detectChanges();
      targetNode = treeElement.querySelectorAll('.ant-tree-switcher_open')[1];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-switcher_close').length).toEqual(9);
    }));

    it('should get correctly nodes', () => {
      fixture.detectChanges();
      fixture.componentInstance.checkedKeys = [...fixture.componentInstance.checkedKeys];
      fixture.componentInstance.expandKeys = [...fixture.componentInstance.expandKeys];
      fixture.componentInstance.selectedKeys = [...fixture.componentInstance.selectedKeys];
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList()[0].key).toEqual('10001');
      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[0].key).toEqual('1001');
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      expect(fixture.componentInstance.treeComponent.getSelectedNodeList().length).toEqual(2);
    });

    it('test node function', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.checkedKeys = [...fixture.componentInstance.checkedKeys];
      fixture.componentInstance.expandKeys = [...fixture.componentInstance.expandKeys];
      fixture.componentInstance.selectedKeys = [...fixture.componentInstance.selectedKeys];
      fixture.detectChanges();
      // get node by key
      let node = fixture.componentInstance.treeComponent.getTreeNodeByKey('10001');
      expect(node!.title).toEqual('child1');
      // test clear children
      node!.clearChildren();
      expect(node!.getChildren().length).toEqual(0);
      // remove self
      node!.remove();
      const parentNode = node!.getParentNode();
      expect(parentNode!.getChildren().findIndex(v => v.key === node!.key)).toEqual(-1);
      // test selectable false and click it
      node = fixture.componentInstance.treeComponent.getTreeNodeByKey('1001');
      node!.isSelectable = false;
      fixture.detectChanges();
      fixture.componentInstance.expandDefault = true;
      fixture.detectChanges();
      // add nzTreeNode children to clear loading state, root click will not change
      const targetNode = treeElement.querySelectorAll('li')[0];
      expect(targetNode.querySelectorAll('.ant-tree-treenode-selected').length).toEqual(0);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(targetNode.querySelectorAll('.ant-tree-treenode-selected').length).toEqual(0);
    }));
  });

  describe('test older node property', () => {
    let treeElement: HTMLElement;
    let fixture: ComponentFixture<NzTestTreeCustomizedIconComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [NzTestTreeCustomizedIconComponent],
        providers: [NzTreeBaseService]
      }).compileComponents();
      fixture = TestBed.createComponent(NzTestTreeCustomizedIconComponent);
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('test customized icon', fakeAsync(() => {
      fixture.detectChanges();
      // customized template icon
      expect(treeElement.querySelectorAll('.anticon-arrow-down').length).toEqual(1);
    }));
  });
});

@Component({
  template: `
    <nz-tree
      #treeComponent
      [nzData]="nodes"
      nzShowIcon
      [nzCheckable]="true"
      [nzCheckStrictly]="checkStrictly"
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      [nzMultiple]="multiple"
      [nzSearchValue]="searchValue"
      [nzExpandAll]="expandAll"
      [nzExpandedIcon]="expandedIcon"
      [nzAsyncData]="asyncData"
      (nzSearchValueChange)="nzEvent()"
      (nzClick)="nzEvent()"
      (nzDblClick)="nzEvent()"
      (nzContextMenu)="nzEvent()"
      (nzExpandChange)="nzEvent()"
      (nzCheckBoxChange)="nzEvent()"
    >
    </nz-tree>
  `
})
export class NzTestTreeBasicControlledComponent {
  @ViewChild('treeComponent', { static: true }) treeComponent: NzTreeComponent;
  searchValue: string;
  multiple = true;
  expandAll = false;
  asyncData = false;
  checkStrictly = false;
  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0-0'];
  defaultExpandedKeys = ['0-0-0', '0-0-1'];

  nodes: NzTreeNodeOptions[] | NzTreeNode[] = [
    {
      title: '0-0',
      key: '0-0',
      icon: 'smile',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ];

  nzEvent(): void {}
}

// -------------------------------------------
// | Testing Draggable Components
// -------------------------------------------

@Component({
  template: `
    <nz-tree
      nzBlockNode
      [nzData]="nodes"
      nzDraggable="true"
      [nzBeforeDrop]="beforeDrop"
      (nzOnDragStart)="onDragStart()"
      (nzOnDragEnter)="onDragEnter()"
      (nzOnDragLeave)="onDragLeave()"
      (nzOnDragOver)="onDragOver()"
      (nzOnDrop)="onDrop()"
      (nzOnDragEnd)="onDragEnd()"
    >
    </nz-tree>
  `
})
export class NzTestTreeDraggableComponent {
  @ViewChild(NzTreeComponent, { static: true }) treeComponent: NzTreeComponent;
  nodes = [
    {
      title: '0-0',
      key: '00',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '000',
          icon: 'smile',
          expanded: true,
          children: [
            { title: '0-0-0-0', key: '0000', isLeaf: true },
            { title: '0-0-0-1', key: '0001', isLeaf: true },
            { title: '0-0-0-2', key: '0002', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '001',
          children: [
            { title: '0-0-1-0', key: '0010', isLeaf: true },
            { title: '0-0-1-1', key: '0011', isLeaf: true },
            { title: '0-0-1-2', key: '0012', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '002'
        }
      ]
    },
    {
      title: '0-1',
      key: '01',
      children: [
        {
          title: '0-1-0',
          key: '010',
          children: [
            { title: '0-1-0-0', key: '0100', isLeaf: true },
            { title: '0-1-0-1', key: '0101', isLeaf: true },
            { title: '0-1-0-2', key: '0102', isLeaf: true }
          ]
        },
        {
          title: '0-1-1',
          key: '011',
          children: [
            { title: '0-1-1-0', key: '0110', isLeaf: true },
            { title: '0-1-1-1', key: '0111', isLeaf: true },
            { title: '0-1-1-2', key: '0112', isLeaf: true }
          ]
        }
      ]
    },
    {
      title: '0-2',
      key: '02',
      isLeaf: true
    }
  ];
  beforeDrop: () => Observable<boolean>;

  onDragStart(): void {}

  onDragEnter(): void {}

  onDragOver(): void {}

  onDragLeave(): void {}

  onDrop(): void {}

  onDragEnd(): void {}
}

// -------------------------------------------
// | Testing Older Components
// -------------------------------------------
@Component({
  template: `
    <nz-tree
      [(ngModel)]="modelNodes"
      [nzMultiple]="true"
      [nzDefaultExpandedKeys]="expandKeys"
      [nzDefaultCheckedKeys]="checkedKeys"
      [nzDefaultSelectedKeys]="selectedKeys"
      [nzDefaultExpandAll]="expandDefault"
      (nzExpandChange)="nzEvent()"
    >
    </nz-tree>
  `
})
export class NzTestTreeOlderComponent implements OnInit {
  @ViewChild(NzTreeComponent, { static: true }) treeComponent: NzTreeComponent;
  expandKeys = ['1001', '10001'];
  checkedKeys = ['10001'];
  selectedKeys = ['10001', '100011'];
  multiple = true;
  expandDefault = false;
  searchValue = '';
  modelNodes: NzTreeNode[];

  nzEvent(): void {}

  ngOnInit(): void {
    this.modelNodes = [
      {
        title: 'root1',
        key: '1001',
        children: [
          {
            title: 'child1',
            key: '10001',
            children: [
              {
                title: 'child1.1',
                key: '100011',
                children: []
              },
              {
                title: 'child1.2',
                key: '100012',
                disabled: true,
                children: [
                  {
                    title: 'grandchild1.2.1',
                    key: '1000121',
                    isLeaf: true
                  },
                  {
                    title: 'grandchild1.2.2',
                    key: '1000122',
                    isLeaf: true,
                    disableCheckbox: true
                  }
                ]
              }
            ]
          },
          {
            title: 'child2',
            key: '10002'
          }
        ]
      },
      {
        title: 'root2',
        key: '1002',
        children: [
          {
            title: 'child2.1',
            key: '10021',
            disableCheckbox: true,
            children: [
              {
                title: 'grandchild2.1.1',
                key: '100211',
                isLeaf: true,
                disableCheckbox: true
              },
              {
                title: 'grandchild2.1.2',
                key: '1002112',
                isLeaf: true,
                disableCheckbox: true
              }
            ]
          },
          {
            title: 'child2.2',
            key: '10022',
            children: [
              {
                title: 'grandchild2.2.1',
                key: '100221'
              }
            ]
          }
        ]
      },
      { title: 'root3', key: '1003' }
    ].map(n => {
      return new NzTreeNode(n, null, this.treeComponent.nzTreeService);
    });
  }
}

@Component({
  template: `
    <nz-tree #treeComponent [nzData]="nodes" nzShowIcon="true" [nzExpandedIcon]="expandedIconTpl">
      <ng-template #expandedIconTpl let-node>
        <i nz-icon [nzType]="'arrow-down'" class="ant-tree-switcher-icon"></i>
      </ng-template>
    </nz-tree>
  `
})
class NzTestTreeCustomizedIconComponent {
  @ViewChild('treeComponent', { static: true }) treeComponent: NzTreeComponent;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf', key: '1001', icon: 'meh', isLeaf: true },
        { title: 'leaf', key: '1002', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}
