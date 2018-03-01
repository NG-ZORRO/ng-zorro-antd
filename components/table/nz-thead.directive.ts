import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nz-table thead',
  host    : {
    '[class.ant-table-thead]': 'true'
  }
})
export class NzTheadDirective {
}
