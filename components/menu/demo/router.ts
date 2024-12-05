import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-menu-router',
  imports: [RouterLink, NzMenuModule],
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item nzMatchRouter>
        <a [routerLink]="['/', 'components', 'menu', 'en']">English Menu Document</a>
      </li>
      <li nz-menu-item nzMatchRouter>
        <a [routerLink]="['/', 'components', 'menu', 'zh']">Chinese Menu Document</a>
      </li>
    </ul>
  `
})
export class NzDemoMenuRouterComponent {}
