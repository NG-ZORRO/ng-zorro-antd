/* TODO: Sort out and rewrite for more standardized */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, EventEmitter, Input } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ng-zorro-antd/core';
import { NzToCssUnitPipe } from 'ng-zorro-antd/core/pipe/nz-css-unit.pipe';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import en_US from '../i18n/languages/en_US';

import { NZ_MODAL_CONFIG } from './nz-modal-config';
import { NzModalControlService } from './nz-modal-control.service';
import { NzModalRef } from './nz-modal-ref.class';
import { NzModalComponent } from './nz-modal.component';
import { NzModalModule } from './nz-modal.module';
import { NzModalService } from './nz-modal.service';

let counter = 0;
describe('modal testing (legacy)', () => {
  describe('demo-async', () => {
    let fixture: ComponentFixture<NzDemoModalAsyncComponent>;
    let modalElement: HTMLElement;
    let buttonShow: HTMLButtonElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, NzButtonModule, NzModalModule],
        declarations: [NzDemoModalAsyncComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoModalAsyncComponent);
      modalElement = fixture.debugElement.query(By.directive(NzModalComponent)).nativeElement;
      buttonShow = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    });

    it('should show and hide after 3000ms with loading', fakeAsync(() => {
      buttonShow.click();
      fixture.detectChanges();
      flush();
      expectModalHidden(modalElement, false);

      const buttonOk = getButtonOk(modalElement);
      buttonOk.click(); // Click Ok button
      fixture.detectChanges();
      expect(isButtonLoading(buttonOk)).not.toBeFalsy();

      tick(3000 + 10);
      fixture.detectChanges();
      flush();
      fixture.detectChanges(); // In order to trigger ModalInstance's UI updating after finished hiding
      expectModalHidden(modalElement, true);
    }));
  }); // /async

  describe('demo-confirm-promise', () => {
    const tempModalId = generateUniqueId(); // Temp unique id to mark the confirm modal that created by service
    let fixture: ComponentFixture<NzDemoModalConfirmPromiseComponent>;
    let instance: NzDemoModalConfirmPromiseComponent;
    let modalAgent: NzModalRef;
    let buttonShow: HTMLButtonElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, NzButtonModule, NzModalModule],
        declarations: [NzDemoModalConfirmPromiseComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoModalConfirmPromiseComponent);
      instance = fixture.debugElement.componentInstance;
      buttonShow = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;

      buttonShow.click();
      fixture.detectChanges();
      modalAgent = instance.confirmModal;
      modalAgent.getElement().classList.add(tempModalId);
    });

    it('should open and click Ok to destroy after 1000ms', fakeAsync(() => {
      expectModalDestroyed(tempModalId, false);

      getButtonOk(modalAgent.getElement()).click(); // Click Ok button
      fixture.detectChanges();
      tick(1000 + 10);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true);
    }));

    it('should open and destroy immediately when click Cancel', fakeAsync(() => {
      expectModalDestroyed(tempModalId, false);

      getButtonClose(modalAgent.getElement()).click(); // Click Close button
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true);
    }));
  }); // /confirm-promise

  describe('NormalModal: created by service with most APIs', () => {
    let tempModalId: string; // Temp unique id to mark the confirm modal that created by service
    let fixture: ComponentFixture<TestBasicServiceComponent>;
    let instance: TestBasicServiceComponent;
    let modalAgent: NzModalRef;
    let modalElement: HTMLElement;
    let modalInstance: NzModalComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, NzModalModule, NzIconTestModule],
        declarations: [TestBasicServiceComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestBasicServiceComponent);
      instance = fixture.debugElement.componentInstance;
      modalAgent = instance.basicModal;
      modalElement = modalAgent.getElement();
      tempModalId = generateUniqueId();
      modalElement.classList.add(tempModalId); // Mark with id
      modalInstance = modalAgent.getInstance();
    });

    it('should correctly render all basic props', fakeAsync(() => {
      const spy = spyOn(console, 'log');

      // [Hack] Codes that can't be covered by normal operations
      // @ts-ignore
      expect(modalInstance.changeVisibleFromInside(true) instanceof Promise).toBe(true);

      expect((modalElement.querySelector('.ant-modal-wrap') as HTMLElement).style.zIndex).toBe('1888');
      expect(
        (modalElement.querySelector('.ant-modal-wrap') as HTMLElement).classList.contains('test-wrap-class-name')
      ).toBe(true);
      expect((modalElement.querySelector('.ant-modal') as HTMLElement).style.width).toBe('250px');
      expect((modalElement.querySelector('.ant-modal') as HTMLElement).classList.contains('test-class-name')).toBe(
        true
      );
      expect((modalElement.querySelector('.ant-modal') as HTMLElement).style.top).toBe('20pt');
      expect(
        (modalElement.querySelector('.ant-modal-title') as HTMLElement).innerHTML.indexOf('<b>TEST BOLD TITLE</b>')
      ).toBeGreaterThan(-1);
      // expect((modalElement.querySelector('.ant-modal-footer') as HTMLElement).innerHTML.indexOf('<div>custom html footer: <i>OK</i></div>')).toBeGreaterThan(-1);
      expect(
        (modalElement.querySelector('.ant-modal-body') as HTMLElement).innerHTML.indexOf('<p>test html content</p>')
      ).toBeGreaterThan(-1);
      expect((modalElement.querySelector('.ant-modal-body') as HTMLElement).style.background).toBe('gray');
      expect(getButtonOk(modalElement).innerHTML.indexOf('custom ok')).toBeGreaterThan(-1);
      expect(getButtonOk(modalElement).classList.contains('ant-btn-success')).toBe(true);
      expect(isButtonLoading(getButtonOk(modalElement))).toBeFalsy();
      expect(getButtonCancel(modalElement).innerHTML.indexOf('custom cancel')).toBeGreaterThan(-1);
      expect(isButtonLoading(getButtonCancel(modalElement))).not.toBeFalsy();
      expect(modalElement.querySelector('.ant-modal-close')).toBeFalsy();
      expect(modalElement.querySelector('.ant-modal-mask')).toBeFalsy();
      expect(getButtonOk(modalElement).disabled).toBeFalsy();
      expect(getButtonCancel(modalElement).disabled).toBeFalsy();

      // click ok button
      getButtonOk(modalElement).click();
      flush();
      expect(console.log).toHaveBeenCalledWith('click ok');
      expectModalDestroyed(tempModalId, false); // shouldn't destroy when ok button returns false
      spy.calls.reset();
    })); // /basic props

    it('should be closed when clicking cancel button', fakeAsync(() => {
      const spy = spyOn(console, 'log');
      // change and click mask
      modalInstance.nzMask = true;
      // should show mask
      // TODO: repair this
      // expect((modalElement.querySelector('div.ant-modal-mask') as HTMLElement).style.opacity).toBe('0.4');
      // should not trigger nzOnCancel if click mask
      (modalElement.querySelector('.ant-modal-wrap') as HTMLElement).click();
      expect(console.log).not.toHaveBeenCalledWith('click cancel');
      // change nzMaskClosable to true then click, should be called and destroyed
      modalInstance.nzMaskClosable = true;
      (modalElement.querySelector('.ant-modal-wrap') as HTMLElement).click();
      expect(console.log).toHaveBeenCalledWith('click cancel');
      // second click on mask should not trigger nzOnCancel
      (console.log as jasmine.Spy).calls.reset();
      (modalElement.querySelector('.ant-modal-wrap') as HTMLElement).click();
      expect(console.log).not.toHaveBeenCalledWith('click cancel');
      flush();
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true); // should be destroyed
      spy.calls.reset();
    }));

    it('should be closed when clicking ESC', fakeAsync(() => {
      // click 'ESC' key
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, false);

      modalInstance.nzKeyboard = true;
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      flush();
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true);
    }));
  });

  describe('NormalModal: created by service with vary nzContent and nzFooter', () => {
    const tempModalId = generateUniqueId(); // Temp unique id to mark the confirm modal that created by service
    let fixture: ComponentFixture<TestVaryServiceComponent>;
    let instance: TestVaryServiceComponent;
    let modalAgent: NzModalRef<TestVaryServiceCustomComponent>;
    let modalElement: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, NzModalModule],
        declarations: [TestVaryServiceComponent, TestVaryServiceCustomComponent]
      });
      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TestVaryServiceCustomComponent] }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestVaryServiceComponent);
      instance = fixture.debugElement.componentInstance;
      modalAgent = instance.createWithVary();
      modalElement = modalAgent.getElement();
      modalElement.classList.add(tempModalId); // Mark with id
    });

    it('should change title from in/outside and trigger button', fakeAsync(() => {
      fixture.detectChanges(); // Initial change detecting

      const contentComponent = modalAgent.getContentComponent();
      const contentComponentRef = (modalAgent as any).getContentComponentRef(); // tslint:disable-line:no-any
      expect(contentComponent).toBe(contentComponentRef.instance);
      const contentElement = contentComponent.elementRef.nativeElement as HTMLElement;
      // change title from outside
      const firstButton = modalElement.querySelector('.ant-modal-footer button:first-child') as HTMLButtonElement;
      firstButton.click();
      fixture.detectChanges();
      expect(contentComponent.title).toBe('internal title changed');
      expect(isButtonLoading(firstButton)).toBe(false); // stopped immediately

      // button loading for Promise
      const lastButton = modalElement.querySelector('.ant-modal-footer button:last-child') as HTMLButtonElement;
      lastButton.click();
      fixture.detectChanges();
      expect(isButtonLoading(lastButton)).toBe(false); // stopped immediately

      // destroy from inside
      contentElement.querySelector('button')!.click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true);
    })); // /vary with component
  });

  describe('ConfirmModal: should apply options correctly', () => {
    let fixture: ComponentFixture<TestConfirmModalComponent>;
    let instance: TestConfirmModalComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, NzModalModule],
        declarations: [TestConfirmModalComponent, TestConfirmCustomComponent]
      }).compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TestConfirmCustomComponent] }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestConfirmModalComponent);
      instance = fixture.debugElement.componentInstance;
    });

    it('should click mask is closable', fakeAsync(() => {
      const modalRef = instance.createMaskClosableConfirm();
      const modalElement = modalRef.getElement();
      fixture.detectChanges();
      expect(modalRef.getInstance().nzMaskClosable).toBe(true);
      const maskElement = modalElement.querySelector('.ant-modal-wrap') as HTMLDivElement;
      maskElement!.click();
      flush();
      fixture.detectChanges();
      expect(instance.maskClosedSpy).toHaveBeenCalled();
    }));

    it('boundary detection for options', fakeAsync(() => {
      const spy = spyOn(console, 'warn');

      const tempModalId = generateUniqueId();
      const modalAgent = instance.createConfirm() as NzModalRef;
      const modalElement = modalAgent.getElement();
      modalElement.classList.add(tempModalId);
      fixture.detectChanges();
      expect(console.warn).toHaveBeenCalled();
      // nzOnOk: close modal when clicked
      getButtonOk(modalElement).click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expectModalDestroyed(tempModalId, true);
      spy.calls.reset();
    }));

    it('should render other confirm modals', fakeAsync(() => {
      const ids: string[] = instance.createOtherModals();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      ids.forEach(id => expectModalDestroyed(id, false));
    }));

    it('should disable buttons', fakeAsync(() => {
      const modalRef = instance.createDisabledModal();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const buttons = modalRef.getElement().querySelectorAll('.ant-modal-confirm-btns button') as NodeListOf<
        HTMLButtonElement
      >;
      buttons.forEach(button => expect(button.disabled).toBe(true));
    }));

    it('should render content with component', fakeAsync(() => {
      const modalRef = instance.createCustomContentWithComponent();
      const modalElement = modalRef.getElement();
      fixture.detectChanges();
      expect(modalElement.querySelector('.custom-component-in-confirm')).toBeTruthy();
      getButtonOk(modalElement).click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }));
  });

  describe('css-unit.pipe', () => {
    let fixture: ComponentFixture<TestCssUnitPipeComponent>;
    let testElement: HTMLDivElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule],
        declarations: [NzToCssUnitPipe, TestCssUnitPipeComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCssUnitPipeComponent);
      testElement = fixture.debugElement.query(By.css('div')).nativeElement;
      fixture.detectChanges();
    });

    it('should "width" & "height" to be 100px', () => {
      // fixture.detectChanges();
      expect(testElement.style.width).toBe('100px');
      expect(testElement.style.height).toBe('100px');
    });

    it('should "top" to be 100pt', () => {
      // fixture.detectChanges();
      expect(testElement.style.top).toBe('100pt');
    });
  });

  it('#i18n', () => {
    let fixture: ComponentFixture<NzDemoModalAsyncComponent>;

    const injector = TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NzButtonModule, NzModalModule],
      declarations: [NzDemoModalAsyncComponent]
    });
    fixture = TestBed.createComponent(NzDemoModalAsyncComponent);
    const comp = fixture.componentInstance as NzDemoModalAsyncComponent;
    comp.showModal();
    fixture.detectChanges();
    injector.get(NzI18nService).setLocale(en_US);
    fixture.detectChanges();
    const cancelText = (fixture.debugElement.query(By.css('nz-modal .ant-btn'))
      .nativeElement as HTMLElement).textContent!.trim();
    expect(cancelText).toBe(en_US.Modal.cancelText);
    const okText = (fixture.debugElement.query(By.css('nz-modal .ant-btn-primary'))
      .nativeElement as HTMLElement).textContent!.trim();
    expect(okText).toBe(en_US.Modal.okText);
  });
});

