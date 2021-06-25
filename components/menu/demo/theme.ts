import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-theme',
  template: `
    <nz-switch [(ngModel)]="theme">
      <span checked>Dark</span>
      <span unchecked>Light</span>
    </nz-switch>
    <br />
    <br />
    <nz-menu [nzTheme]="theme ? 'dark' : 'light'" nzMode="inline">
      <nz-menu-item>
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
  `,
  styles: [
    `
      nz-menu {
        width: 240px;
      }
    `
  ]
})
export class NzDemoMenuThemeComponent {
  theme = true;
}
