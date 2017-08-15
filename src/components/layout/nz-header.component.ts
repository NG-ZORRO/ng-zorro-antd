import { Component, HostBinding } from '@angular/core';

@Component({
  selector     : 'nz-header',
  template     : `
    <ng-content></ng-content>
  `
})

export class NzHeaderComponent {
  @HostBinding('class.ant-layout-header') true;
}
