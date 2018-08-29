import { Component, ViewChild } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { dispatchMouseEvent, dispatchTouchEvent } from '../core/testing/dispatch-events';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeComponent } from './nz-tree.component';
import { NzTreeModule } from './nz-tree.module';
import { NzTreeService } from './nz-tree.service';

describe('tree component test', () => {
  let treeInstance;
  let fixture: ComponentFixture<{}>;
  let treeService: NzTreeService;

  describe('basic tree', () => {
    let treeElement: HTMLElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzDemoBasicTreeComponent ]
      }).compileComponents();
    }));

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzDemoBasicTreeComponent);
      fixture.detectChanges();
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });
    it('should className correct', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      const allSelectedKeys = treeElement.querySelectorAll('.ant-tree-node-selected');
      expect(allSelectedKeys[ 0 ].getAttribute('title')).toEqual('child1');
      expect(allSelectedKeys[ 1 ].getAttribute('title')).toEqual('child1.1');
      expect(treeInstance.treeComponent.getSelectedNodeList().length).toEqual(2);

      // checked(child1 has disabled nodes)
      const allCheckedKeys = treeElement.querySelectorAll('.ant-tree-checkbox-checked');
      expect(allCheckedKeys.length).toEqual(2);
      // merged to one node
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      // expanded
      const allExpandedKeys = treeElement.querySelectorAll('.ant-tree-switcher_open');
      expect(allExpandedKeys.length).toEqual(2);
    }));

    it('click should response correctly', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'onClick');
      // click child1
      let targetNode = treeElement.querySelectorAll('li')[ 1 ];
      expect(targetNode.querySelectorAll('.ant-tree-node-selected').length).toEqual(2);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      // cancel selected
      targetNode = treeElement.querySelectorAll('li')[ 1 ];
      expect(targetNode.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
      expect(clickSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    }));
    it('dblclick/contextmenu should response correctly', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      const clickSpy = spyOn(treeInstance, 'onClick');
      const dblClickSpy = spyOn(treeInstance, 'onDblClick');
      const contextMenuSpy = spyOn(treeInstance, 'onContextMenu');
      // detect changes
      fixture.detectChanges();
      // dblclick child1
      let targetNode = treeElement.querySelectorAll('li')[ 1 ];
      dispatchMouseEvent(targetNode, 'dblclick');
      fixture.detectChanges();
      // cancel selected
      expect(clickSpy).toHaveBeenCalledTimes(0);
      // dblclick
      expect(dblClickSpy).toHaveBeenCalled();
      expect(dblClickSpy).toHaveBeenCalledTimes(1);
      // contextmenu
      targetNode = treeElement.querySelectorAll('li')[ 1 ];
      dispatchMouseEvent(targetNode, 'contextmenu');
      expect(contextMenuSpy).toHaveBeenCalled();
      expect(contextMenuSpy).toHaveBeenCalledTimes(1);
    }));

    it('check/expand should response correctly', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      const checkSpy = spyOn(treeInstance, 'onCheck');
      const expandSpy = spyOn(treeInstance, 'onExpand');
      // detect changes
      fixture.detectChanges();
      // 2 checked in default(3 disabled not be contained)
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(2);
      // check child1
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 0 ];
      expect(targetNode.classList).toContain('ant-tree-checkbox-indeterminate');
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 0 ];
      // all nodes inside root1 are checked(except 2 disabled)
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(5);
      expect(checkSpy).toHaveBeenCalledTimes(1);
      // for bug test https://github.com/NG-ZORRO/ng-zorro-antd/issues/1423
      // auto merge child node
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      expect(treeInstance.treeComponent.getCheckedNodeList()[ 0 ].title).toEqual('root1');
      // cancel checked status
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();

      // click node grandchild1.2.1 to test disabled node.(won't effect parent node)
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 4 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(1);
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();

      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(0);
      expect(treeInstance.treeComponent.getCheckedNodeList().length).toEqual(0);
      // test half checked nodes, click child1.1, just root1 halfchecked(child1 is full checked)
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 2 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeInstance.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      // // click disabled node
      targetNode = treeElement.querySelector('.ant-tree-checkbox-disabled');
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(targetNode.classList).toContain('ant-tree-checkbox-disabled');

      // expand node
      targetNode = treeElement.querySelectorAll('.ant-tree-switcher_close')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(targetNode.classList).toContain('ant-tree-switcher_open');
      expect(expandSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalledTimes(1);
    }));

    it('should className correct showline/showexpand/expandall', fakeAsync(() => {
      treeInstance.showLine = true;
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(treeElement.querySelector('ul').classList).toContain('ant-tree-show-line');
      // hide expand icon
      expect(treeElement.querySelectorAll('.ant-tree-switcher').length).toBeGreaterThan(0);
      treeInstance.showExpand = false;
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-switcher').length).toEqual(0);
      // expandAll
      treeInstance.expandDefault = true;
      fixture.detectChanges();
    }));

    it('search value', () => {
      const searchSpy = spyOn(treeInstance, 'onSearch');
      treeInstance.searchValue = 'grand';
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.font-highlight').length).toEqual(5);
      expect(searchSpy).toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('async tree', () => {
    treeInstance = null;
    fixture = null;
    let treeElement: HTMLElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzDemoAsyncTreeComponent ]
      }).compileComponents();
    }));

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzDemoAsyncTreeComponent);
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
      fixture.detectChanges();
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('should add children', () => {
      const expandSpy = spyOn(treeInstance, 'onExpand');
      // detect changes
      fixture.detectChanges();
      // init
      expect(treeElement.querySelectorAll('.ant-tree-switcher').length).toEqual(3);
      // click expand, test can not excute add children
      const targetNode = treeElement.querySelectorAll('.ant-tree-switcher')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(expandSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('test node', () => {
    let treeNode: NzTreeNode;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ NzTreeModule ]
      }).compileComponents();
    }));

    beforeEach(fakeAsync(() => {
      treeNode = new NzTreeNode({
        title   : 'root1',
        key     : '1001',
        children: []
      });
    }));

    it('should create', () => {
      expect(treeNode).toBeDefined();
    });

    it('should add children', () => {
      // add json array
      treeNode.addChildren([
        {
          title: 'childAdd-1',
          key  : '10031-' + (new Date()).getTime()
        },
        {
          title : 'childAdd-2',
          key   : '10032-' + (new Date()).getTime(),
          isLeaf: true
        } ]);
      expect(treeNode.getChildren().length).toEqual(2);
      // add NzTreeNode
      treeNode.clearChildren();
      const newNode = new NzTreeNode({
        title: 'childAdd-1',
        key  : '100001'
      });
      treeNode.addChildren([ newNode ]);
      expect(treeNode.getChildren().length).toEqual(1);
      expect(treeNode.getChildren()[ 0 ].title).toEqual('childAdd-1');
    });

    it('add children if node is leaf', () => {
      treeNode = new NzTreeNode({
        title : 'root1',
        key   : '1001',
        isLeaf: true
      });
      treeNode.addChildren([ {
        title: 'childAdd-1',
        key  : '100001'
      } ]);
      expect(treeNode.getChildren().length).toEqual(0);
    });

    it('init node with children', () => {
      treeNode = new NzTreeNode({
        title   : 'root1',
        key     : '1001',
        checked : true,
        children: [ {
          title: 'childAdd-1',
          key  : '100001'
        } ]
      });
      expect(treeNode.getChildren().length).toEqual(1);
      expect(treeNode.getChildren()[ 0 ].isChecked).toEqual(true);
    });
  });

  describe('test draggable node', () => {
    let treeElement: HTMLElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzDemoDraggableTreeComponent ],
        providers   : [
          NzTreeService
        ]
      }).compileComponents();
    }));

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzDemoDraggableTreeComponent);
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
      fixture.detectChanges();
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });
    it('drag event', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      const dragStartSpy = spyOn(treeInstance, 'onDragStart');
      const dragEnterSpy = spyOn(treeInstance, 'onDragEnter');
      const dragOverSpy = spyOn(treeInstance, 'onDragOver');
      const dragLeaveSpy = spyOn(treeInstance, 'onDragLeave');
      const dropSpy = spyOn(treeInstance, 'onDrop');
      const dragEndSpy = spyOn(treeInstance, 'onDragEnd');

      let dragNode = treeElement.querySelector('[title=root3]'); // root3
      let dropNode = treeElement.querySelector('[title=root1]'); // root1
      let passNode = treeElement.querySelector('[title=root2]'); // root2

      dispatchTouchEvent(dragNode, 'dragstart');
      dispatchTouchEvent(passNode, 'dragenter');
      fixture.detectChanges();
      // drag - dragenter
      dragNode = treeElement.querySelector('[title=root3]'); // root3
      passNode = treeElement.querySelector('[title=root2]'); // root2
      expect(dragNode.previousElementSibling.classList).toContain('ant-tree-switcher_close');
      expect(passNode.previousElementSibling.classList).toContain('ant-tree-switcher_open');
      expect(dragStartSpy).toHaveBeenCalledTimes(1);
      expect(dragEnterSpy).toHaveBeenCalledTimes(1);
      // dragover
      dispatchTouchEvent(passNode, 'dragover');
      fixture.detectChanges();
      passNode = treeElement.querySelector('[title=root2]'); // root2
      expect(passNode.parentElement.classList).toContain('drag-over');
      expect(dragOverSpy).toHaveBeenCalledTimes(1);
      // dragleave
      dispatchTouchEvent(passNode, 'dragleave');
      fixture.detectChanges();
      passNode = treeElement.querySelector('[title=root2]'); // root2
      expect(passNode.parentElement.classList.contains('drag-over')).toEqual(false);
      expect(dragLeaveSpy).toHaveBeenCalledTimes(1);
      // drop root3 to root1
      dispatchTouchEvent(dropNode, 'dragover');
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      expect(dropSpy).toHaveBeenCalledTimes(1);
      dropNode = treeElement.querySelector('[title=root1]');
      expect(dropNode.parentElement.querySelector('[title=root3]')).toBeDefined();
      // dragend
      dispatchTouchEvent(dropNode, 'dragend');
      fixture.detectChanges();
      expect(dragEndSpy).toHaveBeenCalledTimes(1);
    }));
    it('drag event canDrop', () => {
      treeInstance.beforeDrop = (arg: NzFormatBeforeDropEvent): Observable<boolean> => {
        return of(true);
      };
      fixture.detectChanges();
      const dropSpy = spyOn(treeInstance, 'onDrop');

      const dragNode = treeElement.querySelector('[title=root3]'); // root3
      let dropNode = treeElement.querySelector('[title=root1]'); // root1

      dispatchTouchEvent(dragNode, 'dragstart');
      fixture.detectChanges();
      // drop root3 to root1
      dispatchTouchEvent(dropNode, 'drop');
      fixture.detectChanges();
      expect(dropSpy).toHaveBeenCalledTimes(1);
      dropNode = treeElement.querySelector('[title=root1]');
      expect(dropNode.parentElement.querySelector('[title=root3]')).toBeDefined();
    });
  });

  describe('test service', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzDemoDraggableTreeComponent ],
        providers   : [
          NzTreeService
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoDraggableTreeComponent);
      treeInstance = fixture.debugElement.componentInstance;
      treeService = treeInstance.nzTreeService;
      treeService.initTreeNodes(treeInstance.nodes);
    });
    it('test service - setSelectedNodeList', () => {
      const selectedNode = treeService.rootNodes[ 0 ];
      // node is not selected
      treeService.setSelectedNodeList(selectedNode, false);
      // node is already selected
      selectedNode.isSelected = true;
      treeService.setSelectedNodeList(selectedNode, false);
    });

    it('test service - initNodeActive', () => {
      const selectedNode = treeService.rootNodes[ 0 ];
      selectedNode.isDisabled = true;
      treeService.initNodeActive(selectedNode, false);
      expect(treeService.getSelectedNodeList().length).toEqual(0);
      selectedNode.isDisabled = false;
      treeService.initNodeActive(selectedNode, false);
      expect(treeService.getSelectedNodeList().length).toEqual(1);
      expect(treeService.getSelectedNodeList()[ 0 ].title).toEqual('root1');
    });

    it('test service - dropAndApply', () => {
      // init selected node
      treeService.selectedNode = treeService.rootNodes[ 0 ].getChildren()[ 0 ]; // child1
      // drop
      // dragPos = 2, not drop
      let targetNode = treeService.rootNodes[ 2 ]; // root3
      treeService.dropAndApply(targetNode, 2);
      // dragPos = -1, pre
      treeService.dropAndApply(targetNode, -1);
      expect(treeService.rootNodes[ 2 ].level).toEqual(0);
      expect(treeService.rootNodes[ 2 ].title).toEqual('child1');
      // dragPos = -1, next
      treeService.selectedNode = treeService.rootNodes[ 2 ]; // child1
      targetNode = treeService.rootNodes[ 3 ];
      treeService.dropAndApply(targetNode, 1);
      expect(treeService.rootNodes[ 3 ].title).toEqual('child1');
    });

    it('test service - dropAndApply - has - parent', () => {
      // init selected node
      treeService.selectedNode = treeService.rootNodes[ 0 ].getChildren()[ 0 ]; // child1
      // drop to child2.2 pre
      const targetNode = treeService.rootNodes[ 1 ].getChildren()[ 1 ]; // child2.2
      treeService.dropAndApply(targetNode, -1);
      expect(treeService.rootNodes[ 1 ].getChildren()[ 1 ].title).toEqual('child1');
    });
  });

  describe('strict mode', () => {
    treeInstance = null;
    fixture = null;
    let treeElement: HTMLElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
        declarations: [ NzDemoStrictTreeComponent ]
      }).compileComponents();
    }));

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzDemoStrictTreeComponent);
      treeInstance = fixture.debugElement.componentInstance;
      treeElement = fixture.debugElement.query(By.directive(NzTreeComponent)).nativeElement;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
    }));

    it('should create', () => {
      expect(treeInstance).toBeTruthy();
    });

    it('should check strictly', () => {
      fixture.detectChanges();
      // check child1
      let targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(2);
      // cancel
      targetNode = treeElement.querySelectorAll('.ant-tree-checkbox')[ 0 ];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      expect(treeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(1);
    });
  });
});
// -------------------------------------------
// | Testing Components
// -------------------------------------------
@Component({
  selector: 'nz-demo-tree-strict',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzCheckable]="true"
      [nzCheckStrictly]="true"
      [nzDefaultCheckedKeys]="checkedKeys"
      [nzMultiple]="multiple"
      [nzShowLine]="showLine"
      [nzShowExpand]="showExpand"
    >
    </nz-tree>
  `
})

class NzDemoStrictTreeComponent {
  checkedKeys = [ '100011' ];
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
              checked : true,
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  isLeaf: true
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
    })
  ];
}

@Component({
  selector: 'nz-demo-tree-basic',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzCheckable]="true"
      [nzMultiple]="multiple"
      [nzShowLine]="showLine"
      [nzShowExpand]="showExpand"
      [nzSearchValue]="searchValue"
      [nzDefaultExpandedKeys]="expandKeys"
      [nzDefaultCheckedKeys]="checkedKeys"
      [nzDefaultSelectedKeys]="selectedKeys"
      [nzDefaultExpandAll]="expandDefault"
      (nzClick)="onClick()"
      (nzDblClick)="onDblClick()"
      (nzContextMenu)="onContextMenu()"
      (nzCheckBoxChange)="onCheck()"
      (nzExpandChange)="onExpand()"
      (nzOnSearchNode)="onSearch()"
    >
    </nz-tree>
  `
})
class NzDemoBasicTreeComponent {
  @ViewChild(NzTreeComponent) treeComponent: NzTreeComponent;
  expandKeys = [ '1001', '10001' ];
  checkedKeys = [ '10001' ];
  selectedKeys = [ '10001', '100011' ];
  multiple = true;
  expandDefault = false;
  showLine = false;
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

