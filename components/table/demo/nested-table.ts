import { Component, OnInit } from '@angular/core';

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'nz-demo-table-nested-table',
  template: `
    <nz-table #nestedTable [nzData]="listOfParentData" [nzPageSize]="10">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Platform</th>
          <th>Version</th>
          <th>Upgraded</th>
          <th>Creator</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="nestedTable.data">
          <tr>
            <td [(nzExpand)]="data.expand"></td>
            <td>{{ data.name }}</td>
            <td>{{ data.platform }}</td>
            <td>{{ data.version }}</td>
            <td>{{ data.upgradeNum }}</td>
            <td>{{ data.creator }}</td>
            <td>{{ data.createdAt }}</td>
            <td>
              <a>Publish</a>
            </td>
          </tr>
          <tr [nzExpand]="data.expand">
            <nz-table #innerTable [nzData]="listOfChildrenData" nzSize="middle" [nzShowPagination]="false">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Upgrade Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let data of innerTable.data">
                  <td>{{ data.date }}</td>
                  <td>{{ data.name }}</td>
                  <td>
                    <nz-badge [nzStatus]="'success'" [nzText]="'Finished'"></nz-badge>
                  </td>
                  <td>{{ data.upgradeNum }}</td>
                  <td>
                    <span class="table-operation">
                      <a nz-dropdown class="operation" [nzDropdownMenu]="menu"> Pause <i nz-icon nzType="down"></i> </a>
                      <nz-dropdown-menu #menu="nzDropdownMenu">
                        <ul nz-menu>
                          <li nz-menu-item>
                            <a>Action 1</a>
                          </li>
                          <li nz-menu-item>
                            <a>Action 2</a>
                          </li>
                        </ul>
                      </nz-dropdown-menu>
                      <nz-divider nzType="vertical"></nz-divider>
                      <a class="operation">Stop</a>
                      <nz-divider nzType="vertical"></nz-divider>
                      <a>More</a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </nz-table>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableNestedTableComponent implements OnInit {
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
      });
    }
  }
}
