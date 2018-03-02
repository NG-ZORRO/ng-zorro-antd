import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-columns',
  template: `
    <nz-table #nzTable [nzData]="dataSet" [nzPageSize]="10" [nzScroll]="{x:'1300px'}">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzWidth="100px" nzLeft="0px">Full Name</th>
          <th nz-th nzWidth="100px" nzLeft="100px">Age</th>
          <th nz-th>Column 1</th>
          <th nz-th>Column 2</th>
          <th nz-th>Column 3</th>
          <th nz-th>Column 4</th>
          <th nz-th>Column 5</th>
          <th nz-th>Column 6</th>
          <th nz-th>Column 7</th>
          <th nz-th>Column 8</th>
          <th nz-th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of nzTable.data">
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
export class NzDemoTableFixedColumnsComponent {
  dataSet = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York Park',
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 40,
      address: 'London Park',
    }
  ];
}
