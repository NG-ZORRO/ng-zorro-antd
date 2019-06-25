import { Component, DebugElement, Injector, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import en_US from '../i18n/languages/en_US';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzPaginationComponent } from './nz-pagination.component';
import { NzPaginationModule } from './nz-pagination.module';

describe('pagination', () => {
  let injector: Injector;

  beforeEach(async(() => {
    injector = TestBed.configureTestingModule({
      imports: [NzPaginationModule, NoopAnimationsModule],
      declarations: [NzTestPaginationComponent, NzTestPaginationRenderComponent, NzTestPaginationTotalComponent]
    });
    TestBed.compileComponents();
  }));

  describe('pagination complex', () => {
    let fixture: ComponentFixture<NzTestPaginationComponent>;
    let testComponent: NzTestPaginationComponent;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestPaginationComponent);
      testComponent = fixture.debugElement.componentInstance;
      pagination = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement.firstElementChild;
    });
    describe('not simple mode', () => {
      it('should className correct', () => {
        fixture.detectChanges();
        expect(paginationElement.classList.contains('ant-pagination')).toBe(true);
        expect(paginationElement.firstElementChild!.classList.contains('ant-pagination-prev')).toBe(true);
        expect(paginationElement.firstElementChild!.classList.contains('ant-pagination-disabled')).toBe(true);
        expect(paginationElement.lastElementChild!.classList.contains('ant-pagination-next')).toBe(true);
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[0].classList.contains('ant-pagination-item-active')).toBe(true);
        expect(array.every((node: HTMLElement) => node.classList.contains('ant-pagination-item'))).toBe(true);
      });
      it('should small size className correct', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(paginationElement.classList.contains('mini')).toBe(true);
      });
      it('should pageIndex change work', () => {
        testComponent.pageIndex = 2;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[1].classList.contains('ant-pagination-item-active')).toBe(true);
      });
      it('should pageIndex change not trigger when same', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[0].classList.contains('ant-pagination-item-active')).toBe(true);
        array[0].click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      });
      it('should change pageIndex change pages list', () => {
        fixture.detectChanges();
        testComponent.total = 500;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(9);
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(11);
      });
      it('should pre button disabled', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[0] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        expect(testComponent.pageIndex).toBe(1);
      });
      it('should pre button work', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[0] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(4);
      });
      it('should next button disabled', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.lastElementChild as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        expect(testComponent.pageIndex).toBe(5);
      });
      it('should next button work', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.lastElementChild as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(2);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      });
      it('should click pageIndex work', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[3] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(3);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      });
      it('should total change style work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(9);
      });
      it('should next five work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        testComponent.pageIndex = 46;
        fixture.detectChanges();
        (paginationElement.children[8] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(50);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(paginationElement.children.length).toBe(9);
      });
      it('should pre five work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(11);
        (paginationElement.children[2] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(1);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(paginationElement.children.length).toBe(9);
      });
      it('should showSizeChanger work', async(() => {
        testComponent.total = 500;
        testComponent.pageIndex = 50;
        testComponent.showSizeChanger = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(paginationElement.children.length).toBe(10);
          expect(paginationElement.lastElementChild!.classList.contains('ant-pagination-options')).toBe(true);
        });
      }));
      it('should change pageSize correct', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        testComponent.nzPaginationComponent.onPageSizeChange(20);
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(3);
        expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(1);
      });
      it('should showQuickJumper work', () => {
        testComponent.showQuickJumper = true;
        fixture.detectChanges();
        const input = pagination.nativeElement.querySelector('input');
        input.value = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const event = new KeyboardEvent('keydown', {
          code: 'ENTER'
        });
        testComponent.nzPaginationComponent.handleKeyDown(event, input, true);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        expect(input.value).toBe('');
        testComponent.nzPaginationComponent.handleKeyDown(event, input, true);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = 'abc';
        testComponent.nzPaginationComponent.handleKeyDown(event, input, true);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = -1;
        testComponent.nzPaginationComponent.handleKeyDown(event, input, true);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = 10;
        testComponent.nzPaginationComponent.handleKeyDown(event, input, true);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
      });
      it('should nzDisabled work', () => {
        fixture.detectChanges();
        testComponent.disabled = true;
        fixture.detectChanges();
        console.log(paginationElement.classList);
        expect(paginationElement.classList.contains('ant-pagination-disabled')).toBe(true);
      });
    });
    describe('simple mode', () => {
      beforeEach(() => {
        testComponent.simple = true;
        fixture.detectChanges();
        paginationElement = pagination.nativeElement.firstElementChild;
      });
      it('should simple className work', () => {
        expect(paginationElement.classList.contains('ant-pagination-simple')).toBe(true);
        expect(paginationElement.firstElementChild!.classList.contains('ant-pagination-prev')).toBe(true);
        expect(paginationElement.lastElementChild!.classList.contains('ant-pagination-next')).toBe(true);
      });
      it('should simple pager jump', () => {
        fixture.detectChanges();
        const input = pagination.nativeElement.querySelector('input');
        input.value = 5;
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const event = new KeyboardEvent('keydown', {
          code: 'ENTER'
        });
        testComponent.nzPaginationComponent.handleKeyDown(event, input, false);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('5');
        expect(testComponent.pageIndex).toBe(5);
        testComponent.nzPaginationComponent.handleKeyDown(event, input, false);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('5');
        input.value = 100;
        expect(testComponent.pageIndex).toBe(5);
        testComponent.nzPaginationComponent.handleKeyDown(event, input, false);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('5');
        expect(testComponent.pageIndex).toBe(5);
      });
    });
    it('should zero total hide all', () => {
      testComponent.total = 0;
      fixture.detectChanges();
      expect(pagination.nativeElement.innerText).toEqual('');
    });
    it('should be hidden pagination when total is 0 and nzHideOnSinglePage is true', () => {
      (testComponent as NzTestPaginationComponent).total = 0;
      (testComponent as NzTestPaginationComponent).hideOnSinglePage = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.ant-pagination')).toBeNull();
    });
  });
  describe('pagination render items', () => {
    let fixture: ComponentFixture<NzTestPaginationRenderComponent>;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestPaginationRenderComponent);
      pagination = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement.firstElementChild;
    });
    it('should render correct', () => {
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText).toBe('Previous');
      expect((paginationElement.lastElementChild as HTMLElement).innerText).toBe('Next');
      expect((paginationElement.children[1] as HTMLElement).innerText).toBe('2');
    });
  });
  describe('pagination total items', () => {
    let fixture: ComponentFixture<NzTestPaginationTotalComponent>;
    let testComponent: NzTestPaginationTotalComponent;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestPaginationTotalComponent);
      testComponent = fixture.debugElement.componentInstance;
      pagination = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement.firstElementChild;
    });
    it('should render correct', () => {
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe('1-20 of 85 items');
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe('21-40 of 85 items');
      testComponent.pageIndex = 5;
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe('81-85 of 85 items');
    });
  });

  it('#i18n', () => {
    const fixture = TestBed.createComponent(NzTestPaginationComponent);
    const dl = fixture.debugElement;
    fixture.detectChanges();
    injector.get(NzI18nService).setLocale(en_US);
    fixture.detectChanges();
    const prevText = (dl.query(By.css('.ant-pagination-prev')).nativeElement as HTMLElement).title;
    expect(prevText).toBe(en_US.Pagination.prev_page);
    const nextText = (dl.query(By.css('.ant-pagination-next')).nativeElement as HTMLElement).title;
    expect(nextText).toBe(en_US.Pagination.next_page);
  });
});

