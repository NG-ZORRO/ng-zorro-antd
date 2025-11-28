/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { isPromise } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzModalI18nInterface } from 'ng-zorro-antd/i18n';

import { NzModalRef } from './modal-ref';
import { ModalButtonOptions, ModalOptions } from './modal-types';

@Component({
  selector: 'div[nz-modal-footer]',
  exportAs: 'nzModalFooterBuiltin',
  template: `
    @if (config.nzFooter) {
      <ng-container
        *nzStringTemplateOutlet="config.nzFooter; context: { $implicit: config.nzData, modalRef: modalRef }"
      >
        @if (buttonsFooter) {
          @for (button of buttons; track button) {
            <button
              nz-button
              (click)="onButtonClick(button)"
              [hidden]="!getButtonCallableProp(button, 'show')"
              [nzLoading]="getButtonCallableProp(button, 'loading')"
              [disabled]="getButtonCallableProp(button, 'disabled')"
              [nzType]="button.type!"
              [nzDanger]="button.danger"
              [nzShape]="button.shape!"
              [nzSize]="button.size!"
              [nzGhost]="button.ghost!"
            >
              {{ button.label }}
            </button>
          }
        } @else {
          <div [innerHTML]="config.nzFooter"></div>
        }
      </ng-container>
    } @else {
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
          [nzDanger]="config.nzOkDanger"
          (click)="onOk()"
          [nzLoading]="config.nzOkLoading"
          [disabled]="config.nzOkDisabled"
        >
          {{ config.nzOkText || locale.okText }}
        </button>
      }
    }
  `,
  host: {
    class: 'ant-modal-footer'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [NzOutletModule, NzButtonModule]
})
export class NzModalFooterComponent {
  private i18n = inject(NzI18nService);
  public readonly config = inject(ModalOptions);

  buttonsFooter = false;
  buttons: ModalButtonOptions[] = [];
  locale!: NzModalI18nInterface;
  @Output() readonly cancelTriggered = new EventEmitter<void>();
  @Output() readonly okTriggered = new EventEmitter<void>();
  @Input() modalRef!: NzModalRef;

  constructor() {
    if (Array.isArray(this.config.nzFooter)) {
      this.buttonsFooter = true;
      this.buttons = (this.config.nzFooter as ModalButtonOptions[]).map(mergeDefaultOption);
    }
    this.i18n.localeChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Modal');
    });
  }

  onCancel(): void {
    this.cancelTriggered.emit();
  }

  onOk(): void {
    this.okTriggered.emit();
  }

  /**
   * Returns the value of the specified key.
   * If it is a function, run and return the return value of the function.
   */
  getButtonCallableProp(options: ModalButtonOptions, prop: keyof ModalButtonOptions): boolean {
    const value = options[prop];
    const componentInstance = this.modalRef.getContentComponent();
    return typeof value === 'function' ? value.apply(options, componentInstance && [componentInstance]) : value;
  }

  /**
   * Run function based on the type and set its `loading` prop if needed.
   */
  onButtonClick(options: ModalButtonOptions): void {
    const loading = this.getButtonCallableProp(options, 'loading');
    if (!loading) {
      const result = this.getButtonCallableProp(options, 'onClick');
      if (options.autoLoading && isPromise(result)) {
        options.loading = true;
        result
          .then(() => (options.loading = false))
          .catch(e => {
            options.loading = false;
            throw e;
          });
      }
    }
  }
}

function mergeDefaultOption(options: ModalButtonOptions): ModalButtonOptions {
  return {
    type: null,
    size: 'default',
    autoLoading: true,
    show: true,
    loading: false,
    disabled: false,
    ...options
  };
}
