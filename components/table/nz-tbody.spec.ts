import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzMeasureScrollbarService } from 'ng-zorro-antd/core';
import { NzTableModule } from './nz-table.module';
import { NzTbodyDirective } from './nz-tbody.directive';

describe('nz-tbody', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule],
      declarations: [NzTbodyTestTableComponent, NzTbodyTestNzTableComponent],
      providers: [NzMeasureScrollbarService]
    });
    TestBed.compileComponents();
  }));
  describe('nz-tbody in table', () => {
    let fixture: ComponentFixture<NzTbodyTestTableComponent>;
    let tbody: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTbodyTestTableComponent);
      fixture.detectChanges();
      tbody = fixture.debugElement.query(By.directive(NzTbodyDirective));
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
      tbody = fixture.debugElement.query(By.directive(NzTbodyDirective));
    });
    it('should not add class', () => {
      fixture.detectChanges();
      expect(tbody.nativeElement.classList).toContain('ant-table-tbody');
    });
  });
});

@Component({
  selector: 'nz-tbody-test-table',
  template: `
    <table>
      <tbody></tbody>
    </table>
  `
})
export class NzTbodyTestTableComponent {}

@Component({
  selector: 'nz-tbody-test-nz-table',
  template: `
    <nz-table>
      <tbody></tbody>
    </nz-table>
  `
})
export class NzTbodyTestNzTableComponent {
  expand = false;
}
