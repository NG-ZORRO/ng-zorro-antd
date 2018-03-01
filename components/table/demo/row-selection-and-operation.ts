import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-row-selection-and-operation',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button [disabled]="disabledButton" [nzType]="'primary'" [nzLoading]="operating" (click)="operateData()">
        Reload
      </button>
      <span style="margin-left: 8px;" *ngIf="checkedNumber">Selected {{checkedNumber}} items</span>
    </div>
    <nz-table
      #rowSelectionTable
      [nzDataSource]="dataSet"
      [nzPageSize]="10"
      (nzDataChange)="displayDataChange($event)"
      (nzPageIndexChange)="refreshStatus()"
      (nzPageSizeChange)="refreshStatus()">
      <thead>
        <tr>
          <th nzCheckbox>
            <label
              nz-checkbox
              [(ngModel)]="allChecked"
              [nzIndeterminate]="indeterminate"
              (ngModelChange)="checkAll($event)">
            </label>
          </th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of rowSelectionTable.data">
          <td nzCheckbox>
            <label
              nz-checkbox
              [(ngModel)]="data.checked"
              (ngModelChange)="refreshStatus($event)">
            </label>
          </td>
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableRowSelectionAndOperationComponent implements OnInit {
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  operating = false;
  dataSet = [];
  indeterminate = false;

  displayDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean }>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    setTimeout(_ => {
      this.dataSet.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
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
