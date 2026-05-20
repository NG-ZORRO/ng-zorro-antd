/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Component, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideMockDirectionality, sleep } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { ColSize, NzColDirective } from './col.directive';
import { NzGridModule } from './grid.module';
import { NzAlign, Gutter, NzJustify, NzRowDirective } from './row.directive';

declare const viewport: NzSafeAny;

describe('grid', () => {
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

    async function setWindowWidth(width: number): Promise<void> {
      viewport.set(width);
      window.dispatchEvent(new Event('resize'));
      await sleep(100);
      fixture.detectChanges();
      await fixture.whenStable();
    }

    it('should apply className', () => {
      expect(rowElement.className).toBe('ant-row');
    });

    it('should apply className according to align', () => {
      const listOfAlign: NzAlign[] = ['top', 'middle', 'bottom'];
      listOfAlign.forEach(align => {
        component.align.set(align);
        fixture.detectChanges();
        expect(rowElement.classList).toContain(`ant-row-${align}`);
      });
    });

    it('should apply className according to justify', () => {
      const listOfJustify: NzJustify[] = ['start', 'end', 'center', 'space-around', 'space-between'];
      listOfJustify.forEach(justify => {
        component.justify.set(justify);
        fixture.detectChanges();
        expect(rowElement.classList).toContain(`ant-row-${justify}`);
      });
    });

    it('should gutter number work', () => {
      expect(rowElement.style.cssText).toBe('');
      expect(colElement.style.cssText).toBe('');
      component.gutter.set(16);
      fixture.detectChanges();
      expect(rowElement.style.marginInline).toBe('-8px');
      expect(colElement.style.paddingInline).toBe('8px');
    });

    it('should gutter string css unit work', () => {
      component.gutter.set('1rem');
      fixture.detectChanges();
      expect(rowElement.style.marginInline).toBe('calc(-0.5rem)');
      expect(colElement.style.paddingInline).toBe('calc(0.5rem)');
    });

    it('should gutter number array work', () => {
      component.gutter.set([16, 16]);
      fixture.detectChanges();
      expect(rowElement.style.marginInline).toBe('-8px');
      expect(rowElement.style.rowGap).toBe('16px');
      expect(colElement.style.paddingInline).toBe('8px');
    });

    it('should gutter string css unit array work', () => {
      component.gutter.set(['1rem', '0.5rem']);
      fixture.detectChanges();
      expect(rowElement.style.marginInline).toBe('calc(-0.5rem)');
      expect(rowElement.style.rowGap).toBe('0.5rem');
      expect(colElement.style.paddingInline).toBe('calc(0.5rem)');
    });

    it('should gutter responsive work', async () => {
      component.gutter.set({ xs: 8, sm: 16, md: 24 });
      await setWindowWidth(480);
      expect(rowElement.style.marginInline).toBe('-4px');
      expect(colElement.style.paddingInline).toBe('4px');
      await setWindowWidth(600);
      expect(rowElement.style.marginInline).toBe('-8px');
      expect(colElement.style.paddingInline).toBe('8px');
      await setWindowWidth(800);
      expect(rowElement.style.marginInline).toBe('-12px');
      expect(colElement.style.paddingInline).toBe('12px');
    });

    it('should gutter responsive array work', async () => {
      component.gutter.set([
        { xs: 8, sm: 16, md: 24 },
        { xs: 4, sm: 8, md: 12 }
      ]);
      await setWindowWidth(480);
      await fixture.whenStable();
      expect(rowElement.style.marginInline).toBe('-4px');
      expect(rowElement.style.rowGap).toBe('4px');
      expect(colElement.style.paddingInline).toBe('4px');
      await setWindowWidth(600);
      expect(rowElement.style.marginInline).toBe('-8px');
      expect(rowElement.style.rowGap).toBe('8px');
      expect(colElement.style.paddingInline).toBe('8px');
      await setWindowWidth(800);
      expect(rowElement.style.marginInline).toBe('-12px');
      expect(rowElement.style.rowGap).toBe('12px');
      expect(colElement.style.paddingInline).toBe('12px');
    });
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
      component.flex.set(1);
      fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 1 1 auto;');
      component.flex.set('100px');
      fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 0 0 100px;');
    });

    it('should apply className according to property', () => {
      const propertySizeMatch = (name: keyof TestColComponent, count: number): boolean => {
        (component[name] as WritableSignal<NzSafeAny>).set(count);
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
      component.xs.set({ span: 1, offset: 1, order: 1, pull: 1, push: 1 });
      component.sm.set({ span: 2, offset: 2, order: 2, pull: 2, push: 2 });
      component.md.set({ span: 3, offset: 3, order: 3, pull: 3, push: 3 });
      component.lg.set({ span: 4, offset: 4, order: 4, pull: 4, push: 4 });
      component.xl.set({ span: 5, offset: 5, order: 5, pull: 5, push: 5 });
      component.xxl.set({ span: 6, offset: 6, order: 6, pull: 6, push: 6 });
      fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(true);
      expect(batchSizeMatch(2, 'sm')).toBe(true);
      expect(batchSizeMatch(3, 'md')).toBe(true);
      expect(batchSizeMatch(4, 'lg')).toBe(true);
      expect(batchSizeMatch(5, 'xl')).toBe(true);
      expect(batchSizeMatch(6, 'xxl')).toBe(true);
      component.xs.set({ span: 2, offset: 2, order: 2, pull: 2, push: 2 });
      fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(false);
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<TestGridComponent>;
    let rowElement: HTMLElement;
    let colElement: HTMLElement;
    let mockDirectionality: Directionality;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockDirectionality()]
      });
      mockDirectionality = TestBed.inject(Directionality);
      fixture = TestBed.createComponent(TestGridComponent);
      rowElement = fixture.debugElement.query(By.directive(NzRowDirective)).nativeElement;
      colElement = fixture.debugElement.query(By.directive(NzColDirective)).nativeElement;
      fixture.detectChanges();
    });

    describe('row', () => {
      it('should className correct on dir change', () => {
        expect(rowElement.className).toBe('ant-row');
        mockDirectionality.valueSignal.set('rtl');
        fixture.detectChanges();
        expect(rowElement.className).toBe('ant-row ant-row-rtl');
      });
    });

    describe('col', () => {
      it('should className correct on dir change', () => {
        expect(colElement.className).toBe('ant-col');
        mockDirectionality.valueSignal.set('rtl');
        fixture.detectChanges();
        expect(colElement.className).toBe('ant-col ant-col-rtl');
      });
    });
  });
});

