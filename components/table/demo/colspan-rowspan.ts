import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-colspan-rowspan',
  template: `
    <nz-table #colSpanTable [nzData]="listOfData" nzBordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th colspan="2">Home phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of colSpanTable.data; index as i">
          <td>{{ data.name }}</td>
          <td [attr.colspan]="i === 4 ? 5 : 1">{{ data.age }}</td>
          <td [attr.rowspan]="i === 2 ? 2 : 1" *ngIf="i !== 3 && i !== 4">{{ data.tel }}</td>
          <td *ngIf="i !== 4">{{ data.phone }}</td>
          <td *ngIf="i !== 4">{{ data.address }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableColspanRowspanComponent {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park'
    }
  ];
}
