import { Component, OnInit } from '@angular/core';

import { NzRowSelectionType } from 'ng-zorro-antd/table';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-selection',
  template: `
    <nz-radio-group [(ngModel)]="rowSelectionType" (ngModelChange)="resetSelectedValues()">
      <label nz-radio nzValue="checkbox">checkbox</label>
      <label nz-radio nzValue="radio">radio</label>
    </nz-radio-group>

    <nz-table #rowSelectionTable [nzData]="listOfData" (nzCurrentPageDataChange)="onCurrentPageDataChange($event)">
      <thead>
        <tr>
          <ng-container *ngIf="rowSelectionType === 'radio'">
            <th nzShowRowSelection [nzRowSelectionType]="'radio'"> </th>
          </ng-container>
          <ng-container *ngIf="rowSelectionType === 'checkbox'">
            <th [(nzChecked)]="checked" [nzIndeterminate]="indeterminate" (nzCheckedChange)="onAllChecked($event)"></th>
          </ng-container>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of rowSelectionTable.data">
          <ng-container *ngIf="rowSelectionType === 'radio'">
            <td
              [nzChecked]="setOfCheckedId.has(data.id)"
              [nzRowSelectionType]="'radio'"
              (nzCheckedChange)="onItemChecked(data.id, $event)"
            ></td>
          </ng-container>

          <ng-container *ngIf="rowSelectionType === 'checkbox'">
            <td [nzChecked]="setOfCheckedId.has(data.id)" (nzCheckedChange)="onItemChecked(data.id, $event)"></td>
          </ng-container>
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: `
    nz-radio-group {
      margin-block-end: 1rem;
    }
  `
})
export class NzDemoTableSelectionComponent implements OnInit {
  rowSelectionType: NzRowSelectionType = 'checkbox';

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      if (this.rowSelectionType === 'radio') {
        this.setOfCheckedId.forEach(x => {
          this.setOfCheckedId.delete(x);
        });
      }

      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  resetSelectedValues(): void {
    this.setOfCheckedId = new Set<number>();
    this.indeterminate = false;
  }

  ngOnInit(): void {
    this.listOfData = new Array(5).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }));
  }
}
