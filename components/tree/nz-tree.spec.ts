import { Component, ViewChild } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { dispatchMouseEvent, dispatchTouchEvent } from '../core/testing';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeComponent } from './nz-tree.component';
import { NzTreeModule } from './nz-tree.module';
import { NzTreeService } from './nz-tree.service';

describe('nz-tree', () => {
  let treeInstance;
  let treeElement: HTMLElement;
  let component;
  let fixture;
  let treeService: NzTreeService;
  describe('basic tree', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzTestTreeBasicControlledComponent ]
      }).compileComponents();
      fixture = TestBed.createComponent(NzTestTreeBasicControlledComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should set nzDefaultXXX correctly', fakeAsync(() => {
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getTreeNodes().length).toEqual(3);
      // checked
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[ 0 ].title).toEqual('0-0-0');
      // half expanded
      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[ 0 ].title).toEqual('0-0');
      // expanded
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      // selected
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList()[ 0 ].title).toEqual('0-0-0-0');

      // won't affect
      treeInstance.defaultExpandedKeys = [];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);

    }));

    it('test unCorrectly ngModel', () => {
      fixture.detectChanges();
      // TODO
      // unsupported type, will console `ngModel only accepts an array and should be not empty`
      treeInstance.nodes = 'string';
      fixture.detectChanges();
    });

    it('test new NzTreeNode of nzData', fakeAsync(() => {
      fixture.detectChanges();
      treeInstance.nodes = [ {
        title   : '0-0',
        key     : '0-0',
        expanded: true,
        children: [ {
          title   : '0-0-0',
          key     : '0-0-0',
          expanded: true,
          checked : true,
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        }, {
          title   : '0-0-1',
          key     : '0-0-1',
          selected: true,
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        }, {
          title : '0-0-2',
          key   : '0-0-2',
          isLeaf: true
        } ]
      }, {
        title   : '0-1',
        key     : '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
          { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
          { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
        ]
      } ].map(v => {
        return (new NzTreeNode(v));
      });
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      // reset node will clear default value except checked nodes list
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      expect(treeInstance.treeComponent.getMatchedNodeList().length).toEqual(0);
      // // checked nodes no effect
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[ 0 ].title).toEqual('0-0-0');

      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[ 0 ].title).toEqual('0-0');
    }));

    it('test click event', fakeAsync(() => {
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // click 0-0-0 to select
      let targetNode = treeElement.querySelectorAll('nz-tree-node')[ 1 ];
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
      targetNode = treeElement.querySelectorAll('nz-tree-node')[ 1 ];
      dispatchMouseEvent(targetNode, 'dblclick');
      fixture.detectChanges();
      // 0-0-0-0 are selected
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(clickSpy).toHaveBeenCalledTimes(3); // will detect dblclick

      // click disabled node
      targetNode = treeElement.querySelectorAll('nz-tree-node')[ treeElement.querySelectorAll('nz-tree-node').length - 1 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);

      // set nzMultiple to false, click 0-0-0-0 will just active one node
      treeInstance.multiple = false;
      fixture.detectChanges();
      targetNode = treeElement.querySelectorAll('nz-tree-node')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getSelectedNodeList()[ 0 ].title).toEqual('0-0');

      // cancel selected
      targetNode = treeElement.querySelectorAll('nz-tree-node')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(0);
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(0);
    }));

    it('test expand event', fakeAsync(() => {
      fixture.detectChanges();
      // expand 0-0,now 3 nodes expanded
      const targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[ 0 ];
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(3);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(3);
    }));

    it('test check event', fakeAsync(() => {
      fixture.detectChanges();
      // uncheck 0-0-0
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 1 ];
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(0);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(0);

      // check 0-0-0, will make 0-0 indeterminate
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 1 ];
      dispatchMouseEvent(targetNode, 'click');
      tick(300);
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(fixture.componentInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
    }));

    it('test check event with nzCheckStrictly', fakeAsync(() => {
      fixture.detectChanges();
      treeInstance.checkStrictly = true;
      treeInstance.nodes = [
        {
          title   : 'parent',
          key     : '0',
          children: [
            {
              title : 'child 1',
              key   : '0-0',
              isLeaf: true
            },
            {
              title : 'child 2',
              key   : '0-1',
              isLeaf: true
            }
          ]
        }
      ];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // check node will not affect other nodes
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(1);

      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 1 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.treeComponent.getCheckedNodeList().length).toEqual(2);
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(2);

    }));

    it('test contextmenu event', fakeAsync(() => {
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // contextmenu 0-0-0
      const targetNode = treeElement.querySelectorAll('nz-tree-node')[ 1 ];
      dispatchMouseEvent(targetNode, 'contextmenu');
      fixture.detectChanges();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    }));

    it('test disabled node check event', fakeAsync(() => {
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'nzEvent');
      // contextmenu 0-0-0
      const targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ treeElement.querySelectorAll('li').length - 1 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(clickSpy).toHaveBeenCalledTimes(0);
    }));

    it('test expand all node', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.expandAll = true;
      tick();
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
      let targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      tick();
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(1);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(1);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);
      // add children to clear loading state
      fixture.componentInstance.treeComponent.getExpandedNodeList()[ 0 ].addChildren([ {
        title: 'Child Node',
        key  : `0-0`
      } ]);
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(0);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);

      // add nzTreeNode children to clear loading state
      targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[ 2 ];
      dispatchMouseEvent(targetNode, 'click');
      tick();
      fixture.detectChanges();
      // getExpandedNodeList return ['0', '1']
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(1);
      fixture.componentInstance.treeComponent.getExpandedNodeList()[ 1 ].addChildren([ new NzTreeNode({
        title: 'Child Node',
        key  : `1-0`
      }) ]);
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(0);
      expect(treeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(2);
      expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(2);
    }));
  });

  describe('test draggable node', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzTestTreeDraggableComponent ],
        providers   : [
          NzTreeService
        ]
      }).compileComponents();
    }));

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestTreeDraggableComponent);
      component = fixture.componentInstance;
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('test drag event', fakeAsync(() => {
      fixture.detectChanges();
      const dragStartSpy = spyOn(treeInstance, 'onDragStart');
      const dragEnterSpy = spyOn(treeInstance, 'onDragEnter');
      const dragOverSpy = spyOn(treeInstance, 'onDragOver');
      const dragLeaveSpy = spyOn(treeInstance, 'onDragLeave');
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragEndSpy = spyOn(treeInstance, 'onDragEnd');
      let dragNode = treeElement.querySelector('[title=\'0-1\']');
      let dropNode = treeElement.querySelector('[title=\'0-0\']');
      let passNode = treeElement.querySelector('[title=\'0-0-0\']');

      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragenter');
      fixture.detectChanges();

      // drag - dragenter
      dragNode = treeElement.querySelector('[title=\'0-1\']');
      dropNode = treeElement.querySelector('[title=\'0-0\']');
      expect(dragNode.previousElementSibling.classList).toContain('ant-tree-switcher_close');
      expect(dropNode.previousElementSibling.classList).toContain('ant-tree-switcher_open');
      expect(dragStartSpy).toHaveBeenCalledTimes(1);
      expect(dragEnterSpy).toHaveBeenCalledTimes(1);

      // dragover
      dispatchTouchEvent(passNode, 'dragover');
      fixture.detectChanges();
      passNode = treeElement.querySelector('[title=\'0-0-0\']');
      expect(passNode.parentElement.classList).toContain('drag-over');
      expect(dragOverSpy).toHaveBeenCalledTimes(1);

      // dragleave
      dispatchTouchEvent(passNode, 'dragleave');
      fixture.detectChanges();
      passNode = treeElement.querySelector('[title=\'0-0-0\']');
      expect(passNode.parentElement.classList.contains('drag-over')).toEqual(false);
      expect(dragLeaveSpy).toHaveBeenCalledTimes(1);

      // drop 0-1 to 0-0
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector('[title=\'0-0\']');
      expect(dropSpy).toHaveBeenCalledTimes(1);
      expect(dropNode.parentElement.querySelector('[title=\'0-1\']')).toBeDefined();

      // dragend
      dispatchTouchEvent(dropNode, 'dragend');
      fixture.detectChanges();
      expect(dragEndSpy).toHaveBeenCalledTimes(1);

      // drag 0-0 child node to 0-1
      dragNode = treeElement.querySelector('[title=\'0-0-0\']');
      dropNode = treeElement.querySelector('[title=\'0-1\']');
      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector('[title=\'0-1\']');
      expect(dropSpy).toHaveBeenCalledTimes(2);
      expect(dropNode.parentElement.querySelector('[title=\'0-0-0\']')).toBeDefined();
    }));

    // can not dispatchTouchEvent with pos, test alone
    it('test drag drop with dragPos', () => {
      // init selected node
      treeService = treeInstance.treeComponent.nzTreeService;
      const dragNode = treeElement.querySelectorAll('li')[ 1 ];
      dispatchTouchEvent(dragNode, 'dragstart');
      fixture.detectChanges();
      // drop 0-0-0 to 0-0 pre
      let targetNode = treeService.rootNodes[ 0 ]; // 0-0
      treeService.dropAndApply(targetNode, -1);
      expect(treeService.rootNodes[ 0 ].title).toEqual('0-0-0');
      expect(treeService.rootNodes[ 0 ].level).toEqual(0);

      // drop 0-0-0 to 0-0-1 next
      treeService.selectedNode = treeService.rootNodes[ 0 ];
      targetNode = treeService.rootNodes[ 1 ].getChildren()[ 0 ]; // 0-0-1
      treeService.dropAndApply(targetNode, 1);
      expect(treeService.rootNodes[ 0 ].getChildren()[ 1 ].title).toEqual('0-0-0');
      expect(treeService.rootNodes[ 0 ].getChildren()[ 1 ].level).toEqual(1);

      // drop 0-0-1 to 0-0-0 next
      treeService.selectedNode = treeService.rootNodes[ 0 ].getChildren()[ 0 ];
      targetNode = treeService.rootNodes[ 0 ].getChildren()[ 1 ]; // 0-0-1
      treeService.dropAndApply(targetNode, 1);
      expect(treeService.rootNodes[ 0 ].getChildren()[ 0 ].title).toEqual('0-0-0');
    });

    it('test wrong drag event', fakeAsync(() => {
      // drop node self
      fixture.detectChanges();
      const dragStartSpy = spyOn(treeInstance, 'onDragStart');
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragEndSpy = spyOn(treeInstance, 'onDragEnd');
      const dragNode = treeElement.querySelector('[title=\'0-1\']');
      let dropNode = treeElement.querySelector('[title=\'0-2\']');

      // drop 0-1 to 0-2(leaf node)
      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector('[title=\'0-2\']');
      expect(dropSpy).toHaveBeenCalledTimes(0);
      expect(dropNode.parentElement.querySelector('[title=\'0-1\']')).toBeNull();
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
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragNode = treeElement.querySelector('[title=\'0-2\']');
      let dropNode = treeElement.querySelector('[title=\'0-1\']');
      treeInstance.beforeDrop = (arg: NzFormatBeforeDropEvent): Observable<boolean> => {
        return of(true);
      };
      fixture.detectChanges();

      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(dropNode, 'dragover');
      // drop 0-2 to 0-1
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      dropNode = treeElement.querySelector('[title=\'0-1\']');
      expect(dropNode.parentElement.querySelector('[title=\'0-2\']')).toBeDefined();
    });

  });

  describe('test older node property', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzTestTreeOlderComponent ],
        providers   : [
          NzTreeService
        ]
      }).compileComponents();
    }));

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestTreeOlderComponent);
      component = fixture.componentInstance;
      treeService = fixture.componentInstance.treeComponent.nzTreeService;
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('test unCorrectly ngModel', () => {
      fixture.detectChanges();
      // unsupported type, will console `ngModel only accepts an array and should be not empty`
      treeInstance.nodes = 'string';
      fixture.detectChanges();
    });

    it('should get correctly nodes', fakeAsync(() => {
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      // unsupported type, will console `ngModel only accepts an array and should be not empty`
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[ 0 ].key).toEqual('10001');
      expect(treeInstance.treeComponent.getExpandedNodeList().length).toEqual(2);

      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getHalfCheckedNodeList()[ 0 ].key).toEqual('1001');
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(2);
      // test clear children
      treeInstance.treeComponent.getTreeNodes()[0].clearChildren();
      expect(treeInstance.treeComponent.getTreeNodes()[0].getChildren().length).toEqual(0);

    }));

  });

});

