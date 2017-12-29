import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-vertical-mini',
  template: `
    <nz-steps [(nzCurrent)]="current" [nzDirection]="'vertical'" [nzSize]="'small'">
      <nz-step [nzTitle]="'Finished'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'In Progress'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'Waiting'" [nzDescription]="'This is a description.'"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsVerticalMiniComponent {
  current = 1;
}
