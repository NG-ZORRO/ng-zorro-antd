import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { NzDropdownModule } from 'ng-zorro-antd/dropdown';

import { AppService, SiteTheme } from '../app.service';
import { APP_LANGUAGE } from '../app.token';
import { ThemingIcon } from './theming-icon';

@Component({
  selector: 'app-fixed-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDropdownModule, ThemingIcon],
  template: `
    <div class="fixed-widgets">
      <div
        class="ant-avatar ant-avatar-circle ant-avatar-icon fixed-widgets-avatar"
        nz-dropdown
        nzPlacement="topCenter"
        [nzDropdownMenu]="menu"
      >
        <theming-icon />
      </div>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu nzSelectable>
          @for (theme of themes(); track theme.value) {
            <li nz-menu-item [nzSelected]="currentTheme() === theme.value" (click)="themeChange.emit(theme.value)">
              {{ theme.label }}
            </li>
          }
        </ul>
      </nz-dropdown-menu>
    </div>
  `
})
export class FixedWidgetsComponent {
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly currentTheme = inject(AppService).theme.asReadonly();
  readonly themeChange = output<SiteTheme>();

  readonly themes = computed<Array<{ label: string; value: SiteTheme }>>(() => {
    const language = this.language();
    return [
      {
        label: language === 'zh' ? '默认主题' : 'Default',
        value: 'default'
      },
      {
        label: language === 'zh' ? '暗黑主题' : 'Dark Theme',
        value: 'dark'
      },
      {
        label: language === 'zh' ? '紧凑主题' : 'Compact Theme',
        value: 'compact'
      },
      {
        label: language === 'zh' ? '阿里云主题' : 'Aliyun Theme',
        value: 'aliyun'
      }
    ];
  });
}
