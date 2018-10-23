import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzToolTipComponent } from './nz-tooltip.component';
import { NzTooltipDirective } from './nz-tooltip.directive';
import { NzToolTipModule } from './nz-tooltip.module';

describe('NzTooltip', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture;
  let component;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzToolTipModule, NoopAnimationsModule, NzIconModule ],
      declarations: [ NzTooltipTestWrapperComponent, NzTooltipTestNewComponent ]
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
  describe('should bring no break change', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTooltipTestWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should show/hide most simple tooltip with moving through all around', fakeAsync(() => {
      const featureKey = 'MOST-SIMPLE';
      const triggerElement = component.mostSimpleTrigger.nativeElement;
      const tooltipComponent = (component.mostSimpleDirective as any).tooltip as NzToolTipComponent; // tslint:disable-line:no-any

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 150ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // NOTE: the overlayElement is only available after tooltip shown up
      const overlayElement = (component.mostSimpleDirective as any).tooltip.overlay.overlayRef.overlayElement; // tslint:disable-line:no-any
      tooltipComponent.updatePosition(); // This line is temporarily for coverage

      // Move out from the trigger element, then move into the tooltip element
      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // Move out from the tooltip element to hide it
      dispatchMouseEvent(overlayElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show/hide normal tooltip', fakeAsync(() => {
      const featureKey = 'NORMAL';
      const triggerElement = component.normalTrigger.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(featureKey);
      fixture.detectChanges();
      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 150ms delay
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
      tick(150); // wait for the default 150ms delay
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
      fixture = TestBed.createComponent(NzTooltipTestNewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should nzTitle support string', fakeAsync(() => {
      const featureKey = 'title-string';
      const triggerElement = component.titleString.nativeElement;
      const tooltipComponent = (component.titleStringNzTooltipDirective as any).tooltip as NzToolTipComponent; // tslint:disable-line:no-any

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 150ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);
      expect(overlayContainerElement.querySelector('.ant-tooltip').classList).toContain('testClass');

      // NOTE: the overlayElement is only available after tooltip shown up
      const overlayElement = (component.titleStringNzTooltipDirective as any).tooltip.overlay.overlayRef.overlayElement; // tslint:disable-line:no-any
      tooltipComponent.updatePosition(); // This line is temporarily for coverage

      // Move out from the trigger element, then move into the tooltip element
      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // Move out from the tooltip element to hide it
      dispatchMouseEvent(overlayElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should nzTitle support template', fakeAsync(() => {
      const featureKey = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;
      const tooltipComponent = (component.titleTemplateNzTooltipDirective as any).tooltip as NzToolTipComponent; // tslint:disable-line:no-any

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      // Move inside to trigger tooltip shown up
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 150ms delay
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // NOTE: the overlayElement is only available after tooltip shown up
      const overlayElement = (component.titleTemplateNzTooltipDirective as any).tooltip.overlay.overlayRef.overlayElement; // tslint:disable-line:no-any
      tooltipComponent.updatePosition(); // This line is temporarily for coverage

      // Move out from the trigger element, then move into the tooltip element
      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // Move out from the tooltip element to hide it
      dispatchMouseEvent(overlayElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should not create element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      expect(triggerElement.nextSibling.tagName).toBe('BUTTON');
    }));

  });

});

@Component({
  selector: 'nz-tooltip-test-new',
  template: `
    <a #titleString nz-tooltip nzTitle="title-string" nzTrigger="hover" nzPlacement="topLeft" nzOverlayClassName="testClass" [nzOverlayStyle]="{color:'#000'}" [nzMouseEnterDelay]="0.15" [nzMouseLeaveDelay]="0.1">Show</a>
    <a #titleTemplate nz-tooltip [nzTitle]="template">Show</a>
    <ng-template #template>
      title-template
    </ng-template>
    <div>
      <button>A</button>
      <button #inBtnGroup nz-tooltip nzTitle="title-string" >B</button>
      <button>C</button>
    </div>
  `
})
export class NzTooltipTestNewComponent {
  @ViewChild('titleString') titleString: ElementRef;
  @ViewChild('titleString', { read: NzTooltipDirective }) titleStringNzTooltipDirective: NzTooltipDirective;
  @ViewChild('titleTemplate') titleTemplate: ElementRef;
  @ViewChild('titleTemplate', { read: NzTooltipDirective }) titleTemplateNzTooltipDirective: NzTooltipDirective;
  @ViewChild('inBtnGroup') inBtnGroup: ElementRef;

}

@Component({
  selector: 'nz-tooltip-test-wrapper',
  template: `
    <a #mostSimpleTrigger nz-tooltip="MOST-SIMPLE">Show</a>

    <nz-tooltip [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip>
      <button #templateTrigger nz-tooltip>Show</button>
      <ng-template #nzTemplate>
        <i nz-icon type="file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-tooltip>

    <nz-tooltip nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-tooltip>Show</span></nz-tooltip>
  `
})
export class NzTooltipTestWrapperComponent {
  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;
  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;

  @ViewChild('mostSimpleTrigger') mostSimpleTrigger: ElementRef;
  @ViewChild('mostSimpleTrigger', { read: NzTooltipDirective }) mostSimpleDirective: NzTooltipDirective;
}
