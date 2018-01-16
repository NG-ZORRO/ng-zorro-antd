import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-row-selection-custom',
  template: `
    <nz-table
      #rowSelectionTable
      [nzDataSource]="dataSet"
      [nzPageSize]="10"
      (nzPageIndexChange)="refreshStatus()"
      (nzPageSizeChange)="refreshStatus()">
      <thead nz-thead>
        <tr>
          <th nz-th nzCheckbox class="ant-table-selection-column-custom">
            <div class="ant-table-selection">
              <label
                nz-checkbox
                [(ngModel)]="allChecked"
                [nzIndeterminate]="indeterminate"
                (ngModelChange)="checkAll($event)">
              </label>
              <nz-dropdown nzPlacement="bottomCenter">
                <div nz-dropdown class="ant-table-selection-down">
                  <i class="anticon anticon-down"></i>
                </div>
                <ul nz-menu>
                  <li nz-menu-item (click)="checkAll(true)">Select All Row</li>
                  <li nz-menu-item (click)="checkOdd(true)">Select Odd Row</li>
                  <li nz-menu-item (click)="checkEven(true)">Select Even Row</li>
                </ul>
              </nz-dropdown>
            </div>
          </th>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of rowSelectionTable.data">
          <td nz-td nzCheckbox>
            <label
              nz-checkbox
              [(ngModel)]="data.checked"
              (ngModelChange)="refreshStatus($event)">
            </label>
          </td>
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableRowSelectionCustomComponent implements OnInit {
  allChecked = false;
  dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  checkOdd(value: boolean): void {
    this.dataSet.forEach((data, index) => {
      if (index % 2 !== 0) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  checkEven(value: boolean): void {
    this.dataSet.forEach((data, index) => {
      if (index % 2 === 0) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 0; i < 46; i++) {
      this.dataSet.push({
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
        checked: false
      });
    }
  }
}
