import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'nz-demo-table-ellipsis',
  imports: [NzTableModule],
  template: `
    <nz-table #fixedTable [nzData]="listOfData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th nzEllipsis>Column ColumnColumn 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        @for (data of fixedTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td nzEllipsis>{{ data.address }}</td>
            <td nzEllipsis>{{ data.address }}</td>
            <td nzEllipsis>{{ data.address }}</td>
            <td nzEllipsis>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableEllipsisComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }
}
