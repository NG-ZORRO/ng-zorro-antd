import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-router',
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
