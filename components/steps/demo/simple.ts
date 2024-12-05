import { Component } from '@angular/core';

import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-simple',
  imports: [NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzSubtitle="Left 00:00:08" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsSimpleComponent {}
