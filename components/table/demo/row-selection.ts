import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-row-selection',
  template: `
    <nz-table
      #rowSelectionTable
      [nzDataSource]="data"
      [nzPageSize]="10"
      (nzDataChange)="displayDataChange($event)"
      (nzPageIndexChange)="refreshStatus()"
      (nzPageSizeChange)="refreshStatus()">
      <thead nz-thead>
        <tr>
          <th nz-th nzCheckbox>
            <label nz-checkbox
              [(ngModel)]="allChecked"
              [nzIndeterminate]="indeterminate"
              (ngModelChange)="checkAll($event)">
            </label>
          </th>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of rowSelectionTable.data">
          <td nz-td nzCheckbox>
            <label nz-checkbox
              [nzDisabled]="data.disabled"
              [(ngModel)]="data.checked"
              (ngModelChange)="refreshStatus($event)">
            </label>
          </td>
          <td nz-td>
            <a>{{data.name}}</a>
          </td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableRowSelectionComponent {
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      name    : 'John Brown',
      age     : 32,
      address : 'New York No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Jim Green',
      age     : 42,
      address : 'London No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Joe Black',
      age     : 32,
      address : 'Sidney No. 1 Lake Park',
      checked : false,
      disabled: false
    },
    {
      name    : 'Disabled User',
      age     : 32,
      address : 'Sidney No. 1 Lake Park',
      checked : false,
      disabled: true
    }
  ];

  displayDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
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
}
