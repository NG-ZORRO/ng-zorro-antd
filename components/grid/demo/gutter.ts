import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-gutter',
  template: `
    <nz-divider nzOrientation="left" nzText="Horizontal"></nz-divider>
    <div nz-row [nzGutter]="16">
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
    </div>
    <nz-divider nzOrientation="left" nzText="Responsive"></nz-divider>
    <div nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
    </div>
    <nz-divider nzOrientation="left" nzText="Vertical"></nz-divider>
    <div nz-row [nzGutter]="[16, 24]">
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
      <div nz-col class="gutter-row" [nzSpan]="6"><div class="inner-box">col-6</div></div>
    </div>
  `,
  styles: [
    `
      nz-divider {
        color: #333;
        fontweight: normal;
      }
      .inner-box {
        background: #0092ff;
        padding: 8px 0;
      }
    `
  ]
})
export class NzDemoGridGutterComponent {}
