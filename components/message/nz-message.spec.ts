import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent, NzConfigService } from 'ng-zorro-antd/core';

import { NZ_MESSAGE_CONFIG } from './nz-message-config';
import { NzMessageModule } from './nz-message.module';
import { NzMessageService } from './nz-message.service';

describe('NzMessage', () => {
  let messageService: NzMessageService;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzTestMessageBasicComponent>;
  let testComponent: NzTestMessageBasicComponent;
  let nzConfigService: NzConfigService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzMessageModule, NoopAnimationsModule],
      declarations: [NzTestMessageBasicComponent],
      providers: [{ provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 2, nzTop: 24 } }]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([NzMessageService, OverlayContainer], (m: NzMessageService, oc: OverlayContainer) => {
    messageService = m;
    if (!overlayContainerElement) {
      overlayContainerElement = oc.getContainerElement();
    }
  }));

  beforeEach(inject([NzConfigService], (c: NzConfigService) => {
    nzConfigService = c;
  }));

  afterEach(() => {
    messageService.remove();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestMessageBasicComponent);
    testComponent = fixture.debugElement.componentInstance;
  });

  it('should open a message box with success', () => {
    messageService.success('SUCCESS');
    fixture.detectChanges();

    expect((overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement).style.zIndex).toBe('1010');
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.anticon-check-circle')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    messageService.error('ERROR');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.anticon-close-circle')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    messageService.warning('WARNING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    messageService.info('INFO');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.anticon-info-circle')).not.toBeNull();
  });

  it('should open a message box with loading', () => {
    messageService.loading('LOADING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('LOADING');
    expect(overlayContainerElement.querySelector('.anticon-loading')).not.toBeNull();
  });

  it('should support template', fakeAsync(() => {
    messageService.info(testComponent.template);
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Content in template');
    tick(10000);
  }));

  it('should auto closed by 1s', fakeAsync(() => {
    messageService.create('', 'EXISTS', { nzDuration: 1000 });
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    messageService.create('', 'EXISTS', { nzDuration: 3000 });
    fixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.ant-message-notice')!;
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(1000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = messageService.success('SUCCESS', { nzDuration: 0 });
    fixture.detectChanges();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    messageService.remove(filledMessage.messageId);
    fixture.detectChanges();
    filledMessage!.onClose!.subscribe(() => {
      console.log(1);
    });
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [1, 2, 3].forEach(id => {
      const content = `SUCCESS-${id}`;
      messageService.success(content);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((messageService as any)._container.messages.length).toBe(2); // tslint:disable-line:no-any
      }
    });

    messageService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((messageService as any)._container.messages.length).toBe(0); // tslint:disable-line:no-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    messageService.error('EXISTS', { nzDuration: 1000, nzAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  /**
   * @deprecated This test is going to be removed in 9.0.0
   */
  it('should reset default config dynamically', fakeAsync(() => {
    messageService.config({ nzDuration: 0 });
    messageService.create('loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should reset default config from config service', fakeAsync(() => {
    nzConfigService.set('message', { nzDuration: 0 });
    messageService.create('loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should emit event when message close', fakeAsync(() => {
    messageService.config({ nzDuration: 2000 });
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

    const messageContainerElement = overlayContainerElement.querySelector('.ant-message') as HTMLElement;
    expect(messageContainerElement.style.top).toBe('24px');

    tick(50000);
  }));
});

@Component({
  template: `
    <ng-template #contentTemplate>
      Content in template
    </ng-template>
  `
})
export class NzTestMessageBasicComponent {
  @ViewChild('contentTemplate', { static: true }) template: TemplateRef<void>;
}
