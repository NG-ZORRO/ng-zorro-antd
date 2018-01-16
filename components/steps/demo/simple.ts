import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-simple',
  template: `
    <nz-steps [(nzCurrent)]="current">
      <nz-step [nzTitle]="'Finished'" [nzDescription]="'This is a description.'"></nz-step>
      <nz-step [nzTitle]="'In Progress'" [nzDescription]="nzDescription">
        <ng-template #nzDescription>
          <p>This is a description.</p>
        </ng-template>
      </nz-step>
      <nz-step [nzTitle]="'Waiting'" [nzDescription]="'This is a description.'"></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsSimpleComponent {
  current = 1;
}
