import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzPopconfirmModule } from './nz-popconfirm.module';

describe('NzPopconfirm', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture;
  let component;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzPopconfirmModule, NoopAnimationsModule, NzToolTipModule ],
      declarations: [ NzpopconfirmTestWrapperComponent, NzpopconfirmTestNewComponent ]
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
      fixture = TestBed.createComponent(NzpopconfirmTestWrapperComponent);
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
      expect(overlayContainerElement.textContent).toContain(featureKey);

      // Move out from the trigger element to hide it
      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(100); // wait for the default 100ms delay
      fixture.detectChanges();
      tick(); // wait for next tick to hide
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should support nzOkType', fakeAsync(() => {
      component.nzOkType = 'danger';
      const triggerElement = component.normalTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
      expect(!!overlayContainerElement.querySelector('button.ant-btn-danger')).toBeTruthy();
    }));

    it('should show tooltip with custom template', fakeAsync(() => {
      const triggerElement = component.templateTrigger.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      tick(150); // wait for the default 100ms delay
      fixture.detectChanges();
      tick();
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
      tick(500);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should execute with condition', fakeAsync(() => {
      const featureKey = 'EXECUTE';
      const triggerElement = component.executeTrigger.nativeElement;
      const onConfirm = spyOn(component, 'onConfirm');
      const onCancel = spyOn(component, 'onCancel');

      component.executeCondition = true;
      fixture.detectChanges();
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
      expect(onConfirm).toHaveBeenCalled();

      component.executeCondition = false;
      fixture.detectChanges();
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(featureKey);
      expect(onConfirm).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(overlayContainerElement.querySelector('.ant-popover-buttons button:first-child'), 'click');
      fixture.detectChanges();
      tick(600);
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
      expect(onCancel).toHaveBeenCalled();
    }));
  });
  describe('should support directive usage', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzpopconfirmTestNewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should show/hide with title string', fakeAsync(() => {
      const triggerElement = component.stringTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title').textContent).toContain('title-string');
      dispatchMouseEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop'), 'click');
      tick();
      fixture.detectChanges();
      tick(500); // Wait for animations
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title')).toBeNull();
    }));
    it('should all text and type work', () => {
      const triggerElement = component.stringTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[ 0 ].textContent).toContain('cancel-text');
      expect(overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[ 1 ].textContent).toContain('ok-text');
      expect(overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[ 1 ].classList).not.toContain('ant-btn-primary');
    });
    it('should cancel work', fakeAsync(() => {
      const triggerElement = component.stringTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title').textContent).toContain('title-string');
      expect(component.confirm).toHaveBeenCalledTimes(0);
      expect(component.cancel).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[ 0 ], 'click');
      tick();
      fixture.detectChanges();
      tick(500); // Wait for animations
      fixture.detectChanges();
      tick();
      expect(component.confirm).toHaveBeenCalledTimes(0);
      expect(component.cancel).toHaveBeenCalledTimes(1);
      expect(overlayContainerElement.querySelector('.ant-popover-message-title')).toBeNull();
    }));
    it('should confirm work', fakeAsync(() => {
      const triggerElement = component.stringTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title').textContent).toContain('title-string');
      expect(component.confirm).toHaveBeenCalledTimes(0);
      expect(component.cancel).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[ 1 ], 'click');
      tick();
      fixture.detectChanges();
      tick(500); // Wait for animations
      fixture.detectChanges();
      tick();
      expect(component.confirm).toHaveBeenCalledTimes(1);
      expect(component.cancel).toHaveBeenCalledTimes(0);
      expect(overlayContainerElement.querySelector('.ant-popover-message-title')).toBeNull();
    }));
    it('should condition work', fakeAsync(() => {
      expect(component.confirm).toHaveBeenCalledTimes(0);
      expect(component.cancel).toHaveBeenCalledTimes(0);
      component.condition = true;
      fixture.detectChanges();
      const triggerElement = component.stringTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title')).toBeNull();
      expect(component.confirm).toHaveBeenCalledTimes(1);
      expect(component.cancel).toHaveBeenCalledTimes(0);
    }));
    it('should show/hide with title template', fakeAsync(() => {
      const triggerElement = component.templateTemplate.nativeElement;
      dispatchMouseEvent(triggerElement, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-popover-message').textContent).toContain('title-template');
      dispatchMouseEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop'), 'click');
      tick();
      fixture.detectChanges();
      tick(500); // Wait for animations
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.ant-popover-message-title')).toBeNull();
    }));
    it('should not create element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      expect(triggerElement.nextSibling.tagName).toBe('BUTTON');
    }));
  });
});

@Component({
  selector: 'nz-popconfirm-test-new',
  template: `
    <a nz-popconfirm #stringTemplate nzTitle="title-string" nzOkText="ok-text" nzCancelText="cancel-text" nzOkType="default" [nzCondition]="condition" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">Delete</a>
    <a nz-popconfirm #templateTemplate [nzTitle]="titleTemplate" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">Delete</a>
    <ng-template #titleTemplate>title-template</ng-template>
    <div>
      <button>A</button>
      <button #inBtnGroup nz-popconfirm nzTitle="title-string" >B</button>
      <button>C</button>
    </div>
  `
})
export class NzpopconfirmTestNewComponent {
  confirm = jasmine.createSpy('confirm');
  cancel = jasmine.createSpy('cancel');
  condition = false;
  @ViewChild('stringTemplate') stringTemplate: ElementRef;
  @ViewChild('templateTemplate') templateTemplate: ElementRef;
  @ViewChild('inBtnGroup') inBtnGroup: ElementRef;

}

@Component({
  selector: 'nz-popconfirm-test-wrapper',
  template: `
    <nz-popconfirm [nzOkType]="nzOkType" [nzTitle]="'NORMAL'" [nzTrigger]="'hover'">
      <span #normalTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm [nzTrigger]="'hover'">
      <button #templateTrigger nz-popconfirm>Show</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>Show with icon</span>
      </ng-template>
    </nz-popconfirm>

    <nz-popconfirm nzTitle="FOCUS" [nzTrigger]="'focus'"><span #focusTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm nzTitle="CLICK" nzTrigger="click"><span #clickTrigger nz-popconfirm>Show</span></nz-popconfirm>

    <nz-popconfirm nzTitle="VISIBLE" [(nzVisible)]="visible"><span #visibleTrigger nz-popconfirm>Show</span>
    </nz-popconfirm>

    <nz-popconfirm nzTitle="EXECUTE" [nzCondition]="executeCondition" (nzOnConfirm)="onConfirm()" (nzOnCancel)="onCancel()">
      <span #executeTrigger nz-popconfirm>Show</span>
    </nz-popconfirm>
  `
})
export class NzpopconfirmTestWrapperComponent {
  nzOkType = 'primary';

  @ViewChild('normalTrigger') normalTrigger: ElementRef;

  @ViewChild('templateTrigger') templateTrigger: ElementRef;

  @ViewChild('focusTrigger') focusTrigger: ElementRef;

  @ViewChild('clickTrigger') clickTrigger: ElementRef;

  visible: boolean;
  @ViewChild('visibleTrigger') visibleTrigger: ElementRef;

  executeCondition: boolean;
  @ViewChild('executeTrigger') executeTrigger: ElementRef;

  onConfirm(): void {
  }

  onCancel(): void {
  }
}
