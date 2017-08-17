import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-tbody]'
})

export class NzTbodyDirective {
  @HostBinding(`class.ant-table-tbody`) _nzTableTbody = true;
}
