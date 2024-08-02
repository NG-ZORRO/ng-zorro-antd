import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-safe-null',
  template: `
    <nz-table #basicTable [nzData]="listOfData">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of basicTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address | nzSafeNull: '-' }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoPipesSafeNullComponent {
  listOfData = [
    {
      name: 'John Brown',
      age: 32
    },
    {
      name: 'Jim Green',
      age: 42
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
