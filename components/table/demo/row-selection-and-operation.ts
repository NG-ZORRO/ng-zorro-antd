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
      [nzData]="dataSet"
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
          <td nz-td nzShowCheckbox [(nzChecked)]="data.checked" (nzCheckedChange)="refreshStatus($event)"></td>
          <td nz-td>{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
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

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean }>): void {
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
