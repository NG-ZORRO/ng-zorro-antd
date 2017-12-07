/* tslint:disable:no-unused-variable */
import {
  Component,
  ViewChild
} from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzPaginationComponent } from './nz-pagination.component';
import { NzPaginationModule } from './nz-pagination.module';

describe('NzPaginationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzPaginationModule ],
      declarations: [ TestPaginationBasicComponent, TestPaginationChangerComponent, TestPaginationSimpleComponent, TestPaginationShowTotalComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('for nz-pagination', () => {
    it('the correct pages are displayed and the previous page is disabled or not disabled', () => {
      const fixture = TestBed.createComponent(TestPaginationBasicComponent);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-prev').classList.contains('ant-pagination-item-active')).toBe(false);
      expect(debugElement.nativeElement.querySelector('.ant-pagination-prev').classList.contains('ant-pagination-disabled')).toBe(true);
      expect(debugElement.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(5);

      testComponent._nzPageIndex = 5;
      testComponent._nzTotal = 50;
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-next').classList.contains('ant-pagination-item-active')).toBe(false);
      expect(debugElement.nativeElement.querySelector('.ant-pagination-next').classList.contains('ant-pagination-disabled')).toBe(true);

      testComponent._nzPageIndex = 3;
      testComponent._nzTotal = 50;
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-item:nth-child(4)').classList.contains('ant-pagination-item-active')).toBe(true);
      expect(debugElement.nativeElement.querySelector('.ant-pagination-prev').classList.contains('ant-pagination-disabled')).toBe(false);
      expect(debugElement.nativeElement.querySelector('.ant-pagination-next').classList.contains('ant-pagination-disabled')).toBe(false);

      testComponent._nzPageIndex = 3;
      testComponent._nzTotal = 500;
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(6);
      expect(debugElement.nativeElement.querySelector('.ant-pagination-jump-next')).toBeDefined();
    });
    it('correct double binding', () => {
      const fixture = TestBed.createComponent(TestPaginationBasicComponent);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      testComponent._nzTotal = 50;
      fixture.detectChanges();
      debugElement.nativeElement.querySelector('.ant-pagination-item:nth-child(4)').click();
      fixture.detectChanges();
      expect(testComponent._nzPageIndex).toBe(3);
    });

    it('change each page to display the entry', () => {
      const fixture = TestBed.createComponent(TestPaginationChangerComponent);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-options')).toBeDefined();
      expect(debugElement.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(6);

      testComponent._nzPageSize = 20;
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelectorAll('.ant-pagination-item').length).toBe(6);
    });

    it('mini version shows normal', () => {
      const fixture = TestBed.createComponent(TestPaginationChangerComponent);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      testComponent._nzSize = '';
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination').classList.contains('mini')).toBe(false);

      testComponent._nzSize = 'small';
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination').classList.contains('mini')).toBe(true);
    });

    // it('Quickly jump to a page', () => {
    //   const fixture = TestBed.createComponent(TestPaginationQuickJumper);
    //   const testComponent = fixture.debugElement.componentInstance;
    //   const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
    //   fixture.detectChanges();
    //   expect(debugElement.nativeElement.querySelector('.ant-pagination-options-quick-jumper')).toBeDefined();
    //
    //   testComponent._nzSize = 'small';
    //   fixture.detectChanges();
    //   expect(debugElement.nativeElement.querySelector('.ant-pagination').classList.contains('mini')).toBe(true);
    // });

    it('simply flip the page', () => {
      const fixture = TestBed.createComponent(TestPaginationSimpleComponent);
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination').classList.contains('ant-pagination-simple')).toBe(true);
    });

    it('show how much data is available by setting nzShowTotal.', () => {
      const fixture = TestBed.createComponent(TestPaginationShowTotalComponent);
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-total-text')).toBeDefined();
    });
    it('correct disabled style when reach first and last pageIndex', () => {
      const fixture = TestBed.createComponent(TestPaginationShowTotalComponent);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-prev').className).toEqual('ant-pagination-prev ant-pagination-disabled');
      testComponent.pageSize = 4;
      fixture.detectChanges();
      expect(debugElement.nativeElement.querySelector('.ant-pagination-next').className).toEqual('ant-pagination-next ant-pagination-disabled');
    });

  });

  @Component({
    selector: 'nz-test-pagination-basic',
    template: `
      <nz-pagination [(nzPageIndex)]="_nzPageIndex" [nzTotal]="_nzTotal"></nz-pagination>
    `
  })
  class TestPaginationBasicComponent {
    _nzPageIndex = 1;
    _nzTotal = 50;
    // _nzSize = '';
  }

  @Component({
    selector: 'nz-test-pagination-changer',
    template: `
      <nz-pagination [nzPageIndex]="_nzPageIndex" [nzTotal]="_nzTotal" nzShowSizeChanger
        [nzPageSize]="_nzPageSize" [nzSize]="_nzSize"></nz-pagination>`
  })
  class TestPaginationChangerComponent {
    _nzPageIndex = 3;
    _nzTotal = 500;
    _nzPageSize = 40;
    _nzSize = '';
  }

// @Component({
//   selector: 'nz-demo-pagination-quick-jumper',
//   template: `
//     <nz-pagination [(nzPageIndex)]="1" [nzTotal]="50" [nzSize]="_nzSize" nzShowSizeChanger
//                    nzShowQuickJumper></nz-pagination>
//   `
// })
// class TestPaginationQuickJumper {
//   _nzSize = '';
// }

  @Component({
    selector: 'nz-test-pagination-simple',
    template: `
      <nz-pagination [nzPageIndex]="2" [nzTotal]="50" nzSimple></nz-pagination>`,
    styles  : []
  })
  class TestPaginationSimpleComponent {
  }

  @Component({
    selector: 'nz-test-pagination-total',
    template: `
      <nz-pagination [nzPageIndex]="pageSize" [nzTotal]="80" nzShowTotal [nzPageSize]="20"></nz-pagination>`,
    styles  : []
  })
  class TestPaginationShowTotalComponent {
    pageSize = 1;
  }

});
