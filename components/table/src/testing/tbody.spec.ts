/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTableModule, NzTbodyComponent } from 'ng-zorro-antd/table';

describe('nz-tbody', () => {
  describe('nz-tbody in table', () => {
    let fixture: ComponentFixture<NzTbodyTestTableComponent>;
    let tbody: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTbodyTestTableComponent);
      fixture.detectChanges();
      tbody = fixture.debugElement.query(By.directive(NzTbodyComponent));
    });

    it('should not add class', () => {
      fixture.detectChanges();
      expect(tbody.nativeElement.classList).not.toContain('ant-table-tbody');
    });
  });

  describe('nz-tbody in nz-table', () => {
    let fixture: ComponentFixture<NzTbodyTestNzTableComponent>;
    let tbody: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTbodyTestNzTableComponent);
      fixture.detectChanges();
      tbody = fixture.debugElement.query(By.directive(NzTbodyComponent));
    });
    it('should not add class', () => {
      fixture.detectChanges();
      expect(tbody.nativeElement.classList).toContain('ant-table-tbody');
    });
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    <table>
      <tbody></tbody>
    </table>
  `
})
export class NzTbodyTestTableComponent {}

@Component({
  imports: [NzTableModule],
  template: `
    <nz-table>
      <tbody></tbody>
    </nz-table>
  `
})
export class NzTbodyTestNzTableComponent {
  expand = false;
}
