import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-item]',
  host: {
    '[class.ant-form-item]': 'true'
  }
})
export class NzFormItemDirective {
  _withHelp = 0;

  enableHelp() {
    this._withHelp++;
  }

  disableHelp() {
    this._withHelp--;
  }

  @HostBinding(`class.ant-form-item-with-help`)
  get withHelp(): boolean {
    return this._withHelp > 0;
  }
}
