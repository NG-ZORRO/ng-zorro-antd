import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-gutter-config',
  template: `
    <div style="margin-bottom:16px;">
      <span style="margin-right: 6px;">Gutter (px): </span>
      <div style="width: 50%">
        <nz-slider [nzMarks]="marksGutter" [nzStep]="null" [nzDefaultValue]="16" [nzMax]="48" [(ngModel)]="gutter"></nz-slider>
      </div>
      <span style="margin-right: 6px;">Column Count:</span>
      <div style="width: 50%">
        <nz-slider [nzMarks]="marksCount" [nzStep]="null" [nzDefaultValue]="4" [nzMax]="12" [(ngModel)]="count"></nz-slider>
      </div>
    </div>

    <div class="gutter-example">
      <div nz-row [nzGutter]="gutter">
        <div nz-col class="gutter-row" [nzSpan]="24/count" *ngFor="let i of generateArray(count)">
          <div class="grid-config">Column</div>
        </div>
      </div>
    </div>
  `,
  styles  : [
    `
      .grid-config{
        background: #00A0E9;
        height: 120px;
        line-height: 120px;
        font-size: 13px;
      }
    `
  ]
})
export class NzDemoGridGutterConfigComponent {
  gutter = 16;
  count = 4;
  marksGutter = {
    8 : 8,
    16: 16,
    24: 24,
    32: 32,
    40: 40,
    48: 48
  };
  marksCount = {
    2 : 2,
    3 : 3,
    4 : 4,
    6 : 6,
    8 : 8,
    12: 12
  };

  generateArray(value) {
    return new Array(value);
  }
}
