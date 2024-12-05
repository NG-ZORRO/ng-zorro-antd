import { Component } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'nz-demo-table-bordered',
  imports: [NzTableModule],
  template: `
    <nz-table #borderedTable nzBordered nzFooter="Footer" nzTitle="Header" [nzData]="dataSet">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of borderedTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>

    <nz-table #outBordered nzOuterBordered nzFooter="Footer" nzTitle="Header" [nzData]="dataSet">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of outBordered.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableBorderedComponent {
  dataSet = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
