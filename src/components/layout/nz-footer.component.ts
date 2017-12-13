import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-footer',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-layout-footer]': 'true'
  }
})
export class NzFooterComponent { }
