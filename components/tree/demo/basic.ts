import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-basic',
  template: `
    <nz-tree
      #treeCom
      [nzData]="nodes"
      nzCheckable
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      (nzClick)="nzClick($event)"
      (nzCheckBoxChange)="nzCheck($event)"
      (nzExpandChange)="nzCheck($event)"
    >
    </nz-tree>
  `
})
<<<<<<< HEAD
export class NzDemoTreeBasicComponent implements OnInit {
=======

export class NzDemoTreeBasicComponent implements OnInit, AfterViewInit {
>>>>>>> fix(module: tree): fix treeService error and code merge
  @ViewChild('treeCom') treeCom: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

<<<<<<< HEAD
  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
            { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
          ]
        }
      ]
    }
  ];
=======
  nodes: NzTreeNode[] = [];
>>>>>>> fix(module: tree): fix treeService error and code merge

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.treeCom.getSelectedNodeList());
  }

  ngOnInit(): void {
    this.nodes = [ {
      title   : 'parent 1',
      key     : '100',
      children: [ {
        title   : 'parent 1-0',
        key     : '1001',
        disabled: true,
        children: [
          { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
          { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
        ]
      }, {
        title   : 'parent 1-1',
        key     : '1002',
        children: [
          { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
          { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
        ]
      } ]
    } ].map(v => (new NzTreeNode(v)));
    setTimeout(()=>{
      this.nodes[ 0 ].isSelected = true;
    });

    setTimeout(() => {
      console.log(this.treeCom.getTreeNodeByKey('10011'), 'get nzTreeNode with key');
      console.log(
        this.treeCom.getTreeNodes(),
        this.treeCom.getCheckedNodeList(),
        this.treeCom.getSelectedNodeList(),
        this.treeCom.getExpandedNodeList()
      );
    }, 1500);
  }

  ngAfterViewInit(): void {
  }
}
