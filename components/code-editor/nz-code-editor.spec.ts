import { DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// import { dispatchEvent } from 'ng-zorro-antd/core';
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
      expect(resizeBar.classList).toContain('ant-resize-horizontal');

      // dispatchEvent(resizeBar, new MouseEvent('mousedown'));
      // dispatchEvent(window.document, new MouseEvent('mousemove', { clientY: -200}));
      // dispatchEvent(window.document, new MouseEvent('mouseup'));
      //
      // fixture.detectChanges();
      // expect((targetDE.componentInstance as NzCodeEditorComponent).top).toBe(200);
    });
  });
});
