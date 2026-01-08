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
  model,
  signal
} from '@angular/core';
import { ComponentFixture, TestBed, inject as testingInject } from '@angular/core/testing';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import {
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  sleep,
  updateNonSignalsInput
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
    TestBed.configureTestingModule({
      providers: [NzModalService]
    });
    modalService = TestBed.inject(NzModalService);
  });

  beforeEach(
    testingInject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  // mock animationend events
  function animationDone(element: Element, action: 'enter' | 'leave'): void {
    dispatchEvent(
      element,
      new AnimationEvent('animationend', { animationName: action === 'enter' ? 'antZoomIn' : 'antZoomOut' })
    );
  }

  it('should apply animations class', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    await sleep(16); // wait for the next frame
    const modalContentElement = overlayContainerElement.querySelector('.ant-modal');
    expect(modalContentElement!.classList).toContain('ant-zoom-enter');
    expect(modalContentElement!.classList).toContain('ant-zoom-enter-active');

    animationDone(modalContentElement!, 'enter');
    await fixture.whenStable();
    modalRef.close();

    expect(modalContentElement!.classList).toContain('ant-zoom-leave');
    expect(modalContentElement!.classList).toContain('ant-zoom-leave-active');
  });

  it('should emit when modal opening animation is complete', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });

    const spy = jasmine.createSpy('afterOpen spy');
    modalRef.afterOpen.subscribe(spy);
    expect(spy).not.toHaveBeenCalled();

    const modalContentElement = overlayContainerElement.querySelector('.ant-modal');
    animationDone(modalContentElement!, 'enter');

    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });

  it('should return the current state of the modal', async () => {
    const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
    const modalContentElement = overlayContainerElement.querySelector('.ant-modal');

    expect(modalRef.getState()).toBe(NzModalState.OPEN);
    animationDone(modalContentElement!, 'enter');
    await fixture.whenStable();

    modalRef.close();
    expect(modalRef.getState()).toBe(NzModalState.CLOSING);

    animationDone(modalContentElement!, 'leave');
    await fixture.whenStable();
    expect(modalRef.getState()).toBe(NzModalState.CLOSED);
  });

  describe('NzModalRef', () => {
    it('should omit any action when closing', async () => {
      const onOk = jasmine.createSpy('onOk', () => {});
      const onCancel = jasmine.createSpy('onCancel', () => {});
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: onOk,
        nzOnCancel: onCancel
      });
      const modalContentElement = overlayContainerElement.querySelector('.ant-modal');

      animationDone(modalContentElement!, 'enter');
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();
      await modalRef.triggerOk();
      expect(onOk).toHaveBeenCalledTimes(1);
      expect(modalRef.getState()).toBe(NzModalState.CLOSING);

      modalRef.triggerOk();
      modalRef.triggerOk();
      modalRef.triggerCancel();
      modalRef.triggerCancel();
      expect(onOk).toHaveBeenCalledTimes(1);
      expect(onCancel).toHaveBeenCalledTimes(0);

      animationDone(modalContentElement!, 'leave');
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });
  });
});

