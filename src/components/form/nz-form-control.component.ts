import { Component, HostBinding, Input } from '@angular/core';
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
  host: {
    '[class.ant-form-item-control-wrapper]': 'true'
  }
})
export class NzFormControlComponent {
  private _hasFeedback = false;

  @Input()
  set nzHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
  }

  get nzHasFeedback() {
    return this._hasFeedback;
  }

  @Input() nzValidateStatus;

  get isWarning(): boolean {
    return this._isDirtyAndError('warning');
  }

  get isValidate(): boolean {
    return this._isDirtyAndError('validating') || this.nzValidateStatus === 'pending' || this.nzValidateStatus && this.nzValidateStatus.dirty && this.nzValidateStatus.pending;
  }

  get isError(): boolean {
    return this._isDirtyAndError('error')
      || this._isDirtyAndError('required')
      || this._isDirtyAndError('pattern')
      || this._isDirtyAndError('email')
      || this._isDirtyAndError('maxlength')
      || this._isDirtyAndError('minlength')
  }

  get isSuccess(): boolean {
    return this.nzValidateStatus === 'success' || this.nzValidateStatus && this.nzValidateStatus.dirty && this.nzValidateStatus.valid;
  }

  get hasFeedBack(): boolean {
    return this.nzHasFeedback as boolean;
  }

  _isDirtyAndError(name) {
    return this.nzValidateStatus === name || this.nzValidateStatus && this.nzValidateStatus.dirty && this.nzValidateStatus.hasError && this.nzValidateStatus.hasError(name)
  }
}
