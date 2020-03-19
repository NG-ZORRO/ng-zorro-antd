/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { helpMotion } from 'ng-zorro-antd/core/animation';
import { BooleanInput } from 'ng-zorro-antd/core/types';

import { toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzFormControlStatusType, NzFormItemComponent } from './form-item.component';

const iconTypeMap = {
  error: 'close-circle-fill',
  validating: 'loading',
  success: 'check-circle-fill',
  warning: 'exclamation-circle-fill'
} as const;

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
      <span class="ant-form-item-children-icon">
        <i *ngIf="nzHasFeedback && iconType" nz-icon [nzType]="iconType"></i>
      </span>
    </div>
    <div class="ant-form-item-explain" *ngIf="innerTip">
      <div @helpMotion>
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{ innerTip }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `
})
export class NzFormControlComponent implements OnDestroy, OnInit, AfterContentInit, OnDestroy {
  static ngAcceptInputType_nzHasFeedback: BooleanInput;
  static ngAcceptInputType_nzRequired: BooleanInput;
  static ngAcceptInputType_nzNoColon: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  private _hasFeedback = false;
  private validateChanges: Subscription = Subscription.EMPTY;
  private validateString: string | null = null;
  private status: NzFormControlStatusType = null;
  private destroyed$ = new Subject<void>();
  private localeId: string;
  private defaultTipOptions: Record<string, string | Record<string, string>>;
  private defaultDisableAutoTips: boolean;
  private autoErrorTip: string;

  private get disableAutoTips(): boolean {
    return this.nzDisableAutoTips !== 'default' ? toBoolean(this.nzDisableAutoTips) : this.defaultDisableAutoTips;
  }

  validateControl: FormControl | NgModel | null = null;
  iconType: typeof iconTypeMap[keyof typeof iconTypeMap] | null = null;
  innerTip: string | TemplateRef<{ $implicit: FormControl | NgModel }> | null = null;

  @ContentChild(NgControl, { static: false }) defaultValidateControl: FormControlName | FormControlDirective;
  @Input() nzSuccessTip: string | TemplateRef<{ $implicit: FormControl | NgModel }>;
  @Input() nzWarningTip: string | TemplateRef<{ $implicit: FormControl | NgModel }>;
  @Input() nzErrorTip: string | TemplateRef<{ $implicit: FormControl | NgModel }>;
  @Input() nzValidatingTip: string | TemplateRef<{ $implicit: FormControl | NgModel }>;
  @Input() nzExtra: string | TemplateRef<void>;
  @Input() nzTipOptions: Record<string, Record<string, string>>;
  @Input() nzDisableAutoTips: boolean | 'default' = 'default';

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
    }
  }

  get nzHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set nzValidateStatus(value: string | FormControl | FormControlName | NgModel) {
    if (value instanceof FormControl || value instanceof NgModel) {
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

  private removeSubscribe(): void {
    this.validateChanges.unsubscribe();
  }

  private watchControl(): void {
    this.removeSubscribe();
    /** miss detect https://github.com/angular/angular/issues/10887 **/
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null)).subscribe(_ => {
        if (this.disableAutoTips) {
          this.setStatus();
          this.cdr.markForCheck();
        } else {
          this.updateAutoTip();
        }
      });
    }
  }

  private setStatus(): void {
    this.status = this.getControlStatus(this.validateString);
    this.iconType = this.status ? iconTypeMap[this.status] : null;
    this.innerTip = this.getInnerTip(this.status);
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
    } else if (validateString === 'validating' || validateString === 'pending' || this.validateControlStatus('PENDING')) {
      status = 'validating';
    } else if (validateString === 'success' || this.validateControlStatus('VALID')) {
      status = 'success';
    } else {
      status = null;
    }

    return status;
  }

  private validateControlStatus(validStatus: string, statusType?: NzFormControlStatusType): boolean {
    if (!this.validateControl) {
      return false;
    } else {
      const { dirty, touched, status } = this.validateControl;
      return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus);
    }
  }

  private getInnerTip(status: NzFormControlStatusType): string | TemplateRef<{ $implicit: FormControl | NgModel }> | null {
    switch (status) {
      case 'error':
        return (!this.disableAutoTips && this.autoErrorTip) || this.nzErrorTip;
      case 'validating':
        return this.nzValidatingTip;
      case 'success':
        return this.nzSuccessTip;
      case 'warning':
        return this.nzWarningTip;
      default:
        return null;
    }
  }

  private updateAutoTip(): void {
    this.updateAutoErrorTip();
    this.setStatus();
    this.cdr.markForCheck();
  }

  private updateAutoErrorTip(): void {
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip = errors[key][this.localeId];
          if (!autoErrorTip) {
            const tipOptions = this.nzTipOptions || this.defaultTipOptions || {};
            autoErrorTip = (tipOptions[this.localeId] || {})[key];
          }
        }
        if (!!autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }

  setDefaultAutoTipConf(tipOptions: Record<string, string | Record<string, string>>, disableAutoTip: boolean): void {
    this.defaultTipOptions = tipOptions;
    this.defaultDisableAutoTips = disableAutoTip;
    if (!this.disableAutoTips) {
      this.updateAutoTip();
    }
  }

  constructor(
    elementRef: ElementRef,
    @Optional() @Host() private nzFormItemComponent: NzFormItemComponent,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
    i18n: NzI18nService
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');
    i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(locale => {
      this.localeId = locale.locale;
      if (!this.disableAutoTips) {
        this.updateAutoTip();
      }
    });
  }

  ngOnInit(): void {
    this.setStatus();
  }

  ngOnDestroy(): void {
    this.removeSubscribe();
  }

  ngAfterContentInit(): void {
    if (!this.validateControl && !this.validateString) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.nzValidateStatus = this.defaultValidateControl.control;
      } else {
        this.nzValidateStatus = this.defaultValidateControl;
      }
    }
  }
}
