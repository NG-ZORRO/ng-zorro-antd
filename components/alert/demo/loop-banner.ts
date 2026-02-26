/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-loop-banner',
  imports: [NzAlertModule],
  template: `
    <nz-alert nzBanner [nzMessage]="message" />
    <br />
    <nz-alert nzBanner [nzMessage]="messagePauseOnHover" />

    <ng-template #message>
      <nz-alert-marquee nzSpeed="60">
        I can be a long text that scrolls continuously in the banner alert. This text will loop seamlessly.
      </nz-alert-marquee>
    </ng-template>

    <ng-template #messagePauseOnHover>
      <nz-alert-marquee nzSpeed="60" nzPauseOnHover="true">
        Hover over me to pause the scrolling animation. This text loops continuously.
      </nz-alert-marquee>
    </ng-template>
  `
})
export class NzDemoAlertLoopBannerComponent {}
