/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NzConfigService, provideNzConfig } from 'ng-zorro-antd/core/config';
import { dispatchEvent, dispatchMouseEvent, sleep } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzNotificationComponent } from './notification.component';
import { NzNotificationService } from './notification.service';

@Component({
  selector: 'nz-test-notification',
  template: `<ng-template let-data="data">test template content {{ data }}</ng-template>`
})
class NzTestNotificationComponent {
  @ViewChild(TemplateRef, { static: true }) demoTemplateRef!: TemplateRef<{
    $implicit: NzNotificationComponent;
    data: string;
  }>;
}

describe('notification', () => {
  let notificationService: NzNotificationService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestNotificationComponent>;
  let configService: NzConfigService;

  function getMessageElement(): HTMLElement {
    return overlayContainerElement.querySelector('.ant-notification-notice') as HTMLElement;
  }

  // mock animationend event
  async function animationEnd(): Promise<void> {
    dispatchEvent(getMessageElement(), new AnimationEvent('animationend', { animationName: 'antNotificationFadeOut' }));
    await fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzConfig({ notification: { nzMaxStack: 2 } }), provideNzIconsTesting(), NzNotificationService]
    });

    fixture = TestBed.createComponent(NzTestNotificationComponent);
  });

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

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should open a message box success with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.success('test-title', template, { nzData: 'SUCCESS' });

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    notificationService.error('test-title', 'ERROR');

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-error')).not.toBeNull();
  });

  it('should open a message box error with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.error('test-title', template, { nzData: 'ERROR' });

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-error')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    notificationService.warning('test-title', 'WARNING');

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-warning')).not.toBeNull();
  });

  it('should open a message box warning with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.warning('test-title', template, { nzData: 'WARNING' });

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-warning')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    notificationService.info('test-title', 'INFO');

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-info')).not.toBeNull();
  });

  it('should open a message box info with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.info('test-title', template, { nzData: 'INFO' });

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-info')).not.toBeNull();
  });

  it('should open a message box with blank', () => {
    notificationService.blank('test-title', 'BLANK');

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon')).toBeNull();
  });

  it('should open a message box blank with custom template and data', () => {
    const template = fixture.componentInstance.demoTemplateRef;
    notificationService.blank('test-title', template, { nzData: 'BLANK' });

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon')).toBeNull();
  });

  it('should auto closed by 1s', async () => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 1000 });
    await fixture.whenStable();

    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    await sleep(1000);
    await animationEnd();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  });

  it('should not destroy when hovered', async () => {
    notificationService.create('', '', 'EXISTS', { nzDuration: 2500 });
    await fixture.whenStable();

    overlayContainerElement = overlayContainer.getContainerElement();
    const messageElement = getMessageElement();
    dispatchMouseEvent(messageElement, 'mouseenter');
    await sleep(2500);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    await sleep(2500);
    await animationEnd();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }, 6000);

  it('should not destroyed automatically but manually', async () => {
    const filledMessage = notificationService.success('title', 'SUCCESS', { nzDuration: 0 });
    fixture.detectChanges();

    await sleep(5000);
    await fixture.whenStable();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    notificationService.remove(filledMessage.messageId);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }, 6000);

  it('should keep the balance of messages length and then remove all', async () => {
    for (const id of [1, 2, 3]) {
      const content = `SUCCESS-${id}`;
      notificationService.success('', content);
      await fixture.whenStable();

      overlayContainerElement = overlayContainer.getContainerElement();
      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((notificationService as any).container.instances.length).toBe(2); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    }

    notificationService.remove();
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((notificationService as any).container).toBeUndefined(); // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('should destroy without animation', async () => {
    notificationService.error('', 'EXISTS', { nzDuration: 1000, nzAnimate: false });
    await sleep(1000);
    await fixture.whenStable();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  });

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

  it('should open a message box with template ref', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'data' });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('test template content data');
  });

  it('should update an existing notification with use template ref when change nzData', async () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'oldData', nzKey: 'exists' });
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('oldData');
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'newData', nzKey: 'exists' });
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).toContain('newData');
  });

  it('should update an existing notification when keys are matched', async () => {
    let messageId: string | null;
    messageId = notificationService.create('', '', 'EXISTS', { nzKey: 'exists' }).messageId;
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(messageId).toEqual('exists');

    messageId = notificationService.create('success', 'Title', 'SHOULD NOT CHANGE', { nzKey: 'exists' }).messageId;
    await fixture.whenStable();
    expect(messageId).toEqual('exists');
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
    expect(overlayContainerElement.textContent).toContain('Title');
    expect(overlayContainerElement.textContent).toContain('SHOULD NOT CHANGE');
    expect(overlayContainerElement.querySelector('.ant-notification-notice-icon-success')).not.toBeNull();
  });

  it('should receive `true` when it is closed by user', async () => {
    let onCloseFlag = false;

    const ref = notificationService.create('', '', 'close');
    ref.onClose.subscribe(user => {
      if (user) {
        onCloseFlag = true;
      }
    });

    overlayContainerElement = overlayContainer.getContainerElement();
    const closeEl = overlayContainerElement.querySelector('.ant-notification-notice-close')!;
    dispatchMouseEvent(closeEl, 'click');

    await animationEnd();
    expect(onCloseFlag).toBeTruthy();
  });

  it('should support configurable nzTop ', () => {
    configService.set('notification', { nzTop: 48 });
    notificationService.create('', '', 'TEST TOP');
    overlayContainerElement = overlayContainer.getContainerElement();
    const notificationContainers = overlayContainerElement.querySelectorAll(
      '.ant-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[0].style.top).toBe('48px');
    expect(notificationContainers[0].style.bottom).toBeFalsy();
  });

  it('should support configurable nzBottom', () => {
    configService.set('notification', { nzPlacement: 'bottomLeft', nzBottom: '48px' });
    notificationService.create('', '', 'TEST BOTTOM');
    overlayContainerElement = overlayContainer.getContainerElement();
    const notificationContainers = overlayContainerElement.querySelectorAll(
      '.ant-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[2].style.top).toBeFalsy();
    expect(notificationContainers[2].style.bottom).toBe('48px');
  });

  it('should support close icon', () => {
    notificationService.create('', '', 'ICON', { nzCloseIcon: 'home' });
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.querySelector('.anticon-home')).toBeTruthy();
  });
});