describe('global config', () => {
  let basicFixture: ComponentFixture<NzDemoModalBasicComponent>;
  let inputFixture: ComponentFixture<NzDemoModalWithInputComponent>;
  let nativeElement: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NzModalModule],
      providers: [
        {
          provide: NZ_MODAL_CONFIG,
          useValue: {
            nzMask: false,
            nzMaskClosable: false
          }
        }
      ],
      declarations: [NzDemoModalBasicComponent, NzDemoModalWithInputComponent]
    }).compileComponents();
    basicFixture = TestBed.createComponent<NzDemoModalBasicComponent>(NzDemoModalBasicComponent);
    inputFixture = TestBed.createComponent<NzDemoModalWithInputComponent>(NzDemoModalWithInputComponent);
  });

  it('nzMask should be global config value', fakeAsync(() => {
    const debugElement = basicFixture.debugElement.query(By.css('.ant-modal-mask'));
    basicFixture.detectChanges();
    expect(debugElement).toBeNull();
  }));

  it('nzMask should be input value', fakeAsync(() => {
    inputFixture.componentInstance.nzMask = true;
    inputFixture.detectChanges();
    nativeElement = inputFixture.debugElement.query(By.css('.ant-modal-mask')).nativeElement;
    inputFixture.detectChanges();
    expect(nativeElement).not.toBeNull();
  }));

  it('nzMaskClosable should be global config value', fakeAsync(() => {
    inputFixture.componentInstance.nzMask = true;
    inputFixture.detectChanges();
    nativeElement = inputFixture.debugElement.query(By.css('.ant-modal-wrap')).nativeElement;
    inputFixture.detectChanges();
    nativeElement!.click();
    inputFixture.detectChanges();
    expectModalHidden(inputFixture.debugElement.query(By.css('nz-modal')).nativeElement, true);
  }));
});

