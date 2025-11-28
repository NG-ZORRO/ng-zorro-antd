import { Component } from '@angular/core';
import { Params, RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-link-router',
  imports: [RouterLink, NzTabsModule, NzButtonModule],
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button (click)="newTab()">ADD</button>
    </div>
    <nz-tabs nzLinkRouter>
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
      @for (tab of dynamicTabs; track tab.title) {
        <nz-tab>
          <a
            *nzTabLink
            nz-tab-link
            [routerLink]="tab.routerLink"
            [queryParams]="tab.queryParams ?? {}"
            queryParamsHandling="merge"
          >
            {{ tab.title }}
          </a>
          {{ tab.content }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsLinkRouterComponent {
  dynamicTabs: Array<{ title: string; content: string; queryParams?: Params; routerLink: string[] }> = [];

  newTab(): void {
    const { length } = this.dynamicTabs;
    const newTabId = length + 1;
    const title = `NewTab${newTabId}`;
    this.dynamicTabs = [
      ...this.dynamicTabs,
      {
        title,
        content: title,
        routerLink: ['.'],
        queryParams: {
          tab: newTabId
        }
      }
    ];
  }
}
