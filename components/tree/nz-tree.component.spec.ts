import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent, NzFormatEmitEvent, NzSafeAny, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/componet-bed';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzTreeNodeComponent } from './nz-tree-node.component';

import { NzTreeComponent } from './nz-tree.component';
import { NzTreeModule } from './nz-tree.module';

const prepareTest = (componentInstance?: NzSafeAny): ComponentBed<NzSafeAny> => {
  return createComponentBed(componentInstance, {
    declarations: [NzTreeNodeComponent],
    providers: [],
    imports: [NzTreeModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzIconTestModule]
  });
};

describe('NzTestTreeBasicControlledComponent', () => {
  let testBed: ComponentBed<NzTestTreeBasicControlledComponent>;

  beforeEach(() => {
    testBed = prepareTest(NzTestTreeBasicControlledComponent);
    const { fixture } = testBed;
    fixture.detectChanges();
  });

  describe('basic tree under default value', () => {
    it('basic initial data', () => {
      const { nativeElement } = testBed;
      const shownNodes = nativeElement.querySelectorAll('nz-tree-node');
      const enableCheckbox = nativeElement.querySelectorAll('.ant-tree-checkbox');
      expect(shownNodes.length).toEqual(3);
      expect(enableCheckbox.length).toEqual(3);
    });

    it('should initialize properly', () => {
      const { nativeElement } = testBed;
      const shownNodes = nativeElement.querySelectorAll('nz-tree-node');
      const enableCheckbox = nativeElement.querySelectorAll('.ant-tree-checkbox');
      expect(shownNodes.length).toEqual(3);
      expect(enableCheckbox.length).toEqual(3);
    });

    it('should expand the specified node based on nzExpandedKeys', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.defaultExpandedKeys = ['0-1'];
      fixture.detectChanges();
      const shownNodes = nativeElement.querySelectorAll('nz-tree-node');
      expect(shownNodes.length).toEqual(4);
      tick(300);
      fixture.detectChanges();
      // leaf node should not be included
      expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
    }));

    it('should expand all nodes while setting nzExpandAll', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.expandAll = true;
      fixture.detectChanges();
      const shownNodes = nativeElement.querySelectorAll('nz-tree-node');
      expect(shownNodes.length).toEqual(7);
      tick(300);
      fixture.detectChanges();
      // leaf node should not be included
      expect(component.treeComponent.getExpandedNodeList().length).toEqual(4);
    }));

    it('should render checkbox state of nodes based on nzCheckedKeys', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.expandAll = true; // Just for testing the selected state
      component.defaultCheckedKeys = ['0-0-0', '0-0-1'];
      fixture.detectChanges();
      const checkedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-checked');
      const halfCheckedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-indeterminate');
      expect(checkedNodes.length).toEqual(2);
      expect(halfCheckedNodes.length).toEqual(1);
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
      expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
    }));

    it('node check should not affect other nodes based on nzCheckStrictly', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.expandAll = true;
      component.checkStrictly = true;
      component.defaultCheckedKeys = ['0-0-0', '0-0-1'];
      fixture.detectChanges();
      const checkedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-checked');
      const halfCheckedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-indeterminate');
      expect(checkedNodes.length).toEqual(2);
      expect(halfCheckedNodes.length).toEqual(0);
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
      expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(0);
    }));

    it('should select nodes based on nzSelectedKeys', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.defaultSelectedKeys = ['0-0', '0-1'];
      fixture.detectChanges();
      // nzMultiple is true
      const selectedNodes = nativeElement.querySelectorAll('.ant-tree-node-selected');
      expect(selectedNodes.length).toEqual(2);
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getSelectedNodeList().length).toEqual(2);
    }));

    it('should select only one nodes based on nzMultiple:false', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.multiple = false;
      component.defaultSelectedKeys = ['0-0', '0-1'];
      fixture.detectChanges();
      // nzMultiple is false
      const selectedNodes = nativeElement.querySelectorAll('.ant-tree-node-selected');
      expect(selectedNodes.length).toEqual(1);
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
    }));

    it('should match nodes based on nzSearchValue', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      component.searchValue = '0-0-1';
      fixture.detectChanges();
      // will expand 0-1, 0-0-1
      const expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
      const matchedNodes = nativeElement.querySelectorAll('.font-highlight');
      expect(expandedNodes.length).toEqual(2);
      expect(matchedNodes.length).toEqual(1);
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getMatchedNodeList().length).toEqual(1);
    }));
  });

  describe('basic style of tree', () => {
    it('should render tree with line based on nzShowLine', () => {
      const { component, fixture, nativeElement } = testBed;
      component.showLine = true;
      fixture.detectChanges();
      const lineTreeIcon = nativeElement.querySelectorAll('.anticon-plus-square');
      expect(lineTreeIcon.length).toEqual(2); // one is leaf node
    });

    it('should show custom icon based on nzExpandedIcon', () => {
      const { fixture, nativeElement } = testBed;
      const button = nativeElement.querySelector('button')!;
      button.click();
      fixture.detectChanges();

      const customIconElement = nativeElement.querySelectorAll('.ant-tree-switcher .anticon-smile');
      // shown nodes are same with `basic initial data`
      expect(customIconElement.length).toEqual(2);
    });
  });

  describe('event trigger', () => {
    it('should select node when clicking', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      const spy = spyOn(component, 'nzEvent');
      expect(spy).not.toHaveBeenCalled();

      // get first node 0-0
      const node = nativeElement.querySelector('span.ant-tree-node-content-wrapper')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(nativeElement.querySelector('span.ant-tree-node-content-wrapper.ant-tree-node-selected')).toBeDefined();
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
    }));

    it('should expand node when clicking switcher', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      const spy = spyOn(component, 'nzEvent');
      // get first node 0-0
      const node = nativeElement.querySelector('span.ant-tree-switcher')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(nativeElement.querySelector('span.ant-tree-switcher.ant-tree-switcher_open')).toBeDefined();
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
    }));

    it('should check node when clicking checkBox', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      const spy = spyOn(component, 'nzEvent');
      // get first node 0-0
      const node = nativeElement.querySelector('span.ant-tree-checkbox')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(nativeElement.querySelector('span.ant-tree-checkbox.ant-tree-checkbox-checked')).toBeDefined();
      tick(300);
      fixture.detectChanges();
      expect(component.treeComponent.getCheckedNodeList().length).toEqual(1);
    }));

    it('should trigger contextmenu event', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      const spy = spyOn(component, 'nzEvent');
      // get first node 0-0
      const node = nativeElement.querySelector('span.ant-tree-node-content-wrapper')!;
      dispatchMouseEvent(node, 'contextmenu');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should trigger dblclick event', fakeAsync(() => {
      const { component, fixture, nativeElement } = testBed;
      const spy = spyOn(component, 'nzEvent');
      // get first node 0-0
      const node = nativeElement.querySelector('span.ant-tree-node-content-wrapper')!;
      dispatchMouseEvent(node, 'dblclick');
      fixture.detectChanges();
      // Maybe needs to change
      // In actual user behavior, click event may be triggered twice
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });
});

