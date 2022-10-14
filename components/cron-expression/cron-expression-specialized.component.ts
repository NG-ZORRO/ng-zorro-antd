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
import {
  ControlValueAccessor,
  FormControl,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { parseExpression } from 'cron-parser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { CronType, NzCronExpressionSize } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-specialized',
  exportAs: 'nzCronExpressionSpecialized',
  template: `
    <div class="ant-cron-expression">
      <form nz-form [nzLayout]="'inline'" [formGroup]="validateForm">
        <div class="ant-cron-expression-box">
          <div class="ant-cron-expression-content">
            <div
              class="ant-cron-expression-input-group"
              [class.ant-cron-expression-input-group-lg]="nzSize === 'large'"
              [class.ant-cron-expression-input-group-sm]="nzSize === 'small'"
              [class.ant-cron-expression-input-group-focus]="focus"
            >
              <div class="ant-cron-expression-input" *ngIf="nzCronType === 'spring'">
                <input
                  nz-input
                  formControlName="second"
                  name="minute"
                  (focus)="focusColor('second')"
                  (blur)="blurColor()"
                />
              </div>
              <div class="ant-cron-expression-input">
                <input
                  nz-input
                  formControlName="minute"
                  name="minute"
                  (focus)="focusColor('minute')"
                  (blur)="blurColor()"
                />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="hour" name="hour" (focus)="focusColor('hour')" (blur)="blurColor()" />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="day" name="day" (focus)="focusColor('day')" (blur)="blurColor()" />
              </div>
              <div class="ant-cron-expression-input">
                <input
                  nz-input
                  formControlName="month"
                  name="month"
                  (focus)="focusColor('month')"
                  (blur)="blurColor()"
                />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="week" name="week" (focus)="focusColor('week')" (blur)="blurColor()" />
              </div>
            </div>
            <div class="ant-cron-expression-label-group">
              <div
                *ngIf="nzCronType === 'spring'"
                [class.ant-cron-expression-label-foucs]="labelFocus === 'second'"
                [class.ant-cron-expression-error]="!validateForm.controls.second.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="second"
                [nzTooltipVisible]="!validateForm.controls.second.valid"
              >
                <label>{{ locale.second }}</label>
              </div>
              <div
                [class.ant-cron-expression-label-foucs]="labelFocus === 'minute'"
                [class.ant-cron-expression-error]="!validateForm.controls.minute.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="minute"
                [nzTooltipVisible]="!validateForm.controls.minute.valid"
              >
                <label>{{ locale.minute }}</label>
              </div>
              <div
                [class.ant-cron-expression-label-foucs]="labelFocus === 'hour'"
                [class.ant-cron-expression-error]="!validateForm.controls.hour.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="hour"
                [nzTooltipVisible]="!validateForm.controls.hour.valid"
              >
                <label>{{ locale.hour }}</label>
              </div>
              <div
                [class.ant-cron-expression-label-foucs]="labelFocus === 'day'"
                [class.ant-cron-expression-error]="!validateForm.controls.day.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="day"
                [nzTooltipVisible]="!validateForm.controls.day.valid"
              >
                <label>{{ locale.day }}</label>
              </div>
              <div
                [class.ant-cron-expression-label-foucs]="labelFocus === 'month'"
                [class.ant-cron-expression-error]="!validateForm.controls.month.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="month"
                [nzTooltipVisible]="!validateForm.controls.month.valid"
              >
                <label>{{ locale.month }}</label>
              </div>
              <div
                [class.ant-cron-expression-label-foucs]="labelFocus === 'week'"
                [class.ant-cron-expression-error]="!validateForm.controls.week.valid"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="week"
                [nzTooltipVisible]="!validateForm.controls.week.valid"
              >
                <label>{{ locale.week }}</label>
              </div>
            </div>
            <nz-collapse *ngIf="!nzCollapseDisable" [nzBordered]="false">
              <nz-collapse-panel [nzHeader]="nextDate">
                <ng-container *ngIf="validateForm.valid">
                  <p style="margin: 0" *ngFor="let dateItem of nextTimeList">
                    {{ dateItem | date: 'YYYY-MM-dd HH:mm:ss' }}
                  </p>
                </ng-container>
                <ng-container *ngIf="!validateForm.valid">{{ locale.cronError }}</ng-container>
              </nz-collapse-panel>
            </nz-collapse>
          </div>
          <div class="ant-cron-expression-map">
            <ng-content></ng-content>
          </div>
        </div>
      </form>

      <ng-template #nextDate>
        <ng-container *ngIf="validateForm.valid">
          {{ dateTime | date: 'YYYY-MM-dd HH:mm:ss' }}
        </ng-container>
        <ng-container *ngIf="!validateForm.valid">{{ locale.cronError }}</ng-container>
      </ng-template>

      <ng-template #second>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.secondError"></div>
      </ng-template>

      <ng-template #minute>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.minuteError"></div>
      </ng-template>

      <ng-template #hour>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.hourError"></div>
      </ng-template>

      <ng-template #day>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.dayError"></div>
      </ng-template>

      <ng-template #month>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.monthError"></div>
      </ng-template>

      <ng-template #week>
        <div class="ant-cron-expression-hint" [innerHTML]="locale.weekError"></div>
      </ng-template>
    </div>
  `,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NzCronExpressionSpecializedComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCronExpressionSpecializedComponent),
      multi: true
    }
  ]
})
export class NzCronExpressionSpecializedComponent implements OnInit, ControlValueAccessor, OnDestroy {
  validateForm!: UntypedFormGroup;
  locale!: NzCronExpressionI18nInterface;
  focus: boolean = false;
  labelFocus: string | null = null;

