import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from 'ng-zorro-antd/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzDemoResizableBasicComponent } from './demo/basic';
import { NzDemoResizableCustomizeComponent } from './demo/customize';
import { NzDemoResizableGridComponent } from './demo/grid';
import { NzDemoResizableLockAspectRatioComponent } from './demo/lock-aspect-ratio';
import { NzDemoResizablePreviewComponent } from './demo/preview';

import { NzResizableDirective } from './nz-resizable.directive';
import { NzResizableModule } from './nz-resizable.module';
import { DEFAULT_RESIZE_DIRECTION } from './nz-resize-handles.component';

describe('resizable', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzResizableModule, NzIconTestModule, NzGridModule],
      declarations: [
        NzDemoResizableBasicComponent,
        NzDemoResizableCustomizeComponent,
        NzDemoResizableLockAspectRatioComponent,
        NzDemoResizablePreviewComponent,
        NzDemoResizableGridComponent
      ]
    }).compileComponents();
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

    it('should maximum size work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      moveTrigger(
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
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(600);
      expect(testComponent.height).toBe(200);
    }));

    it('should minimum size work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      moveTrigger(
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
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(80);
      expect(testComponent.height).toBe(80);
    }));

    describe('should resize work', () => {
      let rect: ClientRect | DOMRect;

      beforeEach(() => {
        testComponent.height = 200;
        testComponent.width = 400;
        fixture.detectChanges();
        rect = resizableEle.getBoundingClientRect();
        expect(testComponent.width).toBe(400);
        expect(testComponent.height).toBe(200);
      });

      /**
       *  +---↓---+
       *  |       |
       *  +-------+
       */
      it('top', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-top') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  +---↑---+
       */
      it('bottom', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottom') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  →       |
       *  +-------+
       */
      it('left', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-left') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
      }));

      /**
       *  +-------+
       *  |       ←
       *  +-------+
       */
      it('right', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
      }));

      /**
       *  +-------↙
       *  |       |
       *  +------+
       */
      it('topRight', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-topRight') as HTMLElement;
        moveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.top
          },
          {
            x: rect.right - 100,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  ↘-------+
       *  |       |
       *  +-------+
       */
      it('topLeft', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-topLeft') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  +-------↖
       */
      it('bottomRight', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
        moveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 100,
            y: rect.bottom - 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  ↗-------+
       */
      it('bottomLeft', fakeAsync(() => {
        const handle = resizableEle.querySelector('.nz-resizable-handle-bottomLeft') as HTMLElement;
        moveTrigger(
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
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));
    });
  });

  describe('customize', () => {
    let fixture: ComponentFixture<NzDemoResizableCustomizeComponent>;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizableCustomizeComponent);
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should customize handles', () => {
      const bottomRightHandel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      expect(bottomRightHandel.querySelector('.bottom-right')).toBeTruthy();
      const rightHandel = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      expect(rightHandel.querySelector('.right-wrap')).toBeTruthy();
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

    it('should lock aspect ratio when resize', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const leftHandel = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      const bottomRightHandel = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      const ratio = testComponent.width / testComponent.height;
      moveTrigger(
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
      tick(16);
      fixture.detectChanges();
      moveTrigger(
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
      tick(16);
      fixture.detectChanges();
      expect(Math.round(testComponent.width / testComponent.height)).toBe(ratio);
    }));
  });

  describe('preview', () => {
    let fixture: ComponentFixture<NzDemoResizablePreviewComponent>;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizablePreviewComponent);
      resizableEle = fixture.debugElement.query(By.directive(NzResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should preview work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.nz-resizable-handle-bottomRight') as HTMLElement;
      dispatchMouseEvent(handle, 'mousedown', rect.right, rect.bottom);
      dispatchMouseEvent(window.document, 'mousemove', rect.right + 20, rect.bottom + 20);
      fixture.detectChanges();
      const preview = resizableEle.querySelector('.nz-resizable-preview') as HTMLElement;
      expect(preview).toBeTruthy();
      dispatchMouseEvent(window.document, 'mouseup');
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
    }));
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

    it('should grid work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      // const colWidth = rect.width / testComponent.col;
      const handle = resizableEle.querySelector('.nz-resizable-handle-right') as HTMLElement;
      moveTrigger(
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
      tick(16);
      fixture.detectChanges();
      expect(testComponent.col).toBe(3);
      moveTrigger(
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
      tick(16);
      fixture.detectChanges();
      expect(testComponent.col).toBe(20);
    }));
  });
});

function moveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}
