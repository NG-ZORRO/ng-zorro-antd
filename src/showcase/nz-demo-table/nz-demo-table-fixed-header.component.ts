import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-header',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="50" [nzScroll]="{ y: 240 }">
      <ng-template #nzFixedHeader>
        <thead nz-thead>
          <tr>
            <th nz-th [nzWidth]="'150px'"><span>Name</span></th>
            <th nz-th [nzWidth]="'150px'"><span>Age</span></th>
            <th nz-th><span>Address</span></th>
          </tr>
        </thead>
      </ng-template>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableFixedHeaderComponent implements OnInit {
  data = [];

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }
}

