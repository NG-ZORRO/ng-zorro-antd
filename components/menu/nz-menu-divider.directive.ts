import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-menu-divider]',
  host    : {
    '[class.ant-dropdown-menu-item-divider]': 'true'
  }
})
export class NzMenuDividerDirective {
}
