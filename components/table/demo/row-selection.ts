import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-row-selection',
  template: `
    <nz-table
      #rowSelectionTable
      [nzData]="data"
      (nzCurrentPageDataChange)="currentPageDataChange($event)"
      (nzPageIndexChange)="refreshStatus()"
      (nzPageSizeChange)="refreshStatus()">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzShowCheckbox [(nzChecked)]="allChecked" [nzIndeterminate]="indeterminate" (nzCheckedChange)="checkAll($event)"></th>
          <th nz-th>Name</th>
          <th nz-th>Age</th>
          <th nz-th>Address</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of rowSelectionTable.data">
          <td nz-td nzShowCheckbox [(nzChecked)]="data.checked" [nzDisabled]="data.disabled" (nzCheckedChange)="refreshStatus($event)"></td>
          <td nz-td>{{data.name}}</td>
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

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
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