describe('modal', () => {
  let modalService: NzModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let configService: NzConfigService;
  let fixture: ComponentFixture<TestWithServiceComponent>;
  let mockLocation: SpyLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzModalService, provideNzNoAnimation(), { provide: Location, useClass: SpyLocation }]
    });
  });

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

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should open modal with component', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'Modal'
    });
    await fixture.whenStable();

    const modalContentElement = overlayContainerElement.querySelector('.modal-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).not.toBeNull();
  });

  it('should give correct z-index value to overlay', async () => {
    const Z_INDEX = 9999;
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'Modal',
      nzZIndex: Z_INDEX
    });
    await fixture.whenStable();

    const overlay = document.querySelector('.cdk-global-overlay-wrapper') as HTMLElement;
    expect(overlay.style.zIndex).toEqual(Z_INDEX.toString());
  });

  it('should open a modal with data', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzData: 'NG-ZORRO'
    });
    await fixture.whenStable();

    const modalContentElement = overlayContainerElement.querySelector('.modal-data');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent?.toString().includes('NG-ZORRO')).toBeTruthy();
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).not.toBeNull();
  });

  it('should open modal with template', async () => {
    fixture.componentInstance.value = 'Modal';
    await updateNonSignalsInput(fixture);
    const modalRef = modalService.create({
      nzContent: fixture.componentInstance.templateRef
    });
    await fixture.whenStable();

    const modalContentElement = overlayContainerElement.querySelector('.modal-template-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(fixture.componentInstance.modalRef).toBe(modalRef);
    expect(modalRef.getContentComponentRef()).toBeNull();
    expect(modalRef.getContentComponent()).toBeNull();
  });

  it('should open modal with template and pass data', async () => {
    fixture.componentInstance.value = 'Modal';
    await updateNonSignalsInput(fixture);
    const modalRef = modalService.create({
      nzContent: fixture.componentInstance.templateRef,
      nzData: 'NG-ZORRO'
    });
    await fixture.whenStable();

    const modalContentElement = overlayContainerElement.querySelector('.modal-template-data');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent?.includes('NG-ZORRO')).toBeTruthy();
    expect(fixture.componentInstance.modalRef).toBe(modalRef);
    modalRef.close();
  });

  it('should be thrown when attaching repeatedly', async () => {
    const modalRefComponent = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    await fixture.whenStable();

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

  it('should open modal with HTML string', async () => {
    const modalRef = modalService.create({
      nzContent: `<span class="modal-html-content">Hello Modal</span>`
    });
    await fixture.whenStable();

    const modalContentElement = overlayContainerElement.querySelector('.modal-html-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    modalRef.close();
  });

  describe('close', () => {
    let modalRef: NzModalRef;

    beforeEach(async () => {
      modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });
      await fixture.whenStable();
    });

    describe('afterClose', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = jasmine.createSpy('afterClose callback');
      });

      it('should close and get the result', async () => {
        modalRef.afterClose.subscribe(spy);

        modalRef.close('Hello Modal');
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith('Hello Modal');
        expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
      });

      it('should destroy and get the result', async () => {
        modalRef.afterClose.subscribe(spy);

        modalRef.destroy('Hello Modal');
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith('Hello Modal');
        expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
      });
    });

    describe('animation', () => {
      xit('should emit when modal closing animation is complete', async () => {
        // todo: test with animation
      });

      xit('should dispose the modal if view container is destroyed while animating', async () => {
        // todo: test with animation
      });
    });

    describe('with keyboard', () => {
      it('should close a modal via the escape key', async () => {
        const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        await fixture.whenStable();

        expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
        expect(event.defaultPrevented).toBe(true);
      });

      it('should not close a modal via the escape key with a modifier', async () => {
        const event = createKeyboardEvent('keydown', ESCAPE);
        Object.defineProperty(event, 'altKey', { get: () => true });
        dispatchEvent(document.body, event);
        await fixture.whenStable();

        expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
        expect(event.defaultPrevented).toBe(false);
      });

      it('should not close a modal when the nzKeyboard is false', async () => {
        modalRef.updateConfig({
          nzKeyboard: false
        });
        await fixture.whenStable();

        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        await fixture.whenStable();
        expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
      });
    });

    it('should not close a modal when the nzOkLoading is true', async () => {
      modalRef.updateConfig({
        nzOkLoading: true
      });
      await fixture.whenStable();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

      modalRef.updateConfig({
        nzOkLoading: false
      });
      await fixture.whenStable();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should not close a modal when the nzCancelLoading is true', async () => {
      modalRef.updateConfig({
        nzCancelLoading: true
      });
      await fixture.whenStable();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

      modalRef.updateConfig({
        nzCancelLoading: false
      });
      await fixture.whenStable();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should close when clicking on the modal wrap', async () => {
      const modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      modalWrapElement.click();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeFalsy();
    });

    it("should close when clicking on the modal's close button", async () => {
      const closeBtn = overlayContainerElement.querySelector('button[nz-modal-close]') as HTMLButtonElement;
      closeBtn.click();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeFalsy();
    });

    it('should not close when mouseup on the modal wrap and mousedown on the modal body', async () => {
      const modalWrap = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      const modalBody = overlayContainerElement.querySelector('.ant-modal-body') as HTMLElement;

      dispatchMouseEvent(modalBody, 'mousedown');
      await fixture.whenStable();

      dispatchMouseEvent(modalWrap, 'mouseup');
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
    });

    it('should not close when clicking on the modal wrap and the nzMaskClosable or nzMask is false', async () => {
      modalRef.updateConfig({
        nzMaskClosable: false
      });
      await fixture.whenStable();

      const modalWrap = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      dispatchMouseEvent(modalWrap, 'mousedown');
      dispatchMouseEvent(modalWrap, 'mouseup');
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();

      modalRef.updateConfig({
        nzMaskClosable: true,
        nzMask: false
      });
      await fixture.whenStable();

      dispatchMouseEvent(modalWrap, 'mousedown');
      dispatchMouseEvent(modalWrap, 'mouseup');
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
    });
  });

  it('should global config work', async () => {
    configService.set('modal', { nzMask: false });

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    await fixture.whenStable();

    expect(modalRef.getBackdropElement()?.classList).not.toContain('ant-modal-mask');

    configService.set('modal', { nzMask: true });
    await fixture.whenStable();

    // should add class when global config changed
    expect(modalRef.getBackdropElement()?.classList).toContain('ant-modal-mask');

    configService.set('modal', { nzMask: false });
    await fixture.whenStable();

    // should remove class when global config changed
    expect(modalRef.getBackdropElement()?.classList).not.toContain('ant-modal-mask');

    configService.set('modal', { nzMask: true }); // reset
  });

  it('nzMask work', async () => {
    configService.set('modal', { nzMask: false });

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    await fixture.whenStable();

    // should not have default cdk dark backdrop
    expect(modalRef.getBackdropElement()?.classList).not.toContain('cdk-overlay-dark-backdrop');

    configService.set('modal', { nzMask: true });
    await fixture.whenStable();

    // should add class when global config changed
    expect(modalRef.getBackdropElement()?.classList).toContain('ant-modal-mask');
  });

  it('should notify the observers if all open modals have finished closing', async () => {
    const ref1 = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const ref2 = modalService.create({
      nzContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterAllClose spy');

    modalService.afterAllClose.subscribe(spy);

    ref1.close();
    await fixture.whenStable();
    expect(spy).not.toHaveBeenCalled();

    ref2.close();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the afterAllClose stream on subscribe if there are no open modals', () => {
    const spy = jasmine.createSpy('afterAllClose spy');
    modalService.afterAllClose.subscribe(spy);
    expect(spy).toHaveBeenCalled();
  });

  it('should set and update the width of the modal', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzWidth: 500
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;
    expect(modal.style.width).toBe('500px');

    modalRef.updateConfig({
      nzWidth: 300
    });
    await fixture.whenStable();

    expect(modal.style.width).toBe('300px');

    modalRef.updateConfig({
      nzWidth: '100%'
    });
    await fixture.whenStable();

    expect(modal.style.width).toBe('100%');
  });

  it('should set and update the z-index of the modal', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzZIndex: 1001
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    const mask = overlayContainerElement.querySelector('.ant-modal-mask') as HTMLElement;

    expect(modal.style.zIndex).toBe('1001');
    expect(mask.style.zIndex).toBe('1001');

    modalRef.updateConfig({
      nzZIndex: 1100
    });
    await fixture.whenStable();

    expect(modal.style.zIndex).toBe('1100');
    expect(mask.style.zIndex).toBe('1100');
  });

  it('should set the nzWrapClassName of the modal', async () => {
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzWrapClassName: 'test-wrap-class'
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    expect(modal.classList).toContain('test-wrap-class');
  });

  it('should set the nzCentered of the modal', async () => {
    modalService.create({
      nzCentered: true,
      nzContent: TestWithModalContentComponent
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    expect(modal.classList).toContain('ant-modal-centered');
  });

  it('should set the nzClassName of the modal', async () => {
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzClassName: 'test-class-name'
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;
    expect(modal.classList).toContain('test-class-name');
  });

  it('should set the nzStyle of the modal', async () => {
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('.ant-modal') as HTMLElement;
    expect(modal.style.color).toContain('rgb(0, 0, 0)');
  });

  it('should set the nzBodyStyle of the modal', async () => {
    modalService.create({
      nzContent: TestWithModalContentComponent,
      nzBodyStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    await fixture.whenStable();

    const modal = overlayContainerElement.querySelector('.ant-modal-body') as HTMLElement;
    expect(modal.style.color).toContain('rgb(0, 0, 0)');
  });

  it('should set the nzMaskStyle of the modal', async () => {
    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzMaskStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    await fixture.whenStable();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(0, 0, 0)');

    modalRef.updateConfig({
      nzMaskStyle: {
        color: 'rgb(255, 0, 0)'
      }
    });
    await fixture.whenStable();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(255, 0, 0)');
  });

  it('should close all of the modals', async () => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    await fixture.whenStable();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(3);

    modalService.closeAll();
    await fixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  });

  it('should close all open modals when the user goes forwards/backwards in history', async () => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    await fixture.whenStable();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    await fixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  });

  it('should close all open modals when the location hash changes', async () => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    await fixture.whenStable();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    await fixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  });

  it('should close all of the modals when the injectable is destroyed', async () => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent });
    await fixture.whenStable();

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    modalService.ngOnDestroy();
    await fixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  });

  it('should complete close streams when the injectable is destroyed', async () => {
    const afterAllCloseSpy = jasmine.createSpy('after all closed spy');
    modalService.afterAllClose.subscribe({
      complete: afterAllCloseSpy
    });

    modalService.ngOnDestroy();
    await fixture.whenStable();

    expect(afterAllCloseSpy).toHaveBeenCalled();
  });

  it('should allow the consumer to disable modals a modal on navigation', async () => {
    modalService.create({ nzContent: TestWithModalContentComponent });
    modalService.create({ nzContent: TestWithModalContentComponent, nzCloseOnNavigation: false });

    expect(overlayContainerElement.querySelectorAll('nz-modal-container').length).toBe(2);

    mockLocation.simulateUrlPop('');
    await fixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();
  });

  it('should have the componentInstance available in the afterClose callback', async () => {
    const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
    const spy = jasmine.createSpy('afterClose spy');
    modalRef.afterClose.subscribe(() => {
      spy();
      expect(modalRef.componentInstance).toBeTruthy();
    });

    await fixture.whenStable();
    modalRef.close();

    await sleep(500);
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
  });

  it('should use injector from viewContainerRef', async () => {
    const viewContainerFixture = TestBed.createComponent(TestWithChildViewContainerComponent);
    await viewContainerFixture.whenStable();
    const viewContainerRef = viewContainerFixture.componentInstance.childViewContainer;

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzViewContainerRef: viewContainerRef
    });
    await viewContainerFixture.whenStable();

    const modalInjector = modalRef.componentInstance!.modalInjector;

    expect(modalRef.componentInstance!.modalRef).toBe(modalRef);
    expect(modalInjector.get<TestWithViewContainerDirective>(TestWithViewContainerDirective)).toBeTruthy();
  });

  it('should close from a ViewContainerRef with OnPush change detection', async () => {
    const onPushFixture = TestBed.createComponent(TestWithOnPushViewContainerComponent);
    await onPushFixture.whenStable();

    const modalRef = modalService.create({
      nzContent: TestWithModalContentComponent,
      nzViewContainerRef: onPushFixture.componentInstance.viewContainerRef
    });
    await onPushFixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

    modalRef.close();
    await onPushFixture.whenStable();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
  });

  describe('NzModalRef', () => {
    it('should getElement work', async () => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      await fixture.whenStable();

      const container = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      expect(modalRef.getElement()).toBe(container);
    });

    it('should triggerOk work', async () => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.triggerOk();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should triggerCancel work', async () => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.triggerCancel();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should not close the modal when loading', async () => {
      const modalRef = modalService.create({ nzContent: TestWithModalContentComponent });
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.updateConfig({
        nzOkLoading: true
      });
      await fixture.whenStable();
      modalRef.triggerOk();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.updateConfig({
        nzOkLoading: false
      });
      await fixture.whenStable();
      modalRef.triggerOk();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should set loading state when the callback is promise', async () => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 200);
          })
      });
      await fixture.whenStable();

      modalRef.triggerOk();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      await sleep(200);
      await fixture.whenStable();
      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should not close when the callback is return false', async () => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () => false
      });
      await fixture.whenStable();

      modalRef.triggerOk();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();
      modalRef.close();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should not close when the callback is return Promise<false>', async () => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(false);
            }, 200);
          })
      });
      await fixture.whenStable();

      modalRef.triggerOk();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      await sleep(200);
      await fixture.whenStable();
      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.close();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should not close when the callback is return Promise.reject', async () => {
      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent,
        nzOnOk: () =>
          new Promise((_, reject) => {
            setTimeout(() => {
              reject('Promise.reject');
            }, 200);
          })
      });
      await fixture.whenStable();

      expectAsync(modalRef.triggerOk()).toBeRejectedWith('Promise.reject');
      await fixture.whenStable();

      expect(modalRef.getConfig().nzOkLoading).toBe(true);
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      await sleep(200);
      await fixture.whenStable();

      expect(modalRef.getConfig().nzOkLoading).toBe(false);
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalRef.close();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });
  });

  describe('focus management', () => {
    // When testing focus, all the elements must be in the DOM.
    beforeEach(() => document.body.appendChild(overlayContainerElement));
    afterEach(() => document.body.removeChild(overlayContainerElement));

    it('should focus the first tabbable element of the modal on open', async () => {
      modalService.create({
        nzContent: TestWithModalContentComponent,
        nzClosable: false,
        nzFooter: null
      });
      await fixture.whenStable();

      // expect the first tabbable element (input) in the modal to be focused.
      expect(document.activeElement!.tagName).toBe('INPUT');
    });

    it('should focus the first tabbable element when content is string type', async () => {
      const modalRef = modalService.confirm({
        nzContent: 'confirm content'
      });
      await fixture.whenStable();

      expect(modalRef.containerInstance.getNativeElement().contains(document.activeElement)).toBe(true);
    });

    it('should allow disabling focus of the first tabbable element', async () => {
      modalService.create({
        nzContent: TestWithModalContentComponent,
        nzClosable: false,
        nzFooter: null,
        nzAutofocus: null
      });
      await fixture.whenStable();

      expect(document.activeElement!.tagName).not.toBe('INPUT');
    });

    it('should re-focus trigger element when modal closes', async () => {
      // Create an element that has focus before the modal is opened.
      const button = document.createElement('button');
      button.id = 'modal-trigger';
      document.body.appendChild(button);
      button.focus();

      const modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });
      await fixture.whenStable();

      // expect the focus to change when modal is opened
      expect(document.activeElement!.id).not.toBe('modal-trigger');

      // expect the focus not to have changed before the animation finishes
      modalRef.close();
      await fixture.whenStable();

      // expect the trigger is refocused after the modal is closed.
      expect(document.activeElement!.id).toBe('modal-trigger');

      document.body.removeChild(button);
    });

    it('should move focus to the container if there are no focusable elements in the modal', async () => {
      modalService.create({
        nzContent: TestModalWithoutFocusableElementsComponent,
        nzClosable: false,
        nzFooter: null
      });
      await sleep(16);
      await fixture.whenStable();

      // expect the modal container to be focused
      expect(document.activeElement!.tagName).toBe('NZ-MODAL-CONTAINER');
    });
  });

  describe('footer', () => {
    let modalRef: NzModalRef;

    function getCancelButton(): HTMLButtonElement {
      return overlayContainerElement.querySelector('div[nz-modal-footer] button:nth-child(1)') as HTMLButtonElement;
    }

    function getOkButton(): HTMLButtonElement {
      return overlayContainerElement.querySelector('div[nz-modal-footer] button:nth-child(2)') as HTMLButtonElement;
    }

    beforeEach(async () => {
      modalRef = modalService.create({
        nzContent: TestWithModalContentComponent
      });
      await fixture.whenStable();
    });

    it('should the ok button work', async () => {
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const okButton = getOkButton();
      expect(okButton).toBeTruthy();

      okButton.click();
      expect(spy).toHaveBeenCalled();
    });

    it('should the cancel button work', async () => {
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const cancelButton = getCancelButton();
      expect(cancelButton).toBeTruthy();

      cancelButton.click();
      expect(spy).toHaveBeenCalled();
    });

    it('should loading work', async () => {
      modalRef.updateConfig({
        nzOkLoading: true,
        nzCancelLoading: true
      });
      await fixture.whenStable();

      const okButton = getOkButton();
      const cancelButton = getCancelButton();
      expect(okButton.classList).toContain('ant-btn-loading');
      expect(cancelButton.classList).toContain('ant-btn-loading');
    });

    it('should loading work', async () => {
      modalRef.updateConfig({
        nzOkDisabled: true,
        nzCancelDisabled: true
      });
      await fixture.whenStable();

      const okButton = getOkButton();
      const cancelButton = getCancelButton();
      expect(okButton.disabled).toBe(true);
      expect(cancelButton.disabled).toBe(true);
    });
  });

  it('should set footer with buttons', async () => {
    // note: the buttons in `nzFooter` only works in the constructor of the builtin modal footer
    let errorThrown = false;
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
              errorThrown = true;
              throw new Error('Rethrow error');
            })
        }
      ]
    });
    await fixture.whenStable();

    const buttons = overlayContainerElement.querySelectorAll(
      'div[nz-modal-footer] button'
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].textContent!.trim()).toBe('Test Button0');
    expect(buttons[0].classList).not.toContain('ant-btn-loading');

    expect(buttons[1].textContent!.trim()).toBe('Test Button1');
    expect(buttons[1].classList).toContain('ant-btn-loading');

    expect(buttons[2].textContent!.trim()).toBe('Test Button2');
    expect(buttons[2].classList).not.toContain('ant-btn-loading');

    expect(buttons[3].textContent!.trim()).toBe('Test Button3');
    expect(buttons[3].classList).not.toContain('ant-btn-loading');

    // should click to set loading to true, and automatically set loading to false after 200ms
    buttons[0].click();
    await fixture.whenStable();
    expect(buttons[0].classList).toContain('ant-btn-loading');
    // skip: loading has been set to false, but the class is not removed
    // await sleep(200);
    // await fixture.whenStable();
    // expect(buttons[0].classList).not.toContain('ant-btn-loading');

    // loading is always true
    expect(buttons[1].classList).toContain('ant-btn-loading');

    // won't set loading to true if autoLoading is false
    buttons[2].click();
    await fixture.whenStable();
    expect(buttons[2].classList).not.toContain('ant-btn-loading');

    // should throw error
    try {
      buttons[3].click();
      await fixture.whenStable();
    } catch (e) {
      expect(e).toMatch(/Rethrow error/);
    }
    expect(errorThrown).toBeTrue();
  });

  describe('confirm', () => {
    it('should set default option', async () => {
      const modalRef = modalService.confirm({
        nzContent: 'Test Content',
        nzTitle: 'Test Title',
        nzFooter: [{ label: 'Test Footer' }]
      });
      await fixture.whenStable();

      expect((overlayContainerElement.querySelector('.ant-modal') as HTMLDivElement).style.width).toBe('416px');
      expect(modalRef.getConfig().nzMaskClosable).toBe(false);
      expect(modalRef.getConfig().nzDraggable).toBe(false);
      expect(modalRef.getConfig().nzCentered).toBe(false);
      expect(overlayContainerElement.querySelector('nz-modal-confirm-container')).not.toBeNull();
      expect(overlayContainerElement.querySelector('.ant-modal-confirm-title')!.textContent).toBe('Test Title');
      expect(overlayContainerElement.querySelector('.ant-modal-confirm-content')!.textContent).toBe('Test Content');
      expect(overlayContainerElement.querySelectorAll('.ant-modal-confirm-btns button').length).toBe(2);
    });

    it('should the ok button work', async () => {
      modalService.confirm();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-confirm-container')).not.toBeNull();
      const okButton = overlayContainerElement.querySelector(
        '.ant-modal-confirm-btns button:nth-child(2)'
      ) as HTMLButtonElement;
      okButton.click();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-confirm-container')).toBeNull();
    });

    it('should the cancel button work', async () => {
      modalService.confirm();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-confirm-container')).not.toBeNull();
      const cancelButton = overlayContainerElement.querySelector(
        '.ant-modal-confirm-btns button:nth-child(1)'
      ) as HTMLButtonElement;
      cancelButton.click();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-confirm-container')).toBeNull();
    });

    it('should info type work', async () => {
      const modalRef = modalService.info();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzIconType).toBe('info-circle');
    });

    it('should success type work', async () => {
      const modalRef = modalService.success();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzIconType).toBe('check-circle');
    });

    it('should error type work', async () => {
      const modalRef = modalService.error();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzIconType).toBe('close-circle');
    });

    it('should warning type work', async () => {
      const modalRef = modalService.warning();
      await fixture.whenStable();
      expect(modalRef.getConfig().nzIconType).toBe('exclamation-circle');
    });

    it('should set nzIconType', async () => {
      const modalRef = modalService.warning({
        nzIconType: 'info-circle'
      });
      await fixture.whenStable();
      expect(modalRef.getConfig().nzIconType).toBe('info-circle');
    });

    it('should set nzCancelText', async () => {
      const modalRef = modalService.warning({
        nzCancelText: 'cancel'
      });
      await fixture.whenStable();
      expect(modalRef.getConfig().nzCancelText).toBe('cancel');
    });

    it('should set nzCentered', async () => {
      const modalRef = modalService.confirm({
        nzCentered: true
      });
      await fixture.whenStable();

      expect(modalRef.getConfig().nzCentered).toBe(true);

      const modal = overlayContainerElement.querySelector('nz-modal-confirm-container') as HTMLElement;
      expect(modal.classList).toContain('ant-modal-centered');
    });

    it('should open confirm with component', async () => {
      const modalRef = modalService.confirm({
        nzContent: TestWithModalContentComponent,
        nzData: 'Confirm'
      });
      await fixture.whenStable();

      const modalContentElement = overlayContainerElement.querySelector('.modal-content');
      expect(modalContentElement).toBeTruthy();
      expect(modalContentElement!.textContent).toBe('Hello Confirm');
      expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
      expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    });
  });

  describe('nz-modal component', () => {
    let componentFixture: ComponentFixture<TestModalComponent>;
    let componentInstance: TestModalComponent;

    beforeEach(async () => {
      componentFixture = TestBed.createComponent(TestModalComponent);
      componentInstance = componentFixture.componentInstance;
    });

    it('should nzVisible work', async () => {
      const openSpy = jasmine.createSpy('open spy');
      const closeSpy = jasmine.createSpy('close spy');

      componentInstance.nzModalComponent.afterClose.subscribe(closeSpy);
      componentInstance.nzModalComponent.afterOpen.subscribe(openSpy);

      expect(openSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();

      componentInstance.visible.set(true);
      await fixture.whenStable();

      expect(openSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      componentInstance.visible.set(false);
      await fixture.whenStable();

      expect(closeSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should set nzVisible to false when implicitly closed', async () => {
      const closeSpy = jasmine.createSpy('close spy');
      componentInstance.nzModalComponent.afterClose.subscribe(closeSpy);
      expect(closeSpy).not.toHaveBeenCalled();

      componentInstance.visible.set(true);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalService.closeAll();
      await fixture.whenStable();

      expect(closeSpy).toHaveBeenCalled();
      expect(componentInstance.visible()).toBe(false);
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should nzOnCancel work', async () => {
      componentInstance.visible.set(true);
      await fixture.whenStable();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'nz-modal-container div[nz-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      expect(componentInstance.cancelSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should nzOnOk work', async () => {
      componentInstance.visible.set(true);
      await fixture.whenStable();

      expect(componentInstance.okSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'nz-modal-container div[nz-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      expect(componentInstance.okSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should nzContent work', async () => {
      const modalInstance = componentInstance.nzModalComponent;

      modalInstance.open();
      await fixture.whenStable();

      expect(modalInstance.getModalRef()!.getConfig().nzContent).not.toBe(componentInstance.templateRef);

      componentInstance.content.set(componentInstance.templateRef);
      await fixture.whenStable();

      expect(modalInstance.getModalRef()!.getConfig().nzContent).toBe(componentInstance.templateRef);
    });

    it('should global config work', async () => {
      configService.set('modal', {
        nzMaskClosable: false
      });
      const modalInstance = componentInstance.nzModalComponent;
      modalInstance.open();
      await fixture.whenStable();

      let modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      let modalElement = overlayContainerElement.querySelector('nz-modal-container .ant-modal') as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      dispatchMouseEvent(modalElement, 'mouseup');
      modalWrapElement.click();
      await fixture.whenStable();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      configService.set('modal', {
        nzMaskClosable: true
      });
      await fixture.whenStable();

      modalWrapElement = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
      modalElement = overlayContainerElement.querySelector('nz-modal-container .ant-modal') as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      dispatchMouseEvent(modalElement, 'mouseup');
      modalWrapElement.click();
      await fixture.whenStable();
      expect(componentInstance.cancelSpy).toHaveBeenCalled();
    });

    it('should instance API work', async () => {
      const modalInstance = componentInstance.nzModalComponent;

      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();

      modalInstance.open();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalInstance.open();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      modalInstance.close();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();

      expect(() => {
        modalInstance.close();
      }).not.toThrowError();

      modalInstance.open();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeTruthy();

      modalInstance.destroy();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeFalsy();

      expect(() => {
        modalInstance.triggerOk();
        modalInstance.triggerCancel();
      }).not.toThrowError();
    });

    it('should close when the host view is destroyed', async () => {
      componentInstance.visible.set(true);
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).not.toBeNull();

      componentFixture.destroy();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('nz-modal-container')).toBeNull();
    });

    it('should be draggable when nzDraggable is set to true', async () => {
      componentInstance.visible.set(true);
      componentInstance.draggable.set(true);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('.cdk-drag')).not.toBeNull();

      componentInstance.draggable.set(false);
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('.cdk-drag-disabled')).not.toBeNull();
    });

    it('should have "move" cursor on the top of modal when modal is draggable', async () => {
      componentInstance.visible.set(true);
      componentInstance.draggable.set(true);
      await fixture.whenStable();
      const modalHeader = overlayContainerElement.querySelector('.ant-modal-header');
      expect(getComputedStyle(modalHeader!).cursor).toEqual('move');

      componentInstance.visible.set(true);
      componentInstance.draggable.set(false);
      await fixture.whenStable();
      expect(getComputedStyle(modalHeader!).cursor).toEqual('auto');
    });
  });
});

