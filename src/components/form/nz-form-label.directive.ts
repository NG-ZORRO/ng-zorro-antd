import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-label]',
  host: {
    '[class.ant-form-item-label]': 'true'
  }
})
export class NzFormLabelDirective { }
