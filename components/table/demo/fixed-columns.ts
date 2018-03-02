import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-columns',
  template: `
    <nz-table #nzTable [nzData]="dataSet" [nzPageSize]="10" [nzScroll]="{x:'1300px'}">
      <thead>
        <tr>
          <th nzWidth="100px" nzLeft="0px">Full Name</th>
          <th nzWidth="100px" nzLeft="100px">Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th>Column 8</th>
          <th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of nzTable.data">
          <td nzLeft="0px">{{data.name}}</td>
          <td nzLeft="100px">{{data.age}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td>{{data.address}}</td>
          <td nzRight="0px">
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
