/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzConfigService, provideNzConfig } from 'ng-zorro-antd/core/config';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzNotificationComponent } from './notification.component';
import { NzNotificationService } from './notification.service';

@Component({
  template: `<ng-template let-data="data">{{ 'test template content' }}{{ data }}</ng-template>`
})
export class NzTestNotificationComponent {
  @ViewChild(TemplateRef, { static: true }) demoTemplateRef!: TemplateRef<{
    $implicit: NzNotificationComponent;
    data: string;
  }>;
}

describe('NzNotification', () => {
  let notificationService: NzNotificationService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestNotificationComponent>;
  let configService: NzConfigService;

  function waitForNotificationToggling(): void {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
  }

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNzConfig({ notification: { nzMaxStack: 2 } }),
        provideNzIconsTesting(),
        provideNoopAnimations(),
        NzNotificationService
      ]
    });

    fixture = TestBed.createComponent(NzTestNotificationComponent);
  }));

  beforeEach(inject(
    [NzNotificationService, OverlayContainer, NzConfigService],
    (n: NzNotificationService, oc: OverlayContainer, c: NzConfigService) => {
      notificationService = n;
      overlayContainer = oc;
      configService = c;
    }
  ));

  afterEach(() => {
    notificationService.remove();
  });

  it('should open a message box with success', () => {
    notificationService.success('test-title', 'SUCCESS');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should open a message box success with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.success('test-title', template, { nzData: 'SUCCESS' });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    notificationService.error('test-title', 'ERROR');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-error')).not.toBeNull();
  });

  it('should open a message box error with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.error('test-title', template, { nzData: 'ERROR' });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-error')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    notificationService.warning('test-title', 'WARNING');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-warning')).not.toBeNull();
  });

  it('should open a message box warning with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.warning('test-title', template, { nzData: 'WARNING' });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-warning')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    notificationService.info('test-title', 'INFO');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-info')).not.toBeNull();
  });

  it('should open a message box info with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.info('test-title', template, { nzData: 'INFO' });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-info')).not.toBeNull();
  });

  it('should open a message box with blank', () => {
    notificationService.blank('test-title', 'BLANK');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon')).toBeNull();
  });

  it('should open a message box blank with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.blank('test-title', template, { nzData: 'BLANK' });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon')).toBeNull();
  });

  it('should auto closed by 1s', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 1000 });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 3000 });
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
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
    overlayContainerElement = overlayContainer.getContainerElement();
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

      overlayContainerElement = overlayContainer.getContainerElement();
      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((notificationService as any).container.instances.length).toBe(2); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    });

    notificationService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((notificationService as any).container).toBeUndefined(); // eslint-disable-line @typescript-eslint/no-explicit-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    notificationService.error('', 'EXISTS', { nzDuration: 1000, nzAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));
  it('should reset default config dynamically', fakeAsync(() => {
    configService.set('notification', { nzDuration: 0 });
    notificationService.create('', 'loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should show with placement of topLeft', () => {
    configService.set('notification', { nzPlacement: 'topLeft' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-topLeft')).not.toBeNull();
  });

  it('should show with placement of top', () => {
    configService.set('notification', { nzPlacement: 'top' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-top')).not.toBeNull();
  });

  it('should show with placement of bottom', () => {
    configService.set('notification', { nzPlacement: 'bottom' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-bottom')).not.toBeNull();
  });

  // Should support nzData as context.
  it('should open a message box with template ref', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'data' });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('test template contentdata');
  });

  it('should update an existing notification with use template ref when change nzData', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'oldData', nzKey: 'exists' });
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('oldData');
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'newData', nzKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('newData');
  });

  it('should update an existing notification when keys are matched', () => {
    let messageId: string | null;
    messageId = notificationService.create('', '', 'EXISTS', { nzKey: 'exists' }).messageId;
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(messageId).toEqual('exists');
    messageId = notificationService.create('success', 'Title', 'SHOULD NOT CHANGE', { nzKey: 'exists' }).messageId;
    expect(messageId).toEqual('exists');
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
    overlayContainerElement = overlayContainer.getContainerElement();
    const closeEl = overlayContainerElement.querySelector('.ant-notification-notice-close')!;
    dispatchMouseEvent(closeEl, 'click');
    tick(1000);
    expect(onCloseFlag).toBeTruthy();

    waitForNotificationToggling();
  }));

  it('should support configurable nzTop & nzBottom', fakeAsync(() => {
    configService.set('notification', { nzTop: 48 });
    notificationService.create('', '', 'TEST TOP', { nzDuration: 3000 });
    waitForNotificationToggling();
    overlayContainerElement = overlayContainer.getContainerElement();
    let notificationContainers = overlayContainerElement.querySelectorAll(
      '.ant-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[0].style.top).toBe('48px');
    expect(notificationContainers[0].style.bottom).toBeFalsy();

    configService.set('notification', { nzPlacement: 'bottomLeft', nzBottom: '48px' });
    notificationService.create('', '', 'TEST BOTTOM');
    waitForNotificationToggling();
    overlayContainerElement = overlayContainer.getContainerElement();
    notificationContainers = overlayContainerElement.querySelectorAll(
      '.ant-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[3].style.top).toBeFalsy();
    expect(notificationContainers[3].style.bottom).toBe('48px');

    waitForNotificationToggling();
    flush();
  }));

  it('should support close icon', fakeAsync(() => {
    notificationService.create('', '', 'ICON', { nzCloseIcon: 'home' });
    waitForNotificationToggling();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.querySelector('.anticon-home')).toBeTruthy();
    flush();
  }));
});
