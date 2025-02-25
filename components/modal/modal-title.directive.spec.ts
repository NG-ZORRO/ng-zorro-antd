/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzModalRef } from './modal-ref';
import { NzModalTitleDirective } from './modal-title.directive';
import { NzModalComponent } from './modal.component';
import { NzModalModule } from './modal.module';
import { NzModalService } from './modal.service';

describe('modal title directive', () => {
  let overlayContainer: OverlayContainer;
  let fixture: ComponentFixture<TestDirectiveTitleComponent>;
  let testComponent: TestDirectiveTitleComponent;
  let modalService: NzModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [NzModalService, provideNoopAnimations()]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveTitleComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer, NzModalService], (oc: OverlayContainer, m: NzModalService) => {
    overlayContainer = oc;
    modalService = m;
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should work with template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(true);
    const modalRef = testComponent.nzModalComponent.getModalRef();
    expect(modalRef!.getConfig().nzTitle).toEqual(testComponent.nzModalTitleDirective);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with template when init opened', fakeAsync(() => {
    const initOpenedComponentFixture = TestBed.createComponent(TestDirectiveTitleWithInitOpenedComponent);
    const initOpenedComponent = initOpenedComponentFixture.componentInstance;
    initOpenedComponentFixture.detectChanges();
    expect(initOpenedComponent.isVisible).toBe(true);
    flush();
    initOpenedComponentFixture.detectChanges();
    const modalRef = initOpenedComponent.nzModalComponent.getModalRef();

    expect(modalRef!.getConfig().nzTitle).toEqual(initOpenedComponent.nzModalTitleDirective);

    initOpenedComponentFixture.detectChanges();
  }));

  it('should work with service', () => {
    const modalRef = modalService.create({ nzContent: TestDirectiveTitleInServiceComponent, nzTitle: '' });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.nzModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.NzModalTitleDirective).toEqual(modalRef.getConfig().nzTitle as TemplateRef<{}>);
  });
});

@Component({
  imports: [NzModalModule],
  template: `
    <nz-modal [(nzVisible)]="isVisible" (nzOnCancel)="handleCancel()">
      <div>
        <p>Modal Content</p>
      </div>
      <div *nzModalTitle>Custom Modal Title</div>
    </nz-modal>
  `
})
class TestDirectiveTitleComponent {
  isVisible = false;
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) nzModalTitleDirective!: TemplateRef<NzSafeAny>;

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}

@Component({
  imports: [NzModalModule],
  template: `
    <nz-modal [(nzVisible)]="isVisible">
      <div>
        <p>Modal Content</p>
      </div>
      <div *nzModalTitle>Custom Modal Title</div>
    </nz-modal>
  `
})
class TestDirectiveTitleWithInitOpenedComponent {
  isVisible = true;
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) nzModalTitleDirective!: TemplateRef<NzSafeAny>;
}

@Component({
  imports: [NzModalModule],
  template: `<div *nzModalTitle>Custom Modal Title</div>`
})
class TestDirectiveTitleInServiceComponent {
  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) NzModalTitleDirective!: TemplateRef<NzSafeAny>;

  constructor(public nzModalRef: NzModalRef) {}

  handleCancel(): void {
    this.nzModalRef.close();
  }
}
