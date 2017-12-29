import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-menu-expand',
  template: `
    <ul nz-menu [nzMode]="'inline'" style="width: 240px;">
      <li nz-submenu [(nzOpen)]="isOpenOne" (nzOpenChange)="openChange('one')">
        <span title><i class="anticon anticon-mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-group>
            <span title>Item 1</span>
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group>
            <span title>Item 2</span>
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu [(nzOpen)]="isOpenTwo" (nzOpenChange)="openChange('two')">
        <span title><i class="anticon anticon-appstore"></i> Navigation Two</span>
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu>
            <span title>Submenu</span>
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu [(nzOpen)]="isOpenThree" (nzOpenChange)="openChange('three')">
        <span title><i class="anticon anticon-setting"></i> Navigation Three</span>
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>`,
  styles  : []
})
export class NzDemoMenuExpandComponent {
  isOpenOne = true;
  isOpenTwo = false;
  isOpenThree = false;

  openChange(value) {
    if (value === 'one') {
      this.isOpenTwo = false;
      this.isOpenThree = false;
    } else if (value === 'two') {
      this.isOpenOne = false;
      this.isOpenThree = false;
    } else if (value === 'three') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
    }

  }
}
