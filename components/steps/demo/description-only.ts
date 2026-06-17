import { Component } from '@angular/core';

import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-description-only',
  imports: [NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step
        nzDescription="This is a description only. The title row is reserved so the description stays below the horizontal line."
      />
      <nz-step nzTitle="In Progress" nzDescription="This step has both title and description." />
      <nz-step nzDescription="Another step with description only. No title provided." />
    </nz-steps>
  `
})
export class NzDemoStepsDescriptionOnlyComponent {}
