import { Component } from '@angular/core';

@Component({
  selector: 'nz-option-container',
  template: `
    <div style="overflow: auto;">
      <ul class="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu" tabindex="0">
        <li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">b11</li>
        <li class="ant-select-dropdown-menu-item-group">
          <div class="ant-select-dropdown-menu-item-group-title" title="Manager">Manager</div>
          <ul class="ant-select-dropdown-menu-item-group-list">
            <li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">Jack</li>
            <li unselectable="unselectable" class="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-selected" role="menuitem" aria-selected="true" style="user-select: none;">Lucy</li>
          </ul>
        </li>
      </ul>
    </div>
  `
})
export class NzOptionContainerComponent {
}
