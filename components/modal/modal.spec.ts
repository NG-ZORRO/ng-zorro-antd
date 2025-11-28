/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injector,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  provideZoneChangeDetection
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  flushMicrotasks,
  inject as testingInject,
  tick
} from '@angular/core/testing';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import {
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent
} from 'ng-zorro-antd/core/testing';

import { NZ_MODAL_DATA } from './modal-config';
import { NzModalRef, NzModalState } from './modal-ref';
import { NzModalComponent } from './modal.component';
import { NzModalModule } from './modal.module';
import { NzModalService } from './modal.service';

describe('modal with animation', () => {
  let modalService: NzModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<TestWithServiceComponent>;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [NzModalService, provideAnimations(), provideZoneChangeDetection()]
    });
  });

  beforeEach(
    testingInject([NzModalService, OverlayContainer], (m: NzModalService, oc: OverlayContainer) => {
      modalService = m;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
    fixture.detectChanges();
  });

  it('should apply animations class', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();
    flushMicrotasks();

    const modalContentElement = overlayContainerElement.querySelector('.ant-modal');
    expect(modalContentElement!.classList).toContain('ant-zoom-enter');
    expect(modalContentElement!.classList).toContain('ant-zoom-enter-active');
    tick(500);

    modalRef.close();
    fixture.detectChanges();
    flushMicrotasks();
    expect(modalContentElement!.classList).toContain('ant-zoom-leave');
    expect(modalContentElement!.classList).toContain('ant-zoom-leave-active');
    flush();
  }));
});

