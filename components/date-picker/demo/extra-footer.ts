import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-extra-footer',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker [nzRenderExtraFooter]="footerRender" />
    <br />
    <nz-date-picker [nzRenderExtraFooter]="plainFooter" nzShowTime />
    <nz-range-picker [nzRenderExtraFooter]="footerRender" />
    <nz-range-picker [nzRenderExtraFooter]="plainFooter" nzShowTime />
    <nz-date-picker nzMode="month" [nzRenderExtraFooter]="footerRender" />
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerExtraFooterComponent {
  plainFooter = 'plain extra footer';
  footerRender = (): string => 'extra footer';
}
