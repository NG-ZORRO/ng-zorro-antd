import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-content',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-layout-content]': 'true'
  }
})
export class NzContentComponent { }
