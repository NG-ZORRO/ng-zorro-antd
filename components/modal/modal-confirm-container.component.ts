/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkScrollable } from '@angular/cdk/overlay';
import { CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nService, NzModalI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { nzModalAnimations } from './modal-animations';
import { NzModalCloseComponent } from './modal-close.component';
import { BaseModalContainerComponent } from './modal-container.directive';

@Component({
  selector: 'nz-modal-confirm-container',
  exportAs: 'nzModalConfirmContainer',
  template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        @if (config.nzClosable) {
          <button nz-modal-close (click)="onCloseClick()"></button>
        }

        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <span nz-icon [nzType]="config.nzIconType!"></span>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                @if (isStringContent) {
                  <div [innerHTML]="config.nzContent"></div>
                }
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              @if (config.nzCancelText !== null) {
                <button
                  [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
                  nz-button
                  (click)="onCancel()"
                  [nzLoading]="config.nzCancelLoading"
                  [disabled]="config.nzCancelDisabled"
                >
                  {{ config.nzCancelText || locale.cancelText }}
                </button>
              }
              @if (config.nzOkText !== null) {
                <button
                  [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
                  nz-button
                  [nzType]="config.nzOkType!"
                  (click)="onOk()"
                  [nzLoading]="config.nzOkLoading"
                  [disabled]="config.nzOkDisabled"
                  [nzDanger]="config.nzOkDanger"
                >
                  {{ config.nzOkText || locale.okText }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  hostDirectives: [CdkScrollable],
  animations: [nzModalAnimations.modalContainer],
  // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    tabindex: '-1',
    role: 'dialog',
    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
    '[class.ant-modal-wrap-rtl]': `dir === 'rtl'`,
    '[class.ant-modal-centered]': 'config.nzCentered',
    '[style.zIndex]': 'config.nzZIndex',
    '[@.disabled]': 'config.nzNoAnimation',
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
    '(click)': 'onContainerClick($event)'
  },
  imports: [
    NgClass,
    NgStyle,
    NzPipesModule,
    NzIconModule,
    NzModalCloseComponent,
    NzOutletModule,
    PortalModule,
    NzButtonModule
  ],
  standalone: true
})
export class NzModalConfirmContainerComponent extends BaseModalContainerComponent implements OnInit {
  @ViewChild(CdkPortalOutlet, { static: true }) override portalOutlet!: CdkPortalOutlet;
  @ViewChild('modalElement', { static: true }) override modalElementRef!: ElementRef<HTMLDivElement>;
  @Output() override readonly cancelTriggered = new EventEmitter<void>();
  @Output() override readonly okTriggered = new EventEmitter<void>();
  locale!: NzModalI18nInterface;
  private i18n = inject(NzI18nService);

  constructor() {
    super();

    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Modal');
    });
  }

  ngOnInit(): void {
    this.setupMouseListeners(this.modalElementRef);
  }

  onCancel(): void {
    this.cancelTriggered.emit();
  }

  onOk(): void {
    this.okTriggered.emit();
  }
}