describe('NzModal', () => {
  let modalService: NzModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NzModalModule, NzIconTestModule],
      declarations: [NzDemoModalBasicComponent, NzDemoModalMaskComponent, ModalByServiceComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([NzModalService, OverlayContainer], (ms: NzModalService, oc: OverlayContainer) => {
    modalService = ms;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('basic usage', () => {
    let fixture: ComponentFixture<NzDemoModalBasicComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoModalBasicComponent);
    });

    it('should destroy normally when the component context is over', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('BASIC_MODAL_TITLE');
      fixture.componentInstance.modalAvailable = false;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain('BASIC_MODAL_TITLE');
    }));

    it('should custom close icon work', fakeAsync(() => {
      fixture.componentInstance.modalAvailable = true;
      fixture.componentInstance.icon = 'close-square';
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      const closeIcon = overlayContainerElement.querySelector('.ant-modal-close-icon') as HTMLElement;
      expect(closeIcon).toBeTruthy();
      expect(closeIcon.classList).toContain('anticon-close-square');
    }));
  });

  describe('created by service', () => {
    let fixture: ComponentFixture<ModalByServiceComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ModalByServiceComponent);
    });
    afterEach(fakeAsync(() => {
      // wait all openModals tobe closed to clean up the ModalManager as it is globally static
      document.documentElement!.classList.remove('cdk-global-scrollblock');
      modalService.closeAll();
      fixture.detectChanges();
      tick(1000);
    }));

    it('should trigger both afterOpen/nzAfterOpen and have the correct openModals length', fakeAsync(() => {
      const spy = jasmine.createSpy('afterOpen spy');
      const nzAfterOpen = new EventEmitter<void>();
      const modalRef = modalService.create({ nzAfterOpen });

      modalRef.afterOpen.subscribe(spy);
      nzAfterOpen.subscribe(spy);

      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      tick(600);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(modalService.openModals.indexOf(modalRef)).toBeGreaterThan(-1);
      expect(modalService.openModals.length).toBe(1);
    }));

    it('should trigger both afterClose/nzAfterClose and have the correct openModals length', fakeAsync(() => {
      const spy = jasmine.createSpy('afterClose spy');
      const nzAfterClose = new EventEmitter<void>();
      const modalRef = modalService.create({ nzAfterClose });

      modalRef.afterClose.subscribe(spy);
      nzAfterClose.subscribe(spy);

      fixture.detectChanges();
      tick(600);
      modalRef.close();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      tick(600);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(modalService.openModals.indexOf(modalRef)).toBe(-1);
      expect(modalService.openModals.length).toBe(0);
    }));

    it('should return/receive with/without result data', fakeAsync(() => {
      const spy = jasmine.createSpy('afterClose without result spy');
      const modalRef = modalService.success();

      modalRef.afterClose.subscribe(spy);
      fixture.detectChanges();
      tick(600);
      modalRef.destroy();
      expect(spy).not.toHaveBeenCalled();
      tick(600);
      expect(spy).toHaveBeenCalledWith(undefined);
    }));

    it('should return/receive with result data', fakeAsync(() => {
      const result = { data: 'Fake Error' };
      const spy = jasmine.createSpy('afterClose with result spy');
      const modalRef = modalService.error();

      fixture.detectChanges();
      tick(600);
      modalRef.destroy(result);
      modalRef.afterClose.subscribe(spy);
      expect(spy).not.toHaveBeenCalled();
      tick(600);
      expect(spy).toHaveBeenCalledWith(result);
    }));

    it('should close all opened modals (include non-service modals)', fakeAsync(() => {
      const spy = jasmine.createSpy('afterAllClose spy');
      const modalMethods = ['create', 'info', 'success', 'error', 'confirm'];
      const uniqueId = (name: string) => `__${name}_ID_SUFFIX__`;
      const queryOverlayElement = (name: string) =>
        overlayContainerElement.querySelector(`.${uniqueId(name)}`) as HTMLElement;

      modalService.afterAllClose.subscribe(spy);

      fixture.componentInstance.nonServiceModalVisible = true; // Show non-service modal
      // @ts-ignore
      modalMethods.forEach(method => modalService[method]({ nzWrapClassName: uniqueId(method) })); // Service modals

      fixture.detectChanges();
      tick(600);
      modalMethods
        .concat('NON_SERVICE')
        .forEach(method => expect(queryOverlayElement(method).style.display).not.toBe('none')); // Cover non-service modal for later checking
      expect(modalService.openModals.length).toBe(6);

      modalService.closeAll();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();
      tick(600);
      expect(spy).toHaveBeenCalled();
      expect(modalService.openModals.length).toBe(0);
    }));

    it('should only a confirm button when the type is "info"|"success"|"error"|"warning"', fakeAsync(() => {
      const modalMethods = ['info', 'success', 'error', 'warning'];
      const uniqueId = (name: string) => `__${name}_ID_SUFFIX__`;
      const queryOverlayElement = (name: string) =>
        overlayContainerElement.querySelectorAll(`.${uniqueId(name)} .ant-modal-confirm-btns > button`) as NodeListOf<
          HTMLButtonElement
        >;

      fixture.componentInstance.nonServiceModalVisible = false; // Show non-service modal
      // @ts-ignore
      modalMethods.forEach(method => modalService[method]({ nzWrapClassName: uniqueId(method) })); // Service modals

      fixture.detectChanges();
      tick(600);
      modalMethods.forEach(method => {
        const buttons = queryOverlayElement(method);
        expect(buttons.length).toBe(1);
        expect(buttons[0]!.classList).toContain('ant-btn-primary');
      }); // Cover non-service modal for later checking
      expect(modalService.openModals.length).toBe(4);

      modalService.closeAll();
      fixture.detectChanges();
      tick(600);
      expect(modalService.openModals.length).toBe(0);
    }));

    it('should modal not be registered twice', fakeAsync(() => {
      const modalRef = modalService.create();

      fixture.detectChanges();
      (modalService as any).modalControl.registerModal(modalRef); // tslint:disable-line:no-any
      tick(600);
      expect(modalService.openModals.length).toBe(1);
    }));

    it('should degregister a modal', fakeAsync(() => {
      const modalRef = modalService.create();
      const modalControl = (modalService as any).modalControl as NzModalControlService; // tslint:disable-line:no-any

      fixture.detectChanges();
      tick(600);
      expect(modalService.openModals.length).toBe(1);

      modalControl.deregisterModal(modalRef);
      expect(modalService.openModals.length).toBe(0);

      // Should nothing happened
      modalControl.deregisterModal(modalRef);
      expect(modalService.openModals.length).toBe(0);
    }));

    it('should trigger nzOnOk/nzOnCancel', () => {
      const spyOk = jasmine.createSpy('ok spy');
      const spyCancel = jasmine.createSpy('cancel spy');
      const modalRef: NzModalRef = modalService.create({
        nzOnOk: spyOk,
        nzOnCancel: spyCancel
      });

      fixture.detectChanges();

      modalRef.triggerOk();
      expect(spyOk).toHaveBeenCalled();

      modalRef.triggerCancel();
      expect(spyCancel).toHaveBeenCalled();
    });

    it('should block body scroll', fakeAsync(() => {
      const forceScrollElement = document.createElement('div');
      document.body.appendChild(forceScrollElement);
      forceScrollElement.style.width = '100px';
      forceScrollElement.style.height = '3000px';
      forceScrollElement.style.background = 'rebeccapurple';

      const modalRef = modalService.create();
      tick(600);
      fixture.detectChanges();

      expect(document.documentElement!.classList).toContain('cdk-global-scrollblock');

      modalRef.close();
      tick(600);
      fixture.detectChanges();

      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
      document.body.removeChild(forceScrollElement);
    }));
  });

  describe('close with mask', () => {
    let fixture: ComponentFixture<NzDemoModalMaskComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoModalMaskComponent);
    });

    it('should close when mask click', fakeAsync(() => {
      fixture.componentInstance.isVisible = true;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      const nativeElement = fixture.debugElement.query(By.css('.ant-modal-wrap')).nativeElement;
      fixture.detectChanges();
      nativeElement!.click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expectModalHidden(fixture.debugElement.query(By.css('nz-modal')).nativeElement, true);
    }));

    it('should not close if mouse down in dialog', fakeAsync(() => {
      fixture.componentInstance.isVisible = true;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      const bodyNativeElement = fixture.debugElement.query(By.css('.ant-modal-body')).nativeElement;
      dispatchFakeEvent(bodyNativeElement, 'mousedown');
      fixture.detectChanges();
      const warpNativeElement = fixture.debugElement.query(By.css('.ant-modal-wrap')).nativeElement;
      dispatchFakeEvent(warpNativeElement, 'mouseup');
      dispatchFakeEvent(warpNativeElement, 'click');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expectModalHidden(fixture.debugElement.query(By.css('nz-modal')).nativeElement, false);
    }));
  });
});

