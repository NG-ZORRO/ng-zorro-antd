import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-gutter',
  template: `
    <div class="gutter-example">
      <div nz-row nzGutter="16">
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
      </div>
    </div>
    <div class="gutter-example">
      <div nz-row [nzGutter]="{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 }">
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
      </div>
    </div>
  `,
  styles  : [
    `
      .gutter-box {
        background: #00A0E9;
        padding: 5px 0;
      }
    `
  ]
})
export class NzDemoGridGutterComponent {
}
