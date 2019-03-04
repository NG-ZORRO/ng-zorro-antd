import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoGridBasicComponent } from './demo/basic';
import { NzDemoGridFlexComponent } from './demo/flex';
import { NzDemoGridFlexAlignComponent } from './demo/flex-align';
import { NzDemoGridFlexOrderComponent } from './demo/flex-order';
import { NzDemoGridGutterComponent } from './demo/gutter';
import { NzDemoGridOffsetComponent } from './demo/offset';
import { NzDemoGridPlaygroundComponent } from './demo/playground';
import { NzDemoGridResponsiveComponent } from './demo/responsive';
import { NzDemoGridResponsiveMoreComponent } from './demo/responsive-more';
import { NzDemoGridSortComponent } from './demo/sort';
import { NzColDirective } from './nz-col.directive';
import { NzGridModule } from './nz-grid.module';
import { NzRowDirective } from './nz-row.directive';

describe('grid', () => {
  let testComponent;
  let fixture;
  describe('basic', () => {
    let rows;
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridBasicComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      rows = fixture.debugElement.queryAll(By.directive(NzRowDirective));
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(rows.every(row => row.nativeElement.classList.contains('ant-row'))).toBe(true);
      expect(cols[ 0 ].nativeElement.classList.contains('ant-col-12')).toBe(true);
      expect(cols[ 1 ].nativeElement.classList.contains('ant-col-12')).toBe(true);
      expect(cols[ 2 ].nativeElement.classList.contains('ant-col-8')).toBe(true);
      expect(cols[ 3 ].nativeElement.classList.contains('ant-col-8')).toBe(true);
      expect(cols[ 4 ].nativeElement.classList.contains('ant-col-8')).toBe(true);
      expect(cols[ 5 ].nativeElement.classList.contains('ant-col-6')).toBe(true);
      expect(cols[ 6 ].nativeElement.classList.contains('ant-col-6')).toBe(true);
      expect(cols[ 7 ].nativeElement.classList.contains('ant-col-6')).toBe(true);
      expect(cols[ 8 ].nativeElement.classList.contains('ant-col-6')).toBe(true);
    });
  });
  describe('flex', () => {
    let rows;
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridFlexComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridFlexComponent);
      testComponent = fixture.debugElement.componentInstance;
      rows = fixture.debugElement.queryAll(By.directive(NzRowDirective));
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(rows[ 0 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-start');
      expect(rows[ 1 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-center');
      expect(rows[ 2 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-end');
      expect(rows[ 3 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-space-between');
      expect(rows[ 4 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-space-around');
      expect(cols.every(col => col.nativeElement.classList.contains('ant-col-4'))).toBe(true);
    });
  });
  describe('flex-align', () => {
    let rows;
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridFlexAlignComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridFlexAlignComponent);
      testComponent = fixture.debugElement.componentInstance;
      rows = fixture.debugElement.queryAll(By.directive(NzRowDirective));
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(rows[ 0 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-center');
      expect(rows[ 1 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-middle ant-row-flex-space-around');
      expect(rows[ 2 ].nativeElement.className).toBe('ant-row-flex ant-row-flex-bottom ant-row-flex-space-between');
      expect(cols.every(col => col.nativeElement.classList.contains('ant-col-4'))).toBe(true);
    });
  });
  describe('flex-order', () => {
    let row;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridFlexOrderComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridFlexOrderComponent);
      testComponent = fixture.debugElement.componentInstance;
      row = fixture.debugElement.query(By.directive(NzRowDirective));
    });

    it('should have update order correctly', fakeAsync(() => {
      fixture.detectChanges();
      let cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
      expect(row.nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-start');
      expect(cols[ 0 ].nativeElement.classList.contains('ant-col-order-1')).toBe(true);
      expect(cols[ 1 ].nativeElement.classList.contains('ant-col-order-2')).toBe(true);
      expect(cols[ 2 ].nativeElement.classList.contains('ant-col-order-3')).toBe(true);
      expect(cols[ 3 ].nativeElement.classList.contains('ant-col-order-4')).toBe(true);
      tick(10000);
      fixture.detectChanges();
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
      expect(row.nativeElement.className).toBe('ant-row-flex ant-row-flex-top ant-row-flex-start');
      expect(cols[ 0 ].nativeElement.classList.contains('ant-col-order-4')).toBe(true);
      expect(cols[ 1 ].nativeElement.classList.contains('ant-col-order-3')).toBe(true);
      expect(cols[ 2 ].nativeElement.classList.contains('ant-col-order-2')).toBe(true);
      expect(cols[ 3 ].nativeElement.classList.contains('ant-col-order-1')).toBe(true);
    }));
  });

  describe('gutter', () => {
    let rows;
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridGutterComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridGutterComponent);
      testComponent = fixture.debugElement.componentInstance;
      rows = fixture.debugElement.queryAll(By.directive(NzRowDirective));
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });
    it('should number work', () => {
      fixture.detectChanges();
      expect(rows[ 0 ].nativeElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(cols.slice(0, 4).every(col => col.nativeElement.style.cssText === 'padding-left: 8px; padding-right: 8px;')).toBe(true);
      expect(cols.slice(0, 4).every(col => col.nativeElement.classList.contains('gutter-row'))).toBe(true);
    });
    it('should responsive work', () => {
      // TODO: fake media query
      fixture.detectChanges();
      expect(rows[ 1 ].nativeElement.style.cssText).toBe('margin-left: -4px; margin-right: -4px;');
      expect(cols.slice(4, 8).every(col => col.nativeElement.style.cssText === 'padding-left: 4px; padding-right: 4px;')).toBe(true);
      expect(cols.slice(4, 8).every(col => col.nativeElement.classList.contains('gutter-row'))).toBe(true);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(rows[ 1 ].nativeElement.style.cssText).toBe('margin-left: -4px; margin-right: -4px;');
      expect(cols.slice(4, 8).every(col => col.nativeElement.style.cssText === 'padding-left: 4px; padding-right: 4px;')).toBe(true);
      expect(cols.slice(4, 8).every(col => col.nativeElement.classList.contains('gutter-row'))).toBe(true);
    });
  });
  describe('offset', () => {
    let rows;
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridOffsetComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridOffsetComponent);
      testComponent = fixture.debugElement.componentInstance;
      rows = fixture.debugElement.queryAll(By.directive(NzRowDirective));
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });
    it('should have correct style', () => {
      fixture.detectChanges();
      expect(rows.every(row => row.nativeElement.classList.contains('ant-row'))).toBe(true);
      expect(cols[ 0 ].nativeElement.className).toBe('ant-col-8');
      expect(cols[ 1 ].nativeElement.className).toBe('ant-col-8 ant-col-offset-8');
      expect(cols[ 2 ].nativeElement.className).toBe('ant-col-6 ant-col-offset-6');
      expect(cols[ 3 ].nativeElement.className).toBe('ant-col-6 ant-col-offset-6');
      expect(cols[ 4 ].nativeElement.className).toBe('ant-col-12 ant-col-offset-6');
    });
  });

  describe('responsive', () => {
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridResponsiveComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridResponsiveComponent);
      testComponent = fixture.debugElement.componentInstance;
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });
    it('should have correct style', () => {
      fixture.detectChanges();
      expect(cols[ 0 ].nativeElement.className).toBe('ant-col-xs-2 ant-col-sm-4 ant-col-md-6 ant-col-lg-8 ant-col-xl-10');
      expect(cols[ 1 ].nativeElement.className).toBe('ant-col-xs-20 ant-col-sm-16 ant-col-md-12 ant-col-lg-8 ant-col-xl-4');
      expect(cols[ 2 ].nativeElement.className).toBe('ant-col-xs-2 ant-col-sm-4 ant-col-md-6 ant-col-lg-8 ant-col-xl-10');
    });
  });

  describe('responsive-more', () => {
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridResponsiveMoreComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridResponsiveMoreComponent);
      testComponent = fixture.debugElement.componentInstance;
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });
    it('should have correct style', () => {
      fixture.detectChanges();
      expect(cols[ 0 ].nativeElement.className).toBe('ant-col-xs-5 ant-col-xs-offset-1 ant-col-lg-6 ant-col-lg-offset-2');
      expect(cols[ 1 ].nativeElement.className).toBe('ant-col-xs-11 ant-col-xs-offset-1 ant-col-lg-6 ant-col-lg-offset-2');
      expect(cols[ 2 ].nativeElement.className).toBe('ant-col-xs-5 ant-col-xs-offset-1 ant-col-lg-6 ant-col-lg-offset-2');
    });
  });

  describe('sort', () => {
    let cols;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridSortComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridSortComponent);
      testComponent = fixture.debugElement.componentInstance;
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
    });
    it('should have correct style', () => {
      fixture.detectChanges();
      expect(cols[ 0 ].nativeElement.className).toBe('ant-col-18 ant-col-push-6');
      expect(cols[ 1 ].nativeElement.className).toBe('ant-col-6 ant-col-pull-18');
    });
  });

  describe('playground', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzGridModule ],
        declarations: [ NzDemoGridPlaygroundComponent ],
        providers   : [],
        schemas     : [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoGridPlaygroundComponent);
      testComponent = fixture.debugElement.componentInstance;
    });
    it('should update gutter and count correctly', () => {
      fixture.detectChanges();
      const row = fixture.debugElement.query(By.directive(NzRowDirective));
      let cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
      expect(cols.length).toBe(4);
      expect(cols.every(col => col.nativeElement.style.cssText === 'padding-left: 8px; padding-right: 8px;')).toBe(true);
      expect(row.nativeElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      testComponent.gutter = 24;
      testComponent.count = 12;
      fixture.detectChanges();
      cols = fixture.debugElement.queryAll(By.directive(NzColDirective));
      expect(cols.length).toBe(12);
      expect(cols.every(col => col.nativeElement.style.cssText === 'padding-left: 12px; padding-right: 12px;')).toBe(true);
      expect(row.nativeElement.style.cssText).toBe('margin-left: -12px; margin-right: -12px;');
    });
  });
});
