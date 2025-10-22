/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent, dispatchTouchEvent, MockNgZone } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzResizableModule } from 'ng-zorro-antd/resizable/resizable.module';

import { NzDemoResizableBasicComponent } from './demo/basic';
import { NzDemoResizableCustomizeComponent } from './demo/customize';
import { NzDemoResizableGridComponent } from './demo/grid';
import { NzDemoResizableLockAspectRatioComponent } from './demo/lock-aspect-ratio';
import { NzDemoResizablePreviewComponent } from './demo/preview';
import { NzResizableDirective, NzResizeEvent } from './resizable.directive';
import { DEFAULT_RESIZE_DIRECTION } from './resize-handles.component';

describe('resizable', () => {
  let zone: MockNgZone;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNzIconsTesting(),
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    });
  }));

  describe('basic', () => {
    let fixture: ComponentFixture<NzDemoResizableBasicComponent>;
    let testComponent: NzDemoResizableBasicComponent;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizableBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should render handles', () => {
      const handles = resizableEle.querySelectorAll('.nz-resizable-handle');
      expect(handles.length).toBe(8);
      handles.forEach(e => {
        expect(DEFAULT_RESIZE_DIRECTION.some(d => e.classList.contains(`nz-resizable-handle-${d}`))).toBe(true);
      });
    });

    it('should toggle the `nz-resizable-handle-box-hover` class when `mouseenter` and `mouseleave` events are fired and should not run change detection', () => {
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');
      dispatchMouseEvent(resizableEle, 'mouseenter');
      const handles = resizableEle.querySelectorAll('.nz-resizable-handle');
      expect(handles.length).toBe(8);
      handles.forEach(e => {
        expect(e.classList).toContain('nz-resizable-handle-box-hover');
      });
      dispatchMouseEvent(resizableEle, 'mouseleave');
      handles.forEach(e => {
        expect(e.classList).not.toContain('nz-resizable-handle-box-hover');
      });
      expect(appRef.tick).toHaveBeenCalledTimes(0);
    });

    it('should not run change detection on `mousedown` event on the `nz-resize-handle`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');
      const nzResizeHandle = resizableEle.querySelector('nz-resize-handle')!;
      dispatchMouseEvent(nzResizeHandle, 'mousedown');
      expect(appRef.tick).toHaveBeenCalledTimes(0);
    });

    it('should maximum size work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 500,
          y: rect.bottom + 200
        }
      );
      zone.simulateZoneExit();
      fixture.detectChanges();
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(600);
        expect(testComponent.height).toBe(200);
        done();
      });
    });

    it('should minimum size work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right - 600,
          y: rect.bottom - 200
        }
      );
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(80);
        expect(testComponent.height).toBe(80);
        done();
      });
    });

    describe('should resize work', () => {
      let rect: DOMRect;

      beforeEach(() => {
        testComponent.height = 200;
        testComponent.width = 400;
        fixture.detectChanges();
        rect = resizableEle.getBoundingClientRect();
        expect(testComponent.width).toBe(400);
        expect(testComponent.height).toBe(200);
      });

      it('should touch event work', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-top') as HTMLElement;
        touchMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.height).toBeLessThanOrEqual(200);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('top');
          done();
        });
      });

      /**
       *  +---↓---+
       *  |       |
       *  +-------+
       */
      it('top', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-top') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.height).toBeLessThanOrEqual(200);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('top');
          done();
        });
      });

      /**
       *  +-------+
       *  |       |
       *  +---↑---+
       */
      it('bottom', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottom') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left,
            y: rect.bottom - 100
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.height).toBeLessThanOrEqual(200);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('bottom');
          done();
        });
      });

      /**
       *  +-------+
       *  →       |
       *  +-------+
       */
      it('left', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-left') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left + 100,
            y: rect.bottom
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.resizeDirection).toEqual('left');
          done();
        });
      });

      /**
       *  +-------+
       *  |       ←
       *  +-------+
       */
      it('right', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 100,
            y: rect.bottom
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.resizeDirection).toEqual('right');
          done();
        });
      });

      /**
       *  +-------↙
       *  |       |
       *  +------+
       */
      it('topRight', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-topRight') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.top
          },
          {
            x: rect.right - 100,
            y: rect.top + 90
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.height).toBeLessThanOrEqual(210);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('topRight');
          done();
        });
      });

      /**
       *  ↘-------+
       *  |       |
       *  +-------+
       */
      it('topLeft', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-topLeft') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left + 100,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.height).toBeLessThanOrEqual(200);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('topLeft');
          done();
        });
      });

      /**
       *  +-------+
       *  |       |
       *  +-------↖
       */
      it('bottomRight', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 100,
            y: rect.bottom - 90
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.height).toBeLessThanOrEqual(190);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('bottomRight');
          done();
        });
      });

      /**
       *  +-------+
       *  |       |
       *  ↗-------+
       */
      it('bottomLeft', (done: () => void) => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottomLeft') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left + 100,
            y: rect.bottom - 100
          }
        );
        fixture.detectChanges();

        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBeLessThanOrEqual(400);
          expect(testComponent.width).toBeGreaterThanOrEqual(300);
          expect(testComponent.height).toBeLessThanOrEqual(200);
          expect(testComponent.height).toBeGreaterThanOrEqual(100);
          expect(testComponent.resizeDirection).toEqual('bottomLeft');
          done();
        });
      });
    });

    it('should disabled work', (done: () => void) => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(resizableEle.classList).toContain(`nz-resizable-disabled`);
      expect(testComponent.width).toBe(400);
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.nz-resizable-handle-left') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.left,
          y: rect.bottom
        },
        {
          x: rect.left + 100,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(400);
        done();
      });
    });
  });

  describe('customize', () => {
    let fixture: ComponentFixture<NzDemoResizableCustomizeComponent>;
    let testComponent: NzDemoResizableCustomizeComponent;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizableCustomizeComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should customize handles', (done: () => void) => {
      const bottomRightHandel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      expect(bottomRightHandel.querySelector('.bottom-right')).toBeTruthy();
      const rightHandel = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      expect(rightHandel.querySelector('.right-wrap')).toBeTruthy();

      const rect = resizableEle.getBoundingClientRect();
      mouseMoveTrigger(
        bottomRightHandel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 200,
          y: rect.bottom
        }
      );
      zone.simulateZoneExit();
      fixture.detectChanges();
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        zone.simulateZoneExit();
        fixture.detectChanges();
        expect(testComponent.width).toBeGreaterThanOrEqual(600);
        done();
      });
    });
  });

  describe('lock aspect ratio', () => {
    let fixture: ComponentFixture<NzDemoResizableLockAspectRatioComponent>;
    let resizableEle: HTMLElement;
    let testComponent: NzDemoResizableLockAspectRatioComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizableLockAspectRatioComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should lock aspect ratio when resize', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      const leftHandel = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      const topHandel = resizableEle.querySelector('.nz-resizable-handle-top') as HTMLElement;
      const bottomRightHandel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      const ratio = testComponent.width / testComponent.height;
      mouseMoveTrigger(
        leftHandel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 100,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        mouseMoveTrigger(
          bottomRightHandel,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 123,
            y: rect.bottom - 321
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          mouseMoveTrigger(
            topHandel,
            {
              x: rect.right,
              y: rect.top
            },
            {
              x: rect.right,
              y: rect.top + 100
            }
          );
          fixture.detectChanges();
          afterNextFrameRender(() => {
            fixture.detectChanges();
            expect(Math.round(testComponent.width / testComponent.height)).toBe(ratio);
            done();
          });
        });
      });
    });
  });

  describe('preview', () => {
    let fixture: ComponentFixture<NzDemoResizablePreviewComponent>;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizablePreviewComponent);
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should preview work', () => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      dispatchMouseEvent(handle, 'mousedown', rect.right, rect.bottom);
      dispatchMouseEvent(window.document, 'mousemove', rect.right + 20, rect.bottom + 20);
      fixture.detectChanges();
      const preview = resizableEle.querySelector('.nz-resizable-preview') as HTMLElement;
      expect(preview).toBeTruthy();
    });
  });

  describe('grid', () => {
    let fixture: ComponentFixture<NzDemoResizableGridComponent>;
    let resizableEle: HTMLElement;
    let testComponent: NzDemoResizableGridComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizableGridComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should grid work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: 0,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.col).toBe(3);
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: 9999,
            y: rect.bottom
          }
        );
        fixture.detectChanges();
        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.col).toBe(20);
          done();
        });
      });
    });

    it('should cursor type work', () => {
      expect(resizableEle.querySelector('.nz-resizable-handle-cursor-type-window')).toBeFalsy();
      expect(resizableEle.querySelector('.nz-resizable-handle-cursor-type-grid')).toBeTruthy();
      testComponent.directions = [
        {
          direction: 'right',
          cursorType: 'window'
        }
      ];
      fixture.detectChanges();
      expect(resizableEle.querySelector('.nz-resizable-handle-cursor-type-window')).toBeTruthy();
      expect(resizableEle.querySelector('.nz-resizable-handle-cursor-type-grid')).toBeFalsy();
    });
  });

  describe('bounds', () => {
    let fixture: ComponentFixture<NzTestResizableBoundsComponent>;
    let resizableEle: HTMLElement;
    let testComponent: NzTestResizableBoundsComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestResizableBoundsComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should parent bounds work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 200,
          y: rect.bottom + 200
        }
      );
      fixture.detectChanges();

      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(200);
        expect(testComponent.height).toBe(200);
        done();
      });
    });

    it('should element ref bounds work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      testComponent.bounds = testComponent.boxRef;
      fixture.detectChanges();
      const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 300,
          y: rect.bottom + 300
        }
      );
      fixture.detectChanges();

      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(256);
        expect(testComponent.height).toBe(256);
        done();
      });
    });

    it('should window bounds work', (done: () => void) => {
      const rect = resizableEle.getBoundingClientRect();
      testComponent.bounds = 'window';
      fixture.detectChanges();
      const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + window.innerWidth,
          y: rect.bottom + window.innerHeight
        }
      );
      fixture.detectChanges();

      afterNextFrameRender(() => {
        fixture.detectChanges();
        expect(testComponent.width).toBe(300);
        expect(testComponent.height).toBe(300);
        testComponent.maxHeight = window.innerHeight * 2;
        testComponent.maxWidth = window.innerWidth * 2;
        fixture.detectChanges();
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right + window.innerWidth,
            y: rect.bottom + window.innerHeight
          }
        );
        fixture.detectChanges();

        afterNextFrameRender(() => {
          fixture.detectChanges();
          expect(testComponent.width).toBe(window.innerWidth);
          expect(testComponent.height).toBe(window.innerHeight);
          done();
        });
      });
    });
  });
});

function mouseMoveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}

function touchMoveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
  dispatchTouchEvent(el, 'touchstart', from.x, from.y);
  dispatchTouchEvent(window.document, 'touchmove', to.x, to.y);
  dispatchTouchEvent(window.document, 'touchend');
}

function afterNextFrameRender(callbackFn: () => void): void {
  setTimeout(callbackFn, 16);
}

@Component({
  imports: [NzResizableModule],
  template: `
    <div class="box-ref" #boxRef>
      <div class="parent">
        <div
          class="box"
          nz-resizable
          [nzBounds]="bounds"
          [nzMaxWidth]="maxWidth"
          [nzMinWidth]="80"
          [nzMaxHeight]="maxHeight"
          [nzMinHeight]="80"
          [style.height.px]="height"
          [style.width.px]="width"
          (nzResize)="onResize($event)"
        >
          <nz-resize-handles></nz-resize-handles>
          content
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .box-ref {
        width: 256px;
        height: 256px;
      }
      .parent {
        width: 200px;
        height: 200px;
      }
    `
  ]
})
class NzTestResizableBoundsComponent {
  @ViewChild('boxRef', { static: false }) boxRef!: ElementRef<HTMLDivElement>;
  bounds: 'window' | 'parent' | ElementRef = 'parent';
  maxWidth = 300;
  maxHeight = 300;
  width = 100;
  height = 100;
  id = -1;

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
