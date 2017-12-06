import { Component, HostBinding } from '@angular/core';

@Component({
  selector     : '[nz-menu-divider]',
  template     : `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-dropdown-menu-item-divider]': 'true'
  }
})
export class NzMenuDividerComponent { }
