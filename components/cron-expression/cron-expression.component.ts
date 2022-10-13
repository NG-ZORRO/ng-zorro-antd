/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { CronType, NzCronOptions } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression',
  exportAs: 'nzCronExpression',
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-cron-expression-specialized
        formControlName="specialized"
        [nzOptions]="nzOptions"
        [nzVisible]="nzVisible"
        [nzSize]="nzSize"
        [nzType]="nzType"
      >
      </nz-cron-expression-specialized>
    </form>
  `,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NzCronExpressionComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCronExpressionComponent),
      multi: true
    }
  ]
})
export class NzCronExpressionComponent implements OnInit, OnDestroy {
  locale!: NzCronExpressionI18nInterface;
  @Input() nzVisible: boolean = false;
  @Input() nzSize: NzButtonSize = 'default';
  @Input() nzType: NzButtonType = 'default';
  @Input() nzOptions: NzCronOptions = [];
  private destroy$ = new Subject<void>();

  validateForm: UntypedFormGroup = this.formBuilder.group({
    specialized: { minute: '*', hour: '*', day: '*', month: '*', week: '*' }
  });

  onChange: NzSafeAny = () => {};
  onTouch: () => void = () => null;

  writeValue(value: CronType): void {
    if (value) {
      const values = value.split(' ');
      const keys = Object.keys(this.validateForm.controls.specialized.value);
      const valueObject: CronType = {};
      keys.map((a, b) => {
        valueObject[a] = values[b];
      });
      this.validateForm.controls.specialized.patchValue(valueObject);
    }
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void {
    this.onTouch = fn;
  }

  validate(): Observable<{ error: boolean } | null> {
    if (this.validateForm.controls.specialized.valid) {
      return of(null);
    } else {
      return of({ error: true });
    }
  }

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('CronExpression');
      this.nzOptions = this.nzOptions.length
        ? this.nzOptions
        : [
            {
              label: this.locale.dropDownTextHour,
              value: '0 0-23/1 * * *'
            },
            {
              label: this.locale.dropDownTextNight,
              value: '0 18-23 * * *'
            },
            {
              label: this.locale.dropDownTextFriday,
              value: '0 0 * * 5'
            }
          ];
      this.cdr.markForCheck();
    });
    this.validateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.onChange(Object.values(item.specialized).join(' '));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
