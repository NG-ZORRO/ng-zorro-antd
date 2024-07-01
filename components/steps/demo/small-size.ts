import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-small-size',
  template: `
    <nz-steps [nzCurrent]="current" nzSize="small">
      <nz-step nzTitle="Finished"></nz-step>
      <nz-step nzTitle="In Progress"></nz-step>
      <nz-step nzTitle="Waiting"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsSmallSizeComponent {
  current = 1;
}
