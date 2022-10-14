/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCronExpressionI18nInterface } from 'ng-zorro-antd/i18n';

import { CronType, NzCronExpressionSize } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression',
  exportAs: 'nzCronExpression',
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-cron-expression-specialized
        formControlName="specialized"
        [nzSize]="nzSize"
        [nzCronType]="nzCronType"
        [nzCollapseDisable]="nzCollapseDisable"
      >
        <ng-content></ng-content>
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
export class NzCronExpressionComponent implements OnInit, OnChanges, OnDestroy {
  locale!: NzCronExpressionI18nInterface;
  @Input() defaults: string | null = null;
  @Input() nzSize: NzCronExpressionSize = 'default';
  @Input() nzCronType: 'linux' | 'spring' = 'linux';
  @Input() nzCollapseDisable: boolean = false;
  private destroy$ = new Subject<void>();

  validateForm!: UntypedFormGroup;

  onChange: NzSafeAny = () => {};
  onTouch: () => void = () => null;

  convertFormat(value: string): CronType {
    const values = value.split(' ');
    const keys = Object.keys(this.validateForm.controls.specialized.value);
    const valueObject: CronType = {};
    keys.map((a, b) => {
      valueObject[a] = values[b];
    });
    return valueObject;
  }

  writeValue(value: string | null): void {
    if (value) {
      this.validateForm.controls.specialized.patchValue(this.convertFormat(value));
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

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    if (this.nzCronType === 'spring') {
      this.validateForm = this.formBuilder.group({
        specialized: { second: '0', minute: '*', hour: '*', day: '*', month: '*', week: '*' }
      });
    } else {
      this.validateForm = this.formBuilder.group({
        specialized: { minute: '*', hour: '*', day: '*', month: '*', week: '*' }
      });
    }

    this.validateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.onChange(Object.values(item.specialized).join(' '));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { defaults } = changes;
    if (defaults && this.defaults) {
      this.validateForm.controls.specialized.patchValue(this.convertFormat(this.defaults));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
