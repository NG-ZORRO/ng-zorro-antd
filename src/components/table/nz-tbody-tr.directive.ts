import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[nz-tbody-tr]',
  host: {
    '[class.ant-table-row]': 'true'
  }
})

export class NzTbodyTrDirective { }
