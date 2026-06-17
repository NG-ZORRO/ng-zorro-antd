/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';
import { NzTableComponent, NzTableModule, NzTableSize } from 'ng-zorro-antd/table';

describe('nz-table', () => {
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

    it('should not crash when pageSize is zero', () => {
      testComponent.pageSize = 0;
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('.ant-table-tbody tr').length).toBe(20);
      expect(table.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(1);
    });

    it('should pageSize change check pageIndex bounding', async () => {
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
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);

      testComponent.nzTableComponent.onPageIndexChange(1);
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      fixture.destroy();
    });

    it('should nzData change check pageIndex bounding', async () => {
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
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.dataSet = testComponent.dataSet.slice(0, 10);
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      fixture.destroy();
    });

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

  testDirectionality(() => NzTestTableBasicComponent, By.directive(NzTableComponent), 'ant-table-wrapper');
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
      [nzScroll]="fixHeaderSignal() ? { y: '240px' } : {}"
      [nzPageIndex]="pageIndexSignal()"
      (nzPageIndexChange)="pageIndex = $event; pageIndexChange($event)"
      [nzPageSize]="pageSizeSignal()"
      (nzPageSizeChange)="pageSize = $event; pageSizeChange($event)"
      [nzData]="dataSetSignal()"
      [nzBordered]="borderedSignal()"
      [nzLoading]="loadingSignal()"
      [nzShowSizeChanger]="showSizeChangerSignal()"
      [nzSimple]="simpleSignal()"
      [nzShowQuickJumper]="showQuickJumperSignal()"
      [nzHideOnSinglePage]="hideOnSinglePageSignal()"
      [nzWidthConfig]="widthConfigSignal()"
      [nzShowPagination]="paginationSignal()"
      [nzFrontPagination]="frontSignal()"
      [nzFooter]="footerSignal() ? 'Here is Footer' : null"
      [nzNoResult]="noResultSignal()"
      [nzTitle]="titleSignal() ? 'Here is Title' : null"
      [nzSize]="sizeSignal()"
    >
      @if (headerSignal()) {
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
  readonly pageIndexSignal = signal(1);
  pageIndexChange = jasmine.createSpy<NzPageSizeChangeFn>('pageIndex callback');
  readonly pageSizeSignal = signal(10);
  pageSizeChange = jasmine.createSpy<NzPageSizeChangeFn>('pageSize callback');
  readonly dataSetSignal = signal<BasicTestDataItem[]>([]);
  readonly noResultSignal = signal('');
  readonly showSizeChangerSignal = signal(false);
  readonly showQuickJumperSignal = signal(false);
  readonly hideOnSinglePageSignal = signal(false);
  readonly borderedSignal = signal(false);
  readonly loadingSignal = signal(false);
  readonly paginationSignal = signal(true);
  readonly headerSignal = signal(true);
  readonly titleSignal = signal(true);
  readonly footerSignal = signal(true);
  readonly frontSignal = signal(true);
  readonly fixHeaderSignal = signal(false);
  readonly simpleSignal = signal(false);
  readonly sizeSignal = signal<NzTableSize>('small');
  readonly widthConfigSignal = signal<string[]>([]);

  get pageIndex(): number {
    return this.pageIndexSignal();
  }

  set pageIndex(value: number) {
    this.pageIndexSignal.set(value);
  }

  get pageSize(): number {
    return this.pageSizeSignal();
  }

  set pageSize(value: number) {
    this.pageSizeSignal.set(value);
  }

  get dataSet(): BasicTestDataItem[] {
    return this.dataSetSignal();
  }

  set dataSet(value: BasicTestDataItem[]) {
    this.dataSetSignal.set(value);
  }

  get noResult(): string {
    return this.noResultSignal();
  }

  set noResult(value: string) {
    this.noResultSignal.set(value);
  }

  get showSizeChanger(): boolean {
    return this.showSizeChangerSignal();
  }

  set showSizeChanger(value: boolean) {
    this.showSizeChangerSignal.set(value);
  }

  get showQuickJumper(): boolean {
    return this.showQuickJumperSignal();
  }

  set showQuickJumper(value: boolean) {
    this.showQuickJumperSignal.set(value);
  }

  get hideOnSinglePage(): boolean {
    return this.hideOnSinglePageSignal();
  }

  set hideOnSinglePage(value: boolean) {
    this.hideOnSinglePageSignal.set(value);
  }

  get bordered(): boolean {
    return this.borderedSignal();
  }

  set bordered(value: boolean) {
    this.borderedSignal.set(value);
  }

  get loading(): boolean {
    return this.loadingSignal();
  }

  set loading(value: boolean) {
    this.loadingSignal.set(value);
  }

  get pagination(): boolean {
    return this.paginationSignal();
  }

  set pagination(value: boolean) {
    this.paginationSignal.set(value);
  }

  get header(): boolean {
    return this.headerSignal();
  }

  set header(value: boolean) {
    this.headerSignal.set(value);
  }

  get title(): boolean {
    return this.titleSignal();
  }

  set title(value: boolean) {
    this.titleSignal.set(value);
  }

  get footer(): boolean {
    return this.footerSignal();
  }

  set footer(value: boolean) {
    this.footerSignal.set(value);
  }

  get front(): boolean {
    return this.frontSignal();
  }

  set front(value: boolean) {
    this.frontSignal.set(value);
  }

  get fixHeader(): boolean {
    return this.fixHeaderSignal();
  }

  set fixHeader(value: boolean) {
    this.fixHeaderSignal.set(value);
  }

  get simple(): boolean {
    return this.simpleSignal();
  }

  set simple(value: boolean) {
    this.simpleSignal.set(value);
  }

  get size(): NzTableSize {
    return this.sizeSignal();
  }

  set size(value: NzTableSize) {
    this.sizeSignal.set(value);
  }

  get widthConfig(): string[] {
    return this.widthConfigSignal();
  }

  set widthConfig(value: string[]) {
    this.widthConfigSignal.set(value);
  }

  ngOnInit(): void {
    const dataSet: BasicTestDataItem[] = [];
    for (let i = 1; i <= 20; i++) {
      dataSet.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    this.dataSet = dataSet;
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
    <div style="display: block;" [style.width.px]="widthSignal()">
      <nz-table #nzTable [nzData]="dataSetSignal()" [nzPageSize]="10" [nzScroll]="{ x: '600px', y: '240px' }">
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
  readonly dataSetSignal = signal<ScrollTestDataItem[]>([]);
  readonly widthSignal = signal(300);

  get dataSet(): ScrollTestDataItem[] {
    return this.dataSetSignal();
  }

  set dataSet(value: ScrollTestDataItem[]) {
    this.dataSetSignal.set(value);
  }

  get width(): number {
    return this.widthSignal();
  }

  set width(value: number) {
    this.widthSignal.set(value);
  }

  ngOnInit(): void {
    const dataSet: ScrollTestDataItem[] = [];
    for (let i = 0; i < 100; i++) {
      dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
    this.dataSet = dataSet;
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004 **/
@Component({
  imports: [NzTableModule],
  template: `
    <nz-table
      #nzTable
      [nzData]="dataSignal()"
      [nzPageIndex]="pageIndexSignal()"
      (nzPageIndexChange)="pageIndex = $event; pageIndexChange($event)"
      [nzPageSize]="pageSizeSignal()"
      (nzPageSizeChange)="pageSize = $event"
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
  readonly dataSignal = signal<Array<{ id: number; name: string }>>([]);
  readonly pageIndexSignal = signal(1);
  readonly pageSizeSignal = signal(10);
  pageIndexChange = jasmine.createSpy<NzPageSizeChangeFn>('pageSize callback');

  get data(): Array<{ id: number; name: string }> {
    return this.dataSignal();
  }

  set data(value: Array<{ id: number; name: string }>) {
    this.dataSignal.set(value);
  }

  get pageIndex(): number {
    return this.pageIndexSignal();
  }

  set pageIndex(value: number) {
    this.pageIndexSignal.set(value);
  }

  get pageSize(): number {
    return this.pageSizeSignal();
  }

  set pageSize(value: number) {
    this.pageSizeSignal.set(value);
  }

  constructor() {
    setTimeout(() => {
      this.data = new Array(100).fill(1).map((_, i) => ({
        id: i + 1,
        name: `name ${i + 1}`
      }));
    }, 1000);
  }
}
