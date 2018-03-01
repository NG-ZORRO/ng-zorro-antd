import { Directive } from '@angular/core';

@Directive({
  selector: 'nz-table thead',
  host    : {
    '[class.ant-table-thead]': 'true'
  }
})
export class NzTheadDirective {
}
