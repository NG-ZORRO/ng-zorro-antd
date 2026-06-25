/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay, of, Observable } from 'rxjs';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzAutoFocusType } from 'ng-zorro-antd/popconfirm/popconfirm';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm/popconfirm.module';

import { NzPopConfirmButtonProps } from './popconfirm-option';

describe('popconfirm', () => {
  let fixture: ComponentFixture<NzPopconfirmTestNewComponent>;
  let component: NzPopconfirmTestNewComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(NzPopconfirmTestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function getTitleText(): Element | null {
    return overlayContainerElement.querySelector('.ant-popover-message-title');
  }

  function getTooltipTrigger(index: number): HTMLButtonElement {
    return overlayContainerElement.querySelectorAll('.ant-popover-buttons button')[index] as HTMLButtonElement;
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  it('should support custom icon', () => {
    component.icon.set('question-circle');
    const triggerElement = component.iconTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).toBeFalsy();
  });

  it('should hide icon when nzIcon is set to null', () => {
    component.icon.set(null);
    const triggerElement = component.iconTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.ant-popover-message-icon')).toBeFalsy();
  });

  it('should nzOk work', () => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTooltipTrigger(0).textContent).toContain('cancel-text');
    expect(getTooltipTrigger(1).textContent).toContain('ok-text');
    expect(getTooltipTrigger(1).classList).not.toContain('ant-btn-primary');
  });

  it('should support nzOkType danger case', () => {
    component.nzOkType.set('danger');
    fixture.detectChanges();

    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();

    expect(getTooltipTrigger(1).classList).toContain('ant-btn-dangerous');
    expect(getTooltipTrigger(1).classList).toContain('ant-btn-primary');
  });

  it('should support nzOkDisabled case', () => {
    component.nzOkDisabled.set(true);
    fixture.detectChanges();

    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();

    expect(getTooltipTrigger(1).disabled).toBe(true);
  });

  it('should support nzOkButtonProps', () => {
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    component.nzOkButtonProps.update(props => ({ ...props, nzDisabled: true }));
    fixture.detectChanges();
    expect(getTooltipTrigger(1).disabled).toBe(true);
  });

  it('should support nzCancelButtonProps and disabled the cancel button', () => {
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    expect(getTooltipTrigger(0).disabled).toBe(false);
    component.nzCancelButtonProps.update(props => ({ ...props, nzDisabled: true }));
    fixture.detectChanges();
    expect(getTooltipTrigger(0).disabled).toBe(true);
  });

  it('should support nzCancelButtonProps and support danger on close button', () => {
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    component.nzCancelButtonProps.update(props => ({ ...props, nzDanger: true }));
    fixture.detectChanges();
    expect(getTooltipTrigger(0).classList).toContain('ant-btn-dangerous');
  });

  it('should cancel work', () => {
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
  });

  it('should confirm work', () => {
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
  });

  it('should autofocus work', () => {
    let focusElement;

    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement).toBeNull();

    component.autoFocus.set('cancel');
    fixture.detectChanges();
    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement?.nativeElement).toBe(getTooltipTrigger(0));

    component.autoFocus.set('ok');
    fixture.detectChanges();
    focusElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusElement?.nativeElement).toBe(getTooltipTrigger(1));
  });

  it('should condition work', () => {
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.condition.set(true);
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  });

  it('should before confirm work', () => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm.set(() => false);
    fixture.detectChanges();

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);
    expect(getTitleText()!.textContent).toContain('title-string');
  });

  it('should before confirm observable work', () => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm.set(() => of(true).pipe(delay(200)));

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    vi.advanceTimersByTime(200 + 10);
    waitingForTooltipToggling();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  });

  it('should before confirm promise work', async () => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.beforeConfirm.set(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 200);
        })
    );

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    vi.advanceTimersByTime(200 + 10);
    await fixture.whenStable();
    waitingForTooltipToggling();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  });

  it('should nzPopconfirmShowArrow work', () => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');

    component.nzPopconfirmShowArrow.set(false);
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-popover-arrow')).toBeFalsy();

    component.nzPopconfirmShowArrow.set(true);
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-popover-arrow')).toBeTruthy();
  });

  it('should nzPopconfirmBackdrop work', () => {
    component.nzPopconfirmBackdrop.set(true);
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    const boundingBox = overlayContainerElement.children[0];
    expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
  });

  it('should change overlayClass when the nzPopconfirmOverlayClassName is changed', () => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();

    component.class.set('testClass2');
    fixture.detectChanges();

    expect(overlayContainerElement.querySelector<HTMLElement>('.testClass')).toBeNull();
    expect(overlayContainerElement.querySelector<HTMLElement>('.testClass2')).not.toBeNull();
  });

  it('should nzPopconfirmOverlayClassName support classes listed in the string (space delimited)', () => {
    const triggerElement = component.stringTemplate.nativeElement;
    component.class.set('testClass1 testClass2');

    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();

    expect(overlayContainerElement.querySelector('.testClass1.testClass2')).not.toBeNull();
  });
});

@Component({
  imports: [NzPopconfirmModule],
  template: `
    <a
      nz-popconfirm
      #stringTemplate
      nzPopconfirmTitle="title-string"
      nzOkText="ok-text"
      [nzOkType]="nzOkType()"
      [nzOkDisabled]="nzOkDisabled()"
      nzCancelText="cancel-text"
      [nzAutofocus]="autoFocus()"
      [nzCondition]="condition()"
      [nzBeforeConfirm]="beforeConfirm()"
      [nzPopconfirmShowArrow]="nzPopconfirmShowArrow()"
      [nzPopconfirmBackdrop]="nzPopconfirmBackdrop()"
      [nzPopconfirmOverlayClassName]="class()"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
      [nzOkButtonProps]="nzOkButtonProps()"
      [nzCancelButtonProps]="nzCancelButtonProps()"
    >
      Delete
    </a>
    <a
      nz-popconfirm
      #templateTemplate
      [nzIcon]="icon()"
      [nzPopconfirmTitle]="titleTemplate"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Delete
    </a>

    <a nz-popconfirm #iconTemplate [nzIcon]="icon()">Delete</a>

    <ng-template #titleTemplate>title-template</ng-template>
  `
})
export class NzPopconfirmTestNewComponent {
  confirm = vi.fn();
  cancel = vi.fn();
  readonly condition = signal(false);
  readonly nzOkType = signal<string>('default');
  readonly nzOkDisabled = signal<boolean>(false);
  nzCancelText = 'Cancel';
  nzOkText = 'Ok';
  nzOkButtonProps = signal<NzPopConfirmButtonProps>({ nzDisabled: false });
  nzCancelButtonProps = signal<NzPopConfirmButtonProps>({ nzDisabled: false });
  readonly nzPopconfirmShowArrow = signal(true);
  readonly icon = signal<string | null | undefined>(undefined);
  readonly nzPopconfirmBackdrop = signal(false);
  readonly autoFocus = signal<NzAutoFocusType>(null);
  readonly beforeConfirm = signal<(() => Observable<boolean> | Promise<boolean> | boolean) | undefined>(undefined);

  @ViewChild('stringTemplate', { static: false }) stringTemplate!: ElementRef;
  @ViewChild('templateTemplate', { static: false }) templateTemplate!: ElementRef;
  @ViewChild('iconTemplate', { static: false }) iconTemplate!: ElementRef;

  visible = false;
  readonly class = signal('testClass');
}
