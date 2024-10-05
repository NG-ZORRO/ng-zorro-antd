import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-link-router',
  standalone: true,
  imports: [RouterLink, NzTabsModule],
  template: `
    <nz-tabset nzLinkRouter>
      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'one' }" queryParamsHandling="merge">
          Default
        </a>
        Default.
      </nz-tab>
      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'two' }" queryParamsHandling="merge">
          Two
        </a>
        Two.
      </nz-tab>
      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'three' }" queryParamsHandling="merge">
          Three
        </a>
        Three.
      </nz-tab>
      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'four' }" queryParamsHandling="merge">
          Four
        </a>
        Four.
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsLinkRouterComponent {}
