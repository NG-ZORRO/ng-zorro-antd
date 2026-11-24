/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCustomColumn, NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';

describe('nz-table-custom-column', () => {
  let fixture: ComponentFixture<NzCustomColumnTestTableComponent>;
  let testComponent: NzCustomColumnTestTableComponent;
  let resultEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzCustomColumnTestTableComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzTableComponent));
  });

  it('custom-column basic', () => {
    fixture.detectChanges();
    // age: order = 3
    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].getAttribute('nzcellcontrol')).toBe('age');
    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].style.order).toBe('3');
    testComponent.customColumn.set([
      {
        value: 'name',
        default: true,
        width: 200
      },
      {
        value: 'age',
        default: true,
        width: 200
      },
      {
        value: 'gender',
        default: false,
        width: 200
      },
      {
        value: 'address',
        default: true,
        width: 200
      },
      {
        value: 'action',
        default: true,
        width: 200
      }
    ]);
    fixture.detectChanges();
    // age: order = 1
    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].getAttribute('nzcellcontrol')).toBe('age');
    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].style.order).toBe('1');

    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[1].getAttribute('nzcellcontrol')).toBe('gender');
    expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[1].style.display).toBe('none');
  });

  it('custom-column auto width', () => {
    fixture.detectChanges();
    testComponent.customColumn.set([
      {
        value: 'name',
        default: true,
        width: 200
      },
      {
        value: 'gender',
        default: true,
        width: 'auto'
      },
      {
        value: 'age',
        default: true,
        width: 100,
        fixWidth: true
      },
      {
        value: 'address',
        default: true
      },
      {
        value: 'action',
        default: true,
        width: 'auto',
        fixWidth: true
      }
    ]);
    fixture.detectChanges();
    const cells = resultEl.nativeElement.querySelectorAll('.ant-table-cell');
    // Fixed numeric width keeps the previous flex-basis in pixels
    expect(cells[0].style.flex).toBe('1 1 200px');
    // Explicit 'auto' sizes the column to its content
    expect(cells[1].style.flex).toBe('1 1 auto');
    // A fixed width with fixWidth does not shrink
    expect(cells[2].style.flex).toBe('1 0 100px');
    // An omitted width defaults to auto
    expect(cells[3].style.flex).toBe('1 1 auto');
    // 'auto' with fixWidth keeps the content size without shrinking
    expect(cells[4].style.flex).toBe('1 0 auto');
  });
});

interface Person {
  key: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  address: string;
}

@Component({
  imports: [NzDividerModule, NzTableModule],
  template: `
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
  `
})
export class NzCustomColumnTestTableComponent {
  listOfData: Person[] = [
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

  readonly customColumn = signal<NzCustomColumn[]>([
    {
      value: 'name',
      default: true,
      width: 200
    },
    {
      value: 'gender',
      default: true,
      width: 200
    },
    {
      value: 'address',
      default: true,
      width: 200
    },
    {
      value: 'age',
      default: true,
      width: 200
    },
    {
      value: 'action',
      default: true,
      width: 200
    }
  ]);
}
