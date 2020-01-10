import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-simple',
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzSubtitle="Left 00:00:08" nzDescription="This is a description."> </nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsSimpleComponent {}
