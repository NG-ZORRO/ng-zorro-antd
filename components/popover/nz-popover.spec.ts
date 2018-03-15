import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzPopoverModule } from './nz-popover.module';

describe('NzPopover', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let demoAppFixture: ComponentFixture<DemoAppComponent>;
  let demoAppComponent: DemoAppComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NzPopoverModule, NoopAnimationsModule ],
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

  it('should show/hide normal tooltip', fakeAsync(() => {
    const featureKey = 'NORMAL';
    const triggerElement = demoAppComponent.normalTrigger.nativeElement;

    expect(overlayContainerElement.textContent).not.toContain(featureKey);

    // Move inside to trigger tooltip shown up
    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 100ms delay
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
    tick(150); // wait for the default 100ms delay
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
    <nz-popover [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-popover>Show</span></nz-popover>

    <nz-popover>
      <button #templateTrigger nz-popover>Show</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-popover>

    <nz-popover nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-popover>Show</span></nz-popover>

    <nz-popover nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-popover>Show</span></nz-popover>

    <nz-popover nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-popover>Show</span></nz-popover>
  `
})
export class DemoAppComponent {
  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;

  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;
}
