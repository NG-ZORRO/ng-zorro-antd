import { Component, HostBinding } from '@angular/core';

@Component({
  selector     : 'nz-header',
  template     : `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-layout-header]': 'true'
  }
})
export class NzHeaderComponent { }
