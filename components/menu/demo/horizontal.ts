import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-horizontal',
  template: `
    <nz-nav-menu>
      <ng-template nzMenuItem>Navigation One</ng-template>
      <ng-template nzMenuItem>Navigation Two</ng-template>
      <ng-template nzMenuItem [nzMenuTriggerFor]="menuPanel"> Navigation Three - Sub</ng-template>
      <ng-template nzMenuItem> Navigation Four</ng-template>
    </nz-nav-menu>

    <nz-menu-panel #menuPanel="nzMenuPanel">
      <nz-menu-group>
        <ng-container nz-menu-group-title>Group</ng-container>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel2">Sub 0</nz-menu-item>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel21"> Sub 1</nz-menu-item>
        <nz-menu-item [nzMenuTriggerFor]="menuPanel22"> Sub 2 - -sub</nz-menu-item>
      </nz-menu-group>
      <nz-menu-group>
        <ng-container nz-menu-group-title>Group</ng-container>
        <nz-menu-item> Sub 3</nz-menu-item>
        <nz-menu-item> Sub 4</nz-menu-item>
      </nz-menu-group>
      <nz-menu-item [nzMenuTriggerFor]="menuPanel3" nzMenuTriggerOn="click"> Sub 5</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel2="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel21="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel22="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel3="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item [nzMenuTriggerFor]="menuPanel4"> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel4="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item [nzMenuTriggerFor]="menuPanel5" nzMenuTriggerOn="click"> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>

    <nz-menu-panel #menuPanel5="nzMenuPanel">
      <nz-menu-item> Sub 1</nz-menu-item>
      <nz-menu-item> Sub 2 - -sub</nz-menu-item>
      <nz-menu-item> Sub 3</nz-menu-item>
    </nz-menu-panel>
  `
})
export class NzDemoMenuHorizontalComponent {}
