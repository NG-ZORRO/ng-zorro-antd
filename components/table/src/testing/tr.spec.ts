import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzTableModule } from '../table.module';
import { NzTrDirective } from '../table/tr.directive';

describe('nz-tr', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule],
      declarations: [NzTrTestTableComponent]
    });
    TestBed.compileComponents();
  }));

  describe('nz-tr in table', () => {
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
});

@Component({
  template: `
    <table>
      <tr></tr>
    </table>
  `
})
export class NzTrTestTableComponent {}
