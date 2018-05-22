import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzPopconfirmModule } from './nz-popconfirm.module';

describe('NzPopconfirm', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let demoAppFixture: ComponentFixture<DemoAppComponent>;
  let demoAppComponent: DemoAppComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NzPopconfirmModule, NoopAnimationsModule ],
      declarations: [ DemoAppComponent ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  // afterEach(() => {
  //   overlayContainer.ngOnDestroy();
  // });

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
    expect(overlayContainerElement.textContent).toContain(featureKey);

    // Move out from the trigger element to hide it
    dispatchMouseEvent(triggerElement, 'mouseleave');
    tick(100); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick(); // wait for next tick to hide
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should support nzOkType', fakeAsync(() => {
    demoAppComponent.nzOkType = 'danger';
    const triggerElement = demoAppComponent.normalTrigger.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick();
    expect(!!overlayContainerElement.querySelector('button.ant-btn-danger')).toBeTruthy();
  }));

  it('should show tooltip with custom template', fakeAsync(() => {
    const triggerElement = demoAppComponent.templateTrigger.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    demoAppFixture.detectChanges();
    tick(150); // wait for the default 100ms delay
    demoAppFixture.detectChanges();
    tick();
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
    tick(500);
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
  }));

  it('should execute with condition', fakeAsync(() => {
    const featureKey = 'EXECUTE';
    const triggerElement = demoAppComponent.executeTrigger.nativeElement;
    const onConfirm = spyOn(demoAppComponent, 'onConfirm');
    const onCancel = spyOn(demoAppComponent, 'onCancel');

    demoAppComponent.executeCondition = true;
    demoAppFixture.detectChanges();
    dispatchMouseEvent(triggerElement, 'click');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
    expect(onConfirm).toHaveBeenCalled();

    demoAppComponent.executeCondition = false;
    demoAppFixture.detectChanges();
    dispatchMouseEvent(triggerElement, 'click');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain(featureKey);
    expect(onConfirm).toHaveBeenCalledTimes(1);

    dispatchMouseEvent(overlayContainerElement.querySelector('.ant-popover-buttons button:first-child'), 'click');
    demoAppFixture.detectChanges();
    tick(600);
    expect(overlayContainerElement.textContent).not.toContain(featureKey);
    expect(onCancel).toHaveBeenCalled();
  }));
});

@Component({
  selector: 'nz-demo-app',
  template: `
    <nz-popconfirm [nzOkType]="nzOkType" [nzTitle]="'NORMAL'" [nzTrigger]="'hover'"><span #normalTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm [nzTrigger]="'hover'">
      <button #templateTrigger nz-popconfirm>Show</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-popconfirm>

    <nz-popconfirm nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm nzTitle="EXECUTE" [nzCondition]="executeCondition" (nzOnConfirm)="onConfirm()" (nzOnCancel)="onCancel()"><span #executeTrigger nz-popconfirm>Show</span></nz-popconfirm>
  `
})
export class DemoAppComponent {
  nzOkType = 'primary';

  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;

  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;

  executeCondition: boolean;
  @ViewChild('executeTrigger') executeTrigger: ElementRef;
  onConfirm(): void { }
  onCancel(): void { }
}
