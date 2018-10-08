import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-nested-table',
  template: `
    <nz-table #nestedTable [nzData]="nestedTableData" [nzPageSize]="10">
      <thead>
        <tr>
          <th nzShowExpand></th>
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
            <td nzShowExpand [(nzExpand)]="data.expand"></td>
            <td>{{data.name}}</td>
            <td>{{data.platform}}</td>
            <td>{{data.version}}</td>
            <td>{{data.upgradeNum}}</td>
            <td>{{data.creator}}</td>
            <td>{{data.createdAt}}</td>
            <td>
              <a>Publish</a>
            </td>
          </tr>
          <tr [nzExpand]="data.expand">
            <td></td>
            <td colspan="7">
              <nz-table #innerTable [nzData]="innerTableData" nzSize="middle" [nzShowPagination]="false">
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
                    <td>{{data.date}}</td>
                    <td>{{data.name}}</td>
                    <td>
                      <nz-badge [nzStatus]="'success'" [nzText]="'Finished'"></nz-badge>
                    </td>
                    <td>{{data.upgradeNum}}</td>
                    <td>
                      <span class="table-operation">
                        <nz-dropdown>
                          <a nz-dropdown class="operation">
                            Pause <i nz-icon type="down"></i>
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
