import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-position',
  template: `
    <div>
      <nz-dropdown [nzPlacement]="'bottomLeft'">
        <button nz-button nz-dropdown>bottomLeft</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'bottomCenter'">
        <button nz-button nz-dropdown>bottomCenter</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'bottomRight'">
        <button nz-button nz-dropdown>bottomRight</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topLeft'">
        <button nz-button nz-dropdown>topLeft</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topCenter'">
        <button nz-button nz-dropdown>topCenter</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topRight'">
        <button nz-button nz-dropdown>topRight</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
    </div>`,
  styles  : []
})
export class NzDemoDropDownPositionComponent { }
