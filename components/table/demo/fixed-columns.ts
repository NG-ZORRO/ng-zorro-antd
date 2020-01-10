import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-columns',
  template: `
    <nz-table #columnTable [nzData]="listOfData" [nzScroll]="{ x: '1100px' }">
      <thead>
        <tr>
          <th nzWidth="100px" nzLeft="0px">Full Name</th>
          <th nzWidth="100px" nzLeft="100px">Age</th>
          <th nzWidth="100px">Column 1</th>
          <th nzWidth="100px">Column 2</th>
          <th nzWidth="100px">Column 3</th>
          <th nzWidth="100px">Column 4</th>
          <th nzWidth="100px">Column 5</th>
          <th nzWidth="100px">Column 6</th>
          <th nzWidth="100px">Column 7</th>
          <th nzRight="100px" nzWidth="100px">Column 8</th>
          <th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of columnTable.data">
          <td nzLeft="0px">{{ data.name }}</td>
          <td nzLeft="100px">{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td nzRight="100px">{{ data.address }}</td>
          <td nzRight="0px">
            <a>action</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableFixedColumnsComponent {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London'
    }
  ];
}
