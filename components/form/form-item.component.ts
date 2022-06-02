/**
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
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BooleanInput, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { ColProperty } from 'ng-zorro-antd/grid';

import { NzFormControlComponent } from './form-control.component';
import { NzFormLabelComponent } from './form-label.component';
import { NzFormDirective } from './form.directive';
import { NzFormControlStatusType, NzFormLabelAlign, NzFormTooltipIcon } from './types';

const statusClasses = {
  success: 'has-success',
  warning: 'has-warning',
  error: 'has-error',
  validating: 'is-validating'
} as const;

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector: 'nz-form-item',
  exportAs: 'nzFormItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="simple; else contentTemplate">
      <nz-form-label
        *ngIf="nzLabel || nzTooltipTitle"
        [nzAlign]="nzLabelAlign"
        [nzFor]="nzFor"
        [nzRequired]="nzRequired"
        [nzNoColon]="nzNoColon"
        [nzTooltipTitle]="nzTooltipTitle"
        [nzTooltipIcon]="nzTooltipIcon"
        [nzColProperty]="labelCol"
      >
        <ng-container *nzStringTemplateOutlet="nzLabel">
          {{ nzLabel }}
        </ng-container>
      </nz-form-label>
      <nz-form-control
        [nzAutoTips]="nzAutoTips"
        [nzDisableAutoTips]="nzDisableAutoTips"
        [nzExtra]="nzExtra"
        [nzHasFeedback]="nzHasFeedback"
        [nzSuccessTip]="nzSuccessTip"
        [nzWarningTip]="nzWarningTip"
        [nzErrorTip]="nzErrorTip"
        [nzValidatingTip]="nzValidatingTip"
        [nzValidateStatus]="nzValidateStatus!"
        [nzColProperty]="controlCol"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </nz-form-control>
    </ng-container>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class NzFormItemComponent implements OnChanges, OnDestroy, AfterContentInit {
  static ngAcceptInputType_nzSimple: BooleanInput;
  static ngAcceptInputType_nzRequired: BooleanInput;
  static ngAcceptInputType_nzNoColon: BooleanInput;

  static ngAcceptInputType_nzHasFeedback: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  @Input() @InputBoolean() nzSimple?: boolean;

  // label props
  @Input() nzLabel?: string | TemplateRef<void>;
  @Input() nzLabelAlign?: NzFormLabelAlign;
  @Input() nzLabelCol?: string | number | ColProperty;
  @Input() nzFor?: string;
  @Input() @InputBoolean() nzRequired?: boolean;
  @Input() @InputBoolean() nzNoColon?: boolean;
  @Input() nzTooltipTitle?: NzTSType;
  @Input() nzTooltipIcon?: string | NzFormTooltipIcon;

  // control props
  @Input() nzControlCol?: string | number | ColProperty;
  @Input() nzAutoTips: Record<string, Record<string, string>> = {};
  @Input() @InputBoolean() nzDisableAutoTips?: boolean;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() @InputBoolean() nzHasFeedback?: boolean;

  @Input() nzSuccessTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzWarningTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzErrorTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzValidatingTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() nzValidateStatus?: string | AbstractControl | FormControlName | NgModel;

  @ContentChild(NzFormLabelComponent, { static: false }) nzFormLabelComponent?: NzFormLabelComponent;
  @ContentChild(NzFormControlComponent, { static: false }) nzFormControlComponent?: NzFormControlComponent;
  @ContentChild(NgControl, { static: false }) defaultValidateControl?: FormControlName | FormControlDirective;

  status: NzFormControlStatusType = null;
  hasFeedback = false;

  simple?: boolean;
  labelCol?: string | number | ColProperty;
  controlCol?: string | number | ColProperty;
  private destroy$ = new Subject();

  setWithHelpViaTips(value: boolean): void {
    const className = `ant-form-item-with-help`;
    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    }
  }

  setStatus(status: NzFormControlStatusType): void {
    this.status = status;
    this.setHasFeedbackClassName();
    Object.keys(statusClasses).forEach(key => {
      const className = `ant-form-item-${statusClasses[key as keyof typeof statusClasses]}`;
      if (status === key) {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      }
    });
  }

  setHasFeedback(hasFeedback: boolean): void {
    this.hasFeedback = hasFeedback;
    this.setHasFeedbackClassName();
  }

  private setHasFeedbackClassName(): void {
    const className = `ant-form-item-has-feedback`;
    if (this.status && this.hasFeedback) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    }
  }

  private subscribeFormInputObservable<K extends 'nzSimple' | 'nzLabelCol' | 'nzControlCol'>(
    key: K,
    cb: (value: Exclude<this[K], undefined>) => void
  ): void {
    this.nzFormDirective
      .getInputObservable(key)
      .pipe(
        filter(() => this[key] === undefined),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        cb(value.currentValue);
        this.cdr.markForCheck();
      });
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() @SkipSelf() private nzFormDirective: NzFormDirective
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-item');

    if (this.nzFormDirective) {
      this.subscribeFormInputObservable('nzSimple', value => (this.simple = toBoolean(value)));
      this.subscribeFormInputObservable('nzLabelCol', value => (this.labelCol = value));
      this.subscribeFormInputObservable('nzControlCol', value => (this.controlCol = value));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSimple, nzLabelCol, nzControlCol } = changes;
    if (nzSimple) {
      this.simple = nzSimple.currentValue;
    }
    if (nzLabelCol) {
      this.labelCol = nzLabelCol.currentValue;
    }
    if (nzControlCol) {
      this.controlCol = nzControlCol.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    if (!this.nzValidateStatus) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.nzValidateStatus = this.defaultValidateControl.control;
      } else {
        this.nzValidateStatus = this.defaultValidateControl;
      }
    }
    this.cdr.markForCheck();
  }
}
