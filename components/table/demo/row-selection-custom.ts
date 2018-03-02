import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-row-selection-custom',
  template: `
    <nz-table
      #rowSelectionTable
      [nzData]="dataSet"
      [nzPageSize]="10"
      (nzPageIndexChange)="refreshStatus()"
      (nzPageSizeChange)="refreshStatus()">
      <thead nz-thead>
        <tr nz-tr>
          <th nz-th nzShowCheckbox nzShowRowSelection [nzSelections]="listOfSelection" [(nzChecked)]="allChecked" [nzIndeterminate]="indeterminate" (nzCheckedChange)="checkAll($event)"></th>
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
export class NzDemoTableRowSelectionCustomComponent implements OnInit {
  listOfSelection = [
    {
      text    : 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text    : 'Select Odd Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
        this.refreshStatus();
      }
    },
    {
      text    : 'Select Even Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshStatus();
      }
    }
  ];
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
