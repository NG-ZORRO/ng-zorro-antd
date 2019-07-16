import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core';

import { NZ_NOTIFICATION_CONFIG } from './nz-notification-config';
import { NzNotificationModule } from './nz-notification.module';
import { NzNotificationService } from './nz-notification.service';

@Component({
  template: `
    <ng-template let-data="data">{{ 'test template content' }}{{ data }}</ng-template>
  `
})
export class DemoAppComponent {
  @ViewChild(TemplateRef, { static: true }) demoTemplateRef: TemplateRef<{}>;
}

describe('NzNotification', () => {
  let notificationService: NzNotificationService;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<DemoAppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzNotificationModule, NoopAnimationsModule],
      declarations: [DemoAppComponent],
      providers: [{ provide: NZ_NOTIFICATION_CONFIG, useValue: { nzMaxStack: 2 } }] // Override default config
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([NzNotificationService, OverlayContainer], (n: NzNotificationService, oc: OverlayContainer) => {
    notificationService = n;
    if (!overlayContainerElement) {
      overlayContainerElement = oc.getContainerElement();
    }
  }));

  afterEach(() => {
    notificationService.remove();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAppComponent);
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
        expect((notificationService as any)._container.messages.length).toBe(2); // tslint:disable-line:no-any
      }
    });

    notificationService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((notificationService as any)._container.messages.length).toBe(0); // tslint:disable-line:no-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    notificationService.error('', 'EXISTS', { nzDuration: 1000, nzAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should reset default config dynamically', fakeAsync(() => {
    notificationService.config({ nzDuration: 0 });
    notificationService.create('', 'loading', 'EXISTS');
    fixture.detectChanges();
    tick(50000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should show with placement of topLeft', () => {
    notificationService.config({ nzPlacement: 'topLeft' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.ant-notification-topLeft')).not.toBeNull();
  });

  // Should support nzData as context.
  it('should open a message box with template ref', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, { nzData: 'data' });
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('test template contentdata');
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

    waitForNotificationsToClose();
  }));

  it('should support configurable nzTop & nzBottom', fakeAsync(() => {
    notificationService.config({ nzTop: 48 });
    notificationService.create('', '', 'TEST TOP', { nzDuration: 3000 });
    waitForNotificationToggling(fixture);
    const notificationContainer = overlayContainerElement.querySelector('.ant-notification') as HTMLElement;
    expect(notificationContainer.style.top).toBe('48px');
    expect(notificationContainer.style.bottom).toBeFalsy();

    notificationService.config({ nzPlacement: 'bottomLeft', nzBottom: '48px' });
    notificationService.create('', '', 'TEST BOTTOM');
    waitForNotificationToggling(fixture);
    expect(notificationContainer.style.top).toBeFalsy();
    expect(notificationContainer.style.bottom).toBe('48px');

    waitForNotificationsToClose();
  }));
});

function waitForNotificationToggling<T>(fixture: ComponentFixture<T>): void {
  fixture.detectChanges();
  tick(2000);
  fixture.detectChanges();
}

function waitForNotificationsToClose(): void {
  tick(10000);
}
