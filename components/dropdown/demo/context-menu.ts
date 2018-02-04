import { Component, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-dropdown-context-menu',
  template: `
    <div style="background: rgb(190, 200, 200); padding: 32px;text-align: center" (contextmenu)="contextMenu($event,template)">
      <ng-template #template>
        <ul nz-menu nzInDropDown (nzClick)="close($event)">
          <li nz-menu-item>1st menu item</li>
          <li nz-menu-item>2nd menu item</li>
          <li nz-menu-item nzDisabled>disabled menu item</li>
          <li nz-submenu>
            <span title>sub menu</span>
            <ul>
              <li nz-menu-item>3rd menu item</li>
              <li nz-menu-item>4th menu item</li>
            </ul>
          </li>
          <li nz-submenu nzDisabled>
            <span title>disabled sub menu</span>
            <ul>
              <li nz-menu-item>3rd menu item</li>
              <li nz-menu-item>4th menu item</li>
            </ul>
          </li>
        </ul>
      </ng-template>
      <span style="color:#fff;font-size: 14px;">Context Menu</span>
    </div>
  `,
  styles  : []
})
export class NzDemoDropdownContextMenuComponent {
  private dropdown: NzDropdownContextComponent;

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  close(e: NzMenuItemDirective): void {
    console.log(e);
    this.dropdown.close();
  }

  constructor(private nzDropdownService: NzDropdownService) {

  }
}
