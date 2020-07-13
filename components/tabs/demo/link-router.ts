import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-link-router',
  template: `
    <nz-tabset nzLinkRouter [nzTabBarExtraContent]="extraTemplate">
      <nz-tab>
        <a nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'one' }" queryParamsHandling="merge">Default</a>
        Default.
      </nz-tab>
      <nz-tab [nzDisabled]="true">
        <a nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'two' }" queryParamsHandling="merge">Two</a>
        Two.
      </nz-tab>
      <nz-tab [nzDisabled]="isTabThreeDisabled">
        <a nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'three' }" queryParamsHandling="merge">Three</a>
        Three.
      </nz-tab>
      <nz-tab>
        <a nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'four' }" queryParamsHandling="merge">Four</a>
        Four.
      </nz-tab>
    </nz-tabset>

    <ng-template #extraTemplate>
      <button nz-button (click)="toggleTabThree()">{{ isTabThreeDisabled ? 'Enable' : 'Disable' }} Tab 3</button>
    </ng-template>
  `
})
export class NzDemoTabsLinkRouterComponent {
  isTabThreeDisabled = false;

  toggleTabThree(): void {
    this.isTabThreeDisabled = !this.isTabThreeDisabled;
  }
}
