/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, TemplateRef, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzCheckListComponent } from './check-list.component';
import { NzCheckListModule } from './check-list.module';
import { NzItemProps } from './typings';

describe('check-list', () => {
  let fixture: ComponentFixture<NzTestCheckListBasicComponent>;
  let testComponent: NzTestCheckListBasicComponent;
  let resultEl: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), provideNzIconsTesting()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestCheckListBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzCheckListComponent));
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => vi.useFakeTimers());

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  afterEach(() => vi.useRealTimers());

  it('basic', () => {
    expect(resultEl.nativeElement.classList).toContain('ant-check-list');
    expect(!!resultEl.nativeElement.querySelector('.ant-check-list-button .ant-check-list-icon')).toBe(true);
    expect(!!resultEl.nativeElement.querySelector('.ant-check-list-button .ant-check-list-description')).toBe(true);
  });

  it('nzVisible', () => {
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBe(true);
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content .ant-check-list-header')).toBe(true);
    expect(
      !!overlayContainerElement.querySelector(
        '.ant-popover-inner-content .ant-check-list-header .ant-check-list-header-title'
      )
    ).toBe(true);
  });

  it('nzItems', () => {
    testComponent.visible.set(true);
    testComponent.items.set([
      {
        description: 'Step 1',
        onClick: () => {}
      }
    ]);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-check-list-steps')).toBe(true);
  });

  it('nzProgress', () => {
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBe(true);
    testComponent.progress.set(false);
    fixture.detectChanges();
    expect(!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBe(true);
  });

  it('nzIndex', () => {
    testComponent.visible.set(true);
    testComponent.items.set([
      {
        description: 'Step 1',
        onClick: () => {}
      },
      {
        description: 'Step 2',
        onClick: () => {}
      }
    ]);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelectorAll('.ant-check-list-steps').length).toBe(2);
    expect(
      (
        overlayContainerElement.querySelector(
          '.ant-check-list-highlight .ant-check-list-steps-item-description'
        ) as HTMLElement
      ).innerText
    ).toBe('Step 1');
    expect((overlayContainerElement.querySelector('.ant-progress-text') as HTMLElement).innerText).toBe('0%');
    expect(overlayContainerElement.querySelectorAll('.ant-check-list-steps-item-arrows').length).toBe(1);

    testComponent.index.set(2);
    testComponent.items.set([
      {
        description: 'Step 1',
        checked: true,
        onClick: () => {}
      },
      {
        description: 'Step 2',
        onClick: () => {}
      }
    ]);
    fixture.detectChanges();
    expect(
      (
        overlayContainerElement.querySelector(
          '.ant-check-list-checked .ant-check-list-steps-item-description'
        ) as HTMLElement
      ).innerText
    ).toBe('Step 1');
    expect(
      (
        overlayContainerElement.querySelector(
          '.ant-check-list-highlight .ant-check-list-steps-item-description'
        ) as HTMLElement
      ).innerText
    ).toBe('Step 2');
    expect((overlayContainerElement.querySelector('.ant-progress-text') as HTMLElement).innerText).toBe('50%');

    testComponent.index.set(3);
    testComponent.items.set([
      {
        description: 'Step 1',
        checked: true,
        onClick: () => {}
      },
      {
        description: 'Step 2',
        checked: true,
        onClick: () => {}
      }
    ]);
    fixture.detectChanges();
    expect(!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBe(true);
    expect(!!overlayContainerElement.querySelector('.ant-check-list-header-finish')).toBe(true);
  });

  it('lose the list when you are finished', () => {
    testComponent.visible.set(true);
    testComponent.items.set([
      {
        description: 'Step 1',
        onClick: () => {}
      }
    ]);
    testComponent.index.set(2);
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-header-finish .ant-btn');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBe(true);
    }
  });

  it('icon close List', () => {
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-header-extra .anticon');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBe(true);
    }
  });

  it('actively close the list', () => {
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-footer');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-check-list-close-check')).toBe(true);
      const btnDom = overlayContainerElement.querySelector('.ant-check-list-close-check-action .ant-btn');
      if (btnDom) {
        dispatchMouseEvent(btnDom, 'click');
        waitingForTooltipToggling();
        expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBe(true);
      }
    }
  });

  it('actively close hidden lists', () => {
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    const footer = overlayContainerElement.querySelector('.ant-check-list-footer');
    expect(footer).not.toBeNull();
    dispatchMouseEvent(footer!, 'click');
    waitingForTooltipToggling();

    expect(!!overlayContainerElement.querySelector('.ant-check-list-close-check')).toBe(true);
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-title')
    ).toBe(true);
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-action')
    ).toBe(true);
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-other')
    ).toBe(true);

    // close manually
    const labelEl = overlayContainerElement.querySelector('.ant-check-list-close-check-other .ant-checkbox-wrapper');
    expect(labelEl).not.toBeNull();
    dispatchMouseEvent(labelEl!, 'click');
    waitingForTooltipToggling();
    const btnEl = overlayContainerElement.querySelector('.ant-check-list-close-check-action .ant-btn-primary');
    expect(btnEl).not.toBeNull();
    dispatchMouseEvent(btnEl!, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.ant-check-list')).toBeNull();
  });

  it('nzTriggerRender ', () => {
    testComponent.triggerRender.set('Check List');
    fixture.detectChanges();
    expect((resultEl.nativeElement.querySelector('.ant-check-list-button') as HTMLElement).innerText).toBe(
      'Check List'
    );
  });

  it('nzTitle', () => {
    testComponent.title.set('Check List');
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect((overlayContainerElement.querySelector('.ant-check-list-header-title') as HTMLElement).innerText).toBe(
      'Check List'
    );
  });

  it('nzFooter', () => {
    testComponent.footer.set('Check List');
    testComponent.visible.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect((overlayContainerElement.querySelector('.ant-check-list-footer') as HTMLElement).innerText).toBe(
      'Check List'
    );
  });
});

@Component({
  selector: 'nz-test-check-list-basic',
  imports: [NzCheckListModule],
  template: `
    <nz-check-list
      [nzVisible]="visible()"
      [nzItems]="items()"
      [nzIndex]="index()"
      [nzProgress]="progress()"
      [nzTriggerRender]="triggerRender()"
      [nzTitle]="title()"
      [nzFooter]="footer()"
    />
  `
})
export class NzTestCheckListBasicComponent {
  readonly visible = signal<boolean>(false);
  readonly items = signal<NzItemProps[]>([]);
  readonly index = signal<number>(1);
  readonly progress = signal<boolean>(true);
  readonly triggerRender = signal<TemplateRef<void> | string | null>(null);
  readonly title = signal<TemplateRef<void> | string | null>(null);
  readonly footer = signal<TemplateRef<void> | string | null>(null);
}
