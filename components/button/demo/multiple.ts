import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-multiple',
  template: `
    <button nz-button nzType="primary">primary</button>
    <button nz-button nzType="default">secondary</button>
    <nz-dropdown>
      <button nz-button nz-dropdown><span>Actions</span> <i class="anticon anticon-down"></i></button>
      <ul nz-menu>
        <li nz-menu-item>
          <a>1st item</a>
        </li>
        <li nz-menu-item>
          <a>2nd item</a>
        </li>
        <li nz-menu-item>
          <a>3rd item</a>
        </li>
      </ul>
    </nz-dropdown>
  `
})
export class NzDemoButtonMultipleComponent {
}
