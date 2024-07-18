import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTableModule } from '../table.module';
import { NzTfootSummaryDirective } from '../table/tfoot-summary.directive';

describe('nz-foot', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule],
      declarations: [TestComponent]
    });
    TestBed.compileComponents();
  }));

  describe('nz-foot in nz-table', () => {
    let fixture: ComponentFixture<TestComponent>;
    let tfoot: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      tfoot = fixture.debugElement.query(By.directive(NzTfootSummaryDirective));
    });

    it('should nzSummary work ', () => {
      fixture.detectChanges();
      expect(tfoot.nativeElement.classList).toContain('ant-table-summary');
    });
  });
});

@Component({
  template: `
    <nz-table>
      <thead>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
      <tfoot nzSummary>
        <td colspan="2">summary</td>
        <tfoot> </tfoot></tfoot
    ></nz-table>
  `
})
export class TestComponent {}
