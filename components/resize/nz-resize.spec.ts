import { DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from 'ng-zorro-antd/core';
import { NzResizeComponent, NzResizeModule } from 'ng-zorro-antd/resize';

import { NzDemoResizeBasicComponent } from './demo/basic';
import { NzDemoResizeHorizontalComponent } from './demo/horizontal';

describe('resize', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzResizeModule],
      declarations: [NzDemoResizeBasicComponent, NzDemoResizeHorizontalComponent]
    }).compileComponents();
  }));

  describe('basic', () => {
    let fixture: ComponentFixture<NzDemoResizeBasicComponent>;
    // let testComponent: NzDemoResizeBasicComponent;
    let targetDE: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizeBasicComponent);
      fixture.detectChanges();

      // testComponent = fixture.debugElement.componentInstance;
      targetDE = fixture.debugElement.query(By.directive(NzResizeComponent));
    });

    it('should render component correctly', () => {
      const resizeBar = (targetDE.nativeElement as HTMLElement).firstElementChild as HTMLElement;
      expect(resizeBar.classList).toContain('ant-resize');
      expect(resizeBar.classList).toContain('ant-resize-vertical');
      expect(resizeBar.classList).toContain('ant-resize-can-move');
    });

    it('should support resizing within limits', () => {
      const resizeTriggerEl = (targetDE.nativeElement as HTMLElement).firstElementChild as HTMLElement;
      const targetComponent = targetDE.componentInstance;

      moveTrigger(resizeTriggerEl, 200);
      fixture.detectChanges();
      expect(targetComponent.left).toBeLessThanOrEqual(200);
      expect(targetComponent.left).toBeGreaterThanOrEqual(190);

      moveTrigger(resizeTriggerEl, 400);
      expect(targetComponent.left).toBe(300);
      fixture.detectChanges();

      moveTrigger(resizeTriggerEl, -400);
      expect(targetComponent.left).toBe(0);
      fixture.detectChanges();

      expect(targetComponent.top).toBe(undefined);
    });
  });

  describe('horizontal', () => {
    let fixture: ComponentFixture<NzDemoResizeHorizontalComponent>;
    // let testComponent: NzDemoResizeBasicComponent;
    let targetDE: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoResizeHorizontalComponent);
      fixture.detectChanges();

      // testComponent = fixture.debugElement.componentInstance;
      targetDE = fixture.debugElement.query(By.directive(NzResizeComponent));
    });

    it('should render component correctly', () => {
      const resizeBar = (targetDE.nativeElement as HTMLElement).firstElementChild as HTMLElement;
      expect(resizeBar.classList).toContain('ant-resize');
      expect(resizeBar.classList).toContain('ant-resize-horizontal');
      expect(resizeBar.classList).toContain('ant-resize-can-move');
    });

    it('should support resizing within limits', () => {
      const resizeTriggerEl = (targetDE.nativeElement as HTMLElement).firstElementChild as HTMLElement;
      const targetComponent = targetDE.componentInstance;

      moveTrigger(resizeTriggerEl, -1000);
      expect(targetComponent.top).toBe(0);
      fixture.detectChanges();

      expect(targetComponent.left).toBe(undefined);
    });
  });
});

function moveTrigger(el: HTMLElement, delta: number): void {
  dispatchMouseEvent(el, 'mousedown');
  dispatchMouseEvent(window.document, 'mousemove', delta, delta);
  dispatchMouseEvent(window.document, 'mouseup');
}
