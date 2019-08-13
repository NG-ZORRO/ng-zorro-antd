import { Component } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'nz-demo-dropdown-context-menu',
  template: `
    <div class="context-area" (contextmenu)="contextMenu($event, menu)">
      <span class="context-intro">Context Menu</span>
    </div>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item nzDisabled>disabled menu item</li>
        <li nz-submenu nzTitle="sub menu">
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
        <li nz-submenu nzDisabled nzTitle="disabled sub menu">
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .context-area {
        background: rgb(190, 200, 200);
        padding: 32px;
        text-align: center;
      }

      .context-intro {
        color: #fff;
        font-size: 14px;
      }
    `
  ]
})
export class NzDemoDropdownContextMenuComponent {
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  constructor(private nzContextMenuService: NzContextMenuService) {}
}
