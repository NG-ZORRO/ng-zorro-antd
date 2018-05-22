import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzToolTipComponent } from './nz-tooltip.component';
import { NzTooltipDirective } from './nz-tooltip.directive';
import { NzToolTipModule } from './nz-tooltip.module';

describe('NzTooltip', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let demoAppFixture: ComponentFixture<DemoAppComponent>;
  let demoAppComponent: DemoAppComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NzToolTipModule, NoopAnimationsModule ],
      declarations: [ DemoAppComponent ]
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

  beforeEach(() => {
    demoAppFixture = TestBed.createComponent(DemoAppComponent);
    demoAppComponent = demoAppFixture.componentInstance;
    demoAppFixture.detectChanges();
  });

  it('should show/hide most simple tooltip with moving through all around', fakeAsync(() => {
    const featureKey = 'MOST-SIMPLE';
    const triggerElement = demoAppComponent.mostSimpleTrigger.nativeElement;
    const tooltipComponent = (demoAppComponent.mostSimpleDirective as any).tooltip as NzToolTipComponent; // tslint:disable-line:no-any

    expect(overlayContainerElement.textContent).not.toContain(featureKey);

    // Move inside to trigger tooltip shown up
    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 150ms delay
    demoAppFixture.detectChanges();
    tick();
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    // NOTE: the overlayElement is only available after tooltip shown up
    const overlayElement = (demoAppComponent.mostSimpleDirective as any).tooltip.overlay.overlayRef.overlayElement; // tslint:disable-line:no-any
    tooltipComponent.updatePosition(); // This line is temporarily for coverage

    // Move out from the trigger element, then move into the tooltip element
    dispatchMouseEvent(triggerElement, 'mouseleave');
    demoAppFixture.detectChanges();
    dispatchMouseEvent(overlayElement, 'mouseenter');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    // Move out from the tooltip element to hide it
    dispatchMouseEvent(overlayElement, 'mouseleave');
    tick(100); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick(); // wait for next tick to hide
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should show/hide normal tooltip', fakeAsync(() => {
    const featureKey = 'NORMAL';
    const triggerElement = demoAppComponent.normalTrigger.nativeElement;

    expect(overlayContainerElement.textContent).not.toContain(featureKey);
    demoAppFixture.detectChanges();
    // Move inside to trigger tooltip shown up
    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 150ms delay
    demoAppFixture.detectChanges();
    tick();
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    // Move out from the trigger element to hide it
    dispatchMouseEvent(triggerElement, 'mouseleave');
    tick(100); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick(); // wait for next tick to hide
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should show tooltip with custom template', fakeAsync(() => {
    const triggerElement = demoAppComponent.templateTrigger.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 150ms delay
    demoAppFixture.detectChanges();
    tick();
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.querySelector('.anticon-file')).not.toBeNull();
  }));

  it('should show/hide tooltip by focus', fakeAsync(() => {
    const featureKey = 'FOCUS';
    const triggerElement = demoAppComponent.focusTrigger.nativeElement;

    dispatchMouseEvent(triggerElement, 'focus');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    dispatchMouseEvent(triggerElement, 'blur');
    tick(100); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick(); // wait for next tick to hide
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should show/hide tooltip by click', fakeAsync(() => {
    const featureKey = 'CLICK';
    const triggerElement = demoAppComponent.clickTrigger.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    dispatchMouseEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop'), 'click');
    tick();
    demoAppFixture.detectChanges();
    tick(500); // Wait for animations
    demoAppFixture.detectChanges();
    tick();
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should show/hide by nzVisible change', fakeAsync(() => {
    const featureKey = 'VISIBLE';
    demoAppComponent.visible = true;
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);

    demoAppComponent.visible = false;
    demoAppFixture.detectChanges();
    tick(100);
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));
});

@Component({
  selector: 'nz-demo-app',
  template: `
    <a #mostSimpleTrigger nz-tooltip="MOST-SIMPLE">Show</a>

    <nz-tooltip [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip>
      <button #templateTrigger nz-tooltip>Show</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-tooltip>

    <nz-tooltip nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-tooltip>Show</span></nz-tooltip>

    <nz-tooltip nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-tooltip>Show</span></nz-tooltip>
  `
})
export class DemoAppComponent {
  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;

  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;

  @ViewChild('mostSimpleTrigger') mostSimpleTrigger: ElementRef;
  @ViewChild('mostSimpleTrigger', { read: NzTooltipDirective }) mostSimpleDirective: NzTooltipDirective;
}
