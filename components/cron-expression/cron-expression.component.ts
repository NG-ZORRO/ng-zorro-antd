/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CronExpression, parseExpression } from 'cron-parser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCronExpressionI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { NzCronExpressionInputComponent } from './cron-expression-input.component';
import { NzCronExpressionLabelComponent } from './cron-expression-label.component';
import { NzCronExpressionPreviewComponent } from './cron-expression-preview.component';
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
          @for (label of labels; track label) {
            <nz-cron-expression-input
              [value]="this.validateForm.controls[label].value"
              [label]="label"
              [disabled]="nzDisabled"
              (focusEffect)="focusEffect($event)"
              (blurEffect)="blurEffect()"
              (getValue)="getValue($event)"
            />
          }
        </div>
        <div
          class="ant-cron-expression-label-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-cron-expression-label-group-default]="nzSize === 'default'"
          [class.ant-input-sm]="nzSize === 'small'"
        >
          @for (label of labels; track label) {
            <nz-cron-expression-label [type]="label" [labelFocus]="labelFocus" [locale]="locale" />
          }
        </div>
        @if (!nzCollapseDisable) {
          <nz-cron-expression-preview
            [TimeList]="nextTimeList"
            [visible]="validateForm.valid"
            [locale]="locale"
            [nzSemantic]="nzSemantic"
            (loadMorePreview)="loadMorePreview()"
          />
        }
      </div>
      @if (nzExtra) {
        <div class="ant-cron-expression-map">
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </div>
      }
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
  ],
  imports: [
    NzCronExpressionInputComponent,
    NzCronExpressionLabelComponent,
    NzCronExpressionPreviewComponent,
    NgTemplateOutlet
  ]
})
export class NzCronExpressionComponent implements OnInit, OnChanges, ControlValueAccessor, AsyncValidator {
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(NzI18nService);
  private destroyRef = inject(DestroyRef);

  @Input() nzSize: NzCronExpressionSize = 'default';
  @Input() nzType: NzCronExpressionType = 'linux';
  @Input({ transform: booleanAttribute }) nzCollapseDisable: boolean = false;
  @Input() nzExtra?: TemplateRef<void> | null = null;
  @Input() nzSemantic: TemplateRef<void> | null = null;
  @Input({ transform: booleanAttribute }) nzBorderless = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;

  locale!: NzCronExpressionI18nInterface;
  focus: boolean = false;
  labelFocus: TimeType | null = null;
  labels: TimeType[] = labelsOfType(this.nzType);
  interval!: CronExpression<false>;
  nextTimeList: Date[] = [];
  private isNzDisableFirstChange: boolean = true;

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

  constructor() {
    this.validateForm = this.formBuilder.nonNullable.group(
      {
        second: ['0', Validators.required],
        minute: ['*', Validators.required],
        hour: ['*', Validators.required],
        day: ['*', Validators.required],
        month: ['*', Validators.required],
        week: ['*', Validators.required]
      },
      { validators: this.checkValid }
    );
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('CronExpression');
      this.cdr.markForCheck();
    });
    this.cronFormType();
    this.previewDate(this.validateForm.value);

    this.validateForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.onChange(Object.values(value).join(' '));
      this.previewDate(value);
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzType } = changes;

    if (nzType) {
      this.labels = labelsOfType(this.nzType);
      this.cronFormType();
    }
  }

  cronFormType(): void {
    if (this.nzType === 'spring') {
      this.validateForm.controls.second.enable();
    } else {
      this.validateForm.controls.second.disable();
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
    } catch {
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
    this.validateForm.controls[item.label].patchValue(item.value);
    this.cdr.markForCheck();
  }

  checkValid: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      try {
        const cron: string[] = [];
        this.labels.forEach(label => cron.push(control.value[label]));
        parseExpression(cron.join(' '));
      } catch {
        return { error: true };
      }
    }
    return null;
  };
}
