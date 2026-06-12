/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NzConfigService, provideNzConfig } from 'ng-zorro-antd/core/config';
import { dispatchEvent, dispatchMouseEvent, sleep } from 'ng-zorro-antd/core/testing';

import { NzMessageComponent } from './message.component';
import { NzMessageService } from './message.service';

describe('message', () => {
  let messageService: NzMessageService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestMessageComponent>;
  let testComponent: NzTestMessageComponent;
  let configService: NzConfigService;

  function getMessageElement(): HTMLElement {
    return overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
  }

  // mock animationend event
  async function animationEnd(): Promise<void> {
    dispatchEvent(getMessageElement(), new AnimationEvent('animationend', { animationName: 'MessageMoveOut' }));
    await fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzConfig({ message: { nzMaxStack: 2, nzTop: 24 } }), NzMessageService]
    });

    fixture = TestBed.createComponent(NzTestMessageComponent);
    testComponent = fixture.componentInstance;
  });

  beforeEach(inject(
    [NzMessageService, OverlayContainer, NzConfigService],
    (m: NzMessageService, oc: OverlayContainer, c: NzConfigService) => {
      messageService = m;
      overlayContainer = oc;
      configService = c;
    }
  ));

  afterEach(() => {
    messageService.remove();
  });

  it('should open a message box with success', () => {
    messageService.success('SUCCESS');
    overlayContainerElement = overlayContainer.getContainerElement();

    const overlayWrapper = overlayContainerElement.querySelector('.cdk-global-overlay-wrapper') as HTMLElement;
    expect(overlayWrapper.style.zIndex).toBe('1010');
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.anticon-check-circle')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    messageService.error('ERROR');
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.anticon-close-circle')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    messageService.warning('WARNING');
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    messageService.info('INFO');
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.anticon-info-circle')).not.toBeNull();
  });

  it('should open a message box with loading', () => {
    messageService.loading('LOADING');
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('LOADING');
    expect(overlayContainerElement.querySelector('.anticon-loading')).not.toBeNull();
  });

  it('should support template', async () => {
    messageService.info(testComponent.template, { nzData: 'from template' });
    await fixture.whenStable();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('Content in template from template');
  });

  it('should auto closed by 1s', async () => {
    messageService.create('', 'EXISTS', { nzDuration: 1000 });
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    await sleep(1000);
    await animationEnd();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  });

  it('should not destroy when hovered', async () => {
    messageService.create('', 'EXISTS', { nzDuration: 2250 });
    overlayContainerElement = overlayContainer.getContainerElement();

    const messageElement = getMessageElement();
    dispatchMouseEvent(messageElement, 'mouseenter');
    await sleep(2250);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    await sleep(2250);
    await animationEnd();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  });

  it('should not destroyed automatically but manually', async () => {
    const filledMessage = messageService.success('SUCCESS', { nzDuration: 0 });
    overlayContainerElement = overlayContainer.getContainerElement();

    await sleep(4500);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    messageService.remove(filledMessage.messageId);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  });

  it('should keep the balance of messages length and then remove all', async () => {
    for (const id of [1, 2, 3]) {
      const content = `SUCCESS-${id}`;
      messageService.success(content);
      await fixture.whenStable();

      overlayContainerElement = overlayContainer.getContainerElement();
      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect(messageService['container']?.instances.length).toBe(2);
      }
    }

    messageService.remove();
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect(messageService['container']).toBeUndefined();
  });

  it('should destroy without animation', async () => {
    messageService.error('EXISTS', { nzDuration: 1000, nzAnimate: false });
    await sleep(1000);
    await fixture.whenStable();
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  });

  it('should emit event when message close', async () => {
    const closeSpy = jasmine.createSpy('message closed');
    const msg = messageService.create('loading', 'CLOSE');
    const messageId = msg.messageId;
    msg.onClose.subscribe(closeSpy);
    messageService.remove(messageId);

    await fixture.whenStable();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should container top to configured', async () => {
    messageService.create('top', 'CHANGE');
    await fixture.whenStable();

    overlayContainerElement = overlayContainer.getContainerElement();
    const messageContainerElement = overlayContainerElement.querySelector('.ant-message') as HTMLElement;
    expect(messageContainerElement.style.top).toBe('24px');
  });

  describe('custom styling', () => {
    it('should apply custom class', () => {
      messageService.success('SUCCESS', { nzClass: 'custom-message-class' });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('custom-message-class')).toBe(true);
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should apply space-separated custom class', () => {
      messageService.info('INFO', { nzClass: 'class1 class2 class3' });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
      expect(messageElement.classList.contains('class1')).toBe(true);
      expect(messageElement.classList.contains('class2')).toBe(true);
      expect(messageElement.classList.contains('class3')).toBe(true);
    });

    it('should apply custom styles', () => {
      messageService.error('ERROR', {
        nzStyle: {
          'background-color': 'rgb(255, 0, 0)',
          color: 'white',
          border: '2px solid black'
        }
      });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(messageElement.style.color).toBe('white');
      expect(messageElement.style.border).toBe('2px solid black');
    });

    it('should work without custom class or style', () => {
      messageService.warning('WARNING');
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should combine custom class and style', () => {
      messageService.loading('LOADING', {
        nzClass: 'custom-loading-class',
        nzStyle: { 'font-weight': 'bold', opacity: '0.8' }
      });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement.classList.contains('custom-loading-class')).toBe(true);
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
      expect(messageElement.style.fontWeight).toBe('bold');
      expect(messageElement.style.opacity).toBe('0.8');
    });

    it('should handle empty class gracefully', () => {
      messageService.success('SUCCESS', { nzClass: '' });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should handle empty style object gracefully', () => {
      messageService.info('INFO', { nzStyle: {} });
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = getMessageElement();
      expect(messageElement).not.toBeNull();
    });
  });

  describe('RTL', () => {
    it('should apply classname', () => {
      configService.set('message', { nzDirection: 'rtl' });
      messageService.info('INFO');

      overlayContainerElement = overlayContainer.getContainerElement();
      expect(overlayContainerElement.textContent).toContain('INFO');
      expect(overlayContainerElement.querySelector('.ant-message-rtl')).not.toBeNull();
    });
  });
});

@Component({
  selector: 'nz-test-message',
  template: `<ng-template #contentTemplate let-data="data">Content in template {{ data }}</ng-template>`
})
class NzTestMessageComponent {
  @ViewChild('contentTemplate', { static: true }) template!: TemplateRef<{
    $implicit: NzMessageComponent;
    data: string;
  }>;
}
