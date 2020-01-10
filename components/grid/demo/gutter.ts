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
      <div nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }">
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
  styles: [
    `
      .gutter-box {
        background: #00a0e9;
        padding: 5px 0;
      }
    `
  ]
})
export class NzDemoGridGutterComponent {}
