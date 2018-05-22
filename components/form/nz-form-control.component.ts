import { AfterContentInit, Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzColComponent } from '../grid/nz-col.component';

@Component({
  selector           : 'nz-form-control',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  template           : `
    <div class="ant-form-item-control" [ngClass]="controlClassMap">
      <span class="ant-form-item-children">
        <ng-content></ng-content>
      </span>
      <ng-content select="nz-form-explain"></ng-content>
    </div>
  `,
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
    if (this.validateControl.dirty) {
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
