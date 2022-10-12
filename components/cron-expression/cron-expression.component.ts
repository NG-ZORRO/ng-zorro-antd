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
import { CronSettings, CronType } from 'ng-zorro-antd/cron-expression/typings';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression',
  exportAs: 'nzCronExpression',
  template: `
    <div>
      <form nz-form [formGroup]="validateForm">
        <nz-cron-expression-specialized
          formControlName="specialized"
          [nzDefaultConfigure]="nzDefaultConfigure"
          [nzMoreDisable]="nzMoreDisable"
          [nzSize]="nzSize"
          [nzType]="nzType"
        ></nz-cron-expression-specialized>
      </form>
    </div>
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
  @Input() nzMoreDisable: boolean = false;
  @Input() nzSize: NzButtonSize = 'default';
  @Input() nzType: NzButtonType = 'default';
  @Input() nzDefaultConfigure: CronSettings = [];
  private destroy$ = new Subject<void>();

  validateForm: UntypedFormGroup = this.formBuilder.group({
    specialized: { minute: '*', hour: '*', day: '*', month: '*', week: '*' }
  });

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onChange: any = () => {};
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

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
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
      this.nzDefaultConfigure = this.nzDefaultConfigure.length
        ? this.nzDefaultConfigure
        : [
            {
              label: this.locale.cronMore1,
              value: '0 0-23/1 * * *'
            },
            {
              label: this.locale.cronMore2,
              value: '0 18-23 * * *'
            },
            {
              label: this.locale.cronMore3,
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