@Component({
  template: `
    <nz-pagination
      [nzSimple]="simple"
      [(nzPageIndex)]="pageIndex"
      [nzDisabled]="disabled"
      (nzPageIndexChange)="pageIndexChange($event)"
      [(nzPageSize)]="pageSize"
      (nzPageSizeChange)="pageSizeChange($event)"
      [nzSize]="size"
      [nzTotal]="total"
      [nzHideOnSinglePage]="hideOnSinglePage"
      [nzPageSizeOptions]="pageSizeOptions"
      [nzShowSizeChanger]="showSizeChanger"
      [nzShowQuickJumper]="showQuickJumper"
    >
    </nz-pagination>
  `
})
export class NzTestPaginationComponent {
  @ViewChild(NzPaginationComponent, { static: false }) nzPaginationComponent: NzPaginationComponent;
  pageIndex = 1;
  pageSize = 10;
  total = 50;
  disabled = false;
  pageIndexChange = jasmine.createSpy('pageIndexChange callback');
  pageSizeChange = jasmine.createSpy('pageSizeChange callback');
  showQuickJumper = false;
  showSizeChanger = false;
  hideOnSinglePage = false;
  pageSizeOptions = [10, 20, 30, 40];
  simple = false;
  size = '';
}

@Component({
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="50" [nzItemRender]="renderItemTemplate"></nz-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <a *ngIf="type === 'pre'">Previous</a>
      <a *ngIf="type === 'next'">Next</a>
      <a *ngIf="type === 'page'">{{ page * 2 }}</a>
    </ng-template>
  `
})
export class NzTestPaginationRenderComponent {}

@Component({
  template: `
    <nz-pagination
      [(nzPageIndex)]="pageIndex"
      [nzTotal]="85"
      [nzPageSize]="20"
      [nzShowTotal]="rangeTemplate"
    ></nz-pagination>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>
  `
})
export class NzTestPaginationTotalComponent {
  pageIndex = 1;
}
