/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NzFormControlComponent } from './nz-form-control.component';

const NZ_CONFIG_COMPONENT_NAME = 'form';

@Directive({
  selector: 'nz-form-control[nz-form-auto-error-tip]',
  exportAs: 'nzFormAutoErrorTip'
})
export class NzFormAutoErrorTipDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @ContentChild(NgControl, { static: false }) ngControl: FormControlName | FormControlDirective | null = null;

  @Input() nzErrorTip: string | TemplateRef<{ $implicit: FormControl | NgModel }>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzUseI18n: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'errorTip') nzErrorTipKey: string | Record<string, string>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, {}) nzErrorTipMap: Record<string, string> | Record<string, Record<string, string>>;

  private localeId: string;
  private errorTipKey: string;
  private errorTipMap: Record<string, string>;
  private destroyed$ = new Subject<void>();

  constructor(
    public nzConfigService: NzConfigService,
    private i18n: NzI18nService,
    private cdr: ChangeDetectorRef,
    @Optional() @Self() private nzFormControl: NzFormControlComponent
  ) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.setLocale());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzUseI18n') && !changes.nzUseI18n.firstChange) {
      this.setLocale();
    }
  }

  ngAfterContentInit(): void {
    if (this.nzFormControl && this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.statusChanges.pipe(filter(status => status === 'INVALID')).subscribe(() => this.updateErrorTip());
    }
  }

  private updateErrorTip(): void {
    if (this.nzFormControl && this.ngControl) {
      const errors = this.ngControl.errors || {};
      const target = Object.entries(errors).find(([key, error]) => error[this.errorTipKey] || this.errorTipMap[key]);

      if (target) {
        const [key, error] = target;
        this.nzFormControl.nzErrorTip = error[this.errorTipKey] || this.errorTipMap[key];
      } else {
        this.nzFormControl.nzErrorTip = this.nzErrorTip;
      }

      this.nzFormControl.setControlClassMap();
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private setLocale(): void {
    this.localeId = this.i18n.getLocaleId();

    this.updateKeyAndMap();

    this.updateErrorTip();
  }

  private updateKeyAndMap(): void {
    if (this.nzUseI18n) {
      if (typeof this.nzErrorTipKey === 'object') {
        this.errorTipKey = this.nzErrorTipKey[this.localeId];
      } else {
        throw new Error(`Type of 'nzErrorTipKey' should be 'Record<string, string>' if you want to use I18n.`);
      }

      const localeErrorTipMap = this.nzErrorTipMap[this.localeId];
      if (typeof localeErrorTipMap === 'object') {
        this.errorTipMap = localeErrorTipMap;
      } else {
        throw new Error(`Type of 'nzErrorTipMap' should be 'Record<string, Record<string, string>>' if you want to use I18n.`);
      }
    } else {
      this.errorTipKey = this.nzErrorTipKey as string;
      this.errorTipMap = this.nzErrorTipMap as Record<string, string>;
    }
  }
}
