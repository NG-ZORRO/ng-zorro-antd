/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { EmbeddedProperty, NzColDirective } from './col.directive';
import { NzGridModule } from './grid.module';
import { NzAlign, NzJustify, NzRowDirective } from './row.directive';

declare const viewport: NzSafeAny;
const setWindowWidth = (width: number): void => {
  viewport.set(width);
  window.dispatchEvent(new Event('resize'));
  tick(100);
};

describe('grid', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  describe('row', () => {
    let fixture: ComponentFixture<TestGridComponent>;
    let component: TestGridComponent;
    let rowElement: HTMLElement;
    let colElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestGridComponent);
      component = fixture.componentInstance;
      rowElement = fixture.debugElement.query(By.directive(NzRowDirective)).nativeElement;
      colElement = fixture.debugElement.query(By.directive(NzColDirective)).nativeElement;
    });

    it('should apply className', () => {
      expect(rowElement.className).toBe('ant-row');
    });

    it('should apply className according to align', () => {
      const listOfAlign: NzAlign[] = ['top', 'middle', 'bottom'];
      listOfAlign.forEach(align => {
        component.align = align;
        fixture.detectChanges();
        expect(rowElement.classList).toContain(`ant-row-${align}`);
      });
    });

    it('should apply className according to justify', () => {
      const listOfJustify: NzJustify[] = ['start', 'end', 'center', 'space-around', 'space-between'];
      listOfJustify.forEach(justify => {
        component.justify = justify;
        fixture.detectChanges();
        expect(rowElement.classList).toContain(`ant-row-${justify}`);
      });
    });

    it('should gutter number work', () => {
      expect(rowElement.style.cssText).toBe('');
      expect(colElement.style.cssText).toBe('');
      component.gutter = 16;
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
    });

    it('should gutter string work', () => {
      expect(rowElement.style.cssText).toBe('');
      expect(colElement.style.cssText).toBe('');
      component.gutter = '16';
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
    });

    it('should gutter number array work', () => {
      component.gutter = [16, 16];
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -8px;');
      expect(colElement.style.cssText).toBe('padding: 8px;');
    });

    it('should gutter responsive work', fakeAsync(() => {
      component.gutter = { xs: 8, sm: 16, md: 24 };
      setWindowWidth(480);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -4px; margin-right: -4px;');
      expect(colElement.style.cssText).toBe('padding-left: 4px; padding-right: 4px;');
      setWindowWidth(600);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
      setWindowWidth(800);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -12px; margin-right: -12px;');
      expect(colElement.style.cssText).toBe('padding-left: 12px; padding-right: 12px;');
    }));

    it('should gutter responsive array work', fakeAsync(() => {
      component.gutter = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 4, sm: 8, md: 12 }
      ];
      setWindowWidth(480);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -2px -4px;');
      expect(colElement.style.cssText).toBe('padding: 2px 4px;');
      setWindowWidth(600);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -4px -8px;');
      expect(colElement.style.cssText).toBe('padding: 4px 8px;');
      setWindowWidth(800);
      fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -6px -12px;');
      expect(colElement.style.cssText).toBe('padding: 6px 12px;');
    }));
  });

  describe('col', () => {
    let fixture: ComponentFixture<TestColComponent>;
    let component: TestColComponent;
    let colElement: HTMLElement;
    const sizeMatch = (name: string, count: number, size?: string): boolean => {
      const middle = size ? `-${size}-` : '-';
      if (name === 'span') {
        return colElement.classList.contains(`ant-col${middle}${count}`);
      } else {
        return colElement.classList.contains(`ant-col${middle}${name}-${count}`);
      }
    };

    beforeEach(() => {
      fixture = TestBed.createComponent(TestColComponent);
      colElement = fixture.debugElement.query(By.directive(NzColDirective)).nativeElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply className', () => {
      expect(colElement.className).toBe('ant-col');
    });

    it('should apply style according to flex', () => {
      component.flex = 1;
      fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 1 1 auto;');
      component.flex = '100px';
      fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 0 0 100px;');
    });

    it('should apply className according to property', () => {
      const propertySizeMatch = (name: keyof TestColComponent, count: number): boolean => {
        component[name] = count;
        fixture.detectChanges();
        return sizeMatch(name, count);
      };
      expect(propertySizeMatch('span', 8)).toBe(true);
      expect(propertySizeMatch('offset', 8)).toBe(true);
      expect(propertySizeMatch('order', 8)).toBe(true);
      expect(propertySizeMatch('pull', 8)).toBe(true);
      expect(propertySizeMatch('push', 8)).toBe(true);
      expect(propertySizeMatch('xs', 8)).toBe(true);
      expect(propertySizeMatch('sm', 8)).toBe(true);
      expect(propertySizeMatch('md', 8)).toBe(true);
      expect(propertySizeMatch('lg', 8)).toBe(true);
      expect(propertySizeMatch('xl', 8)).toBe(true);
      expect(propertySizeMatch('xxl', 8)).toBe(true);
    });

    it('should apply className according to responsive size object', () => {
      const batchSizeMatch = (count: number, size: string): boolean =>
        sizeMatch('span', count, size) &&
        sizeMatch('offset', count, size) &&
        sizeMatch('order', count, size) &&
        sizeMatch('pull', count, size) &&
        sizeMatch('push', count, size);
      component.xs = { span: 1, offset: 1, order: 1, pull: 1, push: 1 };
      component.sm = { span: 2, offset: 2, order: 2, pull: 2, push: 2 };
      component.md = { span: 3, offset: 3, order: 3, pull: 3, push: 3 };
      component.lg = { span: 4, offset: 4, order: 4, pull: 4, push: 4 };
      component.xl = { span: 5, offset: 5, order: 5, pull: 5, push: 5 };
      component.xxl = { span: 6, offset: 6, order: 6, pull: 6, push: 6 };
      fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(true);
      expect(batchSizeMatch(2, 'sm')).toBe(true);
      expect(batchSizeMatch(3, 'md')).toBe(true);
      expect(batchSizeMatch(4, 'lg')).toBe(true);
      expect(batchSizeMatch(5, 'xl')).toBe(true);
      expect(batchSizeMatch(6, 'xxl')).toBe(true);
      component.xs = { span: 2, offset: 2, order: 2, pull: 2, push: 2 };
      fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(false);
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestGridRtlComponent>;
    let rowElement: HTMLElement;
    let colElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestGridRtlComponent);
      rowElement = fixture.debugElement.query(By.directive(NzRowDirective)).nativeElement;
      colElement = fixture.debugElement.query(By.directive(NzColDirective)).nativeElement;
      fixture.detectChanges();
    });

    describe('row', () => {
      it('should className correct on dir change', () => {
        expect(rowElement.className).toBe('ant-row ant-row-rtl');

        fixture.componentInstance.direction = 'ltr';
        fixture.detectChanges();

        expect(rowElement.className).toBe('ant-row');
      });
    });

    describe('col', () => {
      it('should className correct on dir change', () => {
        expect(colElement.className).toBe('ant-col ant-col-rtl');

        fixture.componentInstance.direction = 'ltr';
        fixture.detectChanges();

        expect(colElement.className).toBe('ant-col');
      });
    });
  });
});