  onClick(): void {
  }

  onDblClick(): void {
  }

  onContextMenu(): void {
  }

  onCheck(): void {
  }

  onExpand(): void {
  }

  onSearch(): void {
  }

}

// -------------------------------------------
// | Testing Async Components
// -------------------------------------------

@Component({
  selector: 'nz-demo-tree-async',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzAsyncData]="true"
      (nzExpandChange)="onExpand($event)"
    >
    </nz-tree>`,
  styles  : []
})

class NzDemoAsyncTreeComponent {
  @ViewChild(NzTreeComponent) treeComponent: NzTreeComponent;
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      children: []
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      children: []
    }),
    new NzTreeNode({
      title: 'root3',
      key  : '1003'
    })
  ];

  onExpand(data: NzFormatEmitEvent): void {
  }
}

// -------------------------------------------
// | Testing Draggable Components
// -------------------------------------------

@Component({
  selector: 'nz-demo-tree-draggable',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzDraggable]="true"
      [nzMultiple]="false"
      [nzBeforeDrop]="beforeDrop"
      (nzOnDragStart)="onDragStart()"
      (nzOnDragEnter)="onDragEnter()"
      (nzOnDragOver)="onDragOver()"
      (nzOnDragLeave)="onDragLeave()"
      (nzOnDrop)="onDrop()"
      (nzOnDragEnd)="onDragEnd()"
    >
    </nz-tree>`,
  styles  : []
})

class NzDemoDraggableTreeComponent {
  @ViewChild(NzTreeComponent) treeComponent: NzTreeComponent;
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
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  isLeaf: true
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
          children       : [],
          disableCheckbox: true
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
    new NzTreeNode({ title: 'root3', key: '1003', expanded: true })
  ];

  beforeDrop;

  onDragStart(): void {
  }

  onDragEnter(): void {
  }

  onDragOver(): void {
  }

  onDragLeave(): void {
  }

  onDrop(): void {
  }

  onDragEnd(): void {
  }

  constructor(public nzTreeService: NzTreeService) {
  }
}
