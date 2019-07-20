import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzTableModule } from './nz-table.module';
import { NzTrDirective } from './nz-tr.directive';

describe('nz-tr', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule],
      declarations: [NzTrTestTableComponent, NzTrTestNzTableComponent]
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

  describe('nz-tr in nz-table', () => {
    let fixture: ComponentFixture<NzTrTestNzTableComponent>;
    let testComponent: NzTrTestNzTableComponent;
    let tr: DebugElement;

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
  template: `
    <table>
      <tr></tr>
    </table>
  `
})
export class NzTrTestTableComponent {}

@Component({
  template: `
    <nz-table>
      <tr [nzExpand]="expand"></tr>
    </nz-table>`
})
export class NzTrTestNzTableComponent {
  expand = false;
}
