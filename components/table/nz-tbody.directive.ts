import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nz-table tbody',
  host    : {
    '[class.ant-table-tbody]': 'true'
  }
})

export class NzTbodyDirective {
}
