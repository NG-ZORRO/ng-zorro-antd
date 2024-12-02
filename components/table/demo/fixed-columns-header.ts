import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-fixed-columns-header',
  imports: [NzTableModule],
  template: `
    <nz-table #fixedTable [nzData]="listOfData" [nzScroll]="{ x: '1150px', y: '240px' }">
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
          <th>Column 8</th>
          <th nzRight>Action</th>
        </tr>
      </thead>
      <tbody>
        @for (data of fixedTable.data; track data) {
          <tr>
            <td nzLeft>{{ data.name }}</td>
            <td nzLeft>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td nzRight>
              <a>action</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableFixedColumnsHeaderComponent implements OnInit {
  listOfData: ItemData[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London`
      });
    }
  }
}