@Component({
  selector: 'nz-test-tree-basic-controlled',
  template: `
    <nz-tree
      #treeComponent
      [nzData]="nodes"
      [nzCheckable]="true"
      [nzCheckStrictly]="checkStrictly"
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      [nzMultiple]="multiple"
      [nzSearchValue]="searchValue"
      [nzExpandAll]="expandAll"
      [nzAsyncData]="asyncData"
      (nzSearchValueChange)="nzEvent($event)"
      (nzClick)="nzEvent($event)"
      (nzDblClick)="nzEvent($event)"
      (nzContextMenu)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      (nzCheckBoxChange)="nzEvent($event)">
    </nz-tree>
  `
})

export class NzTestTreeBasicControlledComponent {
  @ViewChild('treeComponent') treeComponent: NzTreeComponent;
  searchValue;
  multiple = true;
  expandAll = false;
  asyncData = false;
  checkStrictly = false;
  defaultCheckedKeys = [ '0-0-0' ];
  defaultSelectedKeys = [ '0-0-0-0' ];
  defaultExpandedKeys = [ '0-0-0', '0-0-1' ];

  nodes = [ {
    title   : '0-0',
    key     : '0-0',
    expanded: true,
    children: [ {
      title   : '0-0-0',
      key     : '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
        { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
        { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
      ]
    }, {
      title   : '0-0-1',
      key     : '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
        { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
        { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
      ]
    }, {
      title : '0-0-2',
      key   : '0-0-2',
      isLeaf: true
    } ]
  }, {
    title   : '0-1',
    key     : '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
      { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
      { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
    ]
  }, {
    title   : '0-2',
    key     : '0-2',
    disabled: true,
    isLeaf  : true
  } ];

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event.eventName, event);
  }

}

// -------------------------------------------
// | Testing Draggable Components
// -------------------------------------------

@Component({
  selector: 'nz-demo-tree-draggable',
  template: `
    <nz-tree
      [nzData]="nodes"
      nzDraggable="true"
      [nzBeforeDrop]="beforeDrop"
      (nzOnDragStart)="onDragStart($event)"
      (nzOnDragEnter)="onDragEnter($event)"
      (nzOnDragLeave)="onDragLeave($event)"
      (nzOnDragOver)="onDragOver($event)"
      (nzOnDrop)="onDrop($event)"
      (nzOnDragEnd)="onDragEnd($event)">
    </nz-tree>
  `
})

export class NzTestTreeDraggableComponent {
  @ViewChild(NzTreeComponent) treeComponent: NzTreeComponent;
  nodes = [ {
    title   : '0-0',
    key     : '00',
    expanded: true,
    children: [ {
      title   : '0-0-0',
      key     : '000',
      expanded: true,
      children: [
        { title: '0-0-0-0', key: '0000', isLeaf: true },
        { title: '0-0-0-1', key: '0001', isLeaf: true },
        { title: '0-0-0-2', key: '0002', isLeaf: true }
      ]
    }, {
      title   : '0-0-1',
      key     : '001',
      children: [
        { title: '0-0-1-0', key: '0010', isLeaf: true },
        { title: '0-0-1-1', key: '0011', isLeaf: true },
        { title: '0-0-1-2', key: '0012', isLeaf: true }
      ]
    }, {
      title: '0-0-2',
      key  : '002'
    } ]
  }, {
    title   : '0-1',
    key     : '01',
    children: [ {
      title   : '0-1-0',
      key     : '010',
      children: [
        { title: '0-1-0-0', key: '0100', isLeaf: true },
        { title: '0-1-0-1', key: '0101', isLeaf: true },
        { title: '0-1-0-2', key: '0102', isLeaf: true }
      ]
    }, {
      title   : '0-1-1',
      key     : '011',
      children: [
        { title: '0-1-1-0', key: '0110', isLeaf: true },
        { title: '0-1-1-1', key: '0111', isLeaf: true },
        { title: '0-1-1-2', key: '0112', isLeaf: true }
      ]
    } ]
  }, {
    title : '0-2',
    key   : '02',
    isLeaf: true
  } ];
  beforeDrop;

