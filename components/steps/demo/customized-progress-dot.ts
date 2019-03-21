import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-customized-progress-dot',
  template: `
    <nz-steps [nzCurrent]="1" [nzProgressDot]="progressTemplate">
      <nz-step nzTitle="Finished" nzDescription="You can hover on the dot."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="You can hover on the dot."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="You can hover on the dot."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="You can hover on the dot."></nz-step>
    </nz-steps>
    <ng-template #progressTemplate let-dot let-status="status" let-index="index">
      <nz-popover nzContent="steps {{ index }} status: {{ status }}">
        <span nz-popover style="margin-left: -100%;">
          <ng-template [ngTemplateOutlet]="dot"></ng-template>
        </span>
      </nz-popover>
    </ng-template>
  `
})
export class NzDemoStepsCustomizedProgressDotComponent {}
