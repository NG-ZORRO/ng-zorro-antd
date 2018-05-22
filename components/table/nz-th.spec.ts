import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzTableComponent } from './nz-table.component';
import { NzTableModule } from './nz-table.module';
import { NzThComponent } from './nz-th.component';

describe('nz-th', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTableModule ],
      declarations: [ NzThTestNzTableComponent ],
      providers   : [ NzMeasureScrollbarService ]
    });
    TestBed.compileComponents();
  }));
  describe('nz-th in nz-table', () => {
    let fixture;
    let testComponent;
    let th;
    let table;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzThTestNzTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      th = fixture.debugElement.query(By.directive(NzThComponent));
      table = fixture.debugElement.query(By.directive(NzTableComponent));
    });
    it('should showCheckbox work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeNull();
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeDefined();
      expect(th.nativeElement.classList).toContain('ant-table-selection-column');
      testComponent.showCheckbox = false;
      fixture.detectChanges();
      expect(th.nativeElement.classList).not.toContain('ant-table-selection-column');
    });
    it('should checked work', fakeAsync(() => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList).not.toContain('ant-checkbox-checked');
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList).toContain('ant-checkbox-checked');
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
      th.nativeElement.querySelector('.ant-checkbox-wrapper').click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
    });
    it('should showSort work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter')).toBeNull();
      testComponent.showSort = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter')).toBeDefined();
    });
    it('should sort change work', () => {
      testComponent.showSort = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(th.nativeElement.classList).not.toContain('ant-table-column-sort');
      testComponent.sort = 'ascend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('on');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(th.nativeElement.classList).toContain('ant-table-column-sort');
      testComponent.sort = 'descend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('on');
      expect(th.nativeElement.classList).toContain('ant-table-column-sort');
      testComponent.sort = null;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      expect(th.nativeElement.classList).not.toContain('ant-table-column-sort');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
    });
    it('should sort click work', () => {
      testComponent.showSort = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      th.nativeElement.querySelector('.ant-table-column-sorter-up').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sort).toBe('ascend');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('on');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      th.nativeElement.querySelector('.ant-table-column-sorter-down').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
      expect(testComponent.sort).toBe('descend');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('on');
      th.nativeElement.querySelector('.ant-table-column-sorter-down').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(3);
      expect(testComponent.sort).toBe(null);
    });
    it('should left work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.classList).not.toContain('ant-table-th-left-sticky');
      testComponent.left = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-th-left-sticky');
      expect(th.nativeElement.style.left).toBe('20px');
    });
    it('should right work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.classList).not.toContain('ant-table-th-right-sticky');
      testComponent.right = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-th-right-sticky');
      expect(th.nativeElement.style.right).toBe('20px');
    });
    it('should width work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('col').style.width).toBe('');
      testComponent.width = '200px';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('col').style.width).toBe('200px');
    });
    it('should showRowSelection work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-selection-down')).toBeNull();
      testComponent.showRowSelection = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-selection-down')).toBeDefined();
    });
    it('should filters not array warn', () => {
      console.warn = jasmine.createSpy('warn');
      fixture.detectChanges();
      expect(console.warn).toHaveBeenCalledTimes(0);
      testComponent.filters = null;
      fixture.detectChanges();
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
    it('should showFilter work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.anticon anticon-filter')).toBeNull();
      testComponent.showFilter = true;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.anticon anticon-filter')).toBeDefined();
    });
    it('should filterChange work', () => {
      testComponent.showFilter = true;
      fixture.detectChanges();
      testComponent.nzThComponent.dropDownVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.filterChange).toHaveBeenCalledTimes(0);
      testComponent.nzThComponent.checkMultiple(testComponent.nzThComponent.multipleFilterList[ 0 ]);
      testComponent.nzThComponent.dropDownVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.nzThComponent.hasFilterValue).toBe(true);
      expect(testComponent.filterChange).toHaveBeenCalledWith([ '1' ]);
    });
    it('should reset work', () => {
      testComponent.showFilter = true;
      fixture.detectChanges();
      testComponent.nzThComponent.dropDownVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.filterChange).toHaveBeenCalledTimes(0);
      testComponent.nzThComponent.reset();
      fixture.detectChanges();
      expect(testComponent.filterChange).toHaveBeenCalledWith([]);
      expect(testComponent.nzThComponent.hasFilterValue).toBe(false);
    });
    it('should filterMultiple work', () => {
      testComponent.showFilter = true;
      testComponent.filterMultiple = false;
      fixture.detectChanges();
      testComponent.nzThComponent.dropDownVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.filterChange).toHaveBeenCalledTimes(0);
      testComponent.nzThComponent.checkSingle(testComponent.nzThComponent.singleFilterList[ 0 ]);
      testComponent.nzThComponent.dropDownVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.filterChange).toHaveBeenCalledWith('1');
      expect(testComponent.nzThComponent.hasFilterValue).toBe(true);
    });
    it('should expand work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.classList).not.toContain('ant-table-expand-icon-th');
      testComponent.expand = true;
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-expand-icon-th');
    });
  });
});

@Component({
  selector: 'nz-th-test-nz-table',
  template: `
    <nz-table>
      <th
        [nzExpand]="expand"
        [nzShowCheckbox]="showCheckbox"
        [(nzChecked)]="checked"
        [nzIndeterminate]="indeterminate"
        (nzCheckedChange)="checkedChange($event)"
        [nzDisabled]="disabled"
        [nzLeft]="left"
        [nzRight]="right"
        [nzWidth]="width"
        [nzShowSort]="showSort"
        [(nzSort)]="sort"
        (nzSortChange)="sortChange($event)"
        [nzShowRowSelection]="showRowSelection"
        [nzSelections]="selections"
        [nzShowFilter]="showFilter"
        [nzFilters]="filters"
        (nzFilterChange)="filterChange($event)"
        [nzFilterMultiple]="filterMultiple"
      ></th>
    </nz-table>`
})
export class NzThTestNzTableComponent {
  @ViewChild(NzThComponent) nzThComponent: NzThComponent;
  showCheckbox = false;
  checked = false;
  checkedChange = jasmine.createSpy('show change');
  indeterminate = false;
  disabled = false;
  left;
  right;
  width;
  showSort = false;
  sort = null;
  sortChange = jasmine.createSpy('sort change');
  showRowSelection = false;
  selections = [
    {
      text    : 'select one',
      onSelect: jasmine.createSpy('select change')
    }
  ];
  filters = [
    { text: 'filter1', value: '1' },
    { text: 'filter2', value: '2' }
  ];
  filterChange = jasmine.createSpy('filter change');
  showFilter = false;
  filterMultiple = true;
  expand = false;
}
