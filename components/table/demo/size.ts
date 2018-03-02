import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-size',
  template: `
    <h4>Middle size table</h4>
    <nz-table
      #middleTable
      nzSize="middle"
      [nzDataSource]="data">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of middleTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>
    <h4>Small size table</h4>
    <nz-table
      #smallTable
      nzSize="small"
      [nzDataSource]="data">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of smallTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
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
