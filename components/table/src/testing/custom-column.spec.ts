import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';

import { NzTableModule } from '../table.module';
import { NzCustomColumn } from '../table.types';
import { NzTableComponent } from '../table/table.component';

describe('nz-table-custom-column', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzCustomColumnTestTableComponent>;
    let fixture: ComponentFixture<NzCustomColumnTestTableComponent>;
    let testComponent: NzCustomColumnTestTableComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzCustomColumnTestTableComponent, {
        imports: [NzTableModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzTableComponent));
    });

    it('custom-column basic', () => {
      fixture.detectChanges();
      // age: order = 3
      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].getAttribute('nzcellcontrol')).toBe('age');
      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].style.order).toBe('3');
      testComponent.customColumn = [
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
      ];
      fixture.detectChanges();
      // age: order = 1
      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].getAttribute('nzcellcontrol')).toBe('age');
      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[2].style.order).toBe('1');

      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[1].getAttribute('nzcellcontrol')).toBe(
        'gender'
      );
      expect(resultEl.nativeElement.querySelectorAll('.ant-table-cell')[1].style.display).toBe('none');
    });
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
  template: `
    <nz-table #basicTable [nzData]="listOfData" [nzCustomColumn]="customColumn">
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
        <tr *ngFor="let data of basicTable.data">
          <td nzCellControl="name">{{ data.name }}</td>
          <td nzCellControl="gender">{{ data.gender }}</td>
          <td nzCellControl="age">{{ data.age }}</td>
          <td nzCellControl="address">{{ data.address }}</td>
          <td nzCellControl="action">
            <a>Action</a>
            <nz-divider nzType="vertical"></nz-divider>
            <a>Delete</a>
          </td>
        </tr>
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

  customColumn: NzCustomColumn[] = [
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
  ];
}