// -------------------------------------------
// | Testing Components
// -------------------------------------------

@Component({
  template: `
    <nz-modal *ngIf="modalAvailable" nzVisible nzTitle="BASIC_MODAL_TITLE" [nzCloseIcon]="icon">
      <p>content</p>
    </nz-modal>
  `
})
class NzDemoModalBasicComponent {
  modalAvailable = true;
  icon = 'close';
}

@Component({
  template: `
    <nz-modal [(nzVisible)]="isVisible" (nzOnCancel)="handleCancel()">
      <p>content</p>
    </nz-modal>
  `
})
class NzDemoModalMaskComponent {
  isVisible = false;
  handleCancel(): void {
    this.isVisible = false;
  }
}

@Component({
  template: `
    <nz-modal *ngIf="modalAvailable" [nzMask]="nzMask">
      <p>content</p>
    </nz-modal>
  `
})
class NzDemoModalWithInputComponent {
  modalAvailable = true;
  nzMask = true;
}

@Component({
  template: `
    <button nz-button nzType="primary" (click)="showModal()">
      <span>show modal</span>
    </button>
    <nz-modal
      [(nzVisible)]="isVisible"
      nzTitle="title"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzOkLoading]="isOkLoading"
    >
      <p>content</p>
    </nz-modal>
  `
})
class NzDemoModalAsyncComponent {
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

@Component({
  template: `
    <button nz-button nzType="info" (click)="showConfirm()">Confirm</button>
  `
})
class NzDemoModalConfirmPromiseComponent {
  confirmModal: NzModalRef; // For testing by now

