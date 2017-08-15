import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-card-grid]'
})
export class NzCardGridDirective {
  @HostBinding('class.ant-card-grid') true;
}
