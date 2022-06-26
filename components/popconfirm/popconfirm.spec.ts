import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { NzButtonType } from 'ng-zorro-antd/button';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzAutoFocusType } from 'ng-zorro-antd/popconfirm/popconfirm';

import { NzPopconfirmModule } from './popconfirm.module';

describe('NzPopconfirm', () => {
  let testBed: ComponentBed<NzPopconfirmTestNewComponent>;
  let fixture: ComponentFixture<NzPopconfirmTestNewComponent>;
  let component: NzPopconfirmTestNewComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(NzPopconfirmTestNewComponent, {
      imports: [NzPopconfirmModule, NoopAnimationsModule, NzIconTestModule]
    });
    fixture = testBed.fixture;
    component = testBed.component;
    fixture.detectChanges();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function getTitleText(): Element | null {
    return overlayContainerElement.querySelector('.ant-popover-message-title');
  }

  function getTooltipTrigger(index: number): Element {
    return overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[index];
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  it('should support custom icon', fakeAsync(() => {
    component.icon = 'question-circle';
    const triggerElement = component.iconTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).toBeFalsy();
  }));

  it('should nzOk work', () => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTooltipTrigger(0).textContent).toContain('cancel-text');
    expect(getTooltipTrigger(1).textContent).toContain('ok-text');
    expect(getTooltipTrigger(1).classList).not.toContain('ant-btn-primary');
  });

  it('should support nzOkType danger case', () => {
    component.nzOkType = 'danger';
    fixture.detectChanges();

    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();

    expect(getTooltipTrigger(1).classList).toContain('ant-btn-dangerous');
    expect(getTooltipTrigger(1).classList).toContain('ant-btn-primary');
  });

  it('should cancel work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    dispatchMouseEvent(getTooltipTrigger(0), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(1);
    expect(getTitleText()).toBeNull();
  }));

  it('should confirm work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
    expect(getTitleText()).toBeNull();
  }));

  it('should autofocus work', fakeAsync(() => {
    let focusElement;

    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement).toBeNull();

    component.autoFocus = 'cancel';
    fixture.detectChanges();
    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement?.nativeElement).toBe(getTooltipTrigger(0));

    component.autoFocus = 'ok';
    fixture.detectChanges();
    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement?.nativeElement).toBe(getTooltipTrigger(1));
  }));

  it('should condition work', fakeAsync(() => {
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.condition = true;
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  }));

  it('should before confirm work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm = () => false;
    fixture.detectChanges();

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);
    expect(getTitleText()!.textContent).toContain('title-string');
  }));

  it('should before confirm observable work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm = () =>
      new Observable(observer => {
        setTimeout(() => {
          observer.next(true);
          observer.complete();
        }, 200);
      });

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    tick(200 + 10);
    waitingForTooltipToggling();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  }));

  it('should before confirm promise work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 200);
      });

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    tick(200 + 10);
    waitingForTooltipToggling();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  }));

  it('should nzPopconfirmShowArrow work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');

    component.nzPopconfirmShowArrow = false;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-popover-arrow')).toBeFalsy();

    component.nzPopconfirmShowArrow = true;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-popover-arrow')).toBeTruthy();
  }));

  it('should nzPopconfirmBackdrop work', fakeAsync(() => {
    component.nzPopconfirmBackdrop = true;
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
  }));
});

@Component({
  template: `
    <a
      nz-popconfirm
      #stringTemplate
      nzPopconfirmTitle="title-string"
      nzOkText="ok-text"
      [nzOkType]="nzOkType"
      nzCancelText="cancel-text"
      [nzAutofocus]="autoFocus"
      [nzCondition]="condition"
      [nzBeforeConfirm]="beforeConfirm"
      [nzPopconfirmShowArrow]="nzPopconfirmShowArrow"
      [nzPopconfirmBackdrop]="nzPopconfirmBackdrop"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Delete
    </a>
    <a
      nz-popconfirm
      #templateTemplate
      [nzIcon]="icon"
      [nzPopconfirmTitle]="titleTemplate"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Delete
    </a>

    <a nz-popconfirm #iconTemplate [nzIcon]="icon">Delete</a>

    <ng-template #titleTemplate>title-template</ng-template>
  `
})
export class NzPopconfirmTestNewComponent {
  confirm = jasmine.createSpy('confirm');
  cancel = jasmine.createSpy('cancel');
  condition = false;
  nzOkType: NzButtonType | 'danger' = 'default';
  nzPopconfirmShowArrow = true;
  icon: string | undefined = undefined;
  nzPopconfirmBackdrop = false;
  autoFocus: NzAutoFocusType = null;
  beforeConfirm: (() => Observable<boolean> | Promise<boolean> | boolean) | null = null;

  @ViewChild('stringTemplate', { static: false }) stringTemplate!: ElementRef;
  @ViewChild('templateTemplate', { static: false }) templateTemplate!: ElementRef;
  @ViewChild('iconTemplate', { static: false }) iconTemplate!: ElementRef;

  visible = false;
  visibilityTogglingCount = 0;

  onVisibleChange(): void {
    this.visibilityTogglingCount += 1;
  }
}
