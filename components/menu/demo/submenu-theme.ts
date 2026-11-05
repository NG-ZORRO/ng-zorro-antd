import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-menu-submenu-theme',
  imports: [ReactiveFormsModule, NzMenuModule, NzSwitchModule],
  template: `
    <label for="submenu-theme-switch">Submenu theme</label>
    <nz-switch
      nzId="submenu-theme-switch"
      [formControl]="darkControl"
      [nzCheckedChildren]="themeLabel"
      [nzUnCheckedChildren]="themeLabel"
    />
    <ng-template #themeLabel
      ><span class="theme-label">{{ theme() === 'dark' ? 'Dark' : 'Light' }}</span></ng-template
    >
    <br />
    <br />
    <ul nz-menu nzMode="vertical" nzTheme="dark">
      <li nz-submenu nzOpen [nzTheme]="theme()" nzTitle="Navigation One" nzIcon="mail">
        <ul [class.light-submenu]="theme() === 'light'">
          <li nz-menu-item nzSelected>Option 1</li>
          <li nz-menu-item>Option 2</li>
          <li nz-menu-item>Option 3</li>
        </ul>
      </li>
      <li nz-menu-item>Option 5</li>
      <li nz-menu-item>Option 6</li>
    </ul>
  `,
  styles: `
    [nz-menu] {
      width: 256px;
    }

    ul > li.ant-menu-item.ant-menu-item-selected {
      color: #fff;
      background-color: #0958d9;
    }

    ul.light-submenu > li.ant-menu-item.ant-menu-item-selected {
      color: #0958d9;
      background-color: #e6f4ff;
    }

    .theme-label {
      color: #001529;
    }

    label {
      margin-inline-end: 8px;
    }
  `
})
export class NzDemoMenuSubmenuThemeComponent {
  readonly darkControl = new FormControl(false, { nonNullable: true });
  private readonly dark = toSignal(this.darkControl.valueChanges, { initialValue: false });
  readonly theme = computed(() => (this.dark() ? 'dark' : 'light'));
}
