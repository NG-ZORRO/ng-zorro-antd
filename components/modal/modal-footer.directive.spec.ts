/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ComponentFixture, inject as testingInject, TestBed } from '@angular/core/testing';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';

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
    TestBed.configureTestingModule({
      providers: [NzModalService, provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterComponent);
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
    const modalRef = testComponent.nzModalComponent.getModalRef();
    expect(modalRef!.getConfig().nzFooter).toEqual(testComponent.nzModalFooterDirective);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with template when init opened', async () => {
    const initOpenedComponentFixture = TestBed.createComponent(TestDirectiveFooterWithInitOpenedComponent);
    const initOpenedComponent = initOpenedComponentFixture.componentInstance;
    initOpenedComponentFixture.detectChanges();
    expect(initOpenedComponent.isVisible()).toBe(true);
    await initOpenedComponentFixture.whenStable();
    initOpenedComponentFixture.detectChanges();
    const modalRef = initOpenedComponent.nzModalComponent.getModalRef();

    expect(modalRef!.getConfig().nzFooter).toEqual(initOpenedComponent.nzModalFooterDirective);

    initOpenedComponentFixture.detectChanges();
  });

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
  readonly isVisible = signal(false);
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<void>;

  handleCancel(): void {
    this.isVisible.set(false);
  }

  showModal(): void {
    this.isVisible.set(true);
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
  readonly isVisible = signal(true);
  @ViewChild(NzModalComponent) nzModalComponent!: NzModalComponent;
  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<void>;
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
  public readonly nzModalRef = inject(NzModalRef);

  @ViewChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  nzModalFooterDirective!: TemplateRef<void>;

  handleCancel(): void {
    this.nzModalRef.close();
  }
}
