import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-expand',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th nzExpand></th>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
          <th nz-th><span>Action</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <ng-template ngFor let-data [ngForOf]="nzTable.data">
          <tr nz-tbody-tr>
            <td nz-td nzExpand>
              <nz-row-expand-icon [(nzExpand)]="data.expand"></nz-row-expand-icon>
            </td>
            <td nz-td>{{data.name}}</td>
            <td nz-td>{{data.age}}</td>
            <td nz-td>{{data.address}}</td>
            <td nz-td>
            <span>
              <a href="#">Delete</a>
            </span>
            </td>
          </tr>
          <tr nz-tbody-tr *ngIf="data.expand">
            <td nz-td></td>
            <td nz-td colspan="4">
              {{data.description}}
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableExpandComponent {
  data = [
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
    },
  ];
}
