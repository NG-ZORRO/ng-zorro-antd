import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-colspan-rowspan',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10" nzBordered>
      <thead nz-thead>
        <tr>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th colspan="2"><span>Home phone</span></th>
          <th nz-th><span>Address</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data; index as i;">
          <td nz-td>
            <a>{{data.name}}</a>
          </td>
          <td nz-td [attr.colspan]="i==4?5:1">{{data.age}}</td>
          <td nz-td [attr.rowspan]="i==2?2:1" *ngIf="(i!=3)&&(i!=4)">{{data.tel}}</td>
          <td nz-td *ngIf="i!=4">{{data.phone}}</td>
          <td nz-td *ngIf="i!=4">{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableColspanRowspanComponent {
  data = [ {
    key    : '1',
    name   : 'John Brown',
    age    : 32,
    tel    : '0571-22098909',
    phone  : 18889898989,
    address: 'New York No. 1 Lake Park',
  }, {
    key    : '2',
    name   : 'Jim Green',
    tel    : '0571-22098333',
    phone  : 18889898888,
    age    : 42,
    address: 'London No. 1 Lake Park',
  }, {
    key    : '3',
    name   : 'Joe Black',
    age    : 32,
    tel    : '0575-22098909',
    phone  : 18900010002,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key    : '4',
    name   : 'Jim Red',
    age    : 18,
    tel    : '0575-22098909',
    phone  : 18900010002,
    address: 'London No. 2 Lake Park',
  }, {
    key    : '5',
    name   : 'Jake White',
    age    : 18,
    tel    : '0575-22098909',
    phone  : 18900010002,
    address: 'Dublin No. 2 Lake Park',
  } ];
}
