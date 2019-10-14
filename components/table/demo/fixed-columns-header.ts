import { Component, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-fixed-columns-header',
  template: `
    <nz-table #fixedTable [nzData]="listOfData" [nzScroll]="{ x: '1150px', y: '240px' }">
      <thead>
        <tr>
          <th nzWidth="150px" nzLeft="0px">Full Name</th>
          <th nzWidth="100px" nzLeft="150px">Age</th>
          <th nzWidth="100px">Column 1</th>
          <th nzWidth="100px">Column 2</th>
          <th nzWidth="100px">Column 3</th>
          <th nzWidth="100px">Column 4</th>
          <th nzWidth="100px">Column 5</th>
          <th nzWidth="100px">Column 6</th>
          <th nzWidth="100px">Column 7</th>
          <th nzWidth="100px">Column 8</th>
          <th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of fixedTable.data">
          <td nzLeft="0px">{{ data.name }}</td>
          <td nzLeft="150px">{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td nzRight="0px">
            <a>action</a>
          </td>
        </tr>
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
