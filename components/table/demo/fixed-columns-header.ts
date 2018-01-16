import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-columns-header',
  template: `
    <nz-table #nzTable [nzDataSource]="dataSet" [nzPageSize]="10" [nzScroll]="{ x:'1300px',y: '240px' }">
      <ng-template #nzFixedHeader>
        <thead nz-thead>
          <tr>
            <th nz-th nzWidth="100px" nzLeft="0px"><span>Full Name</span></th>
            <th nz-th nzWidth="100px" nzLeft="100px"><span>Age</span></th>
            <th nz-th><span>Column 1</span></th>
            <th nz-th><span>Column 2</span></th>
            <th nz-th><span>Column 3</span></th>
            <th nz-th><span>Column 4</span></th>
            <th nz-th><span>Column 5</span></th>
            <th nz-th><span>Column 6</span></th>
            <th nz-th><span>Column 7</span></th>
            <th nz-th><span>Column 8</span></th>
            <th nz-th nzWidth="100px" nzRight="0px"><span>Action</span></th>
          </tr>
        </thead>
      </ng-template>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td nzLeft="0px">{{data.name}}</td>
          <td nz-td nzLeft="100px">{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td nzRight="0px">
            <a>action</a>
          </td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableFixedColumnsHeaderComponent implements OnInit {
  dataSet = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }
}

