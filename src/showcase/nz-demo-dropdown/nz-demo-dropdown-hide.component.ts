import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-hide',
  template: `
    <nz-dropdown [nzClickHide]="false" [(nzVisible)]="visible">
      <a class="ant-dropdown-link" nz-dropdown>
        Hover me <i class="anticon anticon-down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>Clicking me will not close the menu.</li>
        <li nz-menu-item>Clicking me will not close the menu also.</li>
        <li nz-menu-item (click)="visible = false">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropDownHideComponent {
  visible = false;
}
