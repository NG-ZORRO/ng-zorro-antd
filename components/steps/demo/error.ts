import { Component } from '@angular/core';

import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-error',
  imports: [NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="1" nzStatus="error">
      <nz-step nzTitle="Finished" nzDescription="This is a description." />
      <nz-step nzTitle="In Progress" nzDescription="This is a description." />
      <nz-step nzTitle="Waiting" nzDescription="This is a description." />
    </nz-steps>
  `
})
export class NzDemoStepsErrorComponent {}
