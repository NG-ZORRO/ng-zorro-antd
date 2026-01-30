import { Component } from '@angular/core';

import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-start-index',
  imports: [NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="current" [nzStartIndex]="3" nzSize="small">
      <nz-step nzTitle="Finished" />
      <nz-step nzTitle="In Progress" />
      <nz-step nzTitle="Waiting" />
    </nz-steps>
  `
})
export class NzDemoStepsStartIndexComponent {
  current = 3;
}
