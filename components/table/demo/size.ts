import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-size',
  template: `
    <h4>Middle size table</h4>
    <nz-table
      #middleTable
      nzSize="middle"
      [nzData]="data">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of middleTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>
    <h4>Small size table</h4>
    <nz-table
      #smallTable
      nzSize="small"
      [nzData]="data">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of smallTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles  : [
    `h4 { margin-bottom: 16px; }`
  ]
})
export class NzDemoTableSizeComponent {
  data = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];
}
