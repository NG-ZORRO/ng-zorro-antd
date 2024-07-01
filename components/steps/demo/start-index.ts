import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-start-index',
  template: `
    <nz-steps [nzCurrent]="current" [nzStartIndex]="3" nzSize="small">
      <nz-step nzTitle="Finished"></nz-step>
      <nz-step nzTitle="In Progress"></nz-step>
      <nz-step nzTitle="Waiting"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsStartIndexComponent {
  current = 3;
}
