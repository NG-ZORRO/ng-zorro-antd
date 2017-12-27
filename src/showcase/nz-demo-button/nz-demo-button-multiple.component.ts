import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-multiple',
  template: `
    <button nz-button [nzType]="'primary'">
      <span>primary</span>
    </button>
    <button nz-button [nzType]="'default'">
      <span>secondary</span>
    </button>
    <nz-dropdown>
      <button nz-button nz-dropdown><span>more</span> <i class="anticon anticon-down"></i></button>
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
`,
  styles  : []
})
export class NzDemoButtonMultipleComponent { }
