import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-size',
  template: `
    <div class="components-table-demo-control-bar">
      <form nz-form [nzLayout]="'inline'">
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Bordered</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_bordered" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Loading</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_loading" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Pagination</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_pagination" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Title</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_title" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Column Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_header" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Footer</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_footer" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Fixed Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="_fixHeader" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Size</label>
          </div>
          <div nz-form-control>
            <nz-radio-group [(ngModel)]="_size" [ngModelOptions]="{standalone: true}">
              <label nz-radio-button [nzValue]="'default'">
                <span>Default</span>
              </label>
              <label nz-radio-button [nzValue]="'middle'">
                <span>Middle</span>
              </label>
              <label nz-radio-button [nzValue]="'small'">
                <span>Small</span>
              </label>
            </nz-radio-group>
          </div>
        </div>
      </form>
    </div>
    <nz-table
      #nzTable
      [nzScroll]="_fixHeader?{ y: 240 }:null"
      [nzDataSource]="_dataSet"
      [nzPageSize]="10"
      [nzBordered]="_bordered"
      [nzLoading]="_loading"
      [nzIsPagination]="_pagination"
      [nzShowFooter]="_footer"
      [nzShowTitle]="_title"
      [nzSize]="_size">
      <span nz-table-title>Here is Title</span>
      <ng-template #nzFixedHeader [ngIf]="_header&&!_fixHeader">
        <thead nz-thead>
          <tr>
            <th nz-th [nzWidth]="'150px'"><span>Name</span></th>
            <th nz-th [nzWidth]="'70px'"><span>Age</span></th>
            <th nz-th [nzWidth]="'360px'"><span>Address</span></th>
            <th nz-th><span>Action</span></th>
          </tr>
        </thead>
      </ng-template>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>
            <span>
              <a href="#">Action 一 {{data.name}}</a>
              <span nz-table-divider></span>
              <a href="#">Delete</a>
              <span nz-table-divider></span>
              <nz-dropdown>
                <a class="ant-dropdown-link" nz-dropdown>
                  More actions <i class="anticon anticon-down"></i>
                </a>
                <ul nz-menu>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item</a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item</a>
                  </li>
                </ul>
              </nz-dropdown>
            </span>
          </td>
        </tr>
      </tbody>
      <span nz-table-footer>Here is footer</span>
    </nz-table>`,
  styles  : [
      `
      .components-table-demo-control-bar {
        margin-bottom: 10px;
      }

      .components-table-demo-control-bar ::ng-deep .ant-form-item {
        margin-right: 16px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTableSizeComponent implements OnInit {
  _dataSet = [];
  _bordered = true;
  _loading = false;
  _pagination = true;
  _header = true;
  _title = true;
  _footer = true;
  _fixHeader = false;
  _size = 'small';

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this._dataSet.push({
        key        : i,
        name       : 'John Brown',
        age        : `${i}2`,
        address    : `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      });
    }
  }
}

