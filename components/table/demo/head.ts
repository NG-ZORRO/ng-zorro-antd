import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-head',
  template: `
    <nz-table #filterTable [nzDataSource]="displayData">
      <thead>
        <tr>
          <th [(nzSort)]="sortMap.name" (nzSortChange)="sort('name',$event)" [nzFilters]="filterNameList" (nzOnFilter)="search($event,searchAddress)">Name</th>
          <th [(nzSort)]="sortMap.age" (nzSortChange)="sort('age',$event)">Age</th>
          <th [(nzSort)]="sortMap.address" [nzFilterMultiple]="false" (nzSortChange)="sort('address',$event)" [nzFilters]="filterAddressList" (nzOnFilter)="search(searchNameList,$event)">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`
})
export class NzDemoTableHeadComponent {
  searchNameList = [];
  searchAddress;
  filterNameList = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  filterAddressList = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  sortMap = {
    name   : null,
    age    : null,
    address: null
  };
  sortName = null;
  sortValue = null;

  data = [
    {
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [ ...this.data ];

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search(this.searchNameList, this.searchAddress);
  }

  search(searchNameList: string[], searchAddress: string): void {
    this.searchNameList = searchNameList;
    this.searchAddress = searchAddress;
    const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.searchNameList.length ? this.searchNameList.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    if (this.sortName) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
}
