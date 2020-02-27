import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-break-word',
  template: `
    <nz-table #fixedTable [nzData]="listOfData" [nzScroll]="{ x: '1150px', y: '240px' }">
      <thead>
        <tr>
          <th nzWidth="150px" nzLeft="0px">Full Name</th>
          <th nzWidth="100px" nzLeft="150px">Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th>Column 8</th>
          <th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of fixedTable.data">
          <td nzBreakWord nzLeft="0px">{{ data.name }}</td>
          <td nzBreakWord nzLeft="150px">{{ data.age }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord>{{ data.address }}</td>
          <td nzBreakWord nzRight="0px">
            <a>action</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableBreakWordComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i} Edward King ${i} Edward King ${i}`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }
}
