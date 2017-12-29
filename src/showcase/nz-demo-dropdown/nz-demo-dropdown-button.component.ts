import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-button',
  template: `
    <div style="height: 28px;">
      <nz-dropdown-button (nzClick)="log($event)">
        DropDown
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
      </nz-dropdown-button>
      <nz-dropdown-button nzDisabled>
        DropDown
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
      </nz-dropdown-button>
      <nz-dropdown>
        <button nz-button nz-dropdown><span>Button</span> <i class="anticon anticon-down"></i></button>
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
      </nz-dropdown>
    </div>
  `,
  styles  : [
      `
      nz-dropdown-button, nz-dropdown {
        float: left;
        margin: 2px;
      }

      nz-dropdown::after {
        content: '';
        clear: both;
      }
    `
  ]
})
export class NzDemoDropDownButtonComponent {
  log(e) {
    console.log('click dropdown button');
  }
}
