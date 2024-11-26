import { Component } from '@angular/core';

import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'nz-demo-anchor-replace',
  standalone: true,
  imports: [NzAnchorModule],
  template: `
    <nz-anchor>
      <nz-link [nzReplace]="true" nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
      <nz-link [nzReplace]="false" nzHref="#components-anchor-demo-static" nzTitle="Static demo"></nz-link>
      <nz-link [nzReplace]="false" nzHref="#api" nzTitle="API"> </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorReplaceComponent {}
