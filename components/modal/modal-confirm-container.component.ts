/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzI18nService } from 'ng-zorro-antd/i18n';

import { nzModalAnimations } from './modal-animations';
import { BaseModalContainer } from './modal-container';
import { ModalOptions } from './modal-types';

@Component({
  selector: 'nz-modal-confirm-container',
  exportAs: 'nzModalConfirmContainer',
  template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      [class]="config.nzClassName"
      [ngStyle]="config.nzStyle"
      [style.width]="config?.nzWidth | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <i nz-icon [nzType]="config.nzIconType"></i>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              <button
                *ngIf="config.nzCancelText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel'"
                nz-button
                (click)="onCancel()"
                [nzLoading]="config.nzCancelLoading"
                [disabled]="config.nzCancelDisabled"
              >
                {{ config.nzCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.nzOkText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'ok'"
                nz-button
                [nzType]="config.nzOkType"
                (click)="onOk()"
                [nzLoading]="config.nzOkLoading"
                [disabled]="config.nzOkDisabled"
              >
                {{ config.nzOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [nzModalAnimations.modalContainer],
  // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    tabindex: '-1',
    role: 'dialog',
    class: 'ant-modal-wrap',
    '[class]': 'config.nzWrapClassName',
    '[style.zIndex]': 'config.nzZIndex',
    '[@.disabled]': 'config.nzNoAnimation',
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
    '(mousedown)': 'onMousedown($event)',
    '(mouseup)': 'onMouseup($event)'
  }
})
export class NzModalConfirmContainerComponent extends BaseModalContainer implements OnDestroy {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
  @ViewChild('modalElement', { static: true }) modalElementRef: ElementRef<HTMLDivElement>;
  @Output() readonly cancelTriggered = new EventEmitter<void>();
  @Output() readonly okTriggered = new EventEmitter<void>();
  locale: { okText?: string; cancelText?: string } = {};
  private destroy$ = new Subject<void>();

  constructor(
    private i18n: NzI18nService,
    elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    cdr: ChangeDetectorRef,
    render: Renderer2,
    zone: NgZone,
    overlayRef: OverlayRef,
    public config: ModalOptions,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) document: any,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationType: string
  ) {
    super(elementRef, focusTrapFactory, cdr, render, zone, overlayRef, config, document, animationType);
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Modal');
    });
  }

  onCancel(): void {
    this.cancelTriggered.emit();
  }

  onOk(): void {
    this.okTriggered.emit();
  }

  attachComponentPortal<T>(_portal: ComponentPortal<T>): never {
    throw new Error('The confirm mode does not support using component as content');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
