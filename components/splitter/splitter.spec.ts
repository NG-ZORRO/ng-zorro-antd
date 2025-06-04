/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction, Directionality } from '@angular/cdk/bidi';
import { Component, DebugElement, DOCUMENT, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { dispatchMouseEvent, dispatchTouchEvent, MockNgZone } from 'ng-zorro-antd/core/testing';

import { NzSplitterModule } from './splitter.module';
import { NzSplitterCollapsible } from './typings';

interface PanelProps {
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  resizable?: boolean;
  collapsible?: NzSplitterCollapsible;
}

@Component({
  imports: [BidiModule, NzSplitterModule],
  template: `
    <nz-splitter
      [nzLazy]="lazy"
      [nzLayout]="vertical ? 'vertical' : 'horizontal'"
      (nzResizeStart)="onResizeStart($event)"
      (nzResize)="onResize($event)"
      (nzResizeEnd)="onResizeEnd($event)"
    >
      @for (panel of panels; track $index) {
        <nz-splitter-panel
          [nzDefaultSize]="panel.defaultSize"
          [nzMin]="panel.min"
          [nzMax]="panel.max"
          [nzSize]="panel.size"
          [nzResizable]="panel.resizable ?? true"
          [nzCollapsible]="panel.collapsible ?? false"
        >
          {{ $index }}
        </nz-splitter-panel>
      }
    </nz-splitter>
  `,
  styles: `
    @import '../style/testing.less';
    @import './style/entry.less';

    :host nz-splitter {
      height: 100px;
      width: 100px;
    }
  `
})
class NzSplitterTestComponent {
  vertical = false;
  lazy = false;
  panels: PanelProps[] = [{}, {}];
  readonly onResizeStart = (_sizes: number[]): void => void 0;
  readonly onResize = (_sizes: number[]): void => void 0;
  readonly onResizeEnd = (_sizes: number[]): void => void 0;
}

class MockDirectionality {
  value: Direction = 'rtl';
  change = new Subject();
}

/* -------------------------- Test Cases -------------------------- */
describe('nz-splitter', () => {
  let fixture: ComponentFixture<NzSplitterTestComponent>;
  let component: NzSplitterTestComponent;
  let container: DebugElement;
  let document: Document;

  function getDragger(index: number = 0): HTMLElement {
    return container.queryAll(By.css('.ant-splitter-bar-dragger'))[index].nativeElement as HTMLElement;
  }

  function getDraggerPosition(dragger: HTMLElement): { x: number; y: number } {
    const { left, right, top, bottom } = dragger.getBoundingClientRect();
    const x = (left + right) / 2;
    const y = (top + bottom) / 2;
    return { x, y };
  }

  function getDraggerAndPos(index: number = 0): { dragger: HTMLElement; x: number; y: number } {
    const dragger = getDragger(index);
    return { dragger, ...getDraggerPosition(dragger) };
  }

  function mouseMoveTrigger(dragger: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
    dispatchMouseEvent(dragger, 'mousedown', from.x, from.y);
    fixture.detectChanges();
    dispatchMouseEvent(document, 'mousemove', to.x, to.y);
    fixture.detectChanges();
    dispatchMouseEvent(document, 'mouseup', to.x, to.y);
    fixture.detectChanges();
  }

  function drag(dragger: HTMLElement, f1: (x: number) => number, f2: (y: number) => number = y => y): void {
    const { x, y } = getDraggerPosition(dragger);
    mouseMoveTrigger(dragger, { x, y }, { x: f1(x), y: f2(y) });
  }

  function getPanelFlexBasis(dl: DebugElement): string {
    const el = dl.nativeElement as HTMLElement;
    return el.style.flexBasis;
  }

  describe('basic', () => {
    let zone: MockNgZone;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: NgZone,
            useFactory: () => {
              zone = new MockNgZone();
              return zone;
            }
          }
        ]
      });
      fixture = TestBed.createComponent(NzSplitterTestComponent);
      document = TestBed.inject(DOCUMENT);
      container = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should correct render', () => {
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter'))).toBeTruthy();
      expect(container.queryAll(By.css('.ant-splitter-panel'))).toHaveSize(2);
      expect(container.query(By.css('.ant-splitter-bar'))).toBeTruthy();
    });

    it('should correct render panel size', () => {
      component.panels = [{ size: 20 }, { size: '45%' }, {}];
      fixture.detectChanges();

      const panels = container.queryAll(By.css('.ant-splitter-panel'));
      expect(getPanelFlexBasis(panels?.[0])).toBe('20px');
      expect(getPanelFlexBasis(panels?.[1])).toBe('45px');
      expect(getPanelFlexBasis(panels?.[2])).toBe('35px');
    });

    it('should layout work', () => {
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter.ant-splitter-horizontal'))).toBeTruthy();

      component.vertical = true;
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter.ant-splitter-vertical'))).toBeTruthy();
    });

    it('should resizable work', () => {
      component.panels = [{ size: 20 }, { resizable: false }, {}];
      fixture.detectChanges();
      expect(container.queryAll(By.css('.ant-splitter-bar-dragger'))).toHaveSize(2);
      expect(container.queryAll(By.css('.ant-splitter-bar-dragger-disabled'))).toHaveSize(2);

      component.panels = [{ size: 20 }, {}, { resizable: false }];
      fixture.detectChanges();
      expect(container.queryAll(By.css('.ant-splitter-bar-dragger'))).toHaveSize(2);
      expect(container.queryAll(By.css('.ant-splitter-bar-dragger-disabled'))).toHaveSize(1);
    });

    describe('drag', () => {
      beforeEach(() => {
        spyOn(component, 'onResizeStart');
        spyOn(component, 'onResize');
        spyOn(component, 'onResizeEnd');
      });

      it('should mouse move work', () => {
        component.panels = [{}, {}];
        fixture.detectChanges();

        const { dragger, x, y } = getDraggerAndPos();

        // right
        dispatchMouseEvent(dragger, 'mousedown', x, y);
        fixture.detectChanges();
        expect(dragger.classList).toContain('ant-splitter-bar-dragger-active');
        expect(component.onResizeStart).toHaveBeenCalledWith([50, 50]);

        dispatchMouseEvent(dragger, 'mousemove', x + 40, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledWith([90, 10]);
        expect(component.onResizeEnd).not.toHaveBeenCalled();

        dispatchMouseEvent(dragger, 'mouseup', x + 40, y);
        fixture.detectChanges();
        expect(component.onResizeEnd).toHaveBeenCalledWith([90, 10]);

        // left
        dispatchMouseEvent(dragger, 'mousedown', x + 40, y);
        fixture.detectChanges();
        dispatchMouseEvent(dragger, 'mousemove', x - 240, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledWith([0, 100]);
        dispatchMouseEvent(dragger, 'mouseup');
        fixture.detectChanges();
        expect(component.onResizeEnd).toHaveBeenCalledWith([0, 100]);
      });

      it('should touch move work', () => {
        component.panels = [{}, {}];
        fixture.detectChanges();

        const { dragger, x, y } = getDraggerAndPos();

        // right
        dispatchTouchEvent(dragger, 'touchstart', x, y);
        fixture.detectChanges();
        expect(dragger.classList).toContain('ant-splitter-bar-dragger-active');
        expect(component.onResizeStart).toHaveBeenCalledWith([50, 50]);

        dispatchTouchEvent(document, 'touchmove', x + 40, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledWith([90, 10]);
        expect(component.onResizeEnd).not.toHaveBeenCalled();

        dispatchTouchEvent(document, 'touchend', x + 40, y);
        fixture.detectChanges();
        expect(component.onResizeEnd).toHaveBeenCalledWith([90, 10]);

        // left
        dispatchTouchEvent(dragger, 'touchstart', x + 40, y);
        fixture.detectChanges();

        dispatchTouchEvent(document, 'touchmove', x - 240, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledWith([0, 100]);
        dispatchTouchEvent(document, 'touchend');
        fixture.detectChanges();
        expect(component.onResizeEnd).toHaveBeenCalledWith([0, 100]);
      });

      it('with min', () => {
        component.panels = [{ min: 10 }, {}];
        fixture.detectChanges();

        drag(getDragger(), x => x - 100);
        expect(component.onResize).toHaveBeenCalledWith([10, 90]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([10, 90]);
      });

      it('with max', () => {
        component.panels = [{ max: 90 }, {}];
        fixture.detectChanges();

        drag(getDragger(), x => x + 100);
        expect(component.onResize).toHaveBeenCalledWith([90, 10]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([90, 10]);
      });

      it('both panel has min and max', () => {
        component.panels = [
          { min: 10, max: 80 },
          { min: 10, max: 80 }
        ];
        fixture.detectChanges();

        drag(getDragger(), x => x - 100);
        expect(component.onResize).toHaveBeenCalledWith([20, 80]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([20, 80]);

        drag(getDragger(), x => x + 100);
        expect(component.onResize).toHaveBeenCalledWith([80, 20]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([80, 20]);
      });

      it('[true, 0, true] can be move left', () => {
        component.panels = [{}, { defaultSize: 0 }, {}];
        fixture.detectChanges();

        drag(getDragger(1), x => x - 100);
        expect(component.onResize).toHaveBeenCalledWith([0, 50, 50]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([0, 50, 50]);
      });

      it('[false, 0, true] can not be move left', () => {
        component.panels = [{ resizable: false }, { defaultSize: 0 }, {}];
        fixture.detectChanges();

        drag(getDragger(1), x => x - 100);
        expect(component.onResize).toHaveBeenCalledWith([50, 0, 50]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([50, 0, 50]);
      });
    });

    describe('collapsible', () => {
      function expectClick(button: HTMLElement, sizes: number[]): void {
        button.click();
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledWith(sizes);
        expect(component.onResizeEnd).toHaveBeenCalledWith(sizes);
      }

      beforeEach(() => {
        spyOn(component, 'onResize');
        spyOn(component, 'onResizeEnd');
      });

      it('basic', () => {
        component.panels = [{ size: 20, collapsible: true }, { collapsible: true }];
        fixture.detectChanges();

        expect(container.queryAll(By.css('.ant-splitter-bar-collapse-icon'))).toHaveSize(2);
        expect(container.query(By.css('.ant-splitter-bar-collapse-start'))).toBeTruthy();
        expect(container.query(By.css('.ant-splitter-bar-collapse-end'))).toBeTruthy();

        component.panels = [
          {
            size: 20,
            collapsible: true
          },
          {
            collapsible: true
          },
          {}
        ];
        fixture.detectChanges();
        expect(container.queryAll(By.css('.ant-splitter-bar-collapse-start'))).toHaveSize(2);
        expect(container.queryAll(By.css('.ant-splitter-bar-collapse-end'))).toHaveSize(1);
      });

      it('collapsible - true', () => {
        component.panels = [
          {
            size: 20,
            collapsible: true
          },
          {}
        ];
        fixture.detectChanges();

        const startBtn = container.query(By.css('.ant-splitter-bar-collapse-start'))!.nativeElement as HTMLElement;
        startBtn.click();
        fixture.detectChanges();

        expect(component.onResize).toHaveBeenCalledWith([0, 100]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([0, 100]);
      });

      it('collapsible - start:true', () => {
        component.panels = [
          {},
          {
            size: 20,
            collapsible: {
              start: true
            }
          },
          {}
        ];
        fixture.detectChanges();

        expect(container.query(By.css('.ant-splitter-bar-collapse-start'))).toBeFalsy();
        expect(container.query(By.css('.ant-splitter-bar-collapse-end'))).toBeTruthy();

        const endBtn = container.query(By.css('.ant-splitter-bar-collapse-end'))!.nativeElement as HTMLElement;
        endBtn.click();
        fixture.detectChanges();

        expect(component.onResize).toHaveBeenCalledWith([60, 0, 40]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([60, 0, 40]);
      });

      it('collapsible - end:true', () => {
        component.panels = [
          {},
          {
            size: 20,
            collapsible: {
              end: true
            }
          },
          {}
        ];
        fixture.detectChanges();

        expect(container.query(By.css('.ant-splitter-bar-collapse-start'))).toBeTruthy();
        expect(container.query(By.css('.ant-splitter-bar-collapse-end'))).toBeFalsy();

        const startBtn = container.query(By.css('.ant-splitter-bar-collapse-start'))!.nativeElement as HTMLElement;
        startBtn.click();
        fixture.detectChanges();

        expect(component.onResize).toHaveBeenCalledWith([40, 0, 60]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([40, 0, 60]);
      });

      it('both collapsible', () => {
        component.panels = [
          {
            collapsible: true
          },
          {
            collapsible: true
          }
        ];
        fixture.detectChanges();

        const startBtn = container.query(By.css('.ant-splitter-bar-collapse-start'))!.nativeElement as HTMLElement;
        const endBtn = container.query(By.css('.ant-splitter-bar-collapse-end'))!.nativeElement as HTMLElement;

        expectClick(startBtn, [0, 100]);
        expectClick(endBtn, [50, 50]);
        expectClick(endBtn, [100, 0]);
        expectClick(startBtn, [50, 50]);
      });

      it('collapsible with cache', () => {
        component.panels = [
          {
            defaultSize: 20,
            collapsible: true,
            min: 10
          },
          {
            collapsible: true,
            min: '80%'
          }
        ];
        fixture.detectChanges();

        const startBtn = container.query(By.css('.ant-splitter-bar-collapse-start'))!.nativeElement as HTMLElement;
        const endBtn = container.query(By.css('.ant-splitter-bar-collapse-end'))!.nativeElement as HTMLElement;

        // Collapse left
        expectClick(startBtn, [0, 100]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeTruthy();
        // Collapse back
        expectClick(endBtn, [20, 80]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeFalsy();
        // Collapse right
        expectClick(endBtn, [100, 0]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeTruthy();
      });

      it('collapsible with fallback', () => {
        component.panels = [
          {
            defaultSize: 10,
            collapsible: true,
            min: 15
          },
          {
            collapsible: true,
            min: '80%'
          }
        ];
        fixture.detectChanges();

        const startBtn = container.query(By.css('.ant-splitter-bar-collapse-start'))!.nativeElement as HTMLElement;
        const endBtn = container.query(By.css('.ant-splitter-bar-collapse-end'))!.nativeElement as HTMLElement;

        // Collapse left
        expectClick(startBtn, [0, 100]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeTruthy();
        // Collapse back
        expectClick(endBtn, [2.5, 97.5]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeFalsy();
        // Collapse right
        expectClick(endBtn, [100, 0]);
        expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toBeTruthy();
      });
    });

    describe('lazy', () => {
      beforeEach(() => {
        component.lazy = true;
        component.panels = [
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%'
          },
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%'
          }
        ];

        spyOn(component, 'onResizeStart');
        spyOn(component, 'onResize');
        spyOn(component, 'onResizeEnd');
      });

      it('should only update after mouse up', () => {
        fixture.detectChanges();
        const { dragger, x, y } = getDraggerAndPos();

        // right
        dispatchMouseEvent(dragger, 'mousedown', x, y);
        fixture.detectChanges();
        expect(dragger.classList).toContain('ant-splitter-bar-dragger-active');
        expect(component.onResizeStart).toHaveBeenCalledWith([50, 50]);

        dispatchMouseEvent(document, 'mousemove', x + 100, y);
        fixture.detectChanges();
        expect(component.onResize).not.toHaveBeenCalled();

        dispatchMouseEvent(document, 'mouseup', x + 100, y);
        expect(component.onResize).toHaveBeenCalledWith([70, 30]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([70, 30]);

        // left
        dispatchMouseEvent(dragger, 'mousedown', x + 100, y);
        fixture.detectChanges();

        dispatchMouseEvent(document, 'mousemove', x, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledTimes(1);

        dispatchMouseEvent(document, 'mouseup', x, y);
        expect(component.onResize).toHaveBeenCalledWith([30, 70]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([30, 70]);
      });

      it('should work with touch events', () => {
        fixture.detectChanges();
        const { dragger, x, y } = getDraggerAndPos();

        // right
        dispatchTouchEvent(dragger, 'touchstart', x, y);
        fixture.detectChanges();
        expect(dragger.classList).toContain('ant-splitter-bar-dragger-active');
        expect(component.onResizeStart).toHaveBeenCalledWith([50, 50]);

        dispatchTouchEvent(document, 'touchmove', x + 100, y);
        fixture.detectChanges();
        expect(component.onResize).not.toHaveBeenCalled();

        dispatchTouchEvent(document, 'touchend', x + 100, y);
        expect(component.onResize).toHaveBeenCalledWith([70, 30]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([70, 30]);

        // left
        dispatchTouchEvent(dragger, 'touchstart', x + 100, y);
        fixture.detectChanges();

        dispatchTouchEvent(document, 'touchmove', x, y);
        fixture.detectChanges();
        expect(component.onResize).toHaveBeenCalledTimes(1);

        dispatchTouchEvent(document, 'touchend', x, y);
        expect(component.onResize).toHaveBeenCalledWith([30, 70]);
        expect(component.onResizeEnd).toHaveBeenCalledWith([30, 70]);
      });

      it('should work with vertical layout', () => {
        component.vertical = true;
        fixture.detectChanges();

        function dragWithMouse(f: (y: number) => number): void {
          const { dragger, x, y } = getDraggerAndPos();
          dispatchMouseEvent(dragger, 'mousedown', x, y);
          dispatchMouseEvent(dragger, 'mousemove', x, f(y));
          dispatchMouseEvent(dragger, 'mouseup', x, f(y));
        }

        function dragWithTouch(f: (y: number) => number): void {
          const { dragger, x, y } = getDraggerAndPos();
          dispatchTouchEvent(dragger, 'touchstart', x, y);
          dispatchTouchEvent(document, 'touchmove', x, f(y));
          dispatchTouchEvent(document, 'touchend', x, f(y));
        }

        // down
        dragWithMouse(y => y + 100);
        expect(component.onResize).toHaveBeenCalledWith([70, 30]);

        // up
        dragWithMouse(y => y - 100);
        expect(component.onResize).toHaveBeenCalledWith([30, 70]);

        // touch drag down
        dragWithTouch(y => y + 100);
        expect(component.onResize).toHaveBeenCalledWith([70, 30]);

        // touch drag up
        dragWithTouch(y => y - 100);
        expect(component.onResize).toHaveBeenCalledWith([30, 70]);
      });
    });
  });

  describe('directionality', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Directionality,
            useClass: MockDirectionality
          }
        ]
      });
      fixture = TestBed.createComponent(NzSplitterTestComponent);
      container = fixture.debugElement;
      component = fixture.componentInstance;

      spyOn(component, 'onResize');
      spyOn(component, 'onResizeEnd');
    });

    it('rtl', () => {
      component.panels = [{}, {}];
      fixture.detectChanges();

      const splitter = container.query(By.css('.ant-splitter'))!.nativeElement as HTMLElement;
      expect(splitter.classList).toContain('ant-splitter-rtl');

      drag(getDragger(), x => x - 40);
      expect(component.onResize).toHaveBeenCalledWith([90, 10]);
      expect(component.onResizeEnd).toHaveBeenCalledWith([90, 10]);
    });
  });
});
