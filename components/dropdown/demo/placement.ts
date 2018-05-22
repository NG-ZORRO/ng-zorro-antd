import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-placement',
  template: `
    <div>
      <nz-dropdown [nzPlacement]="'bottomLeft'">
        <button nz-button nz-dropdown>bottomLeft</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'bottomCenter'">
        <button nz-button nz-dropdown>bottomCenter</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'bottomRight'">
        <button nz-button nz-dropdown>bottomRight</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topLeft'">
        <button nz-button nz-dropdown>topLeft</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topCenter'">
        <button nz-button nz-dropdown>topCenter</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
      <nz-dropdown [nzPlacement]="'topRight'">
        <button nz-button nz-dropdown>topRight</button>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st menu item length</a>
          </li>
          <li nz-menu-item>
            <a>2nd menu item length</a>
          </li>
          <li nz-menu-item>
            <a>3rd menu item length</a>
          </li>
        </ul>
      </nz-dropdown>
    </div>`,
  styles  : [
      `
      :host ::ng-deep .ant-btn {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoDropdownPlacementComponent {
}
