/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';

import { NzPopoverDirective } from './popover';
import { NzPopoverModule } from './popover.module';

describe('popover', () => {
  let fixture: ComponentFixture<NzPopoverTestComponent>;
  let component: NzPopoverTestComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
    fixture = TestBed.createComponent(NzPopoverTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function getTextContentOf(selector: string): string | null {
    const el = overlayContainerElement.querySelector(selector);
    return el && el.textContent ? el.textContent : null;
  }

  function getTitleTextContent(): string | null {
    return getTextContentOf('.ant-popover-title');
  }

  function getInnerTextContent(): string | null {
    return getTextContentOf('.ant-popover-inner-content');
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  it('should support string', fakeAsync(() => {
    const triggerElement = component.stringPopover.nativeElement;

    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toContain('title-string');
    expect(getInnerTextContent()).toContain('content-string');

    dispatchMouseEvent(triggerElement, 'mouseleave');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();
  }));

  it('should support template', fakeAsync(() => {
    const triggerElement = component.templatePopover.nativeElement;

    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toContain('title-template');
    expect(getInnerTextContent()).toContain('content-template');

    dispatchMouseEvent(triggerElement, 'mouseleave');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();
  }));

  // changing content on the directive should be synced to the component
  it('should set `setContent` proxy to `nzContent`', fakeAsync(() => {
    const triggerElement = component.changePopover.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getInnerTextContent()).toContain('content');

    component.content = 'changed-content';
    fixture.detectChanges();
    expect(getInnerTextContent()).toContain('changed-content');
  }));

  it('should nzPopoverBackdrop work', fakeAsync(() => {
    const triggerElement = component.backdropPopover.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    const boundingBox = overlayContainerElement.children[0];
    expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
  }));

  it('should prohibit hiding popover when nzPopoverOverlayClickable is false', fakeAsync(() => {
    const triggerElement = component.hideTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.textContent).toContain('content-string');

    dispatchMouseEvent(document.body, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.textContent).toContain('content-string');
  }));

  it('should change overlayClass when the nzPopoverOverlayClassName is changed', fakeAsync(() => {
    const triggerElement = component.stringPopover.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();

    component.class = 'testClass2';
    fixture.detectChanges();

    expect(overlayContainerElement.querySelector<HTMLElement>('.testClass')).toBeNull();
    expect(overlayContainerElement.querySelector<HTMLElement>('.testClass2')).not.toBeNull();
  }));

  it('should nzPopoverOverlayClassName support classes listed in the string (space delimited)', fakeAsync(() => {
    const triggerElement = component.stringPopover.nativeElement;
    component.class = 'testClass1 testClass2';

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();

    expect(overlayContainerElement.querySelector('.testClass1.testClass2')).not.toBeNull();
  }));

  it('should support context', fakeAsync(() => {
    const triggerElement = component.contextPopover.nativeElement;

    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();
    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toContain('titleContextTest');
    expect(getInnerTextContent()).toContain('contentContextTest');
  }));
});

@Component({
  imports: [NzPopoverModule],
  template: `
    <a
      #stringPopover
      nz-popover
      nzPopoverTitle="title-string"
      nzPopoverContent="content-string"
      [nzPopoverOverlayClassName]="class"
      >Show</a
    >

    <a #templatePopover nz-popover [nzPopoverTitle]="templateTitle" [nzPopoverContent]="templateContent">Show</a>

    <a #changePopover nz-popover nzPopoverTitle="title-change" [nzPopoverContent]="content"></a>

    <a
      #backdropPopover
      nz-popover
      nzPopoverContent="content-string"
      nzPopoverTrigger="click"
      [nzPopoverBackdrop]="true"
    ></a>

    <a
      #hideTemplate
      nz-popover
      nzPopoverContent="content-string"
      nzPopoverTrigger="click"
      [nzPopoverBackdrop]="true"
      [nzPopoverOverlayClickable]="false"
    >
    </a>

    <ng-template #templateTitle>title-template</ng-template>

    <ng-template #templateContent>content-template</ng-template>

    <a
      #contextPopover
      nz-popover
      [nzPopoverTitle]="templateTitleContext"
      [nzPopoverContent]="templateContentContext"
      nzPopoverTitleContext="titleContextTest"
      nzPopoverContentContext="contentContextTest"
    >
    </a>
    <ng-template #templateTitleContext let-item>{{ item }}</ng-template>
    <ng-template #templateContentContext let-item>{{ item }}</ng-template>
  `
})
export class NzPopoverTestComponent {
  @ViewChild('stringPopover', { static: false }) stringPopover!: ElementRef;
  @ViewChild('stringPopover', { static: false, read: NzPopoverDirective })
  stringPopoverNzPopoverDirective!: NzPopoverDirective;

  @ViewChild('templatePopover', { static: false }) templatePopover!: ElementRef;
  @ViewChild('templatePopover', { static: false, read: NzPopoverDirective })
  templatePopoverNzPopoverDirective!: NzPopoverDirective;

  @ViewChild('changePopover', { static: true }) changePopover!: ElementRef;
  @ViewChild('changePopover', { static: true, read: NzPopoverDirective })
  changePopoverNzPopoverDirective!: NzPopoverDirective;

  @ViewChild('hideTemplate', { static: false }) hideTemplate!: ElementRef;
  @ViewChild('hideTemplate', { static: false, read: NzPopoverDirective })
  hideTemplateDirective!: NzPopoverDirective;

  @ViewChild('backdropPopover', { static: true }) backdropPopover!: ElementRef;

  @ViewChild('contextPopover', { static: false }) contextPopover!: ElementRef;
  @ViewChild('contextPopover', { static: false, read: NzPopoverDirective })
  contextPopoverNzPopoverDirective!: NzPopoverDirective;

  content = 'content';
  visible = false;
  class = 'testClass';
}
