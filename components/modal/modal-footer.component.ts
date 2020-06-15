/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { isPromise } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzI18nService, NzModalI18nInterface } from 'ng-zorro-antd/i18n';

import { NzModalRef } from './modal-ref';
import { ModalButtonOptions, ModalOptions } from './modal-types';

@Component({
  selector: 'div[nz-modal-footer]',
  exportAs: 'NzModalFooterBuiltin',
  template: `
    <ng-container *ngIf="config.nzFooter; else defaultFooterButtons">
      <ng-container *nzStringTemplateOutlet="config.nzFooter">
        <div *ngIf="!buttonsFooter" [innerHTML]="config.nzTitle"></div>
        <ng-container *ngIf="buttonsFooter">
          <button
            *ngFor="let button of buttons"
            nz-button
            (click)="onButtonClick(button)"
            [hidden]="!getButtonCallableProp(button, 'show')"
            [nzLoading]="getButtonCallableProp(button, 'loading')"
            [disabled]="getButtonCallableProp(button, 'disabled')"
            [nzType]="button.type!"
            [nzShape]="button.shape!"
            [nzSize]="button.size!"
            [nzGhost]="button.ghost!"
          >
            {{ button.label }}
          </button>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #defaultFooterButtons>
      <button
        *ngIf="config.nzCancelText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
        nz-button
        (click)="onCancel()"
        [nzLoading]="!!config.nzCancelLoading"
        [disabled]="config.nzCancelDisabled"
      >
        {{ config.nzCancelText || locale.cancelText }}
      </button>
      <button
        *ngIf="config.nzOkText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
        nz-button
        [nzType]="config.nzOkType!"
        (click)="onOk()"
        [nzLoading]="!!config.nzOkLoading"
        [disabled]="config.nzOkDisabled"
      >
        {{ config.nzOkText || locale.okText }}
      </button>
    </ng-template>
  `,
  host: {
    class: 'ant-modal-footer'
  },
  changeDetection: ChangeDetectionStrategy.Default
})
export class NzModalFooterComponent implements OnDestroy {
  buttonsFooter = false;
  buttons: ModalButtonOptions[] = [];
  locale!: NzModalI18nInterface;
  @Output() readonly cancelTriggered = new EventEmitter<void>();
  @Output() readonly okTriggered = new EventEmitter<void>();
  @Input() modalRef!: NzModalRef;
  private destroy$ = new Subject<void>();

  constructor(private i18n: NzI18nService, public config: ModalOptions) {
    if (Array.isArray(config.nzFooter)) {
      this.buttonsFooter = true;
      this.buttons = (config.nzFooter as ModalButtonOptions[]).map(mergeDefaultOption);
    }
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

  /**
   * Returns the value of the specified key.
   * If it is a function, run and return the return value of the function.
   * @deprecated Not support use function type.
   * @breaking-change 10.0.0
   */
  getButtonCallableProp(options: ModalButtonOptions, prop: keyof ModalButtonOptions): boolean {
    const value = options[prop];
    const componentInstance = this.modalRef.getContentComponent();
    return typeof value === 'function' ? value.apply(options, componentInstance && [componentInstance]) : value;
  }

  /**
   * Run function based on the type and set its `loading` prop if needed.
   * @deprecated Should be set options' value by the user, not library.
   * @breaking-change 10.0.0
   */
  onButtonClick(options: ModalButtonOptions): void {
    const loading = this.getButtonCallableProp(options, 'loading');
    if (!loading) {
      const result = this.getButtonCallableProp(options, 'onClick');
      if (options.autoLoading && isPromise(result)) {
        options.loading = true;
        result.then(() => (options.loading = false)).catch(() => (options.loading = false));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
