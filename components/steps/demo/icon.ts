import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-icon',
  imports: [NzIconModule, NzStepsModule],
  template: `
    <nz-steps>
      <nz-step nzTitle="Login" nzStatus="finish" nzIcon="user" />
      <nz-step nzTitle="Verification" nzStatus="finish" nzIcon="solution" />
      <nz-step nzTitle="Pay" nzStatus="process" nzIcon="loading" />
      <nz-step nzTitle="Done" nzStatus="wait" [nzIcon]="iconTemplate" />
      <ng-template #iconTemplate><nz-icon nzType="smile" /></ng-template>
    </nz-steps>
  `
})
export class NzDemoStepsIconComponent {}
