import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTableModule, NzTrDirective } from 'ng-zorro-antd/table';

describe('nz-tr', () => {
  let fixture: ComponentFixture<NzTrTestTableComponent>;
  let tr: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTrTestTableComponent);
    fixture.detectChanges();
    tr = fixture.debugElement.query(By.directive(NzTrDirective));
  });

  it('should not add class', () => {
    fixture.detectChanges();
    expect(tr.nativeElement.classList).not.toContain('ant-table-row');
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    <table>
      <tr></tr>
    </table>
  `
})
export class NzTrTestTableComponent {}
