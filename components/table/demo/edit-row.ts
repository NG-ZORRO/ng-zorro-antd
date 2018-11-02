import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-edit-row',
  template: `
    <nz-table
      #editRowTable
      nzBordered
      [nzData]="dataSet">
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
            <div class="editable-cell">
              <div class="editable-cell-text-wrapper">
                <ng-container *ngIf="!editCache[data.key].edit">
                  {{data.name}}
                </ng-container>
                <ng-container *ngIf="editCache[data.key].edit">
                  <input type="text" nz-input [(ngModel)]="editCache[data.key].data.name">
                </ng-container>
              </div>
            </div>
          </td>
          <td>
            <ng-container *ngIf="!editCache[data.key].edit">
              {{data.age}}
            </ng-container>
            <ng-container *ngIf="editCache[data.key].edit">
              <input type="text" nz-input [(ngModel)]="editCache[data.key].data.age">
            </ng-container>
          </td>
          <td>
            <ng-container *ngIf="!editCache[data.key].edit">
              {{data.address}}
            </ng-container>
            <ng-container *ngIf="editCache[data.key].edit">
              <input type="text" nz-input [(ngModel)]="editCache[data.key].data.address">
            </ng-container>
          </td>
          <td>
            <div class="editable-row-operations">
              <ng-container *ngIf="!editCache[data.key].edit">
                <a (click)="startEdit(data.key)">Edit</a>
              </ng-container>
              <ng-container *ngIf="editCache[data.key].edit">
                <a (click)="saveEdit(data.key)">Save</a>
                <nz-popconfirm [nzTitle]="'Sure to cancel?'" (nzOnConfirm)="cancelEdit(data.key)">
                  <a nz-popconfirm>Cancel</a>
                </nz-popconfirm>
              </ng-container>
            </div>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles  : [
    `
      .editable-row-operations a {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTableEditRowComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];

  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        key    : i.toString(),
        name   : `Edrward ${i}`,
        age    : 32,
        address: `London Park no. ${i}`
      });
    }
    this.updateEditCache();
  }
}
