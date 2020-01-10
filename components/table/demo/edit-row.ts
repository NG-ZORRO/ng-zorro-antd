import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-edit-row',
  template: `
    <nz-table #editRowTable nzBordered [nzData]="listOfData">
      <thead>
        <tr>
          <th nzWidth="25%">Name</th>
          <th nzWidth="15%">Age</th>
          <th nzWidth="40%">Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data">
          <td>
            <ng-container *ngIf="!editCache[data.id].edit; else nameInputTpl">
              {{ data.name }}
            </ng-container>
            <ng-template #nameInputTpl>
              <input type="text" nz-input [(ngModel)]="editCache[data.id].data.name" />
            </ng-template>
          </td>
          <td>
            <ng-container *ngIf="!editCache[data.id].edit; else ageInputTpl">
              {{ data.age }}
            </ng-container>
            <ng-template #ageInputTpl>
              <input type="text" nz-input [(ngModel)]="editCache[data.id].data.age" />
            </ng-template>
          </td>
          <td>
            <ng-container *ngIf="!editCache[data.id].edit; else addressInputTpl">
              {{ data.address }}
            </ng-container>
            <ng-template #addressInputTpl>
              <input type="text" nz-input [(ngModel)]="editCache[data.id].data.address" />
            </ng-template>
          </td>
          <td>
            <div class="editable-row-operations">
              <ng-container *ngIf="!editCache[data.id].edit; else saveTpl">
                <a (click)="startEdit(data.id)">Edit</a>
              </ng-container>
              <ng-template #saveTpl>
                <a (click)="saveEdit(data.id)">Save</a>
                <a nz-popconfirm nzTitle="Sure to cancel?" (nzOnConfirm)="cancelEdit(data.id)">Cancel</a>
              </ng-template>
            </div>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      .editable-row-operations a {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTableEditRowComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    this.updateEditCache();
  }
}