@Component({
  imports: [NzGridModule],
  template: `
    <div nz-row [nzGutter]="gutter" [nzJustify]="justify" [nzAlign]="align">
      <div nz-col></div>
    </div>
  `
})
export class TestGridComponent {
  gutter:
    | string
    | number
    | null
    | [number, number]
    | Record<string, number>
    | [Record<string, number>, Record<string, number>] = null;
  flex: string | null = null;
  justify: NzJustify | null = null;
  align: NzAlign | null = null;
}

@Component({
  imports: [NzGridModule],
  template: `
    <div nz-row>
      <div
        nz-col
        [nzSpan]="span"
        [nzFlex]="flex"
        [nzOffset]="offset"
        [nzOrder]="order"
        [nzPull]="pull"
        [nzPush]="push"
        [nzXs]="xs"
        [nzSm]="sm"
        [nzMd]="md"
        [nzLg]="lg"
        [nzXl]="xl"
        [nzXXl]="xxl"
      ></div>
    </div>
  `
})
export class TestColComponent {
  span: number | null = null;
  flex: string | null | number = null;
  offset: number | null = null;
  order: number | null = null;
  pull: number | null = null;
  push: number | null = null;
  xs: string | number | EmbeddedProperty | null = null;
  sm: string | number | EmbeddedProperty | null = null;
  md: string | number | EmbeddedProperty | null = null;
  lg: string | number | EmbeddedProperty | null = null;
  xl: string | number | EmbeddedProperty | null = null;
  xxl: string | number | EmbeddedProperty | null = null;
}

@Component({
  imports: [BidiModule, NzGridModule],
  template: `
    <div [dir]="direction">
      <div nz-row>
        <div nz-col></div>
      </div>
    </div>
  `
})
export class NzTestGridRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
