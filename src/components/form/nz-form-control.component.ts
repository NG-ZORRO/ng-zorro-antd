import { Component, ContentChild, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector: '[nz-form-control]',
  template: `
    <div class="ant-form-item-control"
      [class.has-warning]="isWarning"
      [class.has-error]="isError"
      [class.has-success]="isSuccess"
      [class.has-feedback]="hasFeedBack"
      [class.is-validating]="isValidate">
      <ng-content></ng-content>
    </div>
  `,
  styles  : [],
  host    : {
    '[class.ant-form-item-control-wrapper]': 'true'
  }
})
export class NzFormControlComponent {
  private _hasFeedback = false;
  private _validateStatus: string | NgControl;
  @ContentChild(NgControl) ngControl: NgControl;

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
  }

  get nzHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set nzValidateStatus(value: string | NgControl) {
    this._validateStatus = value;
  }

  get nzValidateStatus(): string | NgControl {
    return this._validateStatus || this.ngControl;
  }

  get isWarning(): boolean {
    return this.nzValidateStatus === 'warning' || this.nzValidateStatus && (this.nzValidateStatus as NgControl).dirty && (this.nzValidateStatus as NgControl).hasError && (this.nzValidateStatus as NgControl).hasError('warning');
  }

  get isValidate(): boolean {
    return this.nzValidateStatus === 'validating' || this.nzValidateStatus === 'pending' || this.nzValidateStatus && (this.nzValidateStatus as NgControl).dirty && (this.nzValidateStatus as NgControl).pending;
  }

  get isError(): boolean {
    return this.nzValidateStatus === 'error' || this.nzValidateStatus && (this.nzValidateStatus as NgControl).dirty && (this.nzValidateStatus as NgControl).errors && (this.nzValidateStatus as NgControl).hasError && !(this.nzValidateStatus as NgControl).hasError('warning');
  }

  get isSuccess(): boolean {
    return this.nzValidateStatus === 'success' || this.nzValidateStatus && (this.nzValidateStatus as NgControl).dirty && (this.nzValidateStatus as NgControl).valid;
  }

  get hasFeedBack(): boolean {
    return this.nzHasFeedback;
  }
}
