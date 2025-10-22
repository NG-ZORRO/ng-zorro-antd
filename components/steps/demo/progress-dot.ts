import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-progress-dot',
  imports: [NzDividerModule, NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="1" nzProgressDot>
      <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
    <nz-divider></nz-divider>
    <nz-steps [nzCurrent]="1" nzProgressDot nzDirection="vertical">
      <nz-step nzTitle="Finished" nzDescription="This is a description. This is a description."></nz-step>
      <nz-step nzTitle="Finished" nzDescription="This is a description. This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="This is a description. This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsProgressDotComponent {}
