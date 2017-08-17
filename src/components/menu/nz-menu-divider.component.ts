import { Component, HostBinding } from '@angular/core';

@Component({
  selector     : '[nz-menu-divider]',
  template     : `
    <ng-content></ng-content>`,
})

export class NzMenuDividerComponent {
  @HostBinding('class.ant-dropdown-menu-item-divider') _nzDropdownMenuItemDivider = true;
}
