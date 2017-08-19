import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-table-divider]'
})

export class NzTableDividerDirective {
  @HostBinding(`class.ant-divider`) _nzDivider = true;
}
