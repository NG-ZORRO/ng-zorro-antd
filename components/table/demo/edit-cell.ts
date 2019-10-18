import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}

@Component({
  selector: 'nz-demo-table-edit-cell',
  template: `
    <button nz-button (click)="addRow()" nzType="primary">Add</button>
    <nz-table #editRowTable nzBordered [nzData]="listOfData">
      <thead>
        <tr>
          <th nzWidth="30%">Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data" class="editable-row">
          <td>
            <div class="editable-cell" *ngIf="editId !== data.id; else editTpl">
              <div class="editable-cell-value-wrap" (click)="startEdit(data.id, $event)">
                {{ data.name }}
              </div>
            </div>
            <ng-template #editTpl>
              <input type="text" nz-input [(ngModel)]="data.name" />
            </ng-template>
          </td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>
            <a nz-popconfirm nzTitle="Sure to delete?" (nzOnConfirm)="deleteRow(data.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      button {
        margin-bottom: 16px;
      }

      .editable-cell {
        position: relative;
      }

      .editable-cell-value-wrap {
        padding: 5px 12px;
        cursor: pointer;
      }

      .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `
  ]
})
export class NzDemoTableEditCellComponent implements OnInit {
  i = 0;
  editId: string | null;
  listOfData: ItemData[] = [];
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }
}