describe('modal', () => {
  let modalService: NzModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let configService: NzConfigService;
  let fixture: ComponentFixture<TestWithServiceComponent>;
  let mockLocation: SpyLocation;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        // todo: use zoneless
        provideZoneChangeDetection(),
        NzModalService,
        provideNoopAnimations(),
        { provide: Location, useClass: SpyLocation }
      ]
    });
  }));

  beforeEach(
    testingInject(
      [NzModalService, Location, OverlayContainer, NzConfigService],
      (m: NzModalService, l: Location, oc: OverlayContainer, cs: NzConfigService) => {
        modalService = m;
        configService = cs;
        mockLocation = l as SpyLocation;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      }
    )
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
    fixture.detectChanges();
  });

  it('should open modal with component', () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'Modal'
    });

    fixture.detectChanges();

    const modalContentElement = overlayContainerElement.querySelector('.modal-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).not.toBeNull();
    modalRef.close();
  });

  it('should give correct z-index value to overlay', fakeAsync(() => {
    const Z_INDEX = 9999;
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'Modal',
      nzZIndex: Z_INDEX
    });

    const overlay = document.querySelector('.cdk-global-overlay-wrapper');
    expect((overlay as HTMLElement).style.zIndex).toEqual(`${Z_INDEX}`);
  }));

  it('should open a modal with data', () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'NG-ZORRO'
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-data');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent?.toString().includes('NG-ZORRO')).toBeTruthy();
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).not.toBeNull();
    modalRef.close();
  });

  it('should open modal with template', () => {
    fixture.componentInstance.value = 'Modal';
    fixture.detectChanges();
    const modalRef = modalService.create({
      nzContent: fixture.componentInstance.templateRef
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-template-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(fixture.componentInstance.modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).toBeNull();
    expect(modalRef.getContentComponent()).toBeNull();
    modalRef.close();
  });

  it('should open modal with template and pass data', () => {
    fixture.componentInstance.value = 'Modal';
    fixture.detectChanges();
    const modalRef = modalService.create({
      nzContent: fixture.componentInstance.templateRef,
      nzData: 'NG-ZORRO'
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-template-data');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent?.includes('NG-ZORRO')).toBeTruthy();
    expect(fixture.componentInstance.modalRef).toBe(modalRef);
    modalRef.close();
  });

  it('should be thrown when attaching repeatedly', () => {
    const modalRefComponent = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    expect(() => {
      modalRefComponent.containerInstance.attachComponentPortal(new ComponentPortal(TestWithModalContentComponent));
    }).toThrowError('Attempting to attach modal content after content is already attached');

    const modalRefTemplate = modalService.create({
      nzContent: fixture.componentInstance.templateRef
    });

    expect(() => {
      modalRefTemplate.containerInstance.attachTemplatePortal(
        new TemplatePortal(fixture.componentInstance.templateRef, null!)
      );
    }).toThrowError('Attempting to attach modal content after content is already attached');
  });

  it('should open modal with HTML string', () => {
    const modalRef = modalService.create({
      nzContent: `<span class="modal-html-content">Hello Modal</span>`
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-html-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    modalRef.close();
  });

  it('should emit when modal opening animation is complete', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterOpen spy');

    modalRef.afterOpen.subscribe(spy);
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();

    flushMicrotasks();
    expect(spy).toHaveBeenCalled();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should emit when modal closing animation is complete', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterClose spy');

    modalRef.afterClose.subscribe(spy);

    fixture.detectChanges();

    modalRef.close();
    expect(spy).not.toHaveBeenCalled();

    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should close and get the result', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    modalRef.afterClose.subscribe(afterCloseCallback);
    modalRef.close('Hello Modal');
    fixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledWith('Hello Modal');
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  }));

  it('should destroy and get the result', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    modalRef.afterClose.subscribe(afterCloseCallback);
    modalRef.destroy('Hello Modal');
    fixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledWith('Hello Modal');
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  }));

  it('should dispose of modal if view container is destroyed while animating', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    modalRef.close();
    fixture.detectChanges();
    fixture.destroy();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  }));

  it('should close a modal via the escape key', fakeAsync(() => {
    modalService.create({
      nzContent: TestWithModalContentComponent
    });

    const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    expect(event.defaultPrevented).toBe(true);
  }));

  it('should not close a modal via the escape key with a modifier', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    const event = createKeyboardEvent('keydown', ESCAPE);
    Object.defineProperty(event, 'altKey', { get: () => true });
    dispatchEvent(document.body, event);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
    expect(event.defaultPrevented).toBe(false);

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should not close a modal when the nzKeyboard is false', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzKeyboard: false
    });

    fixture.detectChanges();
    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should not close a modal when the nzOkLoading is true', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    modalRef.updateConfig({
      nzOkLoading: true
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

    modalRef.updateConfig({
      nzOkLoading: false
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  }));

  it('should not close a modal when the nzCancelLoading is true', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    modalRef.updateConfig({
      nzCancelLoading: true
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

    modalRef.updateConfig({
      nzCancelLoading: false
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  }));

  it('should close when clicking on the modal wrap', (done: () => void) => {
    modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();
    const modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    modalWrapElement.click();

    setTimeout(() => {
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeFalsy();
      done();
    }, 16);
  });

  it("should close when clicking on the modal's close button", fakeAsync(() => {
    modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

    (overlayContainerElement.querySelector('button[nz-modal-close]') as HTMLElement).click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeFalsy();
  }));

  it('should not close when mouseup on the modal wrap and mousedown on the modal body', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    const modalWrap = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    const modalBody = overlayContainerElement.querySelector('.ant-modal-body') as HTMLElement;

    dispatchMouseEvent(modalBody, 'mousedown');
    fixture.detectChanges();

    dispatchMouseEvent(modalWrap, 'mouseup');
    flush();
    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should global config work', fakeAsync(() => {
    configService.set('modal', { nzMask: false });

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList)
      .withContext('should use global config')
      .not.toContain('ant-modal-mask');

    configService.set('modal', { nzMask: true });
    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList)
      .withContext('should add class when global config changed')
      .toContain('ant-modal-mask');

    configService.set('modal', { nzMask: false });
    fixture.detectChanges();
    expect(modalRef.getBackdropElement()?.classList)
      .withContext('should remove class when global config changed')
      .not.toContain('ant-modal-mask');

    configService.set('modal', { nzMask: true }); // reset
    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('nzMask work', fakeAsync(() => {
    configService.set('modal', { nzMask: false });

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList)
      .not.withContext('not has default cdk dark backdrop')
      .toContain('cdk-overlay-dark-backdrop');

    configService.set('modal', { nzMask: true });
    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList)
      .withContext('should add class when global config changed')
      .toContain('ant-modal-mask');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it(
    'should not close when clicking on the modal wrap and ' + 'nzMaskClosable or nzMask is false',
    fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzMaskClosable: false
      });

      fixture.detectChanges();

      const modalWrap = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      dispatchMouseEvent(modalWrap, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalWrap, 'mouseup');
      flush();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

      modalRef.updateConfig({
        nzMaskClosable: true,
        nzMask: false
      });

      fixture.detectChanges();

      dispatchMouseEvent(modalWrap, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalWrap, 'mouseup');
      flush();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

      modalRef.close();
      fixture.detectChanges();
      flush();
    })
  );

  it('should notify the observers if all open modals have finished closing', fakeAsync(() => {
    const ref1 = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const ref2 = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterAllClose spy');

    modalService.afterAllClose.subscribe(spy);

    ref1.close();
    fixture.detectChanges();
    flush();

    expect(spy).not.toHaveBeenCalled();

    ref2.close();
    fixture.detectChanges();
    flush();

    expect(spy).toHaveBeenCalled();
  }));

  it('should emit the afterAllClose stream on subscribe if there are no open modals', () => {
    const spy = jasmine.createSpy('afterAllClose spy');

    modalService.afterAllClose.subscribe(spy);

    expect(spy).toHaveBeenCalled();
  });

  it('should set and update the width of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzWidth: 500
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;

    expect(modal.style.width).toBe('500px');

    modalRef.updateConfig({
      nzWidth: 300
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.width).toBe('300px');

    modalRef.updateConfig({
      nzWidth: '100%'
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.width).toBe('100%');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set and update the z-index of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzZIndex: 1001
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    const mask = overlayContainerElement.querySelector('.ant-modal-mask') as HTMLElement;

    expect(modal.style.zIndex).toBe('1001');
    expect(mask.style.zIndex).toBe('1001');

    console.log(mask);
    modalRef.updateConfig({
      nzZIndex: 1100
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.zIndex).toBe('1100');
    expect(mask.style.zIndex).toBe('1100');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzWrapClassName of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzWrapClassName: 'test-wrap-class'
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;

    expect(modal.classList).toContain('test-wrap-class');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzCentered of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzCentered: true,
      nzContent: TestWithModalContentComponent
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;

    expect(modal.classList).toContain('ant-modal-centered');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzClassName of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzClassName: 'test-class-name'
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;

    expect(modal.classList).toContain('test-class-name');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;

    expect(modal.style.color).toContain('rgb(0, 0, 0)');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzBodyStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzBodyStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.ant-modal-body') as HTMLElement;

    expect(modal.style.color).toContain('rgb(0, 0, 0)');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the nzMaskStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzMaskStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(0, 0, 0)');

    modalRef.updateConfig({
      nzMaskStyle: {
        color: 'rgb(255, 0, 0)'
      }
    });

    fixture.detectChanges();
    flushMicrotasks();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(255, 0, 0)');
    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should close all of the modals', fakeAsync(() => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(3);

    modalService.closeAll();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
  }));

  it('should close all open modals when the user goes forwards/backwards in history', fakeAsync(() => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
  }));

  it('should close all open modals when the location hash changes', fakeAsync(() => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
  }));

  it('should close all of the modals when the injectable is destroyed', fakeAsync(() => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    modalService.ngOnDestroy();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
  }));

  it('should complete close streams when the injectable is destroyed', fakeAsync(() => {
    const afterAllCloseSpy = jasmine.createSpy('after all closed spy');
    const afterAllCloseSubscription = modalService.afterAllClose.subscribe({
      complete: afterAllCloseSpy
    });

    modalService.ngOnDestroy();

    expect(afterAllCloseSpy).toHaveBeenCalled();

    afterAllCloseSubscription.unsubscribe();
  }));

  it('should allow the consumer to disable modals a modal on navigation', fakeAsync(() => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent, nzCloseOnNavigation: false });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateUrlPop('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
  }));

  it('should have the componentInstance available in the afterClose callback', fakeAsync(() => {
    const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
    const spy = jasmine.createSpy('afterClose spy');

    flushMicrotasks();
    fixture.detectChanges();
    flushMicrotasks();

    modalRef.afterClose.subscribe(() => {
      spy();
      expect(modalRef.componentInstance).toBeTruthy();
    });

    modalRef.close();

    flushMicrotasks();
    fixture.detectChanges();
    tick(500);

    expect(spy).toHaveBeenCalled();
  }));

  it('should return the current state of the modal', fakeAsync(() => {
    const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });

    expect(modalRef.getState()).toBe(NzModalState.OPEN);
    modalRef.close();
    fixture.detectChanges();

    expect(modalRef.getState()).toBe(NzModalState.CLOSING);
    flush();

    expect(modalRef.getState()).toBe(NzModalState.CLOSED);
  }));

  it('should use injector from viewContainerRef', () => {
    const viewContainerFixture = TestBed.createComponent(TestWithChildViewContainerComponent);
    viewContainerFixture.detectChanges();
    const viewContainerRef = viewContainerFixture.componentInstance.childViewContainer;

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzViewContainerRef: viewContainerRef
    });

    viewContainerFixture.detectChanges();

    const modalInjector = modalRef.componentInstance!.modalInjector;

    expect(modalRef.componentInstance!.modalRef).toBe(modalRef);
    expect(modalInjector.get<TestWithViewContainerDirective>(TestWithViewContainerDirective)).toBeTruthy();

    modalRef.close();
    viewContainerFixture.detectChanges();
  });

  it('should close from a ViewContainerRef with OnPush change detection', fakeAsync(() => {
    const onPushFixture = TestBed.createComponent(TestWithOnPushViewContainerComponent);

    onPushFixture.detectChanges();

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzViewContainerRef: onPushFixture.componentInstance.viewContainerRef
    });

    flushMicrotasks();
    onPushFixture.detectChanges();
    flushMicrotasks();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

    modalRef.close();
    flushMicrotasks();
    onPushFixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
  }));

  describe('NzModalRef', () => {
    it('should getElement work', fakeAsync(() => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      fixture.detectChanges();
      const container = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      expect(modalRef.getElement()).toBe(container);
      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should triggerOk work', fakeAsync(() => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should triggerCancel work', fakeAsync(() => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      modalRef.triggerCancel();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should not close the modal when loading', fakeAsync(() => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      modalRef.updateConfig({
        nzOkLoading: true
      });
      fixture.detectChanges();
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      modalRef.updateConfig({
        nzOkLoading: false
      });
      fixture.detectChanges();
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should omit any action when closing', async function () {
      const onOk = jasmine.createSpy('onOk', () => {});
      const onCancel = jasmine.createSpy('onCancel', () => {});
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: onOk,
        nzOnCancel: onCancel
      });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      await modalRef.triggerOk();
      expect(onOk).toHaveBeenCalledTimes(1);
      fakeAsync(() => {
        expect(modalRef.getState()).toBe(NzModalState.CLOSING);
        modalRef.triggerOk();
        modalRef.triggerOk();
        modalRef.triggerCancel();
        modalRef.triggerCancel();
        expect(onOk).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalledTimes(0);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
      });
    });

    it('should set loading state when the callback is promise', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 200);
          })
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should not close when the callback is return false', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () => false
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should not close when the callback is return Promise<false>', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(false);
            }, 200);
          })
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));
    it('should not close when the callback is return Promise.reject', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise((_, reject) => {
            setTimeout(() => {
              reject('Promise.reject');
            }, 200);
          })
      });
      fixture.detectChanges();

      expectAsync(modalRef.triggerOk()).toBeRejectedWith('Promise.reject');
      fixture.detectChanges();
      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));
  });

  describe('focus management', () => {
    // When testing focus, all the elements must be in the DOM.
    beforeEach(() => document.body.appendChild(overlayContainerElement));
    afterEach(() => document.body.removeChild(overlayContainerElement));

    it('should focus the first tabbable element of the modal on open', fakeAsync(() => {
      modalService.create({
        nzContent: TestWithModalContentComponent,
        nzClosable: false,
        nzFooter: null
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName)
        .withContext('Expected first tabbable element (input) in the modal to be focused.')
        .toBe('INPUT');
    }));

    it('should focus the first tabbable element when content is string type', fakeAsync(() => {
      const modalRef = modalService.confirm({
        nzContent: 'confirm content'
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(modalRef.containerInstance.getNativeElement().contains(document.activeElement)).toBe(true);
    }));

    it('should allow disabling focus of the first tabbable element', fakeAsync(() => {
      modalService.create({
        nzContent: TestWithModalContentComponent,
        nzClosable: false,
        nzFooter: null,
        nzAutofocus: null
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).not.toBe('INPUT');
    }));

    it('should re-focus trigger element when modal closes', fakeAsync(() => {
      // Create an element that has focus before the modal is opened.
      const button = document.createElement('button');
      button.id = 'modal-trigger';
      document.body.appendChild(button);
      button.focus();

      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });

      flushMicrotasks();
      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.id)
        .withContext('Expected the focus to change when modal was opened.')
        .not.toBe('modal-trigger');

      modalRef.close();
      expect(document.activeElement!.id)
        .withContext('Expected the focus not to have changed before the animation finishes.')
        .not.toBe('modal-trigger');

      flushMicrotasks();
      fixture.detectChanges();
      tick(500);

      expect(document.activeElement!.id)
        .withContext('Expected that the trigger was refocused after the modal is closed.')
        .toBe('modal-trigger');

      document.body.removeChild(button);
    }));

    it('should move focus to the container if there are no focusable elements in the modal', fakeAsync(() => {
      modalService.create({
        nzContent: TestModalWithoutFocusableElementsComponent,
        nzClosable: false,
        nzFooter: null
      });

      fixture.detectChanges();
      tick(16);

      expect(document.activeElement!.tagName)
        .withContext('Expected modal container to be focused.')
        .toBe('NZ-MODAL-CONTAINER');
    }));
  });

  describe('footer component', () => {
    it('should the ok button work', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const okButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      expect(okButton).toBeTruthy();

      okButton.click();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      flush();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should the cancel button work', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const cancelButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(cancelButton).toBeTruthy();

      cancelButton.click();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      flush();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should loading work', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOkLoading: true,
        nzCancelLoading: true
      });
      fixture.detectChanges();

      const okButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      const cancelButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(okButton.classList).toContain('ant-btn-loading');
      expect(cancelButton.classList).toContain('ant-btn-loading');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should loading work', fakeAsync(() => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOkDisabled: true,
        nzCancelDisabled: true
      });
      fixture.detectChanges();

      const okButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      const cancelButton = overlayContainerElement.querySelector(
        'div[nz-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(okButton.disabled).toBe(true);
      expect(cancelButton.disabled).toBe(true);

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set buttons', fakeAsync(() => {
      modalService.create({
        nzContent: TestWithModalContentComponent,
        nzFooter: [
          {
            label: 'Test Button0',
            onClick: () =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve(null);
                }, 200);
              })
          },
          {
            label: 'Test Button1',
            loading: () => true
          },
          {
            label: 'Test Button2',
            autoLoading: false,
            onClick: () =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve(null);
                }, 200);
              })
          },
          {
            label: 'Test Button3',
            onClick: () =>
              new Promise(() => {
                throw new Error('Rethrow error');
              })
          }
        ]
      });
      fixture.detectChanges();

      const buttons = overlayContainerElement.querySelectorAll(
        'div[nz-modal-footer] button'
      ) as NodeListOf<HTMLButtonElement>;
      expect(buttons[0].textContent!.trim()).toBe('Test Button0');
      expect(buttons[1].textContent!.trim()).toBe('Test Button1');
      expect(buttons[2].textContent!.trim()).toBe('Test Button2');
      expect(buttons[3].textContent!.trim()).toBe('Test Button3');

      expect(buttons[1].classList).toContain('ant-btn-loading');

      buttons[2].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).not.toContain('ant-btn-loading');

      buttons[0].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).toContain('ant-btn-loading');
      buttons[0].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).toContain('ant-btn-loading');
      flush();
      fixture.detectChanges();
      expect(buttons[0].classList).not.toContain('ant-btn-loading');

      expect(() => {
        buttons[3].click();
        tick();
      }).toThrowError(/Rethrow error/);
    }));
  });

  describe('confirm', () => {
    it('should set default option', () => {
      const modalRef = modalService.confirm({
        nzContent: 'Test Content',
        nzTitle: 'Test Title',
        nzFooter: [{ label: 'Test Footer' }]
      });
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-modal') as HTMLDivElement).style.width).toBe('416px');
      expect(modalRef.getConfig().nzMaskClosable).toBe(false);
      expect(modalRef.getConfig().nzDraggable).toBe(false);
      expect(modalRef.getConfig().nzCentered).toBe(false);
      expect(overlayContainerElement.querySelectorAll('nz-modal-confirm-container').length).toBe(1);
      expect(overlayContainerElement.querySelector('.ant-modal-confirm-title')!.textContent).toBe('Test Title');
      expect(overlayContainerElement.querySelector('.ant-modal-confirm-content')!.textContent).toBe('Test Content');
      expect(overlayContainerElement.querySelectorAll('.ant-modal-confirm-btns button').length).toBe(2);

      modalRef.close();
    });

    it('should the ok button work', fakeAsync(() => {
      modalService.confirm();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelectorAll('nz-modal-confirm-container').length).toBe(1);
      const okButton = overlayContainerElement.querySelector(
        '.ant-modal-confirm-btns button:nth-child(2)'
      ) as HTMLButtonElement;
      okButton.click();

      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-confirm-container').length).toBe(0);
    }));

    it('should the cancel button work', fakeAsync(() => {
      modalService.confirm();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelectorAll('nz-modal-confirm-container').length).toBe(1);
      const cancelButton = overlayContainerElement.querySelector(
        '.ant-modal-confirm-btns button:nth-child(1)'
      ) as HTMLButtonElement;
      cancelButton.click();

      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('nz-modal-confirm-container').length).toBe(0);
    }));

    it('should info type work', fakeAsync(() => {
      const modalRef = modalService.info();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzIconType).toBe('info-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should success type work', fakeAsync(() => {
      const modalRef = modalService.success();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzIconType).toBe('check-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should error type work', fakeAsync(() => {
      const modalRef = modalService.error();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzIconType).toBe('close-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should warning type work', fakeAsync(() => {
      const modalRef = modalService.warning();
      fixture.detectChanges();
      expect(modalRef.getConfig().nzIconType).toBe('exclamation-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set nzIconType', fakeAsync(() => {
      const modalRef = modalService.warning({
        nzIconType: 'info-circle'
      });
      fixture.detectChanges();
      expect(modalRef.getConfig().nzIconType).toBe('info-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set nzCancelText', fakeAsync(() => {
      const modalRef = modalService.warning({
        nzCancelText: 'cancel'
      });
      fixture.detectChanges();
      expect(modalRef.getConfig().nzCancelText).toBe('cancel');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set nzCentered', fakeAsync(() => {
      const modalRef = modalService.confirm({
        nzCentered: true
      });
      fixture.detectChanges();

      expect(modalRef.getConfig().nzCentered).toBe(true);

      const modal = overlayContainerElement.querySelector('nz-modal-confirm-container') as HTMLElement;
      expect(modal.classList).toContain('ant-modal-centered');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should open confirm with component', () => {
      const modalRef = modalService.confirm({
        nzContent: TestWithModalContentComponent,
        nzData: 'Confirm'
      });

      fixture.detectChanges();

      const modalContentElement = overlayContainerElement.querySelector('.modal-content');
      expect(modalContentElement).toBeTruthy();
      expect(modalContentElement!.textContent).toBe('Hello Confirm');
      expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
      expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
      modalRef.close();
    });
  });

  describe('nz-modal component', () => {
    let componentFixture: ComponentFixture<TestModalComponent>;
    let componentInstance: TestModalComponent;

    beforeEach(() => {
      componentFixture = TestBed.createComponent(TestModalComponent);
      componentFixture.detectChanges();
      componentInstance = componentFixture.componentInstance;
    });

    it('should nzVisible work', fakeAsync(() => {
      const openSpy = jasmine.createSpy('open spy');
      const closeSpy = jasmine.createSpy('close spy');

      componentInstance.nzModalComponent.afterClose.subscribe(closeSpy);
      componentInstance.nzModalComponent.afterOpen.subscribe(openSpy);

      expect(openSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();

      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(openSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      componentInstance.isVisible = false;
      componentFixture.detectChanges();
      flush();

      expect(closeSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should set nzVisible to false when implicitly closed', fakeAsync(() => {
      const closeSpy = jasmine.createSpy('close spy');
      componentInstance.nzModalComponent.afterClose.subscribe(closeSpy);
      expect(closeSpy).not.toHaveBeenCalled();

      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      modalService.closeAll();
      componentFixture.detectChanges();
      flush();

      expect(closeSpy).toHaveBeenCalled();
      expect(componentInstance.isVisible).toBe(false);
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should nzOnCancel work', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'nz-modal-container div[nz-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      button.click();
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should nzOnOk work', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.okSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'nz-modal-container div[nz-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      button.click();
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.okSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);
    }));

    it('should set nzContent whit component mode', fakeAsync(() => {
      const modalInstance = componentInstance.nzModalComponent;

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(modalInstance.getModalRef()!.getConfig().nzContent).not.toBe(componentInstance.templateRef);

      componentInstance.content = componentInstance.templateRef;
      componentFixture.detectChanges();

      expect(modalInstance.getModalRef()!.getConfig().nzContent).toBe(componentInstance.templateRef);

      modalInstance.close();
      componentFixture.detectChanges();
      flush();
    }));

    it('should global config work', fakeAsync(() => {
      configService.set('modal', {
        nzMaskClosable: false
      });
      const modalInstance = componentInstance.nzModalComponent;

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      let modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      let modalElement = overlayContainerElement.querySelector('nz-modal-container .ant-modal') as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalElement, 'mouseup');
      flush();
      modalWrapElement.click();
      fixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      configService.set('modal', {
        nzMaskClosable: true
      });
      componentFixture.detectChanges();
      flush();

      modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      modalElement = overlayContainerElement.querySelector('nz-modal-container .ant-modal') as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalElement, 'mouseup');
      flush();
      modalWrapElement.click();
      fixture.detectChanges();
      flush();
      expect(componentInstance.cancelSpy).toHaveBeenCalled();
    }));

    it('should instance API work', fakeAsync(() => {
      const modalInstance = componentInstance.nzModalComponent;

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      modalInstance.close();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);

      expect(() => {
        modalInstance.close();
      }).not.toThrowError();

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(1);

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeTruthy();

      modalInstance.destroy();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(0);

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeFalsy();

      expect(() => {
        modalInstance.triggerOk();
        modalInstance.triggerCancel();
      }).not.toThrowError();
    }));

    it('should close when the host view is destroyed', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      componentFixture.destroy();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    }));

    it('should be draggable when nzDraggable is set to true', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentInstance.isDraggable = true;
      componentFixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelector('.cdk-drag')).not.toBeNull();

      componentInstance.isDraggable = false;
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('.cdk-drag-disabled')).not.toBeNull();

      componentFixture.destroy();
    }));

    it('should have "move" cursor on the top of modal when modal is draggable', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentInstance.isDraggable = true;
      componentFixture.detectChanges();
      flush();
      const modalHeader = overlayContainerElement.querySelector('.ant-modal-header');
      expect(getComputedStyle(modalHeader!).cursor).toEqual('move');

      componentInstance.isVisible = true;
      componentInstance.isDraggable = false;
      componentFixture.detectChanges();
      flush();
      expect(getComputedStyle(modalHeader!).cursor).toEqual('auto');
    }));
  });
});

@Directive({
  selector: 'test-with-view-container'
})
class TestWithViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  imports: [TestWithViewContainerDirective],
  template: `<test-with-view-container></test-with-view-container>`
})
class TestWithChildViewContainerComponent {
  @ViewChild(TestWithViewContainerDirective) childWithViewContainer!: TestWithViewContainerDirective;

