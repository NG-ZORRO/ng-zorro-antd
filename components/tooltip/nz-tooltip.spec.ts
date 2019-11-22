import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzTooltipBaseDirective } from './nz-tooltip-base.directive';
import { NzTooltipDirective } from './nz-tooltip.directive';
import { NzToolTipModule } from './nz-tooltip.module';

@Component({
  template: `
    <a
      #titleString
      nz-tooltip
      [nzTitle]="title"
      nzTrigger="hover"
      nzPlacement="topLeft"
      nzOverlayClassName="testClass"
      [nzOverlayStyle]="{ color: '#000' }"
      [nzMouseEnterDelay]="0.15"
      [nzMouseLeaveDelay]="0.1"
      (nzVisibleChange)="onVisibleChange()"
    >
      Hover
    </a>

    <a #titleTemplate nz-tooltip [nzTitle]="template" [nzTooltipTrigger]="trigger">
      Click
    </a>

    <a #focusTooltip nz-tooltip nzTooltipTrigger="focus" nzTitle="focus">
      Focus
    </a>

    <a
      #program
      nz-tooltip
      [nzTooltipTrigger]="null"
      nzTitle="program"
      [nzVisible]="visible"
      (nzVisibleChange)="onVisibleChange()"
    >
      Manually
    </a>

    <div>
      <button>A</button>
      <button #inBtnGroup nz-tooltip nzTitle="title-string">B</button>
      <button>C</button>
    </div>

    <ng-template #template>
      title-template
    </ng-template>
  `
})
export class NzTooltipTestComponent {
  @ViewChild('titleString', { static: false }) titleString: ElementRef;
  @ViewChild('titleString', { static: false, read: NzTooltipDirective })
  titleStringDirective: NzTooltipDirective;

  @ViewChild('titleTemplate', { static: false }) titleTemplate: ElementRef;
  @ViewChild('titleTemplate', { static: false, read: NzTooltipDirective })
  titleTemplateDirective: NzTooltipDirective;

  @ViewChild('focusTooltip', { static: false }) focusTemplate: ElementRef;

  trigger: string | null = 'click';

  @ViewChild('inBtnGroup', { static: false }) inBtnGroup: ElementRef;

  title: string | null = 'title-string';
  visible = false;
  visibilityTogglingCount = 0;

  onVisibleChange(): void {
    this.visibilityTogglingCount += 1;
  }
}

describe('NzTooltip', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzToolTipModule, NoopAnimationsModule, NzIconTestModule],
      declarations: [NzTooltipTestComponent]
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  let fixture: ComponentFixture<NzTooltipTestComponent>;
  let component: NzTooltipTestComponent;

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function getTooltipBackdropElement(): HTMLElement {
    return overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTooltipTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('visibility', () => {
    it('should hover mode works', fakeAsync(() => {
      const title = 'title-string';
      const triggerElement = component.titleString.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibilityTogglingCount).toBe(1);

      const overlayElement = getOverlayElementForTooltip(component.titleStringDirective);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(overlayElement, 'mouseleave');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should click mode works', fakeAsync(() => {
      const title = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(getTooltipBackdropElement(), 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should focus and blur mode works', fakeAsync(() => {
      const title = 'focus';
      const triggerElement = component.focusTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'focus');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'blur');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should support changing visibility programmatically', fakeAsync(() => {
      const title = 'program';

      component.visible = true;
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibilityTogglingCount).toBe(0);

      component.visible = false;
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
      expect(component.visibilityTogglingCount).toBe(0);
    }));
  });

  describe('content', () => {
    // These specs are covered in previous specs.
    // it('should nzTitle support string', fakeAsync(() => {}));
    // it('should nzTitle support template', fakeAsync(() => {}));

    it('cannot be visible when the title is a falsy value', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;

      component.title = null;
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain('title-string');
      expect(component.visibilityTogglingCount).toBe(0);
    }));

    it('should set `setTitle` proxy to `nzTitle`', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;
      const tooltipComponent = component.titleStringDirective.tooltip;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(tooltipComponent.nzTitle).toBe('title-string');
      expect(overlayContainerElement.textContent).toContain('title-string');

      component.title = 'changed!';
      fixture.detectChanges();
      expect(tooltipComponent.nzTitle).toBe('changed!');
      expect(overlayContainerElement.textContent).toContain('changed!');
    }));

    it('should support changing trigger', fakeAsync(() => {
      const featureKey = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(getTooltipBackdropElement(), 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      component.trigger = null;
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));
  });

  describe('dom', () => {
    it('should not insert element as the sibling of the directive element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      // There's a <!--container--> element created by Ivy.
      expect(triggerElement.nextSibling.nextSibling.tagName).toBe('BUTTON');
    }));
  });
});

function getOverlayElementForTooltip(tooltip: NzTooltipBaseDirective): HTMLElement {
  return tooltip.tooltip.overlay.overlayRef.overlayElement;
}
