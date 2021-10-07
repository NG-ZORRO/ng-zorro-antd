import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-statistic-countup',
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic
          [nzValue]="(2998 | number)!"
          [nzTitle]="'Countup'"
          [nzCountUp]="true"
          (nzCountUpFinish)="onCompleteCountUp()"
        ></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticCountupComponent {
  onCompleteCountUp(): void {
    console.log('Count up finished.');
  }
}
