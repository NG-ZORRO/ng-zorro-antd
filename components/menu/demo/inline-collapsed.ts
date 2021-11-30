import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-inline-collapsed',
  template: `
    <div class="wrapper">
      <button nz-button nzType="primary" (click)="toggleCollapsed()">
        <i nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></i>
      </button>

      <nz-menu [nzInlineCollapsed]="isCollapsed" nzMode="inline" nzTheme="dark">
        <nz-menu-item nz-tooltip nzTooltipPlacement="right" [nzTooltipTitle]="isCollapsed ? 'Navigation One' : ''">
          <i nz-menu-icon nz-icon nzType="mail"></i>
          Navigation One
        </nz-menu-item>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel2">
          <i nz-menu-icon nz-icon nzType="appstore"></i>
          Navigation Tow
        </nz-menu-item>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel4">
          <i nz-menu-icon nz-icon nzType="setting"></i>
          Navigation Three
        </nz-menu-item>
      </nz-menu>

      <nz-menu-panel #menuPanel2="nzMenuPanel">
        <nz-menu-item>Option 5</nz-menu-item>
        <nz-menu-item>Option 6</nz-menu-item>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel3">Submenu</nz-menu-item>
      </nz-menu-panel>

      <nz-menu-panel #menuPanel3="nzMenuPanel">
        <nz-menu-item>Option 7</nz-menu-item>
        <nz-menu-item>Option 8</nz-menu-item>
      </nz-menu-panel>

      <nz-menu-panel #menuPanel4="nzMenuPanel">
        <nz-menu-item>Option 9</nz-menu-item>
        <nz-menu-item>Option 10</nz-menu-item>
      </nz-menu-panel>
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 240px;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
