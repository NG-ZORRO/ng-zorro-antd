import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-split]',
  host: {
    '[class.ant-form-split]': 'true'
  }
})
export class NzFormSplitDirective { }
