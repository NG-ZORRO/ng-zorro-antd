import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-edit-cell',
  template: `
    <button nz-button (click)="addRow()" class="editable-add-btn">Add</button>
    <nz-table
      #editRowTable
      nzBordered
      [nzIsPageIndexReset]="isResetIndex"
      [nzDataSource]="dataSet"
      [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th nzWidth="30%"><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
          <th nz-th><span>Action</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of editRowTable.data">
          <td nz-td>
            <div class="editable-cell">
              <div class="editable-cell-text-wrapper">
                <ng-container *ngIf="!editCache[data.key].edit">
                  {{data.name}}
                  <i class="anticon anticon-edit editable-cell-icon" (click)="startEdit(data.key)"></i>
                </ng-container>
                <ng-container *ngIf="editCache[data.key].edit">
                  <input type="text" nz-input [(ngModel)]="editCache[data.key].name">
                  <i class="anticon anticon-check editable-cell-icon-check" (click)="finishEdit(data.key)"></i>
                </ng-container>
              </div>
            </div>
          </td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>
            <nz-popconfirm [nzTitle]="'Sure to delete?'" (nzOnConfirm)="deleteRow(data.key)">
              <a nz-popconfirm>Delete</a>
            </nz-popconfirm>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles  : [
    `
      .editable-cell {
        position: relative;
      }

      .editable-cell-input-wrapper,
      .editable-cell-text-wrapper {
        padding-right: 24px;
      }

      .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
      }

      .editable-cell-icon,
      .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
      }

      .editable-cell-icon {
        line-height: 18px;
        display: none;
      }

      .editable-cell-icon-check {
        line-height: 28px;
      }

      .editable-cell:hover .editable-cell-icon {
        display: inline-block;
      }

      .editable-cell-icon:hover,
      .editable-cell-icon-check:hover {
        color: #108ee9;
      }

      .editable-add-btn {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTableEditCellComponent implements OnInit {
  i = 1;
  isResetIndex = false;
  editCache = {};
  dataSet = [
    {
      key    : '0',
      name   : 'Edward King 0',
      age    : '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key    : '1',
      name   : 'Edward King 1',
      age    : '32',
      address: 'London, Park Lane no. 1',
    }
  ];

  addRow(): void {
    this.i++;
    this.dataSet.push({
      key    : `${this.i}`,
      name   : `Edward King ${this.i}`,
      age    : '32',
      address: `London, Park Lane no. ${this.i}`,
    });
    this.dataSet = [ ...this.dataSet ];
    this.updateEditCache();
  }

  deleteRow(i: string): void {
    const dataSet = this.dataSet.filter(d => d.key !== i);
    if (dataSet.length % 10 === 0) {
      this.isResetIndex = true;
    }
    this.dataSet = dataSet;
  }

  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  finishEdit(key: string): void {
    this.editCache[ key ].edit = false;
    this.dataSet.find(item => item.key === key).name = this.editCache[ key ].name;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          name: item.name
        };
      }
    });
  }

  ngOnInit(): void {
    this.updateEditCache();
  }
}
