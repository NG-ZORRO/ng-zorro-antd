import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'nz-demo-dropdown-placement',
  imports: [NzDropDownModule, NzButtonModule],
  template: `
    <div>
      @for (position of listOfPosition; track position) {
        <button nz-button nz-dropdown [nzDropdownMenu]="menu" [nzPlacement]="position">{{ position }}</button>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item>1st menu item length</li>
            <li nz-menu-item>2nd menu item length</li>
            <li nz-menu-item>3rd menu item length</li>
          </ul>
        </nz-dropdown-menu>
      }
    </div>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoDropdownPlacementComponent {
  listOfPosition: NzPlacementType[] = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
}
