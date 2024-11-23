import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-icon',
  standalone: true,
  imports: [NzIconModule, NzStepsModule],
  template: `
    <nz-steps>
      <nz-step nzTitle="Login" nzStatus="finish" nzIcon="user"></nz-step>
      <nz-step nzTitle="Verification" nzStatus="finish" nzIcon="solution"></nz-step>
      <nz-step nzTitle="Pay" nzStatus="process" nzIcon="loading"></nz-step>
      <nz-step nzTitle="Done" nzStatus="wait" [nzIcon]="iconTemplate"></nz-step>
      <ng-template #iconTemplate><span nz-icon nzType="smile"></span></ng-template>
    </nz-steps>
  `
})
export class NzDemoStepsIconComponent {}