  @Input() nzSize: NzCronExpressionSize = 'default';
  @Input() nzCronType: 'linux' | 'spring' = 'linux';
  @Input() nzCollapseDisable: boolean = false;

  private destroy$ = new Subject<void>();

  nextTimeList: Date[] = [];
  dateTime: Date = new Date();

  second = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`${control.value} * * * * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  minute = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* ${control.value} * * * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  hour = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * ${control.value} * * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  day = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * * ${control.value} * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  month = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * * * ${control.value} *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  week = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * * * * ${control.value}`);
      } catch (err: unknown) {
        return of({ error: true });
      }
      return of(null);
    } else {
      return of({ error: true });
    }
  };

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  onChange: NzSafeAny = () => {};
  onTouch: () => void = () => null;

  writeValue(value: CronType): void {
    this.validateForm.patchValue(value);
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void {
    this.onTouch = fn;
  }

  validate(): Observable<{ error: boolean } | null> {
    if (!this.validateForm.valid) {
      return of({ error: true });
    }
    return of(null);
  }

  ngOnInit(): void {
    if (this.nzCronType === 'spring') {
      this.validateForm = this.formBuilder.group({
        second: ['0', Validators.required, this.second],
        minute: ['*', Validators.required, this.minute],
        hour: ['*', Validators.required, this.hour],
        day: ['*', Validators.required, this.day],
        month: ['*', Validators.required, this.month],
        week: ['?', Validators.required, this.week]
      });
    } else {
      this.validateForm = this.formBuilder.group({
        minute: ['*', Validators.required, this.minute],
        hour: ['*', Validators.required, this.hour],
        day: ['*', Validators.required, this.day],
        month: ['*', Validators.required, this.month],
        week: ['?', Validators.required, this.week]
      });
    }

    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('CronExpression');
      this.cdr.markForCheck();
    });
    this.validateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.onChange(item);
      try {
        const interval = parseExpression(Object.values(item).join(' '));
        this.dateTime = new Date(interval.next().toString());
        this.nextTimeList = [
          new Date(interval.next().toString()),
          new Date(interval.next().toString()),
          new Date(interval.next().toString()),
          new Date(interval.next().toString()),
          new Date(interval.next().toString())
        ];
      } catch (err: NzSafeAny) {
        return;
      }
    });
  }

  focusColor(value: string): void {
    this.focus = true;
    this.labelFocus = value;
    this.cdr.markForCheck();
  }

  blurColor(): void {
    this.focus = false;
    this.labelFocus = null;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