@Component({
  template: `
    <button (click)="changeIcon(expandedIconTpl)">Custom expand icon</button>
    <nz-tree
      #treeComponent
      [nzData]="nodes"
      nzShowIcon
      [nzCheckable]="true"
      [nzShowLine]="showLine"
      [nzCheckStrictly]="checkStrictly"
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      [nzMultiple]="multiple"
      [nzSearchValue]="searchValue"
      [nzExpandAll]="expandAll"
      [nzExpandedIcon]="expandedIcon"
      [nzAsyncData]="asyncData"
      (nzSearchValueChange)="nzEvent($event)"
      (nzClick)="nzEvent($event)"
      (nzDblClick)="nzEvent($event)"
      (nzContextMenu)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      (nzCheckBoxChange)="nzEvent($event)"
    >
    </nz-tree>
    <ng-template #expandedIconTpl let-node>
      <i nz-icon nzType="smile" class="ant-tree-switcher-icon"></i>
    </ng-template>
  `
})
export class NzTestTreeBasicControlledComponent {
  @ViewChild('treeComponent', { static: true }) treeComponent: NzTreeComponent;
  searchValue: string;
  multiple = true;
  expandAll = false;
  asyncData = false;
  checkStrictly = false;
  showLine = false;
  defaultCheckedKeys: string[] = [];
  defaultSelectedKeys: string[] = [];
  defaultExpandedKeys: string[] = [];
  expandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;

  nodes: NzTreeNodeOptions[] | NzTreeNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0'
        },
        {
          title: '0-0-1',
          key: '0-0-1'
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
      children: [{ title: '0-1-0-0', key: '0-1-0-0', isLeaf: true }]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ];

  nzEvent(_data: NzFormatEmitEvent): void {}

  // Just for testing
  changeIcon(template: TemplateRef<{ $implicit: NzTreeNode }>): void {
    this.expandedIcon = template;
  }
}
