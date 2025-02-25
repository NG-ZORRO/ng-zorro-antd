import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ThemingIcon } from './theming-icon';

@Component({
    selector: 'app-fixed-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAvatarModule, NzDropDownModule, ThemingIcon],
  template: `
    <div class="fixed-widgets">
      <div
        class="ant-avatar ant-avatar-circle ant-avatar-icon fixed-widgets-avatar"
        style="width: 44px; height: 44px; line-height: 44px; font-size: 22px;"
        nz-dropdown
        nzPlacement="topCenter"
        [nzDropdownMenu]="menu"
      >
        <theming-icon></theming-icon>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu nzSelectable>
            <li nz-menu-item (click)="onThemeChange('default')">{{ language === 'zh' ? '默认主题' : 'Default' }}</li>
            <li nz-menu-item (click)="onThemeChange('dark')">{{ language === 'zh' ? '暗黑主题' : 'Dark Theme' }}</li>
            <li nz-menu-item (click)="onThemeChange('compact')">{{ language === 'zh' ? '紧凑主题' : 'Compact Theme' }}</li>
            <li nz-menu-item (click)="onThemeChange('aliyun')">{{ language === 'zh' ? '阿里云主题' : 'Aliyun Theme' }}</li>
          </ul>
        </nz-dropdown-menu>
      </div>
    </div>
  `
})
export class FixedWidgetsComponent {
  compact = false;
  @Input() theme: string = 'default';
  @Input() language: string = 'zh';
  @Output() readonly themeChange = new EventEmitter<string>();

  onThemeChange(theme: string): void {
    this.theme = theme;
    this.themeChange.emit(theme);
  }
}
