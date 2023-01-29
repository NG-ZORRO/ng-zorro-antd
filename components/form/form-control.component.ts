/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';

import { helpMotion } from 'ng-zorro-antd/core/animation';
import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { NzFormControlStatusType, NzFormItemComponent } from './form-item.component';
import { NzFormDirective } from './form.directive';

@Component({
  selector: 'nz-form-control',
  exportAs: 'nzFormControl',
  preserveWhitespaces: false,
  animations: [helpMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
    </div>
    <div @helpMotion class="ant-form-item-explain ant-form-item-explain-connected" *ngIf="innerTip">
      <div role="alert" [ngClass]="['ant-form-item-explain-' + status]">
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{
          innerTip
        }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `,
  providers: [NzFormStatusService]
})
export class NzFormControlComponent implements OnChanges, OnDestroy, OnInit, AfterContentInit, OnDestroy {
  static ngAcceptInputType_nzHasFeedback: BooleanInput;
  static ngAcceptInputType_nzRequired: BooleanInput;
  static ngAcceptInputType_nzNoColon: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  private _hasFeedback = false;
  private validateChanges: Subscription = Subscription.EMPTY;
  private validateString: string | null = null;
  private destroyed$ = new Subject<void>();
  private localeId!: string;
  private autoErrorTip?: string;

  private get disableAutoTips(): boolean {
    return this.nzDisableAutoTips !== 'default'
      ? toBoolean(this.nzDisableAutoTips)
      : this.nzFormDirective?.nzDisableAutoTips;
  }

  status: NzFormControlStatusType = '';
  validateControl: AbstractControl | NgModel | null = null;
  innerTip: string | TemplateRef<{ $implicit: AbstractControl | NgModel }> | null = null;

  @ContentChild(NgControl, { static: false }) defaultValidateControl?: FormControlName | FormControlDirective;
  @Input() nzSuccessTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzWarningTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzErrorTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzValidatingTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzAutoTips: Record<string, Record<string, string>> = {};
  @Input() nzDisableAutoTips: boolean | 'default' = 'default';

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
    this.nzFormStatusService.formStatusChanges.next({ status: this.status, hasFeedback: this._hasFeedback });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
    }
  }

  get nzHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set nzValidateStatus(value: string | AbstractControl | FormControlName | NgModel) {
    if (value instanceof AbstractControl || value instanceof NgModel) {
      this.validateControl = value;
      this.validateString = null;
      this.watchControl();
    } else if (value instanceof FormControlName) {
      this.validateControl = value.control;
      this.validateString = null;
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.setStatus();
    }
  }

  private watchControl(): void {
    this.validateChanges.unsubscribe();
    /** miss detect https://github.com/angular/angular/issues/10887 **/
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = (this.validateControl.statusChanges as Observable<NzSafeAny>)
        .pipe(startWith(null), takeUntil(this.destroyed$))
        .subscribe(() => {
          if (!this.disableAutoTips) {
            this.updateAutoErrorTip();
          }
          this.setStatus();
          this.cdr.markForCheck();
        });
    }
  }

  private setStatus(): void {
    this.status = this.getControlStatus(this.validateString);
    this.innerTip = this.getInnerTip(this.status);
    this.nzFormStatusService.formStatusChanges.next({ status: this.status, hasFeedback: this.nzHasFeedback });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
      this.nzFormItemComponent.setStatus(this.status);
    }
  }

  private getControlStatus(validateString: string | null): NzFormControlStatusType {
    let status: NzFormControlStatusType;

    if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
      status = 'warning';
    } else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
      status = 'error';
    } else if (
      validateString === 'validating' ||
      validateString === 'pending' ||
      this.validateControlStatus('PENDING')
    ) {
      status = 'validating';
    } else if (validateString === 'success' || this.validateControlStatus('VALID')) {
      status = 'success';
    } else {
      status = '';
    }

    return status;
  }

  private validateControlStatus(validStatus: string, statusType?: NzFormControlStatusType): boolean {
    if (!this.validateControl) {
      return false;
    } else {
      const { dirty, touched, status } = this.validateControl;
      return (
        (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus)
      );
    }
  }

  private getInnerTip(
    status: NzFormControlStatusType
  ): string | TemplateRef<{ $implicit: AbstractControl | NgModel }> | null {
    switch (status) {
      case 'error':
        return (!this.disableAutoTips && this.autoErrorTip) || this.nzErrorTip || null;
      case 'validating':
        return this.nzValidatingTip || null;
      case 'success':
        return this.nzSuccessTip || null;
      case 'warning':
        return this.nzWarningTip || null;
      default:
        return null;
    }
  }

  private updateAutoErrorTip(): void {
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip =
            errors[key]?.[this.localeId] ??
            this.nzAutoTips?.[this.localeId]?.[key] ??
            this.nzAutoTips.default?.[key] ??
            this.nzFormDirective?.nzAutoTips?.[this.localeId]?.[key] ??
            this.nzFormDirective?.nzAutoTips.default?.[key];
        }
        if (!!autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }

  private subscribeAutoTips(observable: Observable<NzSafeAny>): void {
    observable?.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (!this.disableAutoTips) {
        this.updateAutoErrorTip();
        this.setStatus();
        this.cdr.markForCheck();
      }
    });
  }

  constructor(
    elementRef: ElementRef,
    @Optional() @Host() private nzFormItemComponent: NzFormItemComponent,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
    i18n: NzI18nService,
    @Optional() private nzFormDirective: NzFormDirective,
    private nzFormStatusService: NzFormStatusService
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');

    this.subscribeAutoTips(i18n.localeChange.pipe(tap(locale => (this.localeId = locale.locale))));
    this.subscribeAutoTips(this.nzFormDirective?.getInputObservable('nzAutoTips'));
    this.subscribeAutoTips(
      this.nzFormDirective
        ?.getInputObservable('nzDisableAutoTips')
        .pipe(filter(() => this.nzDisableAutoTips === 'default'))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisableAutoTips, nzAutoTips, nzSuccessTip, nzWarningTip, nzErrorTip, nzValidatingTip } = changes;

    if (nzDisableAutoTips || nzAutoTips) {
      this.updateAutoErrorTip();
      this.setStatus();
    } else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
      this.setStatus();
    }
  }

  ngOnInit(): void {
    this.setStatus();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterContentInit(): void {
    if (!this.validateControl && !this.validateString) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.nzValidateStatus = this.defaultValidateControl.control;
      } else {
        this.nzValidateStatus = this.defaultValidateControl!;
      }
    }
  }
}
