import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-thead]',
  host    : {
    '[class.ant-table-thead]': 'true'
  }
})
export class NzTheadDirective {
}
