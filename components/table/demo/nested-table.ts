import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-nested-table',
  template: `
    <nz-table #nestedTable [nzData]="nestedTableData" [nzPageSize]="10">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzShowExpand></th>
          <th nz-th>Name</th>
          <th nz-th>Platform</th>
          <th nz-th>Version</th>
          <th nz-th>Upgraded</th>
          <th nz-th>Creator</th>
          <th nz-th>Date</th>
          <th nz-th>Action</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <ng-template ngFor let-data [ngForOf]="nestedTable.data">
          <tr nz-tr>
            <td nz-td nzShowExpand [(nzExpand)]="data.expand"></td>
            <td nz-td>{{data.name}}</td>
            <td nz-td>{{data.platform}}</td>
            <td nz-td>{{data.version}}</td>
            <td nz-td>{{data.upgradeNum}}</td>
            <td nz-td>{{data.creator}}</td>
            <td nz-td>{{data.createdAt}}</td>
            <td nz-td>
              <a>Publish</a>
            </td>
          </tr>
          <tr nz-tr [nzExpand]="data.expand">
            <td nz-td></td>
            <td nz-td colspan="7">
              <nz-table #innerTable [nzData]="innerTableData" nzSize="middle" [nzIsPagination]="false">
                <thead nz-thead>
                  <tr nz-tr>
                    <th nz-th>Date</th>
                    <th nz-th>Name</th>
                    <th nz-th>Status</th>
                    <th nz-th>Upgrade Status</th>
                    <th nz-th>Action</th>
                  </tr>
                </thead>
                <tbody nz-tbody>
                  <tr nz-tr *ngFor="let data of innerTable.data">
                    <td nz-td>{{data.date}}</td>
                    <td nz-td>{{data.name}}</td>
                    <td nz-td>
                      <nz-badge [nzStatus]="'success'" [nzText]="'Finished'"></nz-badge>
                    </td>
                    <td nz-td>{{data.upgradeNum}}</td>
                    <td nz-td>
                      <span class="table-operation">
                        <nz-dropdown>
                          <a nz-dropdown class="operation">
                            Pause <i class="anticon anticon-down"></i>
                          </a>
                          <ul nz-menu>
                            <li nz-menu-item>
                              <a>Action 1</a>
                            </li>
                            <li nz-menu-item>
                              <a>Action 2</a>
                            </li>
                          </ul>
                        </nz-dropdown>
                        <a class="operation">Stop</a>
                        <a>More</a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </nz-table>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
  `,
  styles  : [
      `

      :host ::ng-deep .ant-table-expanded-row > td:last-child {
        padding: 0 48px 0 8px;
      }

      :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-thead th {
        border-bottom: 1px solid #e9e9e9;
      }

      :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-thead th:first-child {
        padding-left: 0;
      }

      :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-row td:first-child {
        padding-left: 0;
      }

      :host ::ng-deep .ant-table-expanded-row .ant-table-row:last-child td {
        border: none;
      }

      :host ::ng-deep .ant-table-expanded-row .ant-table-thead > tr > th {
        background: none;
      }

      :host ::ng-deep .table-operation a.operation {
        margin-right: 24px;
      }
    `
  ]
})
export class NzDemoTableNestedTableComponent implements OnInit {
  nestedTableData = [];
  innerTableData = [];

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.nestedTableData.push({
        key       : i,
        name      : 'Screem',
        platform  : 'iOS',
        version   : '10.3.4.5654',
        upgradeNum: 500,
        creator   : 'Jack',
        createdAt : '2014-12-24 23:12:00',
        expand    : false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.innerTableData.push({
        key       : i,
        date      : '2014-12-24 23:12:00',
        name      : 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
  }
}