  constructor(private modal: NzModalService) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}

@Component({
  template: ``
})
class TestBasicServiceComponent {
  basicModal: NzModalRef;

  constructor(private modalService: NzModalService) {
    this.modalService.create(); // [Testing Required] Only for coverage temporarily

    // Testing for creating modal immediately
    this.basicModal = this.modalService.create({
      nzGetContainer: () => document.body,
      nzZIndex: 1888,
      nzWidth: 250,
      nzWrapClassName: 'test-wrap-class-name',
      nzClassName: 'test-class-name',
      nzStyle: { left: '10px', top: '20pt', border: '2px solid red' },
      nzTitle: '<b>TEST BOLD TITLE</b>',
      nzContent: '<p>test html content</p>',
      nzClosable: false,
      nzKeyboard: false,
      nzMask: false,
      nzMaskClosable: false,
      nzMaskStyle: { opacity: 0.4 },
      nzBodyStyle: { background: 'gray' },
      // nzFooter: '<div>custom html footer: <i>OK</i></div>',
      nzOkText: 'custom ok',
      nzOkType: 'success',
      nzOkLoading: false,
      nzOkDisabled: false,
      nzCancelDisabled: false,
      nzOnOk: () => {
        console.log('click ok');
        return false;
      },
      nzCancelText: 'custom cancel',
      nzCancelLoading: true,
      nzOnCancel: () => console.log('click cancel')
    });
  }
}

@Component({
  template: ``
})
class TestVaryServiceComponent {
  constructor(private modalService: NzModalService) {}

