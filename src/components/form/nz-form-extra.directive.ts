import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-extra]',
  host: {
    '[class.ant-form-extra]': 'true'
  }
})
export class NzFormExtraDirective { }
