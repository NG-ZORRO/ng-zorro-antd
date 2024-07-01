import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-clickable',
  template: `
    <nz-steps [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Finished" [nzDisabled]="disable" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
    <nz-divider></nz-divider>
    <nz-steps nzDirection="vertical" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
      <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsClickableComponent {
  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }
}
