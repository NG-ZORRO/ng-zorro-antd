import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2 } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzColComponent } from '../grid/nz-col.component';
import { NzRowComponent } from '../grid/nz-row.component';
import { NzRowDirective } from '../grid/nz-row.directive';

@Component({
  selector           : 'nz-form-control',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  templateUrl        : './nz-form-control.component.html',
  host               : {
    '[class.ant-form-item-control-wrapper]': 'true'
  },
  styles             : [ `:host {
    display: block;
  }` ]
})
export class NzFormControlComponent extends NzColComponent implements OnDestroy, OnInit, AfterContentInit {
  private _hasFeedback = false;
  validateChanges: Subscription;
  validateString: string;
  controlStatus: string;
  controlClassMap;
  iconType: string;
  @ContentChild(NgControl) validateControl: FormControl;

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
    this.setControlClassMap();
  }

  get nzHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set nzValidateStatus(value: string | FormControl) {
    if (value instanceof FormControl) {
      this.validateControl = value;
      this.validateString = null;
      this.controlStatus = null;
      this.setControlClassMap();
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.removeSubscribe();
      this.setControlClassMap();
    }
  }

  removeSubscribe(): void {
    if (this.validateChanges) {
      this.validateChanges.unsubscribe();
      this.validateChanges = null;
    }
  }

  updateValidateStatus(status: string): void {
    if (this.validateControl.dirty || this.validateControl.touched) {
      this.controlStatus = status;
      this.setControlClassMap();
    } else {
      this.controlStatus = null;
      this.setControlClassMap();
    }
  }

  watchControl(): void {
    this.removeSubscribe();
    /** miss detect https://github.com/angular/angular/issues/10887 **/
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = this.validateControl.statusChanges.subscribe(data => this.updateValidateStatus(data));
    }

  }

  setControlClassMap(): void {
    this.controlClassMap = {
      [ `has-warning` ]  : this.validateString === 'warning',
      [ `is-validating` ]: this.validateString === 'validating' || this.validateString === 'pending' || this.controlStatus === 'PENDING',
      [ `has-error` ]    : this.validateString === 'error' || this.controlStatus === 'INVALID',
      [ `has-success` ]  : this.validateString === 'success' || this.controlStatus === 'VALID',
      [ `has-feedback` ] : this.nzHasFeedback
    };

    if (this.controlClassMap[ 'has-warning' ]) {
      this.iconType = 'exclamation-circle-fill';
    } else if (this.controlClassMap[ 'is-validating' ]) {
      this.iconType = 'loading';
    } else if (this.controlClassMap['has-error']) {
      this.iconType = 'close-circle-fill';
    } else if (this.controlClassMap['has-success']) {
      this.iconType = 'check-circle-fill';
    } else {
      this.iconType = '';
    }
  }

  constructor(nzUpdateHostClassService: NzUpdateHostClassService, elementRef: ElementRef, @Optional() @Host() nzRowComponent: NzRowComponent, @Optional() @Host() nzRowDirective: NzRowDirective, renderer: Renderer2) {
    super(nzUpdateHostClassService, elementRef, nzRowComponent, nzRowDirective, renderer);
  }

  ngOnInit(): void {
    this.setClassMap();
    this.setControlClassMap();
  }

  ngOnDestroy(): void {
    this.removeSubscribe();
  }

  ngAfterContentInit(): void {
    this.watchControl();
    if (this.validateControl) {
      this.updateValidateStatus(this.validateControl.status);
    }
  }
}
