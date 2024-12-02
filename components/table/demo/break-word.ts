import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'nz-demo-table-break-word',
  imports: [NzTableModule],
  template: `
    <nz-table #fixedTable [nzData]="listOfData" [nzScroll]="{ x: '1000px', y: '240px' }">
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
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzBreakWord>{{ data.address }}</td>
            <td nzRight>
              <a>action</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableBreakWordComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }
}
