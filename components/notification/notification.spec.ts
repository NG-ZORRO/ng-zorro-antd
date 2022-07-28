import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeOutline } from '@ant-design/icons-angular/icons';

import { NzConfigService, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { NzNotificationModule } from './notification.module';
import { NzNotificationService } from './notification.service';

@Component({
  template: ` <ng-template let-data="data">{{ 'test template content' }}{{ data }}</ng-template> `
})
export class NzTestNotificationComponent {
  @ViewChild(TemplateRef, { static: true }) demoTemplateRef!: TemplateRef<{}>;
}

describe('NzNotification', () => {
  let testBed: ComponentBed<NzTestNotificationComponent>;
  let notificationService: NzNotificationService;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestNotificationComponent>;
  let nzConfigService: NzConfigService;

  function waitForNotificationToggling(): void {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
  }

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(NzTestNotificationComponent, {
      imports: [NzNotificationModule, NoopAnimationsModule],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [HomeOutline]
        },
        {
          provide: NZ_CONFIG,
          useValue: {
            notification: {
              nzMaxStack: 2
            }
          }
        }
      ]
    });

    fixture = testBed.fixture;
  }));

  beforeEach(inject([NzNotificationService, OverlayContainer], (n: NzNotificationService, oc: OverlayContainer) => {
    notificationService = n;
    // need init before testing
    const notification = notificationService.success('init', 'init');
    notificationService.remove(notification.messageId);
    // @ts-ignore
    nzConfigService = notificationService.container.nzConfigService;
    if (!overlayContainerElement) {
      overlayContainerElement = oc.getContainerElement();
    }
  }));

  afterEach(() => {
    notificationService.remove();
  });

  it('should open a message box with success', () => {
    notificationService.success('test-title', 'SUCCESS');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    notificationService.error('test-title', 'ERROR');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-error')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    notificationService.warning('test-title', 'WARNING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-warning')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    notificationService.info('test-title', 'INFO');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-info')).not.toBeNull();
  });

  it('should open a message box with blank', () => {
    notificationService.blank('test-title', 'BLANK');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon')).toBeNull();
  });

  it('should auto closed by 1s', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 1000 });
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 3000 });
    fixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.ant-notification-notice')!;
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(50000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = notificationService.success('title', 'SUCCESS', { nzDuration: 0 });
    fixture.detectChanges();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    notificationService.remove(filledMessage.messageId);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [1, 2, 3].forEach(id => {
      const content = `SUCCESS-${id}`;
      notificationService.success('', content);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((notificationService as any).container.instances.length).toBe(2); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    });

    notificationService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((notificationService as any).container.instances.length).toBe(0); // eslint-disable-line @typescript-eslint/no-explicit-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    notificationService.error('', 'EXISTS', { nzDuration: 1000, nzAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));
  it('should reset default config dynamically', fakeAsync(() => {
    nzConfigService.set('notification', { nzDuration: 0 });
    notificationService.create('', 'loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should show with placement of topLeft', () => {
    nzConfigService.set('notification', { nzPlacement: 'topLeft' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-topLeft')).not.toBeNull();
  });
  it('should show with placement of top', () => {
    nzConfigService.set('notification', { nzPlacement: 'top' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-top')).not.toBeNull();
  });
  it('should show with placement of bottom', () => {
    nzConfigService.set('notification', { nzPlacement: 'bottom' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-bottom')).not.toBeNull();
  });
  // Should support nzData as context.
  it('should open a message box with template ref', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'data' });
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('test template contentdata');
  });

  it('should update an existing notification with use template ref when change nzData', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'oldData', nzKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('oldData');
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'newData', nzKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('newData');
  });

  it('should update an existing notification when keys are matched', () => {
    notificationService.create('', '', 'EXISTS', { nzKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    notificationService.create('success', 'Title', 'SHOULD NOT CHANGE', { nzKey: 'exists' });
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
    expect(overlayContainerElement.textContent).toContain('Title');
    expect(overlayContainerElement.textContent).toContain('SHOULD NOT CHANGE');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should receive `true` when it is closed by user', fakeAsync(() => {
    let onCloseFlag = false;

    notificationService.create('', '', 'close').onClose!.subscribe(user => {
      if (user) {
        onCloseFlag = true;
      }
    });

    fixture.detectChanges();
    tick(1000);
    const closeEl = overlayContainerElement.querySelector('.ant-notification-notice-close')!;
    dispatchMouseEvent(closeEl, 'click');
    tick(1000);
    expect(onCloseFlag).toBeTruthy();

    waitForNotificationToggling();
  }));

  it('should support configurable nzTop & nzBottom', fakeAsync(() => {
    nzConfigService.set('notification', { nzTop: 48 });
    notificationService.create('', '', 'TEST TOP', { nzDuration: 3000 });
    waitForNotificationToggling();
    const notificationContainers = overlayContainerElement.querySelectorAll(
      '.ant-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[0].style.top).toBe('48px');
    expect(notificationContainers[0].style.bottom).toBeFalsy();

    nzConfigService.set('notification', { nzPlacement: 'bottomLeft', nzBottom: '48px' });
    notificationService.create('', '', 'TEST BOTTOM');
    waitForNotificationToggling();
    expect(notificationContainers[3].style.top).toBeFalsy();
    expect(notificationContainers[3].style.bottom).toBe('48px');

    waitForNotificationToggling();
  }));

  it('should support close icon', fakeAsync(() => {
    notificationService.create('', '', 'ICON', { nzCloseIcon: 'home' });
    waitForNotificationToggling();
    expect(overlayContainerElement.querySelector('.anticon-home')).toBeTruthy();
  }));
});
