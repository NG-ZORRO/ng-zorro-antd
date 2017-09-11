import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-edit',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th [nzWidth]="'25%'"><span>name</span></th>
          <th nz-th [nzWidth]="'15%'"><span>age</span></th>
          <th nz-th [nzWidth]="'40%'"><span>address</span></th>
          <th nz-th><span>action</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>
            <span *ngIf="editRow!==data.key">{{data.name}}</span>
            <span *ngIf="editRow===data.key">
              <nz-input [(ngModel)]="tempEditObject[data.key].name"></nz-input>
            </span>
          </td>
          <td nz-td>
            <span *ngIf="editRow!==data.key">{{data.age}}</span>
            <span *ngIf="editRow===data.key">
              <nz-input [(ngModel)]="tempEditObject[data.key].age"></nz-input>
            </span>
          </td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>
            <span *ngIf="editRow!==data.key">
              <a (click)="edit(data)">Edit</a>
            </span>
            <span *ngIf="editRow===data.key">
              <a (click)="save(data)">Save</a>
              <span nz-table-divider></span>
                <nz-popconfirm [nzTitle]="'Sure to cancel?'" (nzOnConfirm)="cancel(data)">
                  <a nz-popconfirm>Cancel</a>
                </nz-popconfirm>
            </span>
          </td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableEditComponent implements OnInit {
  editRow = null;
  tempEditObject = {};
  data = [
    {
      key    : 0,
      name   : 'Edward King 0',
      age    : 32,
      address: 'London, Park Lane no. 0',
    }
  ];

  edit(data) {
    this.tempEditObject[ data.key ] = { ...data };
    this.editRow = data.key;
  }

  save(data) {
    Object.assign(data, this.tempEditObject[ data.key ]);
    this.editRow = null;
  }

  cancel(data) {
    this.tempEditObject[ data.key ] = {};
    this.editRow = null;
  }

  constructor() {
  }

  ngOnInit() {
    this.data.forEach(item => {
      this.tempEditObject[ item.key ] = {};
    })
  }
}

