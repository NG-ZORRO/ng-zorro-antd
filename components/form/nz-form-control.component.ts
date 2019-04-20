/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormControlName, NgControl, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { toBoolean, NgClassType, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector: 'nz-form-control',
  exportAs: 'nzFormControl',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzUpdateHostClassService],
  templateUrl: './nz-form-control.component.html',
  styles: [
    `
      nz-form-control {
        display: block;
      }
    `
  ]
})
export class NzFormControlComponent extends NzColDirective
  implements OnDestroy, OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  private _hasFeedback = false;
  validateChanges: Subscription | null;
  validateString: string | null;
  status: 'warning' | 'validating' | 'error' | 'success' | 'init';
  controlClassMap: NgClassType = {};
  iconType: string;
  validateControl: FormControl | NgModel | null;
  @ContentChild(NgControl) defaultValidateControl: FormControlName;

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
    this.setControlClassMap();
  }

  get nzHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set nzValidateStatus(value: string | FormControl | FormControlName | NgModel) {
    if (value instanceof FormControl || value instanceof NgModel) {
      this.validateControl = value;
      this.validateString = null;
      this.watchControl();
    } else if (value instanceof FormControlName) {
      this.validateControl = value.control;
      this.validateString = null;
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.setControlClassMap();
    }
  }

  removeSubscribe(): void {
    if (this.validateChanges) {
      this.validateChanges.unsubscribe();
      this.validateChanges = null;
    }
  }

  watchControl(): void {
    this.removeSubscribe();
    /** miss detect https://github.com/angular/angular/issues/10887 **/
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null)).subscribe(() => {
        this.setControlClassMap();
        this.cdr.markForCheck();
      });
    }
  }

  validateControlStatus(status: string): boolean {
    return (!!this.validateControl &&
      (this.validateControl.dirty || this.validateControl.touched) &&
      this.validateControl.status === status) as boolean;
  }

  setControlClassMap(): void {
    if (this.validateString === 'warning') {
      this.status = 'warning';
      this.iconType = 'exclamation-circle-fill';
    } else if (
      this.validateString === 'validating' ||
      this.validateString === 'pending' ||
      this.validateControlStatus('PENDING')
    ) {
      this.status = 'validating';
      this.iconType = 'loading';
    } else if (this.validateString === 'error' || this.validateControlStatus('INVALID')) {
      this.status = 'error';
      this.iconType = 'close-circle-fill';
    } else if (this.validateString === 'success' || this.validateControlStatus('VALID')) {
      this.status = 'success';
      this.iconType = 'check-circle-fill';
    } else {
      this.status = 'init';
      this.iconType = '';
    }
    this.controlClassMap = {
      [`has-warning`]: this.status === 'warning',
      [`is-validating`]: this.status === 'validating',
      [`has-error`]: this.status === 'error',
      [`has-success`]: this.status === 'success',
      [`has-feedback`]: this.nzHasFeedback
    };
  }

  constructor(
    nzUpdateHostClassService: NzUpdateHostClassService,
    elementRef: ElementRef,
    @Optional() @Host() nzFormItemComponent: NzFormItemComponent,
    @Optional() @Host() nzRowDirective: NzRowDirective,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2
  ) {
    super(nzUpdateHostClassService, elementRef, nzFormItemComponent || nzRowDirective, renderer);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-control-wrapper');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setControlClassMap();
  }

  ngOnDestroy(): void {
    this.removeSubscribe();
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {
    if (this.defaultValidateControl && !this.validateControl && !this.validateString) {
      this.nzValidateStatus = this.defaultValidateControl;
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