  createWithVary(): NzModalRef<TestVaryServiceCustomComponent> {
    const modal = this.modalService.create({
      nzContent: TestVaryServiceCustomComponent,
      nzComponentParams: { title: 'internal title', subtitle: 'subtitle' },
      nzFooter: [
        {
          label: 'change title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'internal title changed';
            return Promise.resolve();
          }
        },
        {
          label: 'show loading',
          onClick: () => Promise.reject(null)
        }
      ]
    });

    return modal;
  }
}

@Component({
  template: `
    <h2>{{ title }}</h2>
    <h4>{{ subtitle }}</h4>
    <button (click)="destroyModal()">destroy</button>
  `
})
export class TestVaryServiceCustomComponent {
  @Input() title: string;
  @Input() subtitle: string;

  constructor(private modal: NzModalRef, public elementRef: ElementRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}

@Component({
  template: ``
})
export class TestConfirmModalComponent {
  maskClosedSpy = jasmine.createSpy();
  constructor(public modalService: NzModalService) {}

  createConfirm(): NzModalRef {
    this.modalService.confirm(); // [Testing Required] Only for coverage temporarily
    this.modalService.confirm({ nzWidth: 100 }); // [Testing Required] Only for coverage temporarily

    // Boundary detection for options: nzFooter, nzOnOk
    return this.modalService.confirm({
      nzFooter: 'should warning',
      nzOkText: 'close'
    });
  }

