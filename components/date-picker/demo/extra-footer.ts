import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-extra-footer',
  template: `
    <nz-date-picker [nzRenderExtraFooter]="footerRender"></nz-date-picker>
    <nz-date-picker [nzRenderExtraFooter]="plainFooter" nzShowTime></nz-date-picker>
    <nz-range-picker [nzRenderExtraFooter]="footerRender"></nz-range-picker>
    <nz-range-picker [nzRenderExtraFooter]="plainFooter" nzShowTime></nz-range-picker>
    <nz-month-picker [nzRenderExtraFooter]="footerRender" nzPlaceHolder="Select month"></nz-month-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerExtraFooterComponent {
  plainFooter = 'plain extra footer';
  footerRender = () => 'extra footer';
}
