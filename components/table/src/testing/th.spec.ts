/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzThAddOnComponent, NzTableModule } from 'ng-zorro-antd/table';

describe('nz-th', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('nz-th addon in nz-table', () => {
    let fixture: ComponentFixture<NzThTestNzTableComponent>;
    let testComponent: NzThTestNzTableComponent;
    let th: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzThTestNzTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      th = fixture.debugElement.query(By.directive(NzThAddOnComponent));
    });

    it('should showSort work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-column-has-sorters');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter')).toBeDefined();
    });

    it('should sort change work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).not.toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).not.toContain('active');
      expect(th.nativeElement.classList).not.toContain('ant-table-column-sort');
      testComponent.sort = 'ascend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).not.toContain('active');
      expect(th.nativeElement.classList).toContain('ant-table-column-sort');
      testComponent.sort = 'descend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).not.toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('active');
      expect(th.nativeElement.classList).toContain('ant-table-column-sort');
      testComponent.sort = null;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).not.toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).not.toContain('active');
      expect(th.nativeElement.classList).not.toContain('ant-table-column-sort');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
    });

    it('should sort click work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).not.toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).not.toContain('active');
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sort).toBe('ascend');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).not.toContain('active');
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
      expect(testComponent.sort).toBe('descend');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-up').classList).not.toContain('active');
      expect(th.nativeElement.querySelector('.ant-table-column-sorter-down').classList).toContain('active');
      th.nativeElement.querySelector('.ant-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(3);
      expect(testComponent.sort).toBe(null);
    });

    it('should left work', () => {
      testComponent.left = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-cell-fix-left');
      expect(th.nativeElement.style.left).toBe('20px');
    });

    it('should right work', () => {
      testComponent.right = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('ant-table-cell-fix-right');
      expect(th.nativeElement.style.right).toBe('20px');
    });

    it('should be throw error when use specific class name', () => {
      expect(() => {
        TestBed.configureTestingModule({
          declarations: [NzTestDisableThComponent]
        }).createComponent(NzTestDisableThComponent);
      }).toThrow();
    });

    it('should not run change detection on click events for the `nz-filter-trigger`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const event = new MouseEvent('click');

      spyOn(appRef, 'tick');
      spyOn(event, 'stopPropagation').and.callThrough();

      fixture.debugElement.nativeElement
        .querySelector('nz-filter-trigger .ant-table-filter-trigger')
        .dispatchEvent(event);

      expect(appRef.tick).not.toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    @if (!destroy) {
      <nz-table>
        <th
          [nzLeft]="left"
          [nzRight]="right"
          [nzWidth]="width"
          [(nzSortOrder)]="sort"
          (nzSortOrderChange)="sortChange($event)"
          [nzFilters]="filters"
          (nzFilterChange)="filterChange($event)"
          [nzFilterMultiple]="filterMultiple"
        ></th>
      </nz-table>
    }
  `
})
export class NzThTestNzTableComponent {
  @ViewChild(NzThAddOnComponent, { static: false }) nzThComponent!: NzThAddOnComponent<NzSafeAny>;
  destroy = false;
  left: string | boolean = false;
  right: string | boolean = false;
  width: string | null = null;
  sort: string | null = null;
  sortChange = jasmine.createSpy('sort change');
  filters = [
    { text: 'filter1', value: '1' },
    { text: 'filter2', value: '2' }
  ];
  filterChange = jasmine.createSpy('filter change');
  filterMultiple = true;
}

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  imports: [NzTableModule],
  template: `
    <nz-table #filterTable [nzData]="displayData">
      <thead (nzSortOrderChange)="sort($any($event))">
        <tr>
          <th nzColumnKey="name" [nzFilters]="nameList" (nzFilterChange)="filter($event, searchAddress)">Name</th>
          <th nzColumnKey="age">Age</th>
          <th
            nzColumnKey="address"
            [nzFilterMultiple]="false"
            [nzFilters]="addressList"
            (nzFilterChange)="filter(listOfSearchName, $event)"
          >
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        @for (data of filterTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
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
  sortName: keyof ItemData | null = null;
  sortValue: string | null = null;
  listOfSearchName = ['Joe', 'London'];
  searchAddress!: string;
  data: ItemData[] = [
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
  displayData: ItemData[] = [];

  @ViewChild(NzThAddOnComponent, { static: false }) nzThComponent!: NzThAddOnComponent<ItemData>;

  sort(sort: { key: keyof ItemData; value: string }): void {
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
    const filterFunc = (item: { name: string; address: string; age: number }): boolean =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a: ItemData, b: ItemData) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
            ? 1
            : -1
      );
    } else {
      this.displayData = data;
    }
  }
}

@Component({
  imports: [NzTableModule],
  template: `<th class="nz-disable-th"></th>`
})
export class NzTestDisableThComponent {}
