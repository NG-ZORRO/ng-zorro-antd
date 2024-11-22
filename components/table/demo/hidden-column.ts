import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzHiddenColumn, NzTableModule } from 'ng-zorro-antd/table';

interface Person {
  key: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-custom-column',
  standalone: true,
  imports: [NzCheckboxModule, NzTableModule, FormsModule],
  template: `
    <nz-table #basicTable [nzData]="listOfData" [nzTitle]="tableTitle" [nzCustomColumn]="customColumn">
      <thead>
        <tr>
          <th nzCellControl="name">Name</th>
          <th nzCellControl="gender">Gender</th>
          <th nzCellControl="age">Age</th>
          <th nzCellControl="address">Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of basicTable.data; track data) {
          <tr>
            <td nzCellControl="name">{{ data.name }}</td>
            <td nzCellControl="gender">{{ data.gender }}</td>
            <td nzCellControl="age">{{ data.age }}</td>
            <td nzCellControl="address">{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    <ng-template #tableTitle>
      <label nz-checkbox [(ngModel)]="checked" (ngModelChange)="onCheckedChange()">Hide age column</label>
    </ng-template>
  `
})
export class NzDemoTableCustomColumnComponent {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      gender: 'female',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      gender: 'female',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      gender: 'male',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  checked = false;
  customColumn: NzHiddenColumn[] = [];

  constructor() {}

  onCheckedChange(): void {
    if (this.checked) {
      this.customColumn = [
        {
          value: 'age',
          hidden: true
        }
      ];
    } else {
      this.customColumn = [];
    }
  }
}
