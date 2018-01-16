import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-bordered',
  template: `
    <nz-table
      #borderedTable
      nzBordered
      nzShowFooter
      nzShowTitle
      [nzDataSource]="dataSet"
      [nzPageSize]="10">
      <span nz-table-title>Header</span>
      <thead nz-thead>
        <tr>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of borderedTable.data">
          <td nz-td>
            <a>{{data.name}}</a>
          </td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
      <span nz-table-footer>Footer</span>
    </nz-table>
  `,
  styles  : []
})
export class NzDemoTableBorderedComponent {
  dataSet = [
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
