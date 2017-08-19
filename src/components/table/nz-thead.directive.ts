import { Directive, HostBinding } from '@angular/core';
@Directive({
  selector: '[nz-thead]'
})

export class NzTheadDirective {
  @HostBinding(`class.ant-table-thead`) _nzTableThead = true;

  constructor() {

  }
}
