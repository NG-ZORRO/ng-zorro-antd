import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-overlay-visible',
  template: `
    <nz-dropdown [nzClickHide]="false" [(nzVisible)]="visible">
      <a nz-dropdown>
        Hover me <i nz-icon type="down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>Clicking me will not close the menu.</li>
        <li nz-menu-item>Clicking me will not close the menu also.</li>
        <li nz-menu-item (click)="visible = false">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropdownOverlayVisibleComponent {
  visible = false;
}
