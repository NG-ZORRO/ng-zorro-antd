/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CronExpression, parseExpression } from 'cron-parser';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { Cron, CronChangeType, CronValue, NzCronExpressionSize, NzCronExpressionType, TimeType } from './typings';

function labelsOfType(type: NzCronExpressionType): TimeType[] {
  if (type === 'spring') {
    return ['second', 'minute', 'hour', 'day', 'month', 'week'];
  }
  return ['minute', 'hour', 'day', 'month', 'week'];
}

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
          [class.ant-input-borderless]="nzBorderless"
          [class.ant-cron-expression-input-group-focus]="focus && !nzBorderless"
          [class.ant-input-status-error]="!validateForm.valid && !nzBorderless"
          [class.ant-cron-expression-input-group-error-focus]="!validateForm.valid && focus && !nzBorderless"
          [class.ant-input-disabled]="nzDisabled"
        >
          <ng-container *ngFor="let label of labels">
            <nz-cron-expression-input
              [value]="this.validateForm.controls[label].value"
              [label]="label"
              [disabled]="nzDisabled"
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
    },
    NzDestroyService
  ]
})
export class NzCronExpressionComponent implements OnInit, OnChanges, ControlValueAccessor, AsyncValidator {
  static ngAcceptInputType_nzBorderless: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzSize: NzCronExpressionSize = 'default';
  @Input() nzType: NzCronExpressionType = 'linux';
  @Input() @InputBoolean() nzCollapseDisable: boolean = false;
  @Input() nzExtra?: TemplateRef<void> | null = null;
  @Input() nzSemantic: TemplateRef<void> | null = null;
  @Input() @InputBoolean() nzBorderless = false;
  @Input() @InputBoolean() nzDisabled = false;

  locale!: NzCronExpressionI18nInterface;
  focus: boolean = false;
  labelFocus: TimeType | null = null;
  validLabel: string | null = null;
  labels: TimeType[] = labelsOfType(this.nzType);
  interval!: CronExpression<false>;
  nextTimeList: Date[] = [];
  private isNzDisableFirstChange: boolean = true;
  private destroy$ = inject(NzDestroyService);

  validateForm: FormGroup<Record<TimeType, FormControl<CronValue>>>;

  onChange: NzSafeAny = () => {};
  onTouch: () => void = () => null;

  convertFormat(value: string): void {
    const values = value.split(' ');
    const valueObject = this.labels.reduce((obj, label, idx) => {
      obj[label] = values[idx];
      return obj;
    }, {} as Cron);
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

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService
  ) {
    this.validateForm = this.formBuilder.nonNullable.group({
      second: ['0', Validators.required, this.checkValid],
      minute: ['*', Validators.required, this.checkValid],
      hour: ['*', Validators.required, this.checkValid],
      day: ['*', Validators.required, this.checkValid],
      month: ['*', Validators.required, this.checkValid],
      week: ['*', Validators.required, this.checkValid]
    });
  }

  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    const { nzType } = changes;

    if (nzType) {
      this.labels = labelsOfType(this.nzType);

      if (this.nzType === 'spring') {
        this.validateForm.controls.second.enable();
      } else {
        this.validateForm.controls.second.disable();
      }
    }
  }

  previewDate(value: Cron): void {
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

  checkValid: AsyncValidatorFn = (control: AbstractControl) => {
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
}
