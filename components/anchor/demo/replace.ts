import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-anchor-replace',
  template: `
    <nz-anchor>
      <nz-link [nzReplace]="true" nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
      <nz-link [nzReplace]="false" nzHref="#components-anchor-demo-static" nzTitle="Static demo"></nz-link>
      <nz-link [nzReplace]="false" nzHref="#api" nzTitle="API"> </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorReplaceComponent {}