  onDragStart(event: NzFormatEmitEvent): void {
  }

  onDragEnter(event: NzFormatEmitEvent): void {
  }

  onDragOver(event: NzFormatEmitEvent): void {
  }

  onDragLeave(event: NzFormatEmitEvent): void {
  }

  onDrop(event: NzFormatEmitEvent): void {
  }

  onDragEnd(event: NzFormatEmitEvent): void {
  }
}

// -------------------------------------------
// | Testing Older Components
// -------------------------------------------
@Component({
  selector: 'nz-test-older-tree',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzMultiple]="true"
      [nzDefaultExpandedKeys]="expandKeys"
      [nzDefaultCheckedKeys]="checkedKeys"
      [nzDefaultSelectedKeys]="selectedKeys"
      [nzDefaultExpandAll]="expandDefault">
    </nz-tree>
  `
})
class NzTestTreeOlderComponent {
  @ViewChild(NzTreeComponent) treeComponent: NzTreeComponent;
  expandKeys = [ '1001', '10001' ];
  checkedKeys = [ '10001' ];
  selectedKeys = [ '10001', '100011' ];
  multiple = true;
  expandDefault = false;
  showExpand = true;
  searchValue = '';
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      children: [
        {
          title   : 'child1',
          key     : '10001',
          children: [
            {
              title   : 'child1.1',
              key     : '100011',
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              disabled: true,
              children: [
                {
                  title : 'grandchild1.2.1',
                  key   : '1000121',
                  isLeaf: true
                },
                {
                  title          : 'grandchild1.2.2',
                  key            : '1000122',
                  isLeaf         : true,
                  disableCheckbox: true
                }
              ]
            }
          ]
        },
        {
          title: 'child2',
          key  : '10002'
        }
      ]
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      children: [
        {
          title          : 'child2.1',
          key            : '10021',
          disableCheckbox: true,
          children       : [
            {
              title          : 'grandchild2.1.1',
              key            : '100211',
              isLeaf         : true,
              disableCheckbox: true
            },
            {
              title          : 'grandchild2.1.2',
              key            : '1002112',
              isLeaf         : true,
              disableCheckbox: true
            }
          ]
        },
        {
          title   : 'child2.2',
          key     : '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key  : '100221'
            }
          ]
        }
      ]
    }),
    new NzTreeNode({ title: 'root3', key: '1003' })
  ];
}
