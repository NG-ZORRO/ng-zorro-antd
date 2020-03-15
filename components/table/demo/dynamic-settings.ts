import { Component, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

@Component({
  selector: 'nz-demo-table-dynamic-settings',
  template: `
    <div class="components-table-demo-control-bar">
      <form nz-form nzLayout="inline">
        <nz-form-item>
          <nz-form-label><label>Bordered</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="bordered" name="bordered"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Loading</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="loading" name="loading"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Pagination</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="pagination" name="pagination"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>PageSizeChanger</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="sizeChanger" name="sizeChanger"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Title</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="title" name="title"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Column Header</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="header" name="header"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Footer</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="footer" name="footer"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Expandable</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="expandable" name="expandable"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Checkbox</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="checkbox" name="checkbox"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Fixed Header</label></nz-form-label>
          <nz-form-control
            ><nz-switch [(ngModel)]="fixHeader" name="fixHeader" (ngModelChange)="updateScroll()"></nz-switch
          ></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>No Result</label></nz-form-label>
          <nz-form-control
            ><nz-switch [(ngModel)]="noResult" (ngModelChange)="noResultChange($event)" name="noResult"></nz-switch
          ></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Ellipsis</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="ellipsis" name="Ellipsis"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Simple Pagination</label></nz-form-label>
          <nz-form-control><nz-switch [(ngModel)]="simple" name="simple"></nz-switch></nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Size</label></nz-form-label>
          <nz-form-control>
            <nz-radio-group [(ngModel)]="size" name="size">
              <label nz-radio-button nzValue="default">Default</label>
              <label nz-radio-button nzValue="middle">Middle</label>
              <label nz-radio-button nzValue="small">Small</label>
            </nz-radio-group>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Table Scroll</label></nz-form-label>
          <nz-form-control>
            <nz-radio-group [(ngModel)]="tableScroll" name="tableScroll" (ngModelChange)="updateScroll()">
              <label nz-radio-button nzValue="unset">Unset</label>
              <label nz-radio-button nzValue="scroll">Scroll</label>
              <label nz-radio-button nzValue="fixed">Fixed Columns</label>
            </nz-radio-group>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Table Layout</label></nz-form-label>
          <nz-form-control>
            <nz-radio-group [(ngModel)]="tableLayout" name="tableLayout">
              <label nz-radio-button nzValue="auto">Auto</label>
              <label nz-radio-button nzValue="fixed">Fixed</label>
            </nz-radio-group>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label><label>Pagination Position</label></nz-form-label>
          <nz-form-control>
            <nz-radio-group [(ngModel)]="position" name="position">
              <label nz-radio-button nzValue="top">Top</label>
              <label nz-radio-button nzValue="bottom">Bottom</label>
              <label nz-radio-button nzValue="both">Both</label>
            </nz-radio-group>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
    <nz-table
      #dynamicTable
      [nzScroll]="scroll"
      [nzData]="listOfData"
      [nzTableLayout]="tableLayout"
      [nzBordered]="bordered"
      [nzSimple]="simple"
      [nzLoading]="loading"
      [nzPaginationPosition]="position"
      [nzShowSizeChanger]="sizeChanger"
      [nzFrontPagination]="pagination"
      [nzShowPagination]="pagination"
      [nzFooter]="footer ? 'Here is Footer' : null"
      [nzTitle]="title ? 'Here is Title' : null"
      [nzSize]="size"
      (nzCurrentPageDataChange)="currentPageDataChange($event)"
    >
      <thead>
        <tr *ngIf="header">
          <th nzShowExpand *ngIf="expandable" [nzLeft]="fixedColumn"></th>
          <th
            nzShowCheckbox
            *ngIf="checkbox"
            [(nzChecked)]="allChecked"
            [nzLeft]="fixedColumn"
            [nzIndeterminate]="indeterminate"
            (nzCheckedChange)="checkAll($event)"
          ></th>
          <th [nzLeft]="fixedColumn">Name</th>
          <th>Age</th>
          <th>Address</th>
          <th [nzRight]="fixedColumn">Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let data of dynamicTable.data">
          <tr>
            <td [nzLeft]="fixedColumn" nzShowExpand *ngIf="expandable" [(nzExpand)]="data.expand"></td>
            <td
              [nzLeft]="fixedColumn"
              nzShowCheckbox
              *ngIf="checkbox"
              [(nzChecked)]="data.checked"
              (nzCheckedChange)="refreshStatus()"
            ></td>
            <td [nzLeft]="fixedColumn">{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td [nzEllipsis]="ellipsis">{{ data.address }}</td>
            <td [nzRight]="fixedColumn" [nzEllipsis]="ellipsis">
              <a href="#">Delete</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a href="#">More action</a>
            </td>
          </tr>
          <tr [nzExpand]="data.expand && expandable">
            {{
              data.description
            }}
          </tr>
        </ng-container>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      form nz-form-item {
        margin-right: 16px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTableDynamicSettingsComponent implements OnInit {
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  tableScroll = 'unset';
  bordered = false;
  ellipsis = false;
  tableLayout = 'auto';
  loading = false;
  sizeChanger = false;
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
  simple = false;
  noResult = false;
  fixedColumn = false;
  position = 'bottom';
  scroll: { x: string | null; y: string | null } = { x: null, y: null };
  updateScroll(): void {
    this.fixedColumn = this.tableScroll === 'fixed';
    this.scroll = { y: this.fixHeader ? '240px' : null, x: this.tableScroll === 'scroll' || this.fixedColumn ? '100vw' : null };
  }

  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
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
    for (let i = 1; i <= 100; i++) {
      this.listOfData.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
  }

  noResultChange(status: boolean): void {
    this.listOfData = [];
    if (!status) {
      this.ngOnInit();
    }
  }
}
