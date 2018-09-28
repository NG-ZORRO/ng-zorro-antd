import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-basic',
  template: `
    <nz-tree
      #treeCom
      [nzData]="nodes"
      nzCheckable="true"
      nzMultiple="true"
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      (nzClick)="nzClick($event)"
      (nzCheckBoxChange)="nzCheck($event)">
    </nz-tree>
  `
})

export class NzDemoTreeBasicComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  defaultCheckedKeys = [ '1001', '1002' ];
  defaultSelectedKeys = [ '10011' ];
  defaultExpandedKeys = [ '100', '1001' ];

  nodes: NzTreeNodeOptions[] = [ {
    title   : 'parent 1',
    key     : '100',
    children: [ {
      title   : 'parent 1-0',
      key     : '1001',
      disabled: true,
      children: [
        { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
        { title: 'leaf 1-0-1', key: '10011', isLeaf: true, checked: true }
      ]
    }, {
      title   : 'parent 1-1',
      key     : '1002',
      children: [
        { title: 'leaf 1-1-0', key: '10020', isLeaf: true }
      ]
    } ]
  } ];

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event, event.selectedKeys, event.keys, event.nodes);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event, event.checkedKeys, event.keys, event.nodes);
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.treeCom.getTreeNodes(), this.treeCom.getCheckedNodeList());
    }, 500);

  }
}
