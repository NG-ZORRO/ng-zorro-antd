import { Component, OnInit, ViewChild } from '@angular/core';
import { NzGraphComponent, NzGraphData, NzGraphDataDef, NzRankDirection } from 'ng-zorro-antd/graph';

@Component({
  selector: 'nz-demo-graph-customized',
  template: `
    <button nz-button nzType="default" (click)="expandAll()">ExpandAll</button>
    <button nz-button nzType="default" (click)="collapseAll()">CollapseAll</button>
    <button nz-button nzType="primary" (click)="layout()">Layout</button>
    <nz-radio-group [(ngModel)]="rankDirection">
      <label nz-radio-button nzValue="LR">LR</label>
      <label nz-radio-button nzValue="RL">RL</label>
      <label nz-radio-button nzValue="TB">TB</label>
      <label nz-radio-button nzValue="BT">BT</label>
    </nz-radio-group>
    <nz-graph [nzGraphData]="graphData" [nzAutoSize]="true" [nzRankDirection]="rankDirection">
      <ng-container *nzGraphNode="let node">
        <div class="custom-node">
          <div class="header">{{ node.label || node.name }}</div>
        </div>
      </ng-container>
    </nz-graph>
  `,
  styles: [
    `
      nz-radio-group {
        float: right;
      }

      button {
        margin-right: 12px;
      }

      nz-graph {
        height: 400px;
      }

      .custom-node {
        height: 100%;
        min-height: 100px;
        display: block;
      }
    `
  ]
})
export class NzDemoGraphCustomizedComponent implements OnInit {
  @ViewChild(NzGraphComponent, { static: true }) nzGraphComponent!: NzGraphComponent;

  testDef: NzGraphDataDef = {
    nodes: [
      {
        id: '0',
        label: '0'
      },
      {
        id: '1',
        label: '1'
      },
      {
        id: '2',
        label: '2'
      },
      {
        id: '3',
        label: '3'
      },
      {
        id: '4',
        label: '4'
      },
      {
        id: '5',
        label: '5'
      },
      {
        id: '6',
        label: '6'
      },
      {
        id: '7',
        label: '7'
      },
      {
        id: '8',
        label: '8'
      },
      {
        id: '9',
        label: '9'
      },
      {
        id: '10',
        label: '10'
      },
      {
        id: '11',
        label: '11'
      },
      {
        id: '12',
        label: '12'
      },
      {
        id: '13',
        label: '13'
      },
      {
        id: '14',
        label: '14'
      },
      {
        id: '15',
        label: '15'
      }
    ],
    edges: [
      {
        v: '0',
        w: '1'
      },
      {
        v: '0',
        w: '2'
      },
      {
        v: '0',
        w: '3'
      },
      {
        v: '0',
        w: '4'
      },
      {
        v: '0',
        w: '5'
      },
      {
        v: '0',
        w: '7'
      },
      {
        v: '0',
        w: '8'
      },
      {
        v: '0',
        w: '9'
      },
      {
        v: '0',
        w: '10'
      },
      {
        v: '0',
        w: '11'
      },
      {
        v: '0',
        w: '13'
      },
      {
        v: '0',
        w: '14'
      },
      {
        v: '0',
        w: '15'
      },
      {
        v: '2',
        w: '3'
      },
      {
        v: '4',
        w: '5'
      },
      {
        v: '4',
        w: '6'
      },
      {
        v: '5',
        w: '6'
      },
      {
        v: '7',
        w: '13'
      },
      {
        v: '8',
        w: '14'
      },
      {
        v: '9',
        w: '10'
      },
      {
        v: '10',
        w: '12'
      },
      {
        v: '12',
        w: '13'
      }
    ],
    compound: {
      group0: ['4', '5', '15']
    }
  };
  rankDirection: NzRankDirection = 'TB';
  graphData = new NzGraphData(this.testDef);

  constructor() {}

  ngOnInit(): void {}

  expand(name: string): void {
    this.graphData.expand(name);
  }

  collapse(name: string): void {
    this.graphData.collapse(name);
  }

  expandAll(): void {
    this.graphData.expandAll();
  }

  collapseAll(): void {
    this.graphData.collapseAll();
  }

  layout(): void {
    this.nzGraphComponent.autoFit();
  }
}
