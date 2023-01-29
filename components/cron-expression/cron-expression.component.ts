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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  AsyncValidator,
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

import { CronExpression, parseExpression } from 'cron-parser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { CronChangeType, CronType, NzCronExpressionSize, TimeType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression',
  exportAs: 'nzCronExpression',
  template: `
    <div class="ant-cron-expression">
      <div class="ant-cron-expression-content">
        <div
          class="ant-input ant-cron-expression-input-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-input-sm]="nzSize === 'small'"
          [class.ant-cron-expression-input-group-focus]="focus"
          [class.ant-cron-expression-input-group-error]="!validateForm.valid"
          [class.ant-cron-expression-input-group-error-focus]="!validateForm.valid && focus"
        >
          <ng-container *ngFor="let label of labels">
            <nz-cron-expression-input
              [value]="this.validateForm.controls[label].value"
              [label]="label"
              (focusEffect)="focusEffect($event)"
              (blurEffect)="blurEffect()"
              (getValue)="getValue($event)"
            ></nz-cron-expression-input>
          </ng-container>
        </div>
        <div
          class="ant-cron-expression-label-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-cron-expression-label-group-default]="nzSize === 'default'"
          [class.ant-input-sm]="nzSize === 'small'"
        >
          <ng-container *ngFor="let label of labels">
            <nz-cron-expression-label
              [type]="label"
              [valid]="this.validateForm.controls[label].valid"
              [labelFocus]="labelFocus"
              [locale]="locale"
            ></nz-cron-expression-label>
          </ng-container>
        </div>
        <nz-cron-expression-preview
          *ngIf="!nzCollapseDisable"
          [TimeList]="nextTimeList"
          [visible]="validateForm.valid"
          [locale]="locale"
          [nzSemantic]="nzSemantic"
          (loadMorePreview)="loadMorePreview()"
        ></nz-cron-expression-preview>
      </div>
      <div class="ant-cron-expression-map" *ngIf="nzExtra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </div>
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
export class NzCronExpressionComponent implements OnInit, ControlValueAccessor, AsyncValidator, OnDestroy {
  @Input() nzSize: NzCronExpressionSize = 'default';
  @Input() nzType: 'linux' | 'spring' = 'linux';
  @Input() @InputBoolean() nzCollapseDisable: boolean = false;
  @Input() nzExtra?: TemplateRef<void> | null = null;
  @Input() nzSemantic: TemplateRef<void> | null = null;

  locale!: NzCronExpressionI18nInterface;
  focus: boolean = false;
  labelFocus: TimeType | null = null;
  validLabel: string | null = null;
  labels: TimeType[] = [];
  interval!: CronExpression<false>;
  nextTimeList: Date[] = [];
  private destroy$ = new Subject<void>();

  validateForm!: UntypedFormGroup;

  onChange: NzSafeAny = () => {};
  onTouch: () => void = () => null;

  convertFormat(value: string): void {
    const values = value.split(' ');
    const valueObject: CronType = {};
    this.labels.map((a, b) => {
      valueObject[a] = values[b];
    });
    this.validateForm.patchValue(valueObject);
  }

  writeValue(value: string | null): void {
    if (value) {
      this.convertFormat(value);
    }
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void {
    this.onTouch = fn;
  }

  validate(): Observable<ValidationErrors | null> {
    if (this.validateForm.valid) {
      return of(null);
    } else {
      return of({ error: true });
    }
  }

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  ngOnInit(): void {
    if (this.nzType === 'spring') {
      this.labels = ['second', 'minute', 'hour', 'day', 'month', 'week'];
      this.validateForm = this.formBuilder.group({
        second: ['0', Validators.required, this.checkValid],
        minute: ['*', Validators.required, this.checkValid],
        hour: ['*', Validators.required, this.checkValid],
        day: ['*', Validators.required, this.checkValid],
        month: ['*', Validators.required, this.checkValid],
        week: ['*', Validators.required, this.checkValid]
      });
    } else {
      this.labels = ['minute', 'hour', 'day', 'month', 'week'];
      this.validateForm = this.formBuilder.group({
        minute: ['*', Validators.required, this.checkValid],
        hour: ['*', Validators.required, this.checkValid],
        day: ['*', Validators.required, this.checkValid],
        month: ['*', Validators.required, this.checkValid],
        week: ['*', Validators.required, this.checkValid]
      });
    }
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('CronExpression');
      this.cdr.markForCheck();
    });

    this.previewDate(this.validateForm.value);

    this.validateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(Object.values(value).join(' '));
      this.previewDate(value);
      this.cdr.markForCheck();
    });
  }

  previewDate(value: CronType): void {
    try {
      this.interval = parseExpression(Object.values(value).join(' '));
      this.nextTimeList = [
        this.interval.next().toDate(),
        this.interval.next().toDate(),
        this.interval.next().toDate(),
        this.interval.next().toDate(),
        this.interval.next().toDate()
      ];
    } catch (err: NzSafeAny) {
      return;
    }
  }

  loadMorePreview(): void {
    this.nextTimeList = [
      ...this.nextTimeList,
      this.interval.next().toDate(),
      this.interval.next().toDate(),
      this.interval.next().toDate(),
      this.interval.next().toDate(),
      this.interval.next().toDate()
    ];
    this.cdr.markForCheck();
  }

  focusEffect(value: TimeType): void {
    this.focus = true;
    this.labelFocus = value;
    this.cdr.markForCheck();
  }

  blurEffect(): void {
    this.focus = false;
    this.labelFocus = null;
    this.cdr.markForCheck();
  }

  getValue(item: CronChangeType): void {
    this.validLabel = item.label;
    this.validateForm.controls[item.label].patchValue(item.value);
    this.cdr.markForCheck();
  }

  checkValid = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value) {
      try {
        const cron: string[] = [];
        this.labels.forEach(label => {
          label === this.validLabel ? cron.push(control.value) : cron.push('*');
        });
        parseExpression(cron.join(' '));
      } catch (err: unknown) {
        return of({ error: true });
      }
    }
    return of(null);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
