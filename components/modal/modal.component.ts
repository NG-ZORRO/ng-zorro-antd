/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild
} from '@angular/core';

import { NzButtonType } from 'ng-zorro-antd/button';
import { InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';
import { Observable } from 'rxjs';

import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalLegacyAPI } from './modal-legacy-api';
import { NzModalRef } from './modal-ref';
import { ModalButtonOptions, ModalOptions, ModalTypes, OnClickCallback, StyleObjectLike } from './modal-types';
import { NzModalService } from './modal.service';
import { getConfigFromComponent } from './utils';

const NZ_CONFIG_COMPONENT_NAME = 'modal';

@Component({
  selector: 'nz-modal',
  exportAs: 'nzModal',
  template: `
    <ng-template><ng-content></ng-content></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:no-any
export class NzModalComponent<T = any, R = any> implements OnChanges, NzModalLegacyAPI<T, R> {
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzMask: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzMaskClosable: boolean;
  @Input() @InputBoolean() nzVisible: boolean = false;
  @Input() @InputBoolean() nzClosable: boolean = true;
  @Input() @InputBoolean() nzOkLoading: boolean = false;
  @Input() @InputBoolean() nzOkDisabled: boolean = false;
  @Input() @InputBoolean() nzCancelDisabled: boolean = false;
  @Input() @InputBoolean() nzCancelLoading: boolean = false;
  @Input() @InputBoolean() nzKeyboard: boolean = true;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() nzContent: string | TemplateRef<{}> | Type<T>;
  @Input() nzComponentParams: T;
  @Input() nzFooter: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null;
  @Input() nzGetContainer: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef);
  @Input() nzZIndex: number = 1000;
  @Input() nzWidth: number | string = 520;
  @Input() nzWrapClassName: string;
  @Input() nzClassName: string;
  @Input() nzStyle: object;
  @Input() nzTitle: string | TemplateRef<{}>;
  @Input() nzCloseIcon: string | TemplateRef<void> = 'close';
  @Input() nzMaskStyle: StyleObjectLike;
  @Input() nzBodyStyle: StyleObjectLike;
  @Input() nzOkText: string | null;
  @Input() nzCancelText: string | null;
  @Input() nzOkType: NzButtonType = 'primary';
  @Input() nzIconType: string = 'question-circle'; // Confirm Modal ONLY
  @Input() nzModalType: ModalTypes = 'default';

  @Input()
  @Output()
  readonly nzOnOk: EventEmitter<T> | OnClickCallback<T> = new EventEmitter<T>();
  @Input()
  @Output()
  readonly nzOnCancel: EventEmitter<T> | OnClickCallback<T> = new EventEmitter<T>();

  @Output() readonly nzAfterOpen = new EventEmitter<void>();
  @Output() readonly nzAfterClose = new EventEmitter<R>();
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ViewChild(TemplateRef, { static: true }) contentTemplateRef: TemplateRef<{}>;
  @ContentChild(NzModalFooterDirective)
  set modalFooter(value: NzModalFooterDirective) {
    if (value && value.templateRef) {
      this.setFooterWithTemplate(value.templateRef);
    }
  }
  private modalRef: NzModalRef | null = null;

  get afterOpen(): Observable<void> {
    // Observable alias for nzAfterOpen
    return this.nzAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    // Observable alias for nzAfterClose
    return this.nzAfterClose.asObservable();
  }

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef, private modal: NzModalService) {}

  open(): void {
    if (!this.modalRef) {
      const config = this.getConfig();
      this.modalRef = this.modal.create(config);
    }
  }

  close(result?: R): void {
    if (this.modalRef) {
      this.modalRef.close(result);
      this.modalRef = null;
    }
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): void {
    if (this.modalRef) {
      this.modalRef.triggerOk();
    }
  }

  triggerCancel(): void {
    if (this.modalRef) {
      this.modalRef.triggerCancel();
    }
  }

  getContentComponent(): T | void {
    if (this.modalRef) {
      return this.modalRef.getContentComponent();
    }
  }

  getElement(): HTMLElement | void {
    if (this.modalRef) {
      return this.modalRef.getElement();
    }
  }

  private setFooterWithTemplate(templateRef: TemplateRef<{}>): void {
    this.nzFooter = templateRef;
    this.cdr.markForCheck();
  }

  private getConfig(): ModalOptions {
    const componentConfig = getConfigFromComponent(this);
    if (!this.nzContent) {
      componentConfig.nzContent = this.contentTemplateRef;
    }
    return componentConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzVisible, ...otherChanges } = changes;

    if (Object.keys(otherChanges).length && this.modalRef) {
      this.modalRef.updateConfig(getConfigFromComponent(this));
    }

    if (nzVisible) {
      if (this.nzVisible) {
        this.open();
      } else {
        this.close();
      }
    }
  }
}
