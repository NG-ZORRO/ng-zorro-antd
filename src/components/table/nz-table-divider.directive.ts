import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-table-divider]',
  host: {
    '[class.ant-divider]': 'true'
  }
})
export class NzTableDividerDirective { }
