/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';

import { NzOverflowContainerComponent } from './overflow-container.component';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective],
  template: `
    <nz-overflow-container>
      <span class="suffix" nzOverflowSuffix>search</span>
      @for (item of items; track item) {
        <span class="item" nzOverflowItem>{{ item }}</span>
      }
      <span class="rest" nzOverflowRest>+ rest</span>
    </nz-overflow-container>
  `
})
class OverflowHostComponent {
  items = ['one', 'two', 'three'];
}

describe('overflow', () => {
  describe('with a resize observer', () => {
    let fixture: ComponentFixture<OverflowHostComponent>;
    let resize: ReturnType<typeof createResizeHarness>;

    beforeEach(() => {
      resize = createResizeHarness();
      TestBed.configureTestingModule({
        providers: [{ provide: NzResizeObserverFactory, useValue: resize.factory }]
      });
      fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();
    });

    it('should project items, then rest, then suffix', () => {
      const container = fixture.nativeElement.querySelector('nz-overflow-container') as HTMLElement;
      expect([...container.children].map(element => element.className)).toEqual([
        'item',
        'item',
        'item',
        'rest',
        'suffix'
      ]);
    });

    it('should show every item when the measured widths fit', async () => {
      measure(fixture, { container: 400, item: 50, rest: 40, suffix: 20 });
      resize.flush();
      await fixture.whenStable();

      expect(containerOf(fixture).displayCount()).toBe(2);
      expect(itemsOf(fixture).every(item => !item.hasAttribute('inert') && item.style.opacity === '1')).toBe(true);
      expect(restOf(fixture).hasAttribute('inert')).toBe(true);
      expect(suffixOf(fixture).style.position).not.toBe('absolute');
    });

    it('should hide the tail, show the rest, and pin the suffix', async () => {
      measure(fixture, { container: 200, item: 80, rest: 50, suffix: 30 });
      resize.flush();
      await fixture.whenStable();

      const items = itemsOf(fixture);
      expect(containerOf(fixture).displayCount()).toBe(0);
      expect(items[0].hasAttribute('inert')).toBe(false);
      expect(items[1].hasAttribute('inert')).toBe(true);
      expect(items[1].style.opacity).toBe('0');
      expect(items[2].hasAttribute('inert')).toBe(true);
      expect(restOf(fixture).hasAttribute('inert')).toBe(false);
      expect(suffixOf(fixture).style.position).toBe('absolute');
      expect(suffixOf(fixture).style.getPropertyValue('inset-inline-start')).toBe('130px');
      expect(suffixOf(fixture).style.left).toBe('');
    });

    it('should show fewer items when the rest becomes wider', async () => {
      measure(fixture, { container: 220, item: 70, rest: 30, suffix: 20 });
      resize.flush();
      await fixture.whenStable();
      expect(containerOf(fixture).displayCount()).toBe(1);

      measure(fixture, { container: 220, item: 70, rest: 90, suffix: 20 });
      resize.flush();
      await fixture.whenStable();

      expect(containerOf(fixture).displayCount()).toBe(0);
      expect(itemsOf(fixture).filter(item => !item.hasAttribute('inert')).length).toBe(1);
    });

    it('should react to a later container resize', async () => {
      measure(fixture, { container: 200, item: 80, rest: 50, suffix: 30 });
      resize.flush();
      await fixture.whenStable();
      expect(containerOf(fixture).displayCount()).toBe(0);

      measure(fixture, { container: 400, item: 80, rest: 50, suffix: 30 });
      resize.flush();
      await fixture.whenStable();

      expect(containerOf(fixture).displayCount()).toBe(2);
      expect(itemsOf(fixture).every(item => !item.hasAttribute('inert'))).toBe(true);
    });

    it('should measure items created by @for', async () => {
      measure(fixture, { container: 400, item: 50, rest: 40, suffix: 20 });
      resize.flush();
      await fixture.whenStable();

      expect(itemsOf(fixture).length).toBe(3);
      expect(containerOf(fixture).displayCount()).toBe(2);
    });
  });

  describe('without ResizeObserver', () => {
    it('should keep every item visible when the factory returns null', async () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NzResizeObserverFactory, useValue: { create: (): null => null } }]
      });
      const fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(containerOf(fixture).displayCount()).toBe(Number.MAX_SAFE_INTEGER);
      expect(itemsOf(fixture).length).toBe(3);
      expect(itemsOf(fixture).every(item => !item.hasAttribute('inert') && item.style.opacity !== '0')).toBe(true);
    });
  });
});

function containerOf(fixture: ComponentFixture<OverflowHostComponent>): NzOverflowContainerComponent {
  return fixture.debugElement.query(By.directive(NzOverflowContainerComponent)).componentInstance;
}

function itemsOf(fixture: ComponentFixture<OverflowHostComponent>): HTMLElement[] {
  return [...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.item')];
}

function restOf(fixture: ComponentFixture<OverflowHostComponent>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.rest')!;
}

function suffixOf(fixture: ComponentFixture<OverflowHostComponent>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.suffix')!;
}

function measure(
  fixture: ComponentFixture<OverflowHostComponent>,
  widths: { container: number; item: number; rest: number; suffix: number }
): void {
  setMeasuredWidth(
    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('nz-overflow-container')!,
    widths.container
  );
  itemsOf(fixture).forEach(item => setMeasuredWidth(item, widths.item));
  setMeasuredWidth(restOf(fixture), widths.rest);
  setMeasuredWidth(suffixOf(fixture), widths.suffix);
}

function setMeasuredWidth(element: HTMLElement, width: number): void {
  Object.defineProperty(element, 'clientWidth', { configurable: true, get: () => width });
  Object.defineProperty(element, 'offsetWidth', { configurable: true, get: () => width });
}

function createResizeHarness(): { factory: NzResizeObserverFactory; flush: () => void } {
  const observed: Array<{ callback: ResizeObserverCallback; elements: Set<Element> }> = [];
  const factory: NzResizeObserverFactory = {
    create(callback: ResizeObserverCallback): ResizeObserver {
      const record = { callback, elements: new Set<Element>() };
      observed.push(record);
      return {
        observe: element => {
          record.elements.add(element);
        },
        unobserve: element => {
          record.elements.delete(element);
        },
        disconnect: () => {
          record.elements.clear();
        }
      } as ResizeObserver;
    }
  };
  return {
    factory,
    flush: () => {
      for (const record of observed) {
        const entries = [...record.elements].map(target => ({ target }) as ResizeObserverEntry);
        if (entries.length) {
          record.callback(entries, null as unknown as ResizeObserver);
        }
      }
    }
  };
}