  createMaskClosableConfirm(): NzModalRef {
    return this.modalService.confirm({
      nzMaskClosable: true,
      nzOnCancel: () => {
        this.maskClosedSpy();
      }
    });
  }

  createOtherModals(): string[] {
    return ['info', 'success', 'error', 'warning'].map(type => {
      const modalId = generateUniqueId();
      // @ts-ignore
      this.modalService[type]({ nzClassName: modalId });
      // @ts-ignore
      this.modalService[type](); // [Testing Required] Only for coverage temporarily
      return modalId;
    });
  }

  createCustomContentWithComponent(): NzModalRef {
    return this.modalService.confirm({
      nzContent: TestConfirmCustomComponent
    });
  }

  createDisabledModal(): NzModalRef {
    return this.modalService.confirm({
      nzCancelDisabled: true,
      nzOkDisabled: true
    });
  }
}

@Component({
  template: `
    <span class="custom-component-in-confirm">
      Content
    </span>
  `
})
export class TestConfirmCustomComponent {
  constructor() {}
}

@Component({
  template: `
    <div
      [style.width]="100 | nzToCssUnit"
      [style.height]="'100px' | nzToCssUnit"
      [style.top]="100 | nzToCssUnit: 'pt'"
    ></div>
  `
})
class TestCssUnitPipeComponent {}

@Component({
  template: `
    <nz-modal [(nzVisible)]="nonServiceModalVisible" nzWrapClassName="__NON_SERVICE_ID_SUFFIX__"></nz-modal>
  `,
  providers: [NzModalControlService] // Testing for service with parent service
})
export class ModalByServiceComponent {
  nonServiceModalVisible = false;
}

// -------------------------------------------
// | Local tool functions
// -------------------------------------------

function expectModalHidden(modalElement: HTMLElement, hidden: boolean): void {
  const display = (modalElement.querySelector('.ant-modal-wrap') as HTMLElement).style.visibility;
  if (hidden) {
    expect(display).toBe('hidden');
  } else {
    expect(display).not.toBe('hidden');
  }
  expect(modalElement.querySelector('.ant-modal-mask')!.classList.contains('ant-modal-mask-hidden')).toBe(hidden);
}

function expectModalDestroyed(classId: string, destroyed: boolean): void {
  const element = document.querySelector(`.${classId}`);
  if (destroyed) {
    expect(element).toBeFalsy();
  } else {
    expect(element).not.toBeFalsy();
  }
}

function generateUniqueId(): string {
  return `testing-uniqueid-${counter++}`;
}

function getButtonOk(modalElement: HTMLElement): HTMLButtonElement {
  return isConfirmModal(modalElement)
    ? (modalElement.querySelector('.ant-modal-confirm-btns button:last-child') as HTMLButtonElement)
    : (modalElement.querySelector('.ant-modal-footer button:last-child') as HTMLButtonElement);
}

function getButtonCancel(modalElement: HTMLElement): HTMLButtonElement {
  return isConfirmModal(modalElement)
    ? (modalElement.querySelector('.ant-modal-confirm-btns button:first-child') as HTMLButtonElement)
    : (modalElement.querySelector('.ant-modal-footer button:first-child') as HTMLButtonElement);
}

function getButtonClose(modalElement: HTMLElement): HTMLButtonElement {
  // For normal modal only
  return modalElement.querySelector('.ant-modal-close') as HTMLButtonElement;
}

function isConfirmModal(modalElement: HTMLElement): boolean {
  return !!modalElement.querySelector('.ant-modal-confirm');
}

function isButtonLoading(buttonElement: HTMLButtonElement): boolean {
  return !!buttonElement.querySelector('i.anticon-loading');
}
