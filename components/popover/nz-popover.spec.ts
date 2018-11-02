import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchMouseEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzPopoverDirective } from './nz-popover.directive';
import { NzPopoverModule } from './nz-popover.module';

describe('NzPopover', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture;
  let component;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzPopoverModule, NoopAnimationsModule, NzToolTipModule, NzIconModule ],
      declarations: [ NzPopoverTestWrapperComponent, NzPopoverTestNewComponent ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('should not bring break changes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzPopoverTestWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show/hide normal tooltip', fakeAsync(() => {
      const featureKey = 'NORMAL';
      const triggerElement = component.normalTrigger.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // Move out from the trigger element to hide it
      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show tooltip with custom template', fakeAsync(() => {
      const triggerElement = component.templateTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.anticon-file')).not.toBeNull();
    }));

    it('should show/hide tooltip by focus', fakeAsync(() => {
      const featureKey = 'FOCUS';
      const triggerElement = component.focusTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'focus');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(triggerElement, 'blur');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show/hide tooltip by click', fakeAsync(() => {
      const featureKey = 'CLICK';
      const triggerElement = component.clickTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop'), 'click');
      tick();
      fixture.detectChanges();
      tick(500); // Wait for animations
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show/hide by nzVisible change', fakeAsync(() => {
      const featureKey = 'VISIBLE';
      component.visible = true;
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      component.visible = false;
      fixture.detectChanges();
      tick(100);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));
  });
  describe('should support directive usage', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzPopoverTestNewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should support string', fakeAsync(() => {
      const triggerElement = component.stringPopover.nativeElement;

      expect(overlayContainerElement.querySelector('.ant-popover-title')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeNull();

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-title').textContent).toContain('title-string');
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content').textContent).toContain('content-string');

      // Move out from the trigger element to hide it
      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.querySelector('.ant-popover-title')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeNull();
    }));
    it('should support template', fakeAsync(() => {
      const triggerElement = component.templatePopover.nativeElement;

      expect(overlayContainerElement.querySelector('.ant-popover-title')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeNull();

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-title').textContent).toContain('title-template');
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content').textContent).toContain('content-template');

      // Move out from the trigger element to hide it
      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.querySelector('.ant-popover-title')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeNull();
    }));

    it('should not create element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      expect(triggerElement.nextSibling.tagName).toBe('BUTTON');
    }));
  });
});

@Component({
  selector: 'nz-popover-test-new',
  template: `
    <a #stringPopover nz-popover nzTitle="title-string" nzContent="content-string">Show</a>
    <a #templatePopover nz-popover [nzTitle]="templateTitle" [nzContent]="templateContent">Show</a>
    <ng-template #templateTitle>
      title-template
    </ng-template>
    <ng-template #templateContent>
      content-template
    </ng-template>
    <div>
      <button>A</button>
      <button #inBtnGroup nz-popover nzTitle="title-string" >B</button>
      <button>C</button>
    </div>
  `
})
export class NzPopoverTestNewComponent {
  @ViewChild('stringPopover') stringPopover: ElementRef;
  @ViewChild('stringPopover', { read: NzPopoverDirective }) stringPopoverNzPopoverDirective: NzPopoverDirective;
  @ViewChild('templatePopover') templatePopover: ElementRef;
  @ViewChild('templatePopover', { read: NzPopoverDirective }) templatePopoverNzPopoverDirective: NzPopoverDirective;
  @ViewChild('inBtnGroup') inBtnGroup: ElementRef;
}

@Component({
  selector: 'nz-popover-test-wrapper',
  template: `
    <nz-popover [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-popover>Show</span></nz-popover>

    <nz-popover>
      <button #templateTrigger nz-popover>Show</button>
      <ng-template #nzTemplate>
        <i nz-icon type="file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-popover>

    <nz-popover nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-popover>Show</span></nz-popover>

    <nz-popover nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-popover>Show</span></nz-popover>

    <nz-popover nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-popover>Show</span></nz-popover>
  `
})
export class NzPopoverTestWrapperComponent {
  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;

  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;
}
