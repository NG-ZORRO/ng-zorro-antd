/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import {
  Component,
  DebugElement,
  OnInit,
  provideZoneChangeDetection,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzI18nService } from 'ng-zorro-antd/i18n';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';
import { NzTableComponent, NzTableModule, NzTableSize } from 'ng-zorro-antd/table';

describe('nz-table', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  describe('basic nz-table', () => {
    let fixture: ComponentFixture<NzTestTableBasicComponent>;
    let testComponent: NzTestTableBasicComponent;
    let table: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTableBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(NzTableComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(table.nativeElement.classList).toContain('ant-table-wrapper');
    });

    it('should pageIndex set work', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelector('.ant-pagination-item-active').innerText).toBe('1');
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelector('.ant-pagination-item-active').innerText).toBe('2');
    });

    it('should pageIndex click work', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      table.nativeElement.querySelectorAll('.ant-pagination-item')[1].click();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      expect(table.nativeElement.querySelector('.ant-pagination-item-active').innerText).toBe('2');
    });

    it('should pageSize change work', () => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(2);
      testComponent.pageSize = 20;
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
    });

    it('should pageSize change check pageIndex bounding', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageSize = 5;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.nzTableComponent.onPageIndexChange(1);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      fixture.destroy();
    }));

    it('should nzData change check pageIndex bounding', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.dataSet = [...testComponent.dataSet, ...testComponent.dataSet];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.dataSet = testComponent.dataSet.slice(0, 10);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      fixture.destroy();
    }));

    it('should pagination simple work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination-simple')).toBeNull();
      testComponent.simple = true;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination-simple')).toBeDefined();
    });

    it('should pagination work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination')).toBeDefined();
      expect(table.nativeElement.querySelectorAll('.ant-table-tbody tr').length).toBe(10);
      testComponent.pagination = false;
      testComponent.front = false;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination')).toBeNull();
      expect(table.nativeElement.querySelectorAll('.ant-table-tbody tr').length).toBe(20);
    });

    it('should bordered work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table').classList).not.toContain('ant-table-bordered');
      testComponent.bordered = true;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table').classList).toContain('ant-table-bordered');
    });

    it('should size work', () => {
      fixture.detectChanges();
      expect(testComponent.size).toBe('small');
      expect(table.nativeElement.querySelector('.ant-table').classList).toContain('ant-table-small');
      testComponent.size = 'middle';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table').classList).toContain('ant-table-middle');
      testComponent.size = 'default';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table').classList).toContain('ant-table');
    });

    it('should footer & title work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-title').innerText).toBe('Here is Title');
      expect(table.nativeElement.querySelector('.ant-table-footer').innerText).toBe('Here is Footer');
      testComponent.footer = false;
      testComponent.title = false;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-title')).toBeNull();
      expect(table.nativeElement.querySelector('.ant-table-footer')).toBeNull();
    });

    it('should noResult work', () => {
      testComponent.dataSet = [];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-placeholder').innerText.trim()).toBe('暂无数据');
      testComponent.noResult = 'test';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-placeholder').innerText).toBe('test');
    });

    it('should fixed header work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-scroll')).toBe(null);
      testComponent.fixHeader = true;
      expect(table.nativeElement.querySelector('.ant-table-scroll')).toBeDefined();
    });

    it('should width config', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('col').length).toBe(4);
      testComponent.widthConfig = ['100px', '50px'];
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('col')[0].style.width).toBe('100px');
      expect(table.nativeElement.querySelectorAll('col')[1].style.width).toBe('50px');
    });

    it('should showQuickJumper & showSizeChanger work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination-options-quick-jumper')).toBe(null);
      expect(table.nativeElement.querySelector('.ant-pagination-options-size-changer')).toBe(null);
      testComponent.showQuickJumper = true;
      testComponent.showSizeChanger = true;
      expect(table.nativeElement.querySelector('.ant-pagination-options-quick-jumper')).toBeDefined();
      expect(table.nativeElement.querySelector('.ant-pagination-options-size-changer')).toBeDefined();
    });

    it('should hideOnSinglePage work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination').children.length).not.toBe(0);
      testComponent.hideOnSinglePage = true;
      testComponent.dataSet = [{}];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination[hidden]')).not.toBeNull();
    });

    it('should showPagination work with nzFrontPagination and hideOnSinglePage', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination').children.length).not.toBe(0);
      testComponent.front = false;
      testComponent.hideOnSinglePage = true;
      testComponent.dataSet = [{}];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-pagination').children.length).not.toBe(0);
    });

    it('i18n', () => {
      testComponent.dataSet = [];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-placeholder').innerText.trim()).toBe('暂无数据');
      TestBed.inject(NzI18nService).setLocale(en_US);
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.ant-table-placeholder').innerText.trim()).toBe('No Data');
    });
  });

  describe('scroll nz-table', () => {
    let fixture: ComponentFixture<NzTestTableScrollComponent>;
    let testComponent: NzTestTableScrollComponent;
    let table: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTableScrollComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(NzTableComponent));
    });

    it('should change width affect scroll', () => {
      fixture.detectChanges();
      testComponent.width = 1000;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      const tableBody = table.nativeElement.querySelector('.ant-table-body');
      expect(tableBody.scrollWidth).toBe(tableBody.clientWidth);
    });
  });

  describe('double binding nz-table', () => {
    let fixture: ComponentFixture<NzTableSpecCrashComponent>;
    let testComponent: NzTableSpecCrashComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTableSpecCrashComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should not crash when double binding pageSize and pageIndex', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestTableRtlComponent>;
    let table: DebugElement;
    let tableElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTableRtlComponent);
      table = fixture.debugElement.query(By.directive(NzTableComponent));
      fixture.detectChanges();
      tableElement = table.nativeElement;
    });

    it('should table className correct on dir change', () => {
      fixture.detectChanges();
      expect(tableElement.classList).toContain('ant-table-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(tableElement.classList).not.toContain('ant-table-wrapper-rtl');
    });
  });
});

