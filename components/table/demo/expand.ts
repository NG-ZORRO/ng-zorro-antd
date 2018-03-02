import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-expand',
  template: `
    <nz-table #nzTable [nzData]="dataSet" [nzPageSize]="10">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzShowExpand></th>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
          <th nz-th>Action</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <ng-template ngFor let-data [ngForOf]="nzTable.data">
          <tr nz-tr>
            <td nz-td nzShowExpand [(nzExpand)]="data.expand"></td>
            <td nz-td>{{data.name}}</td>
            <td nz-td>{{data.age}}</td>
            <td nz-td>{{data.address}}</td>
            <td nz-td><a href="#">Delete</a></td>
          </tr>
          <tr nz-tr [nzExpand]="data.expand">
            <td nz-td></td>
            <td nz-td colspan="4">{{data.description}}</td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableExpandComponent {
  dataSet = [
    {
      name       : 'John Brown',
      age        : 32,
      expand     : false,
      address    : 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      name       : 'Jim Green',
      age        : 42,
      expand     : false,
      address    : 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      name       : 'Joe Black',
      age        : 32,
      expand     : false,
      address    : 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
  ];
}
