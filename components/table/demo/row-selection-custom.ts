import { Component, OnInit, signal } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-row-selection-custom',
  imports: [NzTableModule],
  template: `
    <nz-table
      #rowSelectionTable
      nzShowSizeChanger
      [nzData]="listOfData()"
      (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
    >
      <thead>
        <tr>
          <th
            [nzSelections]="listOfSelection"
            [nzChecked]="checked()"
            [nzIndeterminate]="indeterminate()"
            (nzCheckedChange)="onAllChecked($event)"
          ></th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        @for (data of rowSelectionTable.data; track data) {
          <tr>
            <td [nzChecked]="setOfCheckedId().has(data.id)" (nzCheckedChange)="onItemChecked(data.id, $event)"></td>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableRowSelectionCustomComponent implements OnInit {
  readonly listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData().forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData().forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  readonly checked = signal(false);
  readonly indeterminate = signal(false);
  readonly listOfCurrentPageData = signal<readonly ItemData[]>([]);
  readonly listOfData = signal<readonly ItemData[]>([]);
  readonly setOfCheckedId = signal(new Set<number>());

  updateCheckedSet(id: number, checked: boolean): void {
    this.setOfCheckedId.update(setOfCheckedId => {
      const next = new Set(setOfCheckedId);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData().forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData.set($event);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const checked = this.listOfCurrentPageData().every(item => this.setOfCheckedId().has(item.id));
    this.checked.set(checked);
    this.indeterminate.set(this.listOfCurrentPageData().some(item => this.setOfCheckedId().has(item.id)) && !checked);
  }

  ngOnInit(): void {
    this.listOfData.set(
      new Array(200).fill(0).map((_, index) => ({
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      }))
    );
  }
}
