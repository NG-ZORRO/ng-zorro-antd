import { Component, computed, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { AppService, SITE_DEFAULT_PRIMARY_COLOR, SiteThemeState } from '../app.service';
import { APP_LANGUAGE } from '../app.token';
import { ThemingIcon } from './theming-icon';

/**
 * Switches the site theme at runtime through the design-token engine
 * (`NzThemeService`): light/dark appearance, default/compact density and the
 * primary color, all freely composable.
 */
@Component({
  selector: 'app-theme-switcher',
  imports: [NzButtonModule, NzDropdownModule, NzMenuModule, NzTooltipModule, ThemingIcon],
  template: `
    <button
      id="theme-switcher"
      nz-button
      nzSize="small"
      nzType="text"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="themeMenu"
      [nzClickHide]="false"
      nz-tooltip
      [nzTooltipTitle]="labels().tooltip"
      nzTooltipPlacement="bottom"
    >
      <theming-icon />
    </button>
    <nz-dropdown-menu #themeMenu="nzDropdownMenu">
      <ul nz-menu [nzSelectable]="false" class="theme-switcher-menu">
        <li nz-menu-group [nzTitle]="labels().appearance">
          <ul>
            <li nz-menu-item [nzSelected]="!state().dark" (click)="update({ dark: false })">
              {{ labels().light }}
            </li>
            <li nz-menu-item [nzSelected]="state().dark" (click)="update({ dark: true })">
              {{ labels().dark }}
            </li>
          </ul>
        </li>
        <li nz-menu-group [nzTitle]="labels().density">
          <ul>
            <li nz-menu-item [nzSelected]="!state().compact" (click)="update({ compact: false })">
              {{ labels().default }}
            </li>
            <li nz-menu-item [nzSelected]="state().compact" (click)="update({ compact: true })">
              {{ labels().compact }}
            </li>
          </ul>
        </li>
        <li nz-menu-group [nzTitle]="labels().primaryColor">
          <div class="theme-color-swatches">
            @for (color of presetColors; track color) {
              <button
                type="button"
                class="theme-color-swatch"
                [class.active]="color === state().primaryColor"
                [style.background]="color"
                [attr.aria-label]="labels().primaryColor + ' ' + color"
                (click)="update({ primaryColor: color })"
              ></button>
            }
            <input
              type="color"
              class="theme-color-input"
              [value]="state().primaryColor"
              [attr.aria-label]="labels().customColor"
              (change)="onCustomColor($event)"
            />
          </div>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: `
    .theme-switcher-menu {
      min-width: 168px;
    }

    .theme-color-swatches {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px 8px;
    }

    .theme-color-swatch {
      width: 20px;
      height: 20px;
      padding: 0;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      cursor: pointer;
    }

    .theme-color-swatch.active {
      outline: 2px solid var(--ant-color-primary, #1890ff);
      outline-offset: 2px;
    }

    .theme-color-input {
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    }
  `
})
export class ThemeSwitcherComponent {
  private readonly app = inject(AppService);
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly state = this.app.theme.asReadonly();

  readonly presetColors = [SITE_DEFAULT_PRIMARY_COLOR, '#00b96b', '#722ed1', '#eb2f96', '#fa8c16'];

  readonly labels = computed(() => {
    const zh = this.language() === 'zh';
    return {
      tooltip: zh ? '主题' : 'Theme',
      appearance: zh ? '外观' : 'Appearance',
      light: zh ? '亮色' : 'Light',
      dark: zh ? '暗黑' : 'Dark',
      density: zh ? '密度' : 'Density',
      default: zh ? '默认' : 'Default',
      compact: zh ? '紧凑' : 'Compact',
      primaryColor: zh ? '主色' : 'Primary color',
      customColor: zh ? '自定义主色' : 'Custom primary color'
    };
  });

  update(patch: Partial<SiteThemeState>): void {
    this.app.setTheme(patch);
  }

  onCustomColor(event: Event): void {
    this.update({ primaryColor: (event.target as HTMLInputElement).value });
  }
}
