import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-inline',
  template: `
    <nz-menu nzMode="inline">
      <nz-menu-item [nzMenuTriggerFor]="menuPanel">
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

    <nz-menu-panel #menuPanel="nzMenuPanel">
      <nz-menu-group>
        <ng-container nz-menu-group-title>Item 1</ng-container>
        <nz-menu-item>Option 1</nz-menu-item>
        <nz-menu-item>Option 2</nz-menu-item>
      </nz-menu-group>
      <nz-menu-group>
        <ng-container nz-menu-group-title>Item 2</ng-container>
        <nz-menu-item>Option 3</nz-menu-item>
        <nz-menu-item>Option 4</nz-menu-item>
      </nz-menu-group>
    </nz-menu-panel>

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
export class NzDemoMenuInlineComponent {}
