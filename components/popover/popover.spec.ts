import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/componet-bed';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzPopoverDirective } from './popover';
import { NzPopoverModule } from './popover.module';

describe('NzPopover', () => {
  let testBed: ComponentBed<NzPopoverTestComponent>;
  let fixture: ComponentFixture<NzPopoverTestComponent>;
  let component: NzPopoverTestComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(NzPopoverTestComponent, {
      imports: [NzPopoverModule, NoopAnimationsModule, NzIconTestModule]
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
});

@Component({
  template: `
    <a #stringPopover nz-popover nzTitle="title-string" nzContent="content-string">
      Show
    </a>

    <a #templatePopover nz-popover [nzTitle]="templateTitle" [nzContent]="templateContent">
      Show
    </a>

    <ng-template #templateTitle>
      title-template
    </ng-template>

    <ng-template #templateContent>
      content-template
    </ng-template>
  `
})
export class NzPopoverTestComponent {
  @ViewChild('stringPopover', { static: false }) stringPopover!: ElementRef;
  @ViewChild('stringPopover', { static: false, read: NzPopoverDirective })
  stringPopoverNzPopoverDirective!: NzPopoverDirective;

  @ViewChild('templatePopover', { static: false }) templatePopover!: ElementRef;
  @ViewChild('templatePopover', { static: false, read: NzPopoverDirective })
  templatePopoverNzPopoverDirective!: NzPopoverDirective;
}
