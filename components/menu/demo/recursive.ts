/* declarations: NestedItemComponent */

import { Component, Input, ViewChild } from '@angular/core';

import { NzMenuPanelComponent } from 'ng-zorro-antd/menu';

interface MenuItem {
  title: string;
  icon?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'nz-demo-nested-item',
  template: `
    <nz-menu-panel #menuPanel="nzMenuPanel">
      <ng-container *ngFor="let item of items">
        <ng-container *ngIf="!item.children">
          <nz-menu-item>
            <i *ngIf="item.icon" nz-icon nz-menu-icon [nzType]="item.icon"></i>
            {{ item.title }}
          </nz-menu-item>
        </ng-container>

        <ng-container *ngIf="item.children">
          <nz-menu-item [nzMenuTriggerFor]="nestedItem.childMenu">
            <i *ngIf="item.icon" nz-icon nz-menu-icon [nzType]="item.icon"></i>
            {{ item.title }}
          </nz-menu-item>
          <nz-demo-nested-item #nestedItem [items]="item.children"></nz-demo-nested-item>
        </ng-container>
      </ng-container>
    </nz-menu-panel>
  `
})
export class NestedItemComponent {
  @Input() items: MenuItem[] = [];
  @ViewChild('menuPanel', { static: true }) childMenu!: NzMenuPanelComponent;
}

@Component({
  selector: 'nz-demo-menu-recursive',
  template: `
    <nz-menu>
      <ng-container *ngFor="let item of menus">
        <ng-container *ngIf="!item.children">
          <nz-menu-item>
            <i *ngIf="item.icon" nz-icon nz-menu-icon [nzType]="item.icon"></i>
            {{ item.title }}
          </nz-menu-item>
        </ng-container>
        <ng-container *ngIf="item.children">
          <nz-menu-item [nzMenuTriggerFor]="nestedItem.childMenu">
            <i *ngIf="item.icon" nz-icon nz-menu-icon [nzType]="item.icon"></i>
            {{ item.title }}
          </nz-menu-item>
          <nz-demo-nested-item #nestedItem [items]="item.children"></nz-demo-nested-item>
        </ng-container>
      </ng-container>
    </nz-menu>
  `,
  styles: [
    `
      nz-menu {
        width: 240px;
      }
    `
  ]
})
export class NzDemoMenuRecursiveComponent {
  mode = false;
  dark = false;
  menus: MenuItem[] = [
    {
      title: 'Navigation One',
      icon: 'mail',
      children: [
        {
          title: 'Submenu 1',
          icon: 'bars',
          children: [
            {
              title: 'Option 1'
            },
            {
              title: 'Option 2'
            }
          ]
        },
        {
          title: 'Submenu 2',
          icon: 'bars',
          children: [
            {
              title: 'Option 3'
            },
            {
              title: 'Option 4'
            }
          ]
        }
      ]
    },
    {
      title: 'Navigation Tow',
      icon: 'appstore',
      children: [
        {
          title: 'Option 5'
        },
        {
          title: 'Option 6'
        },
        {
          title: 'Submenu 3',
          icon: 'bars',
          children: [
            {
              title: 'Option 7'
            },
            {
              title: 'Option 8'
            }
          ]
        }
      ]
    },
    {
      title: 'Navigation Three',
      icon: 'setting',
      children: [
        {
          title: 'Option 9'
        },
        {
          title: 'Option 10'
        }
      ]
    }
  ];
}
