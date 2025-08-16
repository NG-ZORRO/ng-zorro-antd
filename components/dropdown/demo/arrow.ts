import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-dropdown-arrow',
  imports: [NzDropDownModule, NzButtonModule, NzFlexModule],
  template: `
    <div nz-flex [nzGap]="8" nzWrap="wrap">
      @for (position of listOfPosition; track position) {
        <button nz-button nz-dropdown [nzDropdownMenu]="menu" [nzPlacement]="position" nzArrow>{{ position }}</button>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item>1st menu item length</li>
            <li nz-menu-item>2nd menu item length</li>
            <li nz-menu-item>3rd menu item length</li>
          </ul>
        </nz-dropdown-menu>
      }
    </div>
  `
})
export class NzDemoDropdownArrowComponent {
  listOfPosition: NzPlacementType[] = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
}
