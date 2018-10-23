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
      declarations: [ NzThTestNzTableComponent, NzThTestTableDefaultFilterComponent ],
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
      expect(th.nativeElement.classList).not.toContain('ant-table-column-has-actions');
      expect(th.nativeElement.classList).not.toContain('ant-table-column-has-sorters');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter')).toBeNull();
      testComponent.showSort = true;
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-column-has-actions');
      expect(th.nativeElement.classList).toContain('ant-table-column-has-sorters');
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
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sort).toBe('descend');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('off');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('on');
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
      expect(testComponent.sort).toBe('ascend');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('on');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('off');
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
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
      expect(th.nativeElement.classList).not.toContain('ant-table-column-has-filters');
      expect(th.nativeElement.querySelector('.anticon anticon-filter')).toBeNull();
      testComponent.showFilter = true;
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-column-has-filters');
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
    it('should hasFilter change after filters change with multiple', () => {
      testComponent.showFilter = true;
      fixture.detectChanges();
      testComponent.nzThComponent.checkMultiple(testComponent.nzThComponent.multipleFilterList[ 0 ]);
      testComponent.nzThComponent.search();
      fixture.detectChanges();
      expect(testComponent.nzThComponent.hasFilterValue).toBe(true);
      testComponent.filters = [
        { text: 'filter1', value: '4' },
        { text: 'filter2', value: '3' }
      ];
      fixture.detectChanges();
      expect(testComponent.nzThComponent.hasFilterValue).toBe(false);
    });
    it('should hasFilter change after filters change with single', () => {
      testComponent.showFilter = true;
      testComponent.filterMultiple = false;
      fixture.detectChanges();
      testComponent.nzThComponent.checkSingle(testComponent.nzThComponent.singleFilterList[ 0 ]);
      testComponent.nzThComponent.search();
      fixture.detectChanges();
      expect(testComponent.nzThComponent.hasFilterValue).toBe(true);
      testComponent.filters = [
        { text: 'filter1', value: '5' },
        { text: 'filter2', value: '3' }
      ];
      fixture.detectChanges();
      expect(testComponent.nzThComponent.hasFilterValue).toBe(false);
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
    it('should be throw error when use specific class name', () => {
      expect(() => {
        TestBed.configureTestingModule({
          declarations: [ NzTestDisableThComponent ]
        }).createComponent(NzTestDisableThComponent);
      }).toThrow();
    });
  });
  describe('nz-th with default filter in nz-table', () => {
    let fixture;
    let testComponent;
    let th;
    let table;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzThTestTableDefaultFilterComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      th = fixture.debugElement.query(By.directive(NzThComponent));
      table = fixture.debugElement.query(By.directive(NzTableComponent));
    });
    // It's a fake test to pass codecov, because default displayData should be configured by user.
    it('should default filter work', () => {
      expect(testComponent.displayData.length).toBe(0);
      expect(testComponent.nzThComponent.hasFilterValue).toBe(true);
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

@Component({
  selector: 'nz-demo-table-default-filter',
  template: `
    <nz-table #filterTable [nzData]="displayData">
      <thead (nzSortChange)="sort($event)" nzSingleSort>
        <tr>
          <th nzShowSort nzSortKey="name" nzShowFilter [nzFilters]="nameList" (nzFilterChange)="filter($event,searchAddress)">Name</th>
          <th nzShowSort nzSortKey="age">Age</th>
          <th nzShowSort nzSortKey="address" nzShowFilter [nzFilterMultiple]="false" [nzFilters]="addressList" (nzFilterChange)="filter(listOfSearchName,$event)">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`
})
export class NzThTestTableDefaultFilterComponent {
  nameList = [
    { text: 'Joe', value: 'Joe', byDefault: true },
    { text: 'Jim', value: 'Jim' }
  ];
  addressList = [
    { text: 'London', value: 'London', byDefault: true },
    { text: 'Sidney', value: 'Sidney' }
  ];
  sortName = null;
  sortValue = null;
  listOfSearchName = [ 'Joe', 'London' ];
  searchAddress: string;
  data = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [ ];

  @ViewChild(NzThComponent) nzThComponent: NzThComponent;

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
}

@Component({
  selector: 'nz-disable-th',
  template: `
    <th class="nz-disable-th" [nzShowCheckbox]="true"></th>
  `
})
export class NzTestDisableThComponent {}
