import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-inline-collapsed',
  template: `
    <div  style="width: 240px;">
      <button nz-button [nzType]="'primary'"
              (click)="toggleCollapsed()"
              style="margin-bottom: 10px;">
        <i class="anticon"
           [class.anticon-menu-unfold]="isCollapsed"
           [class.anticon-menu-fold]="!isCollapsed">
        </i>
      </button>
      <ul nz-menu [nzMode]="'inline'" nzTheme='dark' [nzInlineCollapsed]="isCollapsed">
        <li nz-menu-item>
          <span title>
            <i class="anticon anticon-mail"></i>
            <span>Navigation One</span>
          </span>
        </li>
        <li nz-submenu>
          <span title>
            <i class="anticon anticon-appstore"></i>
            <span>Navigation Two</span>
          </span>
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
        <li nz-submenu>
          <span title>
            <i class="anticon anticon-setting"></i>
            <span>Navigation Three</span>
          </span>
          <ul>
            <li nz-menu-item>Option 9</li>
            <li nz-menu-item>Option 10</li>
            <li nz-menu-item>Option 11</li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  styles  : []
})
export class NzDemoMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
