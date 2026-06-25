/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideMockDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDescriptionsComponent } from './descriptions.component';
import { NzDescriptionsModule } from './descriptions.module';

declare const viewport: NzSafeAny;

describe('descriptions', () => {
  describe('with different spans', () => {
    let testComponent: NzTestDescriptionsComponent;
    let componentElement: HTMLElement;
    let fixture: ComponentFixture<NzTestDescriptionsComponent>;
    let rows;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDescriptionsComponent);
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('should have correct layout', () => {
      let title = componentElement.querySelector('.ant-descriptions-title');
      const view = componentElement.querySelector('.ant-descriptions-view');

      expect(title).toBeTruthy();
      expect(view).toBeTruthy();

      testComponent.title.set('');
      fixture.detectChanges();
      title = componentElement.querySelector('.ant-descriptions-title');
      expect(title).toBeFalsy();
    });

    it('should render spans correctly', () => {
      const spyOnWarn = vi.spyOn(console, 'warn');
      spyOnWarn.mockClear();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);

      testComponent.colspanArray.set([1, 1, 1, 2, 3, 1, 5]);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(3);
      expect(spyOnWarn).toHaveBeenCalledTimes(2);
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 3 but we have row length 5');
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 3 but we have row length 6');

      testComponent.column.set(5);
      testComponent.colspanArray.set([1, 2, 3]);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);
      expect(spyOnWarn).toHaveBeenCalledTimes(4);
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 5 but we have row length 6');

      testComponent.colspanArray.set([1, 2, 2]);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);

      // Should the last fill the rest space.
      testComponent.colspanArray.set([1, 1]);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      const tds = componentElement.querySelectorAll('.ant-descriptions-item');
      expect(rows.length).toBe(1);
      expect((tds[1] as HTMLTableCellElement).colSpan).toBe(4);
      spyOnWarn.mockClear();
    });

    it('should responsive work', async () => {
      testComponent.column.set({
        xxl: 3,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1
      });
      testComponent.colspanArray.set([1, 1, 1, 2, 3, 1, 5]);

      viewport.set(1024, 1024);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 1000);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(3);

      viewport.set(320, 320);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 1000);
      fixture.detectChanges();

      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(7);

      viewport.reset();
    });

    // fix #3795
    it('should change to use content work', async () => {
      let firstTitle = componentElement.querySelector('.ant-descriptions-item-label') as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item Title 0');

      testComponent.itemTitle.set('Item ');
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
      firstTitle = componentElement.querySelector('.ant-descriptions-item-label') as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item 0');
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestDescriptionsComponent>;
    let componentElement: HTMLElement;
    let dir: Directionality;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockDirectionality()]
      });
      fixture = TestBed.createComponent(NzTestDescriptionsComponent);
      componentElement = fixture.debugElement.query(By.directive(NzDescriptionsComponent)).nativeElement;
      dir = fixture.debugElement.injector.get(Directionality);
      fixture.detectChanges();
    });

    it('should className correct on dir change', () => {
      dir.valueSignal.set('rtl');
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-descriptions-rtl');

      dir.valueSignal.set('ltr');
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('ant-descriptions-rtl');
    });
  });
});

@Component({
  imports: [NzDescriptionsModule],
  selector: 'nz-test-descriptions',
  template: `
    <nz-descriptions [nzTitle]="title()" [nzBordered]="bordered()" [nzColumn]="column()">
      @for (col of colspanArray(); track $index) {
        <nz-descriptions-item [nzTitle]="itemTitle() + $index" [nzSpan]="col" />
      }
    </nz-descriptions>
  `
})
export class NzTestDescriptionsComponent {
  readonly bordered = signal(false);
  readonly colspanArray = signal<number[]>([1, 1, 1]);
  readonly column = signal<NzDescriptionsComponent['nzColumn']>(3);
  readonly title = signal('Title');
  readonly itemTitle = signal('Item Title ');
}
