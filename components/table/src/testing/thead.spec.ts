import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzTableModule } from '../table.module';
import { NzTableComponent } from '../table/table.component';

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
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('anticon-caret-down');
      upButtons[1].click();
      fixture.detectChanges();
      expect(upButtons[0].querySelector('.ant-table-column-sorter-down').classList).toContain('anticon-caret-down');
      expect(upButtons[1].querySelector('.ant-table-column-sorter-down').classList).toContain('anticon-caret-down');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });

    // Test for #3603
    it('should support dynamic headers', () => {
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
    it('should show correct colgroup', () => {
      fixture.detectChanges();
      const colgroup = table.nativeElement.querySelector('colgroup');
      const cols = colgroup.querySelectorAll('col');
      expect(cols.length).toBe(6);
    });
  });
});

@Component({
  template: `
    <nz-table>
      <thead (nzSortOrderChange)="sortChange($event)">
        <tr>
          <th nzColumnKey="first" [nzSortFn]="filterFn"></th>
          <th nzColumnKey="second" [nzSortFn]="filterFn"></th>
          <th *ngFor="let col of columns" [nzColumnKey]="col" [nzSortFn]="filterFn"></th>
          <th colspan="2">col with colSpan</th>
        </tr>
      </thead>
    </nz-table>
  `
})
export class NzTheadTestNzTableComponent {
  sortChange = jasmine.createSpy('sort change');
  columns = ['third', 'fourth'];
  filterFn = (): number => -1;
}
