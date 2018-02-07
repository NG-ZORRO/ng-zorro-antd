import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-progress-dot',
  template: `
    <nz-steps [nzCurrent]="1" nzProgressDot>
      <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsProgressDotComponent {
}
