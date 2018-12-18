import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-auto',
  template: `
    <nz-tabset [nzQueryParam]="'tabs'" [nzEnableRouteLink]="true">
      <nz-tab nzTitle="Zero" nzPathOrParam="">
        I have no param.
      </nz-tab>
      <nz-tab nzTitle="One" nzPathOrParam="one">
        I have a param One. Try refresh this page and you will see me again!
      </nz-tab>
      <nz-tab nzTitle="Two" nzPathOrParam="two">
        I have a param Two.
      </nz-tab>
      <nz-tab nzTitle="Three" nzPathOrParam="three">
        I have a param Three.
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsAutoComponent {
}
