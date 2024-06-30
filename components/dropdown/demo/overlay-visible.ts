import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-overlay-visible',
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu" [nzClickHide]="false" [(nzVisible)]="visible">
      Hover me
      <span nz-icon nzType="down"></span>
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
