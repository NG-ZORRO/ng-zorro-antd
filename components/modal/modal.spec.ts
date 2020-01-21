import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createKeyboardEvent, dispatchEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';

import { NzModalRef } from './modal-ref';
import { NzModalModule } from './modal.module';
import { NzModalService } from './modal.service';

describe('NzModal', () => {
  let modalService: NzModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<TestWithServiceComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzModalModule, TestModalModule]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([NzModalService, OverlayContainer], (m: NzModalService, oc: OverlayContainer) => {
    modalService = m;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

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
      nzComponentParams: {
        value: 'Modal'
      }
    });

    fixture.detectChanges();

    const modalContentElement = overlayContainerElement.querySelector('.modal-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
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
    modalRef.close();
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
    const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('nz-modal-container')).toBeTruthy();
    expect(event.defaultPrevented).toBe(false);

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

  it('should close when clicking on the modal wrap', fakeAsync(() => {
    modalService.create({
      nzContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    const modalWrap = overlayContainerElement.querySelector('nz-modal-container') as HTMLElement;
    dispatchMouseEvent(modalWrap, 'mousedown');
    fixture.detectChanges();
    dispatchMouseEvent(modalWrap, 'mouseup');
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

    expect(modal.style.zIndex).toBe('1001');

    modalRef.updateConfig({
      nzZIndex: 1100
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.zIndex).toBe('1100');

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

    expect(overlayContainerElement.querySelectorAll('mat-dialog-container').length).toBe(0);
  }));
});

@Component({
  template: `
    <ng-template let-modalRef="modalRef">
      <span class="modal-template-content">Hello {{ value }}</span
      >{{ setModalRef(modalRef) }}
    </ng-template>
  `
})
class TestWithServiceComponent {
  value: string;
  modalRef: NzModalRef;
  @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;

  constructor(public nzModalService: NzModalService) {}

  setModalRef(modalRef: NzModalRef): string {
    this.modalRef = modalRef;
    return '';
  }
}

@Component({
  template: `
    <div class="modal-content">Hello {{ value }}</div>
    <button (click)="destroyModal()">destroy</button>
  `
})
class TestWithModalContentComponent {
  @Input() value: string;

  constructor(public modalRef: NzModalRef) {}

  destroyModal(): void {
    this.modalRef.destroy();
  }
}
@NgModule({
  imports: [NzModalModule, NoopAnimationsModule],
  exports: [TestWithServiceComponent, TestWithModalContentComponent],
  declarations: [TestWithServiceComponent, TestWithModalContentComponent],
  entryComponents: [TestWithModalContentComponent]
})
class TestModalModule {}
