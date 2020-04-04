import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-playground',
  template: `
    <div class="slider-container">
      <span>Horizontal Gutter (px): </span>
      <div class="slider">
        <nz-slider [nzMarks]="marksHGutter" [nzStep]="null" [nzMin]="8" [nzMax]="48" [(ngModel)]="hGutter"></nz-slider>
      </div>
      <span>Vertical Gutter (px): </span>
      <div class="slider">
        <nz-slider [nzMarks]="marksVGutter" [nzStep]="null" [nzMin]="8" [nzMax]="48" [(ngModel)]="vGutter"></nz-slider>
      </div>
      <span>Column Count:</span>
      <div class="slider">
        <nz-slider
          [nzMarks]="marksCount"
          [nzStep]="null"
          [nzMin]="2"
          [nzMax]="12"
          [(ngModel)]="count"
          (ngModelChange)="reGenerateArray($event)"
        ></nz-slider>
      </div>
    </div>

    <div class="gutter-example">
      <div nz-row [nzGutter]="[hGutter, vGutter]">
        <div nz-col class="gutter-row" [nzSpan]="24 / count" *ngFor="let i of array">
          <div class="grid-config">Column</div>
        </div>
        <div nz-col class="gutter-row" [nzSpan]="24 / count" *ngFor="let i of array">
          <div class="grid-config">Column</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .slider {
        width: 50%;
      }
      .slider-container {
        margin-bottom: 16px;
      }
      .grid-config {
        height: 120px;
        font-size: 14px;
        line-height: 120px;
        background: #0092ff;
        border-radius: 4px;
      }
    `
  ]
})
export class NzDemoGridPlaygroundComponent {
  hGutter = 16;
  vGutter = 16;
  count = 4;
  array = new Array(this.count);
  marksHGutter = {
    8: 8,
    16: 16,
    24: 24,
    32: 32,
    40: 40,
    48: 48
  };
  marksVGutter = {
    8: 8,
    16: 16,
    24: 24,
    32: 32,
    40: 40,
    48: 48
  };
  marksCount = {
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    8: 8,
    12: 12
  };
  reGenerateArray(count: number): void {
    this.array = new Array(count);
  }
}
