import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { async, fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzModalModule } from './nz-modal.module';

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture;
  let testComponent: TestDirectiveFooterInTemplateComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzModalModule, NoopAnimationsModule ],
      declarations: [ TestDirectiveFooterInTemplateComponent ],
      providers   : [ NzMeasureScrollbarService ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterInTemplateComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  afterEach(fakeAsync(() => {
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
