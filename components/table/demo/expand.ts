import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-expand',
  template: `
    <nz-table #nzTable [nzData]="listOfData">
      <thead>
        <tr>
          <th nzShowExpand></th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="nzTable.data">
          <tr>
            <td nzShowExpand [(nzExpand)]="mapOfExpandData[data.id]"></td>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
          <tr [nzExpand]="mapOfExpandData[data.id]">
            <td></td>
            <td colspan="3">{{ data.description }}</td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableExpandComponent {
  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
  ];
}