@Component({
  imports: [NzGridModule],
  template: `
    <div nz-row [nzGutter]="gutter()" [nzJustify]="justify()" [nzAlign]="align()">
      <div nz-col></div>
    </div>
  `
})
export class TestGridComponent {
  gutter = signal<Gutter | [Gutter, Gutter] | null>(null);
  flex = signal<string | null>(null);
  justify = signal<NzJustify | null>(null);
  align = signal<NzAlign | null>(null);
}

@Component({
  imports: [NzGridModule],
  template: `
    <div nz-row>
      <div
        nz-col
        [nzSpan]="span()"
        [nzFlex]="flex()"
        [nzOffset]="offset()"
        [nzOrder]="order()"
        [nzPull]="pull()"
        [nzPush]="push()"
        [nzXs]="xs()"
        [nzSm]="sm()"
        [nzMd]="md()"
        [nzLg]="lg()"
        [nzXl]="xl()"
        [nzXXl]="xxl()"
      ></div>
    </div>
  `
})
export class TestColComponent {
  span = signal<number | null>(null);
  flex = signal<string | number | null>(null);
  offset = signal<number | null>(null);
  order = signal<number | null>(null);
  pull = signal<number | null>(null);
  push = signal<number | null>(null);
  xs = signal<string | number | ColSize | null>(null);
  sm = signal<string | number | ColSize | null>(null);
  md = signal<string | number | ColSize | null>(null);
  lg = signal<string | number | ColSize | null>(null);
  xl = signal<string | number | ColSize | null>(null);
  xxl = signal<string | number | ColSize | null>(null);
}
