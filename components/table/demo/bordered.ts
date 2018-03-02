import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-bordered',
  template: `
    <nz-table
      #borderedTable
      nzBordered
      nzFooter="Footer"
      nzTitle="Header"
      [nzData]="dataSet">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of borderedTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableBorderedComponent {
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
