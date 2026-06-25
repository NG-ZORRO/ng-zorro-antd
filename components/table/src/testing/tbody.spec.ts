/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTableModule, NzTbodyComponent } from 'ng-zorro-antd/table';

describe('nz-tbody', () => {
  [
    {
      component: NzTbodyTestTableComponent,
      case: 'should not add class to tbody in table',
      expected: false
    },
    {
      component: NzTbodyTestNzTableComponent,
      case: 'should add class to tbody in nz-table',
      expected: true
    }
  ].forEach(({ component, case: testCase, expected }) => {
    it(testCase, () => {
      const fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      const tbody = fixture.debugElement.query(By.directive(NzTbodyComponent));
      expect(tbody.nativeElement.classList.contains('ant-table-tbody')).toBe(expected);
    });
  });
});

@Component({
  selector: 'nz-test-tbody-in-table',
  imports: [NzTableModule],
  template: `
    <table>
      <tbody></tbody>
    </table>
  `
})
export class NzTbodyTestTableComponent {}

@Component({
  selector: 'nz-test-tbody-in-nz-table',
  imports: [NzTableModule],
  template: `
    <nz-table>
      <tbody></tbody>
    </nz-table>
  `
})
export class NzTbodyTestNzTableComponent {}
