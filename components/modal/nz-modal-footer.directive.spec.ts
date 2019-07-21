import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { async, fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzModalModule } from './nz-modal.module';
import { NzModalService } from './nz-modal.service';

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<TestDirectiveFooterComponent>;
  let testComponent: TestDirectiveFooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzModalModule, NoopAnimationsModule],
      declarations: [TestDirectiveFooterComponent],
      providers: [NzModalService]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
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

  it('should work with template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(true);
    const cancelBtn: HTMLButtonElement = overlayContainerElement.querySelector(
      '.ant-modal #btn-template'
    ) as HTMLButtonElement;
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
        <button id="btn-template" nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
      </div>
    </nz-modal>
  `
})
class TestDirectiveFooterComponent {
  isVisible = false;

  constructor() {}

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}
