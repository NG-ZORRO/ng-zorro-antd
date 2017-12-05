import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-dropdown-basic',
  template: `
    <nz-dropdown>
      <a class="ant-dropdown-link" nz-dropdown>
        Hover me <i class="anticon anticon-down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </li>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item</a>
        </li>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item</a>
        </li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropDownBasicComponent { }
