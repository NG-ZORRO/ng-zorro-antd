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
            <nz-switch [(ngModel)]="bordered" name="bordered"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Loading</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="loading" name="loading"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Pagination</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="pagination" name="pagination"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Title</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="title" name="title"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Column Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="header" name="header"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Footer</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="footer" name="footer"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Expandable</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="expandable" name="expandable"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Checkbox</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="checkbox" name="checkbox"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Fixed Header</label>
          </div>
          <div nz-form-control>
            <nz-switch [(ngModel)]="fixHeader" name="fixHeader"></nz-switch>
          </div>
        </div>
        <div nz-row nz-form-item>
          <div nz-form-label>
            <label>Size</label>
          </div>
          <div nz-form-control>
            <nz-radio-group [(ngModel)]="size" name="size">
              <label nz-radio-button nzValue="default">Default</label>
              <label nz-radio-button nzValue="middle">Middle</label>
              <label nz-radio-button nzValue="small">Small</label>
            </nz-radio-group>
          </div>
        </div>
      </form>
    </div>
    <nz-table
      #dynamicTable
      (nzCurrentPageDataChange)="currentPageDataChange($event)"
      [nzScroll]="fixHeader?{ y: '240px' }:null"
      [nzData]="dataSet"
      [nzBordered]="bordered"
      [nzLoading]="loading"
      [nzFrontPagination]="pagination"
      [nzShowPagination]="pagination"
      [nzFooter]="footer?'Here is Footer':null"
      [nzTitle]="title?'Here is Title':null"
      [nzSize]="size">
      <thead *ngIf="header">
        <tr>
          <th nzWidth="50px" nzShowExpand *ngIf="expandable"></th>
          <th nzWidth="62px" nzShowCheckbox *ngIf="checkbox" [(nzChecked)]="allChecked" [nzIndeterminate]="indeterminate" (nzCheckedChange)="checkAll($event)"></th>
          <th nzWidth="150px">Name</th>
          <th nzWidth="70px">Age</th>
          <th>Address</th>
          <th nzWidth="260px">Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="dynamicTable.data">
          <tr>
            <td nzShowExpand *ngIf="expandable" [(nzExpand)]="data.expand"></td>
            <td nzShowCheckbox *ngIf="checkbox" [(nzChecked)]="data.checked" (nzCheckedChange)="refreshStatus($event)"></td>
            <td>{{data.name}}</td>
            <td>{{data.age}}</td>
            <td>{{data.address}}</td>
            <td>
              <a href="#">Action 一 {{data.name}}</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a href="#">Delete</a>
            </td>
          </tr>
          <tr [nzExpand]="data.expand&&expandable">
            <td></td>
            <td [attr.colspan]="checkbox?5:4">{{data.description}}</td>
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

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; expand: boolean; description: string; }>): void {
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
    for (let i = 1; i <= 20; i++) {
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
