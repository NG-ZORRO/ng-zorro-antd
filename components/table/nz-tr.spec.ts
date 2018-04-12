import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzTableModule } from './nz-table.module';
import { NzTrDirective } from './nz-tr.directive';

describe('nz-tr', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTableModule ],
      declarations: [ NzTrTestTableComponent, NzTrTestNzTableComponent ],
      providers   : [ NzMeasureScrollbarService ]
    });
    TestBed.compileComponents();
  }));
  describe('nz-tr in table', () => {
    let fixture;
    let testComponent;
    let tr;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTrTestTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tr = fixture.debugElement.query(By.directive(NzTrDirective));
    });
    it('should not add class', () => {
      fixture.detectChanges();
      expect(tr.nativeElement.classList).not.toContain('ant-table-row');
    });
  });
  describe('nz-tr in nz-table', () => {
    let fixture;
    let testComponent;
    let tr;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTrTestNzTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tr = fixture.debugElement.query(By.directive(NzTrDirective));
    });
    it('should not add class', () => {
      fixture.detectChanges();
      expect(tr.nativeElement.classList).toContain('ant-table-row');
    });
    it('should expand work', () => {
      fixture.detectChanges();
      testComponent.expand = true;
      fixture.detectChanges();
      expect(tr.nativeElement.classList).toContain('ant-table-row');
      expect(tr.nativeElement.classList).toContain('ant-table-expanded-row');
      testComponent.expand = false;
      fixture.detectChanges();
      expect(tr.nativeElement.classList).not.toContain('ant-table-expanded-row');
      expect(tr.nativeElement.style.display).toBe('none');
    });
  });
});

@Component({
  selector: 'nz-tr-test-table',
  template: `
    <table>
      <tr></tr>
    </table>`
})
export class NzTrTestTableComponent {
}

@Component({
  selector: 'nz-tr-test-nz-table',
  template: `
    <nz-table>
      <tr [nzExpand]="expand"></tr>
    </nz-table>`
})
export class NzTrTestNzTableComponent {
  expand = false;
}
