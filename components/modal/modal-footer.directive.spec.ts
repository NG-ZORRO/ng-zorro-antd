/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, provideZoneChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalRef } from './modal-ref';
import { NzModalComponent } from './modal.component';
import { NzModalModule } from './modal.module';
import { NzModalService } from './modal.service';

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let fixture: ComponentFixture<TestDirectiveFooterComponent>;
  let testComponent: TestDirectiveFooterComponent;
  let modalService: NzModalService;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [NzModalService, provideNoopAnimations(), provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterComponent);
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
    expect(modalRef!.getConfig().nzFooter).toEqual(testComponent.nzModalFooterDirective);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with template when init opened', fakeAsync(() => {
    const initOpenedComponentFixture = TestBed.createComponent(TestDirectiveFooterWithInitOpenedComponent);
    const initOpenedComponent = initOpenedComponentFixture.componentInstance;
    initOpenedComponentFixture.detectChanges();
    expect(initOpenedComponent.isVisible).toBe(true);
    flush();
    initOpenedComponentFixture.detectChanges();
    const modalRef = initOpenedComponent.nzModalComponent.getModalRef();

    expect(modalRef!.getConfig().nzFooter).toEqual(initOpenedComponent.nzModalFooterDirective);

    initOpenedComponentFixture.detectChanges();
  }));

  it('should work with service', () => {
    const modalRef = modalService.create({ nzContent: TestDirectiveFooterInServiceComponent, nzFooter: null });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.nzModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.nzModalFooterDirective).toEqual(
      modalRef.getConfig().nzFooter as TemplateRef<{}>
    );
  });
});

@Component({
  imports: [NzModalModule, NzButtonModule],
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
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<NzSafeAny>;

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}

@Component({
  imports: [NzModalModule, NzButtonModule],
  template: `
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Custom Modal Title">
      <div>
        <p>Modal Content</p>
      </div>
      <div *nzModalFooter>
        <button id="btn-template" nz-button nzType="default">Custom Callback</button>
      </div>
    </nz-modal>
  `
})
class TestDirectiveFooterWithInitOpenedComponent {
  isVisible = true;
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<NzSafeAny>;
}

@Component({
  imports: [NzModalModule, NzButtonModule],
  template: `
    <div *nzModalFooter>
      <button id="btn-template" nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
    </div>
  `
})
class TestDirectiveFooterInServiceComponent {
  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<NzSafeAny>;

  constructor(public nzModalRef: NzModalRef) {}

  handleCancel(): void {
    this.nzModalRef.close();
  }
}
