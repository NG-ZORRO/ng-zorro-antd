import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-fixed-columns',
  template: `
    <nz-table #columnTable [nzData]="listOfData" [nzScroll]="{ x: '1100px' }">
      <thead>
        <tr>
          <th nzLeft>Full Name</th>
          <th nzLeft>Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th nzRight>Column 8</th>
          <th nzRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of columnTable.data">
          <td nzLeft>{{ data.name }}</td>
          <td nzLeft>{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td nzRight>{{ data.address }}</td>
          <td nzRight>
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
