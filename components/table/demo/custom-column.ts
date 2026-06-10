import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCustomColumn, NzTableModule } from 'ng-zorro-antd/table';

interface Person {
  key: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  address: string;
}

interface CustomColumn extends NzCustomColumn {
  name: string;
  required?: boolean;
  position?: 'left' | 'right';
}

@Component({
  selector: 'nz-demo-table-custom-column',
  imports: [
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    CdkDrag,
    CdkDropList
  ],
  template: `
    <button nz-button nzType="primary" nzSize="small" (click)="showModal()" style="margin-bottom: 8px;">
      <nz-icon nzType="setting" nzTheme="outline" />
    </button>
    <nz-table #basicTable [nzData]="listOfData" [nzCustomColumn]="customColumn()">
      <thead>
        <tr>
          <th nzCellControl="name">Name</th>
          <th nzCellControl="gender">Gender</th>
          <th nzCellControl="age">Age</th>
          <th nzCellControl="address">Address</th>
          <th nzCellControl="action">Action</th>
        </tr>
      </thead>
      <tbody>
        @for (data of basicTable.data; track data) {
          <tr>
            <td nzCellControl="name">{{ data.name }}</td>
            <td nzCellControl="gender">{{ data.gender }}</td>
            <td nzCellControl="age">{{ data.age }}</td>
            <td nzCellControl="address">{{ data.address }}</td>
            <td nzCellControl="action">
              <a>Action</a>
              <nz-divider nzType="vertical" />
              <a>Delete</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>

    <nz-modal [nzVisible]="isVisible()" nzTitle="Custom Column" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <div nz-row [nzGutter]="24">
          <div nz-col class="gutter-row" [nzSpan]="12">
            <div class="example-container">
              <p>Displayed (drag and drop to sort)</p>
              @for (item of title(); track item) {
                <div class="example-box">
                  {{ item.name }}
                </div>
              }
              <div
                cdkDropList
                #todoList="cdkDropList"
                [cdkDropListData]="fix()"
                [cdkDropListConnectedTo]="[doneList]"
                class="example-list"
                (cdkDropListDropped)="drop($event)"
              >
                @for (item of fix(); track item) {
                  <div class="example-box" cdkDrag>
                    {{ item.name }}
                    <nz-icon nzType="minus-circle" nzTheme="outline" (click)="deleteCustom(item, $index)" />
                  </div>
                }
              </div>
              @for (item of footer(); track item) {
                <div class="example-box">
                  {{ item.name }}
                </div>
              }
            </div>
          </div>
          <div nz-col class="gutter-row" [nzSpan]="12">
            <div class="example-container">
              <p>Not Shown</p>
              <div
                cdkDropList
                #doneList="cdkDropList"
                [cdkDropListData]="notFix()"
                [cdkDropListConnectedTo]="[todoList]"
                class="example-list"
                (cdkDropListDropped)="drop($event)"
              >
                @for (item of notFix(); track item) {
                  <div class="example-box" cdkDrag>
                    {{ item.name }}
                    <nz-icon nzType="plus-circle" nzTheme="outline" (click)="addCustom(item, $index)" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </nz-modal>
  `,
  styles: `
    .example-container {
      height: 350px;
      display: flex;
      flex-direction: column;
    }

    .example-list {
      min-height: 60px;
      border-radius: 4px;
      overflow-x: hidden;
      overflow-y: auto;
      display: block;
      border: 1px dashed #ccc;
      flex: 1 1 auto;
    }

    .example-list > .example-box {
      cursor: move;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin: 4px;
      padding: 4px 8px;
      background-color: rgb(0 112 204 / 15%);
    }

    .example-box span {
      cursor: pointer;
    }
  `
})
export class NzDemoTableCustomColumnComponent implements OnInit {
  readonly listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      gender: 'female',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      gender: 'female',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      gender: 'male',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  readonly customColumn = signal<CustomColumn[]>([
    {
      name: 'Name',
      value: 'name',
      default: true,
      required: true,
      position: 'left',
      width: 200,
      fixWidth: true
    },
    {
      name: 'Gender',
      value: 'gender',
      default: true,
      width: 200
    },
    {
      name: 'Address',
      value: 'address',
      default: true,
      width: 200
    },
    {
      name: 'Age',
      value: 'age',
      default: true,
      width: 200
    },
    {
      name: 'Action',
      value: 'action',
      default: true,
      required: true,
      position: 'right',
      width: 200
    }
  ]);

  readonly isVisible = signal(false);
  readonly title = signal<CustomColumn[]>([]);
  readonly footer = signal<CustomColumn[]>([]);
  readonly fix = signal<CustomColumn[]>([]);
  readonly notFix = signal<CustomColumn[]>([]);

  ngOnInit(): void {
    this.title.set(this.customColumn().filter(item => item.position === 'left' && item.required));
    this.footer.set(this.customColumn().filter(item => item.position === 'right' && item.required));
    this.fix.set(this.customColumn().filter(item => item.default && !item.required));
    this.notFix.set(this.customColumn().filter(item => !item.default && !item.required));
  }

  drop(event: CdkDragDrop<CustomColumn[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.fix.set(this.fix().map(item => ({ ...item, default: true })));
    this.notFix.set(this.notFix().map(item => ({ ...item, default: false })));
  }

  deleteCustom(value: CustomColumn, index: number): void {
    this.notFix.update(notFix => [...notFix, { ...value, default: false }]);
    this.fix.update(fix => fix.filter((_, i) => i !== index));
  }

  addCustom(value: CustomColumn, index: number): void {
    this.fix.update(fix => [...fix, { ...value, default: true }]);
    this.notFix.update(notFix => notFix.filter((_, i) => i !== index));
  }

  showModal(): void {
    this.isVisible.set(true);
  }

  handleOk(): void {
    this.customColumn.set([...this.title(), ...this.fix(), ...this.notFix(), ...this.footer()]);
    this.isVisible.set(false);
  }

  handleCancel(): void {
    this.isVisible.set(false);
  }
}
