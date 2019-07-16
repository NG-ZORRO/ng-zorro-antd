import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzTableComponent } from './nz-table.component';
import { NzTableModule } from './nz-table.module';

describe('nz-thead', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule, NzIconTestModule],
      declarations: [NzTheadTestNzTableComponent]
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
      upButtons[0].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      upButtons[1].click();
      fixture.detectChanges();
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(upButtons[1].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });
    it('should singleSort change', () => {
      testComponent.singleSort = true;
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      const upButtons = table.nativeElement.querySelectorAll('.ant-table-column-sorters');
      upButtons[0].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      upButtons[1].click();
      fixture.detectChanges();
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(upButtons[1].querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });

    // Test for #3603
    it('should support dynamic headers', () => {
      testComponent.singleSort = true;
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      let upButtons = table.nativeElement.querySelectorAll('.ant-table-column-sorters');
      upButtons[2].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      upButtons[3].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);

      testComponent.columns = testComponent.columns.slice(0, 1);
      fixture.detectChanges();
      upButtons = table.nativeElement.querySelectorAll('.ant-table-column-sorters');
      expect(upButtons.length).toBe(3);
      upButtons[2].click();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(3);
    });
  });
});

@Component({
  template: `
    <nz-table>
      <thead [nzSingleSort]="singleSort" (nzSortChange)="sortChange($event)">
        <th nzShowSort nzSortKey="first"></th>
        <th nzShowSort nzSortKey="second"></th>
        <th nzShowSort *ngFor="let col of columns" [nzSortKey]="col"></th>
      </thead>
    </nz-table>
  `
})
export class NzTheadTestNzTableComponent {
  singleSort = false;
  sortChange = jasmine.createSpy('sort change');
  columns = ['third', 'fourth'];
}
