import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-tbody]',
  host: {
    '[class.ant-table-tbody]': 'true'
  }
})

export class NzTbodyDirective { }
