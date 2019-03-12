import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormControlName, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NgClassType } from '../core/types/ng-class';
import { toBoolean } from '../core/util/convert';
import { NzColDirective } from '../grid/nz-col.directive';
import { NzRowDirective } from '../grid/nz-row.directive';
import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector           : 'nz-form-control',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  providers          : [ NzUpdateHostClassService ],
  templateUrl        : './nz-form-control.component.html',
  styles             : [
      `
      nz-form-control {
        display: block;
      }
    `
  ]
})
export class NzFormControlComponent extends NzColDirective implements OnDestroy, OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  private _hasFeedback = false;
  validateChanges: Subscription | null;
  validateString: string | null;
  controlClassMap: NgClassType = {};
  iconType: string;
  validateControl: FormControl | null;
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
  set nzValidateStatus(value: string | FormControl | FormControlName) {
    if (value instanceof FormControl) {
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
      this.validateChanges = this.validateControl.statusChanges.pipe(
        startWith(null)
      ).subscribe(() => {
        this.setControlClassMap();
        this.cdr.markForCheck();
      });
    }
  }

  validateControlStatus(status: string): boolean {
    return !!this.validateControl
      && (this.validateControl.dirty || this.validateControl.touched)
      && (this.validateControl.status === status);
  }

  setControlClassMap(): void {
    this.controlClassMap = {
      [ `has-warning` ]  : this.validateString === 'warning',
      [ `is-validating` ]: this.validateString === 'validating' || this.validateString === 'pending' || this.validateControlStatus('PENDING'),
      [ `has-error` ]    : this.validateString === 'error' || this.validateControlStatus('INVALID'),
      [ `has-success` ]  : this.validateString === 'success' || this.validateControlStatus('VALID'),
      [ `has-feedback` ] : this.nzHasFeedback
    };

    if (this.controlClassMap[ 'has-warning' ]) {
      this.iconType = 'exclamation-circle-fill';
    } else if (this.controlClassMap[ 'is-validating' ]) {
      this.iconType = 'loading';
    } else if (this.controlClassMap[ 'has-error' ]) {
      this.iconType = 'close-circle-fill';
    } else if (this.controlClassMap[ 'has-success' ]) {
      this.iconType = 'check-circle-fill';
    } else {
      this.iconType = '';
    }
  }

  constructor(nzUpdateHostClassService: NzUpdateHostClassService, elementRef: ElementRef, @Optional() @Host() nzFormItemComponent: NzFormItemComponent, @Optional() @Host() nzRowDirective: NzRowDirective, private cdr: ChangeDetectorRef, renderer: Renderer2) {
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
    if (this.defaultValidateControl && (!this.validateControl) && (!this.validateString)) {
      this.nzValidateStatus = this.defaultValidateControl;
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
