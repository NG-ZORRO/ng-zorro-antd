import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  NzTableLayout,
  NzTableModule,
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize
} from 'ng-zorro-antd/table';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

type TableScroll = 'unset' | 'scroll' | 'fixed';

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
  size: NzTableSize;
  tableScroll: TableScroll;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
  paginationType: NzTablePaginationType;
}

@Component({
  selector: 'nz-demo-table-dynamic-settings',
  imports: [ReactiveFormsModule, NzDividerModule, NzFormModule, NzRadioModule, NzSwitchModule, NzTableModule],
  template: `
    <div class="components-table-demo-control-bar">
      <form nz-form nzLayout="inline" [formGroup]="settingForm">
        @for (item of listOfSwitch; track item) {
          <nz-form-item>
            <nz-form-label>{{ item.name }}</nz-form-label>
            <nz-form-control>
              <nz-switch [formControlName]="item.formControlName"></nz-switch>
            </nz-form-control>
          </nz-form-item>
        }
        @for (radio of listOfRadio; track radio) {
          <nz-form-item>
            <nz-form-label>{{ radio.name }}</nz-form-label>
            <nz-form-control>
              <nz-radio-group [formControlName]="radio.formControlName">
                @for (o of radio.listOfOption; track o) {
                  <label nz-radio-button [nzValue]="o.value">{{ o.label }}</label>
                }
              </nz-radio-group>
            </nz-form-control>
          </nz-form-item>
        }
      </form>
    </div>
    <nz-table
      #dynamicTable
      [nzScroll]="{ x: scrollX, y: scrollY }"
      [nzData]="listOfData"
      [nzTableLayout]="settingValue.tableLayout"
      [nzBordered]="settingValue.bordered"
      [nzSimple]="settingValue.simple"
      [nzLoading]="settingValue.loading"
      [nzPaginationType]="settingValue.paginationType"
      [nzPaginationPosition]="settingValue.position"
      [nzShowSizeChanger]="settingValue.sizeChanger"
      [nzFrontPagination]="settingValue.pagination"
      [nzShowPagination]="settingValue.pagination"
      [nzFooter]="settingValue.footer ? 'Here is Footer' : null"
      [nzTitle]="settingValue.title ? 'Here is Title' : null"
      [nzSize]="settingValue.size"
      (nzCurrentPageDataChange)="currentPageDataChange($event)"
    >
      <thead>
        @if (settingValue.header) {
          <tr>
            @if (settingValue.expandable) {
              <th nzWidth="40px" [nzLeft]="fixedColumn"></th>
            }
            @if (settingValue.checkbox) {
              <th
                nzWidth="60px"
                [(nzChecked)]="allChecked"
                [nzLeft]="fixedColumn"
                [nzIndeterminate]="indeterminate"
                (nzCheckedChange)="checkAll($event)"
              ></th>
            }
            <th [nzLeft]="fixedColumn">Name</th>
            <th>Age</th>
            <th>Address</th>
            <th [nzRight]="fixedColumn">Action</th>
          </tr>
        }
      </thead>
      <tbody>
        @for (data of dynamicTable.data; track data) {
          <tr>
            @if (settingValue.expandable) {
              <td [nzLeft]="fixedColumn" [(nzExpand)]="data.expand"></td>
            }
            @if (settingValue.checkbox) {
              <td [nzLeft]="fixedColumn" [(nzChecked)]="data.checked" (nzCheckedChange)="refreshStatus()"></td>
            }
            <td [nzLeft]="fixedColumn">{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td [nzEllipsis]="settingValue.ellipsis">{{ data.address }}</td>
            <td [nzRight]="fixedColumn" [nzEllipsis]="settingValue.ellipsis">
              <a href="#">Delete</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a href="#">More action</a>
            </td>
          </tr>
          @if (settingValue.expandable) {
            <tr [nzExpand]="data.expand">
              <span>{{ data.description }}</span>
            </tr>
          }
        }
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
  settingForm: FormGroup<{ [K in keyof Setting]: FormControl<Setting[K]> }>;
  listOfData: readonly ItemData[] = [];
  displayData: readonly ItemData[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue: Setting;
  listOfSwitch = [
    { name: 'Bordered', formControlName: 'bordered' },
    { name: 'Loading', formControlName: 'loading' },
    { name: 'Pagination', formControlName: 'pagination' },
    { name: 'PageSizeChanger', formControlName: 'sizeChanger' },
    { name: 'Title', formControlName: 'title' },
    { name: 'Column Header', formControlName: 'header' },
    { name: 'Footer', formControlName: 'footer' },
    { name: 'Expandable', formControlName: 'expandable' },
    { name: 'Checkbox', formControlName: 'checkbox' },
    { name: 'Fixed Header', formControlName: 'fixHeader' },
    { name: 'No Result', formControlName: 'noResult' },
    { name: 'Ellipsis', formControlName: 'ellipsis' },
    { name: 'Simple Pagination', formControlName: 'simple' }
  ];
  listOfRadio = [
    {
      name: 'Size',
      formControlName: 'size',
      listOfOption: [
        { value: 'default', label: 'Default' },
        { value: 'middle', label: 'Middle' },
        { value: 'small', label: 'Small' }
      ]
    },
    {
      name: 'Table Scroll',
      formControlName: 'tableScroll',
      listOfOption: [
        { value: 'unset', label: 'Unset' },
        { value: 'scroll', label: 'Scroll' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Table Layout',
      formControlName: 'tableLayout',
      listOfOption: [
        { value: 'auto', label: 'Auto' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Pagination Position',
      formControlName: 'position',
      listOfOption: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'both', label: 'Both' }
      ]
    },
    {
      name: 'Pagination Type',
      formControlName: 'paginationType',
      listOfOption: [
        { value: 'default', label: 'Default' },
        { value: 'small', label: 'Small' }
      ]
    }
  ];

  currentPageDataChange($event: readonly ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked);
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

  generateData(): readonly ItemData[] {
    const data: ItemData[] = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }

  constructor(private formBuilder: NonNullableFormBuilder) {
    this.settingForm = this.formBuilder.group({
      bordered: [false],
      loading: [false],
      pagination: [true],
      sizeChanger: [false],
      title: [true],
      header: [true],
      footer: [true],
      expandable: [true],
      checkbox: [true],
      fixHeader: [false],
      noResult: [false],
      ellipsis: [false],
      simple: [false],
      size: 'small' as NzTableSize,
      paginationType: 'default' as NzTablePaginationType,
      tableScroll: 'unset' as TableScroll,
      tableLayout: 'auto' as NzTableLayout,
      position: 'bottom' as NzTablePaginationPosition
    });

    this.settingValue = this.settingForm.value as Setting;
  }

  ngOnInit(): void {
    this.settingForm.valueChanges.subscribe(value => {
      this.settingValue = value as Setting;
    });
    this.settingForm.controls.tableScroll.valueChanges.subscribe(scroll => {
      this.fixedColumn = scroll === 'fixed';
      this.scrollX = scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
    });
    this.settingForm.controls.fixHeader.valueChanges.subscribe(fixed => {
      this.scrollY = fixed ? '240px' : null;
    });
    this.settingForm.controls.noResult.valueChanges.subscribe(empty => {
      if (empty) {
        this.listOfData = [];
      } else {
        this.listOfData = this.generateData();
      }
    });
    this.listOfData = this.generateData();
  }
}
