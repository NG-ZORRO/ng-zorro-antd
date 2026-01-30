import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';

interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'nz-demo-table-custom-filter-panel',
  imports: [FormsModule, NzButtonModule, NzDropdownModule, NzIconModule, NzInputModule, NzTableModule],
  template: `
    <nz-table #nzTable [nzData]="listOfDisplayData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th nzCustomFilter>
            Name
            <nz-filter-trigger [(nzVisible)]="visible" [nzActive]="searchValue.length > 0" [nzDropdownMenu]="menu">
              <nz-icon nzType="search" />
            </nz-filter-trigger>
          </th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of nzTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <div class="search-box">
          <input type="text" nz-input placeholder="Search name" [(ngModel)]="searchValue" />
          <button nz-button nzSize="small" nzType="primary" (click)="search()" class="search-button">Search</button>
          <button nz-button nzSize="small" (click)="reset()">Reset</button>
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  styles: `
    .search-box {
      padding: 8px;
    }

    .search-box input {
      width: 188px;
      margin-bottom: 8px;
      display: block;
    }

    .search-box button {
      width: 90px;
    }

    .search-button {
      margin-right: 8px;
    }
  `
})
export class NzDemoTableCustomFilterPanelComponent {
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
}
