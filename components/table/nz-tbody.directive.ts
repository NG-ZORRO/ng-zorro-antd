import { Directive } from '@angular/core';

@Directive({
  selector: 'nz-table tbody',
  host    : {
    '[class.ant-table-tbody]': 'true'
  }
})

export class NzTbodyDirective {
}
