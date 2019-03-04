import { Directive, Host, Optional } from '@angular/core';
import { NzTableComponent } from './nz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tbody',
  host    : {
    '[class.ant-table-tbody]': 'nzTableComponent'
  }
})

export class NzTbodyDirective {
  constructor(@Host() @Optional() public nzTableComponent: NzTableComponent) {
  }
}
