import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-dotted',
  template: `
    <nz-steps [(nzCurrent)]="current" nzProgressDot>
      <nz-step [nzTitle]="'Finished'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'In Progress'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'Waiting'" [nzDescription]="'This is a description.'"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsDottedComponent {
  current = 1;
}
