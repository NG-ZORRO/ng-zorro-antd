/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, provideZoneChangeDetection, TemplateRef } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

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
    tick(500);
    fixture.detectChanges();
  }

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideNzIconsTesting(), provideZoneChangeDetection()]
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

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('basic', () => {
    expect(resultEl.nativeElement.classList).toContain('ant-check-list');
    expect(!!resultEl.nativeElement.querySelector('.ant-check-list-button .ant-check-list-icon')).toBeTrue();
    expect(!!resultEl.nativeElement.querySelector('.ant-check-list-button .ant-check-list-description')).toBeTrue();
  });

  it('nzVisible', fakeAsync(() => {
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content .ant-check-list-header')).toBeTrue();
    expect(
      !!overlayContainerElement.querySelector(
        '.ant-popover-inner-content .ant-check-list-header .ant-check-list-header-title'
      )
    ).toBeTrue();
  }));

  it('nzItems', fakeAsync(() => {
    testComponent.visible = true;
    testComponent.items = [
      {
        description: 'Step 1',
        onClick: () => {}
      }
    ];
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-check-list-steps')).toBeTrue();
  }));

  it('nzProgress', fakeAsync(() => {
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBeTrue();
    testComponent.progress = false;
    fixture.detectChanges();
    expect(!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBeTrue();
  }));

  it('nzIndex', fakeAsync(() => {
    testComponent.visible = true;
    testComponent.items = [
      {
        description: 'Step 1',
        onClick: () => {}
      },
      {
        description: 'Step 2',
        onClick: () => {}
      }
    ];
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

    testComponent.index = 2;
    testComponent.items = [
      {
        description: 'Step 1',
        checked: true,
        onClick: () => {}
      },
      {
        description: 'Step 2',
        onClick: () => {}
      }
    ];
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

    testComponent.index = 3;
    testComponent.items = [
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
    ];
    fixture.detectChanges();
    expect(!overlayContainerElement.querySelector('.ant-check-list-progressBar')).toBeTrue();
    expect(!!overlayContainerElement.querySelector('.ant-check-list-header-finish')).toBeTrue();
  }));

  it('lose the list when you are finished', fakeAsync(() => {
    testComponent.visible = true;
    testComponent.items = [
      {
        description: 'Step 1',
        onClick: () => {}
      }
    ];
    testComponent.index = 2;
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-header-finish .ant-btn');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    }
  }));

  it('icon close List', fakeAsync(() => {
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-header-extra .anticon');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    }
  }));

  it('actively close the list', fakeAsync(() => {
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    const dom = overlayContainerElement.querySelector('.ant-check-list-footer');
    if (dom) {
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-check-list-close-check')).toBeTrue();
      const btnDom = overlayContainerElement.querySelector('.ant-check-list-close-check-action .ant-btn');
      if (btnDom) {
        dispatchMouseEvent(btnDom, 'click');
        waitingForTooltipToggling();
        expect(!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
      }
    }
  }));

  it('actively close hidden lists', fakeAsync(() => {
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    const footer = overlayContainerElement.querySelector('.ant-check-list-footer');
    expect(footer).not.toBeNull();
    dispatchMouseEvent(footer!, 'click');
    waitingForTooltipToggling();

    expect(!!overlayContainerElement.querySelector('.ant-check-list-close-check')).toBeTrue();
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-title')
    ).toBeTrue();
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-action')
    ).toBeTrue();
    expect(
      !!overlayContainerElement.querySelector('.ant-check-list-close-check .ant-check-list-close-check-other')
    ).toBeTrue();

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
  }));

  it('nzTriggerRender ', () => {
    testComponent.triggerRender = 'Check List';
    fixture.detectChanges();
    expect((resultEl.nativeElement.querySelector('.ant-check-list-button') as HTMLElement).innerText).toBe(
      'Check List'
    );
  });

  it('nzTitle', fakeAsync(() => {
    testComponent.title = 'Check List';
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect((overlayContainerElement.querySelector('.ant-check-list-header-title') as HTMLElement).innerText).toBe(
      'Check List'
    );
  }));

  it('nzFooter', fakeAsync(() => {
    testComponent.footer = 'Check List';
    testComponent.visible = true;
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect((overlayContainerElement.querySelector('.ant-check-list-footer') as HTMLElement).innerText).toBe(
      'Check List'
    );
  }));
});

@Component({
  selector: 'nz-test-check-list-basic',
  imports: [NzCheckListModule],
  template: `
    <nz-check-list
      [nzVisible]="visible"
      [nzItems]="items"
      [nzIndex]="index"
      [nzProgress]="progress"
      [nzTriggerRender]="triggerRender"
      [nzTitle]="title"
      [nzFooter]="footer"
    >
    </nz-check-list>
  `
})
export class NzTestCheckListBasicComponent {
  visible: boolean = false;
  items: NzItemProps[] = [];
  index: number = 1;
  progress: boolean = true;
  triggerRender: TemplateRef<void> | string | null = null;
  title: TemplateRef<void> | string | null = null;
  footer: TemplateRef<void> | string | null = null;
}
