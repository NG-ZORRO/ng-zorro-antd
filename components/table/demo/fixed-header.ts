import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-header',
  template: `
    <nz-table #nzTable [nzData]="dataSet" [nzPageSize]="50" [nzScroll]="{ y: '240px' }">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzWidth="150px">Name</th>
          <th nz-th nzWidth="150px">Age</th>
          <th nz-th>Address</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of nzTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableFixedHeaderComponent implements OnInit {
  dataSet = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }
}