import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-icon',
  template: `
    <nz-steps>
      <nz-step nzTitle="Login" nzStatus="finish" nzIcon="anticon anticon-user"></nz-step>
      <nz-step nzTitle="Verification" nzStatus="finish" nzIcon="anticon anticon-solution"></nz-step>
      <nz-step nzTitle="Pay" nzStatus="process" nzIcon="anticon anticon-spin anticon-loading"></nz-step>
      <nz-step nzTitle="Done" nzStatus="wait" [nzIcon]="iconTemplate"></nz-step>
      <ng-template #iconTemplate><i class="anticon anticon-smile-o"></i></ng-template>
    </nz-steps>
  `
})
export class NzDemoStepsIconComponent {
}