  get childViewContainer(): ViewContainerRef {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'hello'
})
class TestWithOnPushViewContainerComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  template: `
    <ng-template let-modalRef="modalRef" let-data>
      <span class="modal-template-content">Hello {{ value }}</span>
      <span class="modal-template-data">My favorite UI framework is {{ data }}</span>
      {{ setModalRef(modalRef) }}
    </ng-template>
  `
})
class TestWithServiceComponent {
  value?: string;
  modalRef?: NzModalRef;
  @ViewChild(TemplateRef) templateRef!: TemplateRef<{}>;

  constructor(
    public nzModalService: NzModalService,
    public viewContainerRef: ViewContainerRef
  ) {}

  setModalRef(modalRef: NzModalRef): string {
    this.modalRef = modalRef;
    return '';
  }
}

@Component({
  imports: [NzModalModule],
  template: `
    <div class="modal-content">Hello {{ value }}</div>
    <div class="modal-data">My favorite UI Library is {{ nzModalData }}</div>
    <input />
    <button (click)="destroyModal()">destroy</button>
  `
})
class TestWithModalContentComponent {
  @Input() value: string = inject(NZ_MODAL_DATA);
  nzModalData: string = inject(NZ_MODAL_DATA);
  modalRef = inject(NzModalRef);
  modalInjector = inject(Injector);

  destroyModal(): void {
    this.modalRef.destroy();
  }
}

@Component({
  imports: [NzModalModule],
  template: `
    <nz-modal
      [(nzVisible)]="isVisible"
      [nzContent]="content"
      [nzDraggable]="isDraggable"
      nzTitle="Test Title"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
    >
      Test Content
    </nz-modal>
    <ng-template><span class="template-test">Test Template Content</span></ng-template>
  `
})
class TestModalComponent {
  isVisible = false;
  isDraggable = false;
  cancelSpy = jasmine.createSpy('cancel spy');
  okSpy = jasmine.createSpy('ok spy');
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(TemplateRef) templateRef!: TemplateRef<{}>;
  content: TemplateRef<{}> = this.templateRef;

  handleCancel(): void {
    this.isVisible = false;
    this.cancelSpy();
  }

  handleOk(): void {
    this.isVisible = false;
    this.okSpy();
  }
}

@Component({
  template: '<p>Modal</p>'
})
class TestModalWithoutFocusableElementsComponent {}
