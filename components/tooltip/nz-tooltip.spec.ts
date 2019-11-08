import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

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
    >
      Show
    </a>
    <a #titleTemplate nz-tooltip [nzTitle]="template" [nzTrigger]="trigger">Show</a>
    <ng-template #template>
      title-template
    </ng-template>
    <div>
      <button>A</button>
      <button #inBtnGroup nz-tooltip nzTitle="title-string">B</button>
      <button>C</button>
    </div>
  `
})
export class NzTooltipTestDirectiveComponent {
  @ViewChild('titleString', { static: false }) titleString: ElementRef;

  @ViewChild('titleString', { static: false, read: NzTooltipDirective })
  titleStringNzTooltipDirective: NzTooltipDirective;

  @ViewChild('titleTemplate', { static: false }) titleTemplate: ElementRef;

  @ViewChild('titleTemplate', { static: false, read: NzTooltipDirective })
  titleTemplateNzTooltipDirective: NzTooltipDirective;

  @ViewChild('inBtnGroup', { static: false }) inBtnGroup: ElementRef;
  title = 'title-string';

  trigger: string | null = 'hover';
}

@Component({
  template: `
    <a #mostSimpleTrigger nz-tooltip="MOST-SIMPLE" (nzVisibleChange)="onVisibleChange()">Show</a>
    <nz-tooltip [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-tooltip>Show</span></nz-tooltip>
    <nz-tooltip>
      <button #templateTrigger nz-tooltip>Show</button>
      <ng-template #nzTemplate><i nz-icon nzType="file"></i> <span>Show with icon</span></ng-template>
    </nz-tooltip>
    <nz-tooltip nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-tooltip>Show</span></nz-tooltip>
    <nz-tooltip nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-tooltip>Show</span></nz-tooltip>
    <nz-tooltip nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-tooltip>Show</span></nz-tooltip>
  `
})
export class NzTooltipTestWrapperComponent {
  @ViewChild('clickTrigger', { static: false }) clickTrigger: ElementRef;
  @ViewChild('focusTrigger', { static: false }) focusTrigger: ElementRef;
  @ViewChild('mostSimpleTrigger', { static: false, read: NzTooltipDirective }) mostSimpleDirective: NzTooltipDirective;
  @ViewChild('mostSimpleTrigger', { static: false }) mostSimpleTrigger: ElementRef;
  @ViewChild('normalTrigger', { static: false }) normalTrigger: ElementRef;
  @ViewChild('templateTrigger', { static: false }) templateTrigger: ElementRef;
  @ViewChild('visibleTrigger', { static: false }) visibleTrigger: ElementRef;
  visible: boolean;
  visibleTogglingCount = 0;

  onVisibleChange(): void {
    this.visibleTogglingCount += 1;
  }
}

describe('NzTooltip', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzToolTipModule, NoopAnimationsModule, NzIconTestModule],
      declarations: [NzTooltipTestWrapperComponent, NzTooltipTestDirectiveComponent]
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

  describe('should support component usage', () => {
    let fixture: ComponentFixture<NzTooltipTestWrapperComponent>;
    let component: NzTooltipTestWrapperComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTooltipTestWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show/hide most simple tooltip with moving through all around', fakeAsync(() => {
      const title = 'MOST-SIMPLE';
      const triggerElement = component.mostSimpleTrigger.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibleTogglingCount).toBe(1); // It it's visible. Should not change state again.

      const overlayElement = component.mostSimpleDirective.tooltip.overlay.overlayRef.overlayElement;

      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(overlayElement, 'mouseleave');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should show/hide normal tooltip', fakeAsync(() => {
      const title = 'NORMAL';
      const triggerElement = component.normalTrigger.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(title);
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should show tooltip with custom template', fakeAsync(() => {
      const triggerElement = component.templateTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.querySelector('.anticon-file')).not.toBeNull();
    }));

    it('should show/hide tooltip by focus', fakeAsync(() => {
      const featureKey = 'FOCUS';
      const triggerElement = component.focusTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'focus');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(triggerElement, 'blur');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show/hide tooltip by click', fakeAsync(() => {
      const featureKey = 'CLICK';
      const triggerElement = component.clickTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop')!, 'click');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should show/hide by nzVisible change', fakeAsync(() => {
      const featureKey = 'VISIBLE';

      component.visible = true;
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).toContain(featureKey);

      component.visible = false;
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));
  });

  describe('should support directive usage', () => {
    let fixture: ComponentFixture<NzTooltipTestDirectiveComponent>;
    let component: NzTooltipTestDirectiveComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTooltipTestDirectiveComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should nzTitle support string', fakeAsync(() => {
      const featureKey = 'title-string';
      const triggerElement = component.titleString.nativeElement;
      const tooltipComponent = component.titleStringNzTooltipDirective.tooltip;

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).toContain(featureKey);
      expect(overlayContainerElement.querySelector('.ant-tooltip')!.classList).toContain('testClass');

      const overlayElement = component.titleStringNzTooltipDirective.tooltip.overlay.overlayRef.overlayElement;
      tooltipComponent.updatePosition();

      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(overlayElement, 'mouseleave');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should nzTitle support template', fakeAsync(() => {
      const featureKey = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;
      const tooltipComponent = component.titleTemplateNzTooltipDirective.tooltip;

      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).toContain(featureKey);

      const overlayElement = component.titleTemplateNzTooltipDirective.tooltip.overlay.overlayRef.overlayElement;
      tooltipComponent.updatePosition();

      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(overlayElement, 'mouseleave');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should not create element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      expect(triggerElement.nextSibling.tagName).toBe('BUTTON');
    }));

    it('should set `setTitle` proxy to `nzTitle`', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;
      const tooltipComponent = component.titleStringNzTooltipDirective.tooltip;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
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

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      component.trigger = null;
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling(fixture);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));
  });
});

function waitingForTooltipToggling<T>(fixture: ComponentFixture<T>): void {
  fixture.detectChanges();
  tick(500);
  fixture.detectChanges();
}
