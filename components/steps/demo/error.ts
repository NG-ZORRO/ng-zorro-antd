import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-error',
  template: `
    <nz-steps [(nzCurrent)]="current" [nzStatus]="'error'">
      <nz-step [nzTitle]="'Finished'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'In Progress'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'Waiting'" [nzDescription]="'This is a description.'"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsErrorComponent {
  current = 1;
}
