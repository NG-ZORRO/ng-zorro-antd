import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tbody:not(.clear-nz)',
  host    : {
    '[class.ant-table-tbody]': 'true'
  }
})

export class NzTbodyDirective {
}
