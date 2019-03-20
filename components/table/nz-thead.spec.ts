import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzIconTestModule } from '../icon/nz-icon-test.module';
import { NzTableComponent } from './nz-table.component';
import { NzTableModule } from './nz-table.module';

describe('nz-thead', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTableModule, NzIconTestModule ],
      declarations: [ NzTheadTestNzTableComponent ],
      providers   : [ NzMeasureScrollbarService ]
    });
    TestBed.compileComponents();
  }));
  describe('nz-thead in nz-table', () => {
    let fixture: ComponentFixture<NzTheadTestNzTableComponent>;
    let testComponent: NzTheadTestNzTableComponent;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTheadTestNzTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(NzTableComponent));
    });
    it('should sort change', () => {
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      const upButtons = table.nativeElement.querySelectorAll('.ant-table-column-sorters');
      upButtons[ 0 ].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(upButtons[0].firstElementChild.lastElementChild.classList).toContain('on');
      upButtons[ 1 ].click();
      fixture.detectChanges();
      expect(upButtons[0].firstElementChild.lastElementChild.classList).toContain('on');
      expect(upButtons[1].firstElementChild.lastElementChild.classList).toContain('on');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });
    it('should singleSort change', () => {
      testComponent.singleSort = true;
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      const upButtons = table.nativeElement.querySelectorAll('.ant-table-column-sorters');
      upButtons[ 0 ].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(upButtons[0].firstElementChild.lastElementChild.classList).toContain('on');
      upButtons[ 1 ].click();
      fixture.detectChanges();
      expect(upButtons[0].firstElementChild.lastElementChild.classList).toContain('off');
      expect(upButtons[1].firstElementChild.lastElementChild.classList).toContain('on');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });
  });
});

@Component({
  selector: 'nz-thead-test-nz-table',
  template: `
    <nz-table>
      <thead [nzSingleSort]="singleSort" (nzSortChange)="sortChange($event)">
        <th nzShowSort nzSortKey="first"></th>
        <th nzShowSort nzSortKey="second"></th>
      </thead>
    </nz-table>
  `
})
export class NzTheadTestNzTableComponent {
  singleSort = false;
  sortChange = jasmine.createSpy('sort change');
}
