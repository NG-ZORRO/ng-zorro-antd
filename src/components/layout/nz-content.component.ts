import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-content',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `
})

export class NzContentComponent {
  @HostBinding('class.ant-layout-content') true;
}
