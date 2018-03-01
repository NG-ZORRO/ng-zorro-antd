import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-dynamic-settings',
  template: `
    <div class="components-table-demo-control-bar">
      <form nz-form [nzLayout]="'inline'">
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Bordered</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="bordered" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Loading</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="loading" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Pagination</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="pagination" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Title</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="title" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Column Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="header" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Footer</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="footer" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Expandable</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="expandable" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Checkbox</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="checkbox" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Fixed Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="fixHeader" [ngModelOptions]="{standalone: true}"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Size</label>
          </div>
          <div nz-form-control>
            <nz-radio-group [(ngModel)]="size" [ngModelOptions]="{standalone: true}">
              <label nz-radio-button [nzValue]="'default'">
                Default
              </label>
              <label nz-radio-button [nzValue]="'middle'">
                Middle
              </label>
              <label nz-radio-button [nzValue]="'small'">
                Small
              </label>
            </nz-radio-group>
          </div>
        </div>
      </form>
    </div>
    <nz-table
      #dynamicTable
      (nzDataChange)="displayDataChange($event)"
      [nzScroll]="fixHeader?{ y: '240px' }:null"
      [nzDataSource]="dataSet"
      [nzPageSize]="10"
      [nzBordered]="bordered"
      [nzLoading]="loading"
      [nzIsPagination]="pagination"
      [nzFooter]="footer?'Here is Footer':null"
      [nzTitle]="title?'Here is Title':null"
      [nzSize]="size">
      <ng-template #nzFixedHeader [ngIf]="header&&!fixHeader">
        <thead>
          <tr>
            <th nzExpand *ngIf="expandable"></th>
            <th nzCheckbox *ngIf="checkbox">
              <label nz-checkbox
                [(ngModel)]="allChecked"
                [nzIndeterminate]="indeterminate"
                (ngModelChange)="checkAll($event)">
              </label>
            </th>
            <th [nzWidth]="'150px'">Name</th>
            <th [nzWidth]="'70px'">Age</th>
            <th>Address</th>
            <th [nzWidth]="'360px'">Action</th>
          </tr>
        </thead>
      </ng-template>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="dynamicTable.data">
          <tr>
            <td nzExpand *ngIf="expandable">
              <nz-row-expand-icon [(nzExpand)]="data.expand"></nz-row-expand-icon>
            </td>
            <td nzCheckbox *ngIf="checkbox">
              <label nz-checkbox
                [(ngModel)]="data.checked"
                (ngModelChange)="refreshStatus($event)">
              </label>
            </td>
            <td>{{data.name}}</td>
            <td>{{data.age}}</td>
            <td>{{data.address}}</td>
            <td>

              <a href="#">Action 一 {{data.name}}</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a href="#">Delete</a>
              <nz-divider nzType="vertical"></nz-divider>
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

            </td>
          </tr>
          <tr *ngIf="data.expand" nzExpand>
            <td></td>
            <td [attr.colspan]="checkbox?5:4">
              {{data.description}}
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>`,
  styles  : [
      `
      .components-table-demo-control-bar {
        margin-bottom: 10px;
      }

      .components-table-demo-control-bar ::ng-deep .ant-form-item {
        margin-right: 15px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTableDynamicSettingsComponent implements OnInit {
  dataSet = [];
  bordered = false;
  loading = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  fixHeader = false;
  size = 'small';
  expandable = true;
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  displayData = [];

  displayDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; expand: boolean; description: string; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.dataSet.push({
        name       : 'John Brown',
        age        : `${i}2`,
        address    : `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked    : false,
        expand     : false
      });
    }
  }
}
