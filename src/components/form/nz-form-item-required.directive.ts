import { Directive, HostBinding, Input } from '@angular/core';
import { toBoolean } from '../util/convert';

@Directive({
  selector: '[nz-form-item-required]'
})
export class NzFormItemRequiredDirective {
  private _required = true;

  @Input()
  @HostBinding(`class.ant-form-item-required`)
  set nzRequired(value: boolean) {
    this._required = toBoolean(value);
  }

  get nzRequired(): boolean {
    return this._required;
  }
}
