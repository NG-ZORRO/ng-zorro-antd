import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-basic',
  template: `
    <nz-table #basicTable [nzData]="dataSet">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
          <th nz-th>Action</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of basicTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>
            <a>Action 一 {{data.name}}</a>
            <nz-divider nzType="vertical"></nz-divider>
            <a>Delete</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableBasicComponent {
  dataSet = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
