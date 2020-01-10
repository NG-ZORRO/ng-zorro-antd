import { Component, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-fixed-header',
  template: `
    <nz-table #headerTable [nzData]="listOfData" [nzPageSize]="50" [nzScroll]="{ y: '240px' }">
      <thead>
        <tr>
          <th nzWidth="150px">Name</th>
          <th nzWidth="150px">Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of headerTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableFixedHeaderComponent implements OnInit {
  listOfData: ItemData[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }
}
