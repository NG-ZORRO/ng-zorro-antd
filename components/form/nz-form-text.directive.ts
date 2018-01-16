import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-form-text]',
  host    : {
    '[class.ant-form-text]': 'true'
  }
})
export class NzFormTextDirective {
}
