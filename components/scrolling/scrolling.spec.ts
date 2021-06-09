import { Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NgClassInterface, NgStyleInterface } from 'ng-zorro-antd/core/types';

import { NzScrollingComponent } from './scrolling.component';
import { NzScrollingModule } from './scrolling.module';

describe('divider', () => {
  describe('TestScrollingBasicComponent', () => {
    let testBed: ComponentBed<TestScrollingBasicComponent>;
    let scrollingElement: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestScrollingBasicComponent, {
        imports: [NzScrollingModule],
        declarations: [NzScrollingComponent]
      });
      scrollingElement = testBed.debugElement.query(By.directive(NzScrollingComponent)).nativeElement;
      testBed.fixture.detectChanges();
    });

    it('should nzVirtual work', () => {
      expect(scrollingElement.querySelectorAll('.test-item').length).toBe(100);
      testBed.component.virtual = true;

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelectorAll('.test-item').length).toBeLessThan(100);
    });

    it('should auto resize work', fakeAsync(() => {
      testBed.component.height = 50;

      testBed.fixture.detectChanges();
      tick(500);
      testBed.fixture.detectChanges();

      expect(testBed.component.autoSizeChange).toHaveBeenCalled();
    }));

    it('should nzData work', () => {
      expect(scrollingElement.querySelectorAll('.test-item').length).toBe(100);
      testBed.component.data = new Array(10).fill('test').map((v, i) => v + i);

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelectorAll('.test-item').length).toBe(10);
    });

    it('should nzItemTemplate work', () => {
      expect(scrollingElement.querySelectorAll('.test-item').length).toBe(100);
      expect(scrollingElement.querySelectorAll('.test-item-change').length).toBe(0);
      testBed.component.tpl = 2;

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelectorAll('.test-item').length).toBe(0);
      expect(scrollingElement.querySelectorAll('.test-item-change').length).toBe(100);
    });

    it('should viewportHeight work', () => {
      expect(scrollingElement.querySelector('.ant-scroll-viewport')?.clientHeight).toBe(200);
      testBed.component.viewportHeight = 300;

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelector('.ant-scroll-viewport')?.clientHeight).toBe(300);
      testBed.component.viewportHeight = '400px';

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelector('.ant-scroll-viewport')?.clientHeight).toBe(400);
    });

    it('should customContent work', () => {
      expect(scrollingElement.querySelector('.custom-content')).toBeNull();
      testBed.component.customContent = true;

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelector('.custom-content')).not.toBeNull();
    });

    it('should viewportClass and viewportStyle work', () => {
      testBed.component.viewportClass = 'test-class';

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelector('.ant-scroll-viewport')!.classList).toContain('test-class');
      testBed.fixture.detectChanges();
      testBed.component.viewportStyle = { width: '200px' };

      testBed.fixture.detectChanges();
      expect(scrollingElement.querySelector('.ant-scroll-viewport')!.getAttribute('style')).toContain('width: 200px');
      testBed.fixture.detectChanges();
    });

    it('should call nzScrolledIndexChange', fakeAsync(() => {
      testBed.component.virtual = true;
      testBed.fixture.detectChanges();

      const el = scrollingElement.querySelector('.ant-scroll-viewport') as HTMLElement;
      el.scrollTo(0, 200);
      el.dispatchEvent(new Event('scroll'));

      testBed.fixture.detectChanges();
      tick(500);
      testBed.fixture.detectChanges();

      expect(testBed.component.scrolledIndexChange).toHaveBeenCalled();
    }));
  });
});

@Component({
  template: `
    <nz-scrolling
      [nzVirtual]="virtual"
      [nzData]="data"
      [nzItemTemplate]="tpl === 1 ? itemTpl1 : itemTpl2"
      [nzViewportHeight]="viewportHeight"
      [nzCustomContent]="customContent"
      [nzViewportClass]="viewportClass"
      [nzViewportStyle]="viewportStyle"
      (nzScrolledIndexChange)="scrolledIndexChange($event)"
      (nzAutoSizeChange)="autoSizeChange($event)"
    >
      <div class="custom-content"></div>
    </nz-scrolling>
    <ng-template #itemTpl1 let-item>
      <div class="test-item" [style.height.px]="height">{{ item }}</div>
    </ng-template>
    <ng-template #itemTpl2 let-item>
      <div class="test-item-change" style="height: 30px">{{ item }}</div>
    </ng-template>
  `
})
export class TestScrollingBasicComponent {
  tpl: 1 | 2 = 1;
  height = 30;
  virtual = false;
  data = new Array(100).fill('test').map((v, i) => v + i);
  viewportHeight: number | string = 200;
  customContent = false;
  viewportClass?: NgClassInterface | string;
  viewportStyle?: NgStyleInterface;
  scrolledIndexChange = jasmine.createSpy('scrolledIndexChange');
  autoSizeChange = jasmine.createSpy('autoSizeChange');
}