@Directive({
  selector: 'nz-test-with-view-container'
})
class TestWithViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'test-with-child-view-container',
  imports: [TestWithViewContainerDirective],
  template: `<nz-test-with-view-container />`
})
class TestWithChildViewContainerComponent {
  @ViewChild(TestWithViewContainerDirective) childWithViewContainer!: TestWithViewContainerDirective;

  get childViewContainer(): ViewContainerRef {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  selector: 'test-with-on-push-view-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'hello'
})
class TestWithOnPushViewContainerComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'test-with-service',
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
  selector: 'test-with-modal-content',
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
  selector: 'test-modal',
  imports: [NzModalModule],
  template: `
    <nz-modal
      [(nzVisible)]="visible"
      [nzContent]="content()"
      [nzDraggable]="draggable()"
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
  readonly visible = model(false);
  readonly draggable = signal(false);
  cancelSpy = jasmine.createSpy('cancel spy');
  okSpy = jasmine.createSpy('ok spy');
  @ViewChild(NzModalComponent, { static: true }) nzModalComponent!: NzModalComponent;
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<{}>;

  readonly content = signal(this.templateRef);

  handleCancel(): void {
    this.visible.set(false);
    this.cancelSpy();
  }

  handleOk(): void {
    this.visible.set(false);
    this.okSpy();
  }
}

@Component({
  selector: 'test-modal-without-focusable-elements',
  template: '<p>Modal</p>'
})
class TestModalWithoutFocusableElementsComponent {}
