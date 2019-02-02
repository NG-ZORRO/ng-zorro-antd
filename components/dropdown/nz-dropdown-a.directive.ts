import { Directive } from '@angular/core';

@Directive({
  selector: 'a[nz-dropdown]',
  host    : {
    '[class.ant-dropdown-link]': 'true'
  }
})
export class NzDropDownADirective {
}
