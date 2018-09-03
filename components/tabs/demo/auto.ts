import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-auto',
  template: `
    <nz-tabset [nzNavigationOptions]="listOfNavigation" [nzQueryParam]="'tabs'">
      <nz-tab nzTitle="Zero">
        I have no param.
      </nz-tab>
      <nz-tab nzTitle="One">
        I have a param One. Try refresh this page and you will see me again!
      </nz-tab>
      <nz-tab nzTitle="Two">
        I have a param Two.
      </nz-tab>
      <nz-tab nzTitle="Three">
        I have a param Three.
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsAutoComponent {
  listOfNavigation = [
    { },
    { path: 'one' },
    { path: 'two' },
    { path: 'three' }
  ];
}