interface BasicTestDataItem {
  name?: string;
  age?: string;
  address?: string;
  description?: string;
  checked?: boolean;
  expand?: boolean;
}

type NzPageSizeChangeFn = (pageSize: number) => void;

@Component({
  imports: [NzTableModule],
  template: `
    <nz-table
      #dynamicTable
      [nzScroll]="fixHeader ? { y: '240px' } : {}"
      [(nzPageIndex)]="pageIndex"
      (nzPageIndexChange)="pageIndexChange($event)"
      [(nzPageSize)]="pageSize"
      (nzPageSizeChange)="pageSizeChange($event)"
      [nzData]="dataSet"
      [nzBordered]="bordered"
      [nzLoading]="loading"
      [nzShowSizeChanger]="showSizeChanger"
      [nzSimple]="simple"
      [nzShowQuickJumper]="showQuickJumper"
      [nzHideOnSinglePage]="hideOnSinglePage"
      [nzWidthConfig]="widthConfig"
      [nzShowPagination]="pagination"
      [nzFrontPagination]="front"
      [nzFooter]="footer ? 'Here is Footer' : null"
      [nzNoResult]="noResult"
      [nzTitle]="title ? 'Here is Title' : null"
      [nzSize]="size"
    >
      @if (header) {
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
      }
      <tbody>
        @for (data of dynamicTable.data; track data.age) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td>
              <a href="#">Action 一 {{ data.name }}</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzTestTableBasicComponent implements OnInit {
  @ViewChild(NzTableComponent, { static: false }) nzTableComponent!: NzTableComponent<BasicTestDataItem>;
  pageIndex = 1;
  pageIndexChange = jasmine.createSpy<NzPageSizeChangeFn>('pageIndex callback');
  pageSize = 10;
  pageSizeChange = jasmine.createSpy<NzPageSizeChangeFn>('pageSize callback');
  dataSet: BasicTestDataItem[] = [];
  noResult = '';
  showSizeChanger = false;
  showQuickJumper = false;
  hideOnSinglePage = false;
  bordered = false;
  loading = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  front = true;
  fixHeader = false;
  simple = false;
  size: NzTableSize = 'small';
  widthConfig: string[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.dataSet.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
  }
}

interface ScrollTestDataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  imports: [NzTableModule],
  template: `
    <div style="display: block;" [style.width.px]="width">
      <nz-table #nzTable [nzData]="dataSet" [nzPageSize]="10" [nzScroll]="{ x: '600px', y: '240px' }">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
            <th>Column 8</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @for (data of nzTable.data; track data) {
            <tr>
              <td>{{ data.name }}</td>
              <td>{{ data.age }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>{{ data.address }}</td>
              <td>
                <a>action</a>
              </td>
            </tr>
          }
        </tbody>
      </nz-table>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: `
    @import '../../../style/testing.less';
    @import '../../../style/entry.less';
  `
})
export class NzTestTableScrollComponent implements OnInit {
  @ViewChild(NzTableComponent, { static: false }) nzTableComponent!: NzTableComponent<ScrollTestDataItem>;
  dataSet: ScrollTestDataItem[] = [];
  width = 300;

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004 **/
@Component({
  imports: [NzTableModule],
  template: `
    <nz-table
      #nzTable
      [nzData]="data"
      [(nzPageIndex)]="pageIndex"
      [(nzPageSize)]="pageSize"
      (nzPageIndexChange)="pageIndexChange($event)"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
        </tr>
      </thead>
      <tbody>
        @for (item of nzTable.data; track item) {
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzTableSpecCrashComponent {
  data: Array<{ id: number; name: string }> = [];
  pageIndex = 1;
  pageSize = 10;
  pageIndexChange = jasmine.createSpy<NzPageSizeChangeFn>('pageSize callback');

  constructor() {
    setTimeout(() => {
      this.data = new Array(100).fill(1).map((_, i) => ({
        id: i + 1,
        name: `name ${i + 1}`
      }));
    }, 1000);
  }
}

interface RtlTestDataItem {
  name?: string;
  age?: string;
  address?: string;
  description?: string;
  checked?: boolean;
  expand?: boolean;
}

@Component({
  imports: [BidiModule, NzTableModule],
  template: `
    <div [dir]="direction">
      <nz-table #dynamicTable [nzData]="dataSet" [nzSimple]="simple">
        @if (header) {
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
        }
        <tbody>
          @for (data of dynamicTable.data; track data) {
            <tr>
              <td>{{ data.name }}</td>
              <td>{{ data.age }}</td>
              <td>{{ data.address }}</td>
              <td>
                <a href="#">Action 一 {{ data.name }}</a>
                <a href="#">Delete</a>
              </td>
            </tr>
          }
        </tbody>
      </nz-table>
    </div>
  `
})
export class NzTestTableRtlComponent implements OnInit {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';

  @ViewChild(NzTableComponent, { static: false }) nzTableComponent!: NzTableComponent<RtlTestDataItem>;
  pageIndex = 1;
  pageSize = 10;
  dataSet: RtlTestDataItem[] = [];
  header = true;
  simple = false;

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.dataSet.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
  }
}
