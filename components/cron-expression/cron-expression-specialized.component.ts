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

import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { CronSettings, CronType } from 'ng-zorro-antd/cron-expression/typings';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

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
            >
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="minute" id="minute" name="minute" />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="hour" id="hour" name="hour" />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="day" id="day" name="day" />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="month" id="month" name="month" />
              </div>
              <div class="ant-cron-expression-input">
                <input nz-input formControlName="week" id="week" name="week" />
              </div>
            </div>
            <div class="ant-cron-expression-label-group">
              <div
                [className]="!validateForm.controls.minute.valid ? 'ant-cron-expression-error' : null"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="minute"
                [nzTooltipVisible]="true && !validateForm.controls.minute.valid"
              >
                <label for="minute">{{ locale.minute }}</label>
              </div>
              <div
                [className]="!validateForm.controls.hour.valid ? 'ant-cron-expression-error' : null"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="hour"
                [nzTooltipVisible]="true && !validateForm.controls.hour.valid"
              >
                <label for="hour">{{ locale.hour }}</label>
              </div>
              <div
                [className]="!validateForm.controls.day.valid ? 'ant-cron-expression-error' : null"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="day"
                [nzTooltipVisible]="true && !validateForm.controls.day.valid"
              >
                <label for="day">{{ locale.day }}</label>
              </div>
              <div
                [className]="!validateForm.controls.month.valid ? 'ant-cron-expression-error' : null"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="month"
                [nzTooltipVisible]="true && !validateForm.controls.month.valid"
              >
                <label for="month">{{ locale.month }}</label>
              </div>
              <div
                [className]="!validateForm.controls.week.valid ? 'ant-cron-expression-error' : null"
                nz-tooltip
                nzTooltipPlacement="bottom"
                [nzTooltipTitle]="week"
                [nzTooltipVisible]="true && !validateForm.controls.week.valid"
              >
                <label for="week">{{ locale.week }}</label>
              </div>
            </div>
            <nz-collapse [nzBordered]="false">
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
          <button
            *ngIf="!nzMoreDisable"
            class="ant-cron-expression-more-setting"
            nz-button
            nz-dropdown
            [nzSize]="nzSize"
            [nzType]="nzType"
            [nzDropdownMenu]="menu"
            nzPlacement="bottomCenter"
          >
            {{ locale.moreSetting }}
            <span nz-icon nzType="down" nzTheme="outline"></span>
          </button>
        </div>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu>
            <li *ngFor="let item of nzDefaultConfigure" nz-menu-item (click)="quickSetting(item.value)">
              {{ item.label }}
            </li>
          </ul>
        </nz-dropdown-menu>
      </form>

      <ng-template #nextDate>
        <ng-container *ngIf="validateForm.valid">
          {{ dateTime | date: 'YYYY-MM-dd HH:mm:ss' }}
        </ng-container>
        <ng-container *ngIf="!validateForm.valid">{{ locale.cronError }}</ng-container>
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
  locale!: NzCronExpressionI18nInterface;
  @Input() nzSize: NzButtonSize = 'default';
  @Input() nzType: NzButtonType = 'default';
  @Input() nzDefaultConfigure: CronSettings = [];
  @Input() nzMoreDisable: boolean = false;

  private destroy$ = new Subject<void>();

  nextTimeList: Date[] = [];
  dateTime: Date = new Date();

  minute = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`${control.value} * * * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  hour = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* ${control.value} * * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  day = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * ${control.value} * *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  month = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * * ${control.value} *`);
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  week = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        parseExpression(`* * * * ${control.value}`);
      } catch (err: unknown) {
        return of({ error: true });
      }
      return of(null);
    } else {
      return of({ error: true });
    }
  };

  validateForm: UntypedFormGroup = this.formBuilder.group({
    minute: ['*', Validators.required, this.minute],
    hour: ['*', Validators.required, this.hour],
    day: ['*', Validators.required, this.day],
    month: ['*', Validators.required, this.month],
    week: ['?', Validators.required, this.week]
  });

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onChange: any = () => {};
  onTouch: () => void = () => null;

  writeValue(value: CronType): void {
    this.validateForm.patchValue(value);
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
    if (!this.validateForm.valid) {
      return of({ error: true });
    }
    return of(null);
  }

  ngOnInit(): void {
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
      } catch (err: unknown) {
        return;
      }
    });
  }

  quickSetting(value: string): void {
    const values = value.split(' ');
    const keys = Object.keys(this.validateForm.value);
    const valueObject: CronType = {};
    keys.map((a, b) => {
      valueObject[a] = values[b];
    });
    this.validateForm.patchValue(valueObject);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
