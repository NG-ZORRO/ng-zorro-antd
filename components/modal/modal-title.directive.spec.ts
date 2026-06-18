/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ComponentFixture, inject as testingInject, TestBed } from '@angular/core/testing';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzModalService, provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(TestDirectiveTitleComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(
    testingInject([OverlayContainer, NzModalService], (oc: OverlayContainer, m: NzModalService) => {
      overlayContainer = oc;
      modalService = m;
    })
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should work with template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible()).toBe(true);
    const modalRef = testComponent.modalComponent.getModalRef();
    expect(modalRef!.getConfig().nzTitle).toEqual(testComponent.modalTitleDir);
  });

  it('should work with template when init opened', async () => {
    const fixture = TestBed.createComponent(TestDirectiveTitleWithInitOpenedComponent);
    const initOpenedComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(initOpenedComponent.isVisible()).toBe(true);

    await fixture.whenStable();
    fixture.detectChanges();
    const modalRef = initOpenedComponent.modalComponent.getModalRef();
    expect(modalRef!.getConfig().nzTitle).toEqual(initOpenedComponent.modalTitleDir);
  });

  it('should work with service', () => {
    const modalRef = modalService.create({ nzContent: TestDirectiveTitleInServiceComponent, nzTitle: '' });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.nzModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.modalTitleDir).toEqual(modalRef.getConfig().nzTitle as TemplateRef<{}>);
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
  readonly isVisible = signal(false);
  @ViewChild(NzModalComponent) modalComponent!: NzModalComponent;
  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) modalTitleDir!: TemplateRef<void>;

  handleCancel(): void {
    this.isVisible.set(false);
  }

  showModal(): void {
    this.isVisible.set(true);
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
  readonly isVisible = signal(true);
  @ViewChild(NzModalComponent) modalComponent!: NzModalComponent;
  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) modalTitleDir!: TemplateRef<void>;
}

@Component({
  imports: [NzModalModule],
  template: `<div *nzModalTitle>Custom Modal Title</div>`
})
class TestDirectiveTitleInServiceComponent {
  readonly nzModalRef = inject(NzModalRef);

  @ViewChild(NzModalTitleDirective, { static: true, read: TemplateRef }) modalTitleDir!: TemplateRef<void>;

  handleCancel(): void {
    this.nzModalRef.close();
  }
}
