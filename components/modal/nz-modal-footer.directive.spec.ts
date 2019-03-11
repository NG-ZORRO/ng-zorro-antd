import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, inject, tick, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzModalRef } from './nz-modal-ref.class';
import { NzModalModule } from './nz-modal.module';
import { NzModalService } from './nz-modal.service';

@Component({
  template: `
    <div>
      <p>Modal Content</p>
    </div>
    <div *nzModalFooter>
      <!--<button class="destroy-btn" nz-button nzType="default" (click)="destroyModal()">destroy</button>-->
    </div>
  `
})
export class TestServiceCustomComponent {

  constructor(private modal: NzModalRef, public elementRef: ElementRef) {
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}

@NgModule({
  declarations   : [ TestServiceCustomComponent ],
  entryComponents: [ TestServiceCustomComponent ]
})
class TestModule {
}

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let modalService: NzModalService;
  let fixture;
  let testComponent: TestDirectiveFooterInTemplateComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ TestModule, NzModalModule, NoopAnimationsModule ],
      declarations: [ TestDirectiveFooterInTemplateComponent ],
      providers   : [ NzMeasureScrollbarService ],
      schemas     : [ NO_ERRORS_SCHEMA ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterInTemplateComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([ NzModalService, OverlayContainer ], (ms: NzModalService, oc: OverlayContainer) => {
    modalService = ms;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  afterEach(fakeAsync(() => {
    modalService.closeAll();
    fixture.detectChanges();
    tick(1000);
  }));

  it('should work in template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(true);
    const cancelBtn: HTMLButtonElement = overlayContainerElement.querySelector('.ant-modal .ant-modal-footer button.cancel-btn');
    expect(cancelBtn).toBeTruthy();
    cancelBtn.click();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(false);
  });

  it('should work in service component', fakeAsync(() => {
    const spy = jasmine.createSpy('afterOpen spy');
    const modalRef = modalService.create({
      nzTitle  : 'Service',
      nzContent: TestServiceCustomComponent
    });
    modalRef.afterOpen.subscribe(spy);

    fixture.detectChanges();
    tick(600);
    expect(spy).toHaveBeenCalled();
    fixture.detectChanges();
    console.log(modalRef.getInstance().nzModalFooterDirective)
  }));

});

@Component({
  template: `
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Custom Modal Title" (nzOnCancel)="handleCancel()">
      <div>
        <p>Modal Content</p>
      </div>
      <div *nzModalFooter>
        <button class="cancel-btn" nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
      </div>
    </nz-modal>`
})
class TestDirectiveFooterInTemplateComponent {
  isVisible = false;

  constructor() {
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}

