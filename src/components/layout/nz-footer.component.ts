import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-footer',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `
})
export class NzFooterComponent {
  @HostBinding('class.ant-layout-footer') _nzLayoutFooter = true;
}
