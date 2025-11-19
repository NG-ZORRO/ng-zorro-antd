import { Component } from '@angular/core';

import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-dropdown-overlay-visible',
  imports: [NzDropdownModule, NzIconModule],
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu" [nzClickHide]="false" [(nzVisible)]="visible">
      Hover me
      <nz-icon nzType="down" />
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>Clicking me will not close the menu.</li>
        <li nz-menu-item>Clicking me will not close the menu also.</li>
        <li nz-menu-item (click)="visible = false">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownOverlayVisibleComponent {
  visible = false;
}
