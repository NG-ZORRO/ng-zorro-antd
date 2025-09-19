/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzConfigService, provideNzConfig } from 'ng-zorro-antd/core/config';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';

import { NzMessageComponent } from './message.component';
import { NzMessageService } from './message.service';

describe('message', () => {
  let messageService: NzMessageService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestMessageComponent>;
  let testComponent: NzTestMessageComponent;
  let configService: NzConfigService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideNzConfig({ message: { nzMaxStack: 2, nzTop: 24 } }), NzMessageService]
    });

    fixture = TestBed.createComponent(NzTestMessageComponent);
    testComponent = fixture.componentInstance;
  }));

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
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect((overlayContainerElement.querySelector('.cdk-global-overlay-wrapper') as HTMLElement).style.zIndex).toBe(
      '1010'
    );
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.anticon-check-circle')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    messageService.error('ERROR');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.anticon-close-circle')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    messageService.warning('WARNING');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    messageService.info('INFO');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.anticon-info-circle')).not.toBeNull();
  });

  it('should open a message box with loading', () => {
    messageService.loading('LOADING');
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('LOADING');
    expect(overlayContainerElement.querySelector('.anticon-loading')).not.toBeNull();
  });

  it('should support template', fakeAsync(() => {
    messageService.info(testComponent.template, { nzData: 'from template' });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('Content in templatefrom template');
    tick(10000);
  }));

  it('should auto closed by 1s', fakeAsync(() => {
    messageService.create('', 'EXISTS', { nzDuration: 1000 });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    messageService.create('', 'EXISTS', { nzDuration: 3000 });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    const messageElement = overlayContainerElement.querySelector('.ant-message-notice')!;
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(5000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = messageService.success('SUCCESS', { nzDuration: 0 });
    fixture.detectChanges();
    overlayContainerElement = overlayContainer.getContainerElement();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    messageService.remove(filledMessage.messageId);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [1, 2, 3].forEach(id => {
      const content = `SUCCESS-${id}`;
      messageService.success(content);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((messageService as any).container.instances.length).toBe(2); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    });

    messageService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((messageService as any).container).toBeUndefined(); // eslint-disable-line @typescript-eslint/no-explicit-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    messageService.error('EXISTS', { nzDuration: 1000, nzAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should reset default config from config service', fakeAsync(() => {
    configService.set('message', { nzDuration: 0 });
    messageService.create('loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    overlayContainerElement = overlayContainer.getContainerElement();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should emit event when message close', fakeAsync(() => {
    const closeSpy = jasmine.createSpy('message closed');
    const msg = messageService.create('loading', 'CLOSE');
    const messageId = msg.messageId;
    msg.onClose!.subscribe(closeSpy);
    fixture.detectChanges();
    messageService.remove(messageId);
    tick(2000);
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  }));

  it('should container top to configured', fakeAsync(() => {
    messageService.create('top', 'CHANGE');
    fixture.detectChanges();

    overlayContainerElement = overlayContainer.getContainerElement();
    const messageContainerElement = overlayContainerElement.querySelector('.ant-message') as HTMLElement;
    expect(messageContainerElement.style.top).toBe('24px');
  }));

  describe('custom styling', () => {
    it('should apply custom class', () => {
      messageService.success('SUCCESS', { nzClass: 'custom-message-class' });
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('custom-message-class')).toBe(true);
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should apply space-separated custom class', () => {
      messageService.info('INFO', { nzClass: 'class1 class2 class3' });
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;

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
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(messageElement.style.color).toBe('white');
      expect(messageElement.style.border).toBe('2px solid black');
    });

    it('should work without custom class or style', () => {
      messageService.warning('WARNING');
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should combine custom class and style', () => {
      messageService.loading('LOADING', {
        nzClass: 'custom-loading-class',
        nzStyle: { 'font-weight': 'bold', opacity: '0.8' }
      });
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement.classList.contains('custom-loading-class')).toBe(true);
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
      expect(messageElement.style.fontWeight).toBe('bold');
      expect(messageElement.style.opacity).toBe('0.8');
    });

    it('should handle empty class gracefully', () => {
      messageService.success('SUCCESS', { nzClass: '' });
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement).not.toBeNull();
      expect(messageElement.classList.contains('ant-message-notice')).toBe(true);
    });

    it('should handle empty style object gracefully', () => {
      messageService.info('INFO', { nzStyle: {} });
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();

      const messageElement = overlayContainerElement.querySelector('.ant-message-notice') as HTMLElement;
      expect(messageElement).not.toBeNull();
    });
  });

  describe('RTL', () => {
    it('should apply classname', () => {
      configService.set('message', { nzDirection: 'rtl' });
      messageService.info('INFO');
      fixture.detectChanges();
      overlayContainerElement = overlayContainer.getContainerElement();
      expect(overlayContainerElement.textContent).toContain('INFO');
      expect(overlayContainerElement.querySelector('.ant-message-rtl')).not.toBeNull();
    });
  });
});

@Component({
  template: `<ng-template #contentTemplate let-data="data">Content in template{{ data }}</ng-template>`
})
export class NzTestMessageComponent {
  @ViewChild('contentTemplate', { static: true }) template!: TemplateRef<{
    $implicit: NzMessageComponent;
    data: string;
  }>;
}
