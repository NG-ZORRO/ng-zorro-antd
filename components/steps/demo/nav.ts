import { Component } from '@angular/core';

import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-nav',
  imports: [NzStepsModule],
  template: `
    <nz-steps nzType="navigation" nzSize="small" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Step 1" nzSubtitle="00:00:05" nzStatus="finish" nzDescription="This is a description." />
      <nz-step nzTitle="Step 2" nzSubtitle="00:01:02" nzStatus="process" nzDescription="This is a description." />
      <nz-step
        nzTitle="Step 3"
        nzSubtitle="waiting for long long time"
        nzStatus="wait"
        nzDescription="This is a description."
      />
    </nz-steps>
    <nz-steps nzType="navigation" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Step 1" nzStatus="finish" />
      <nz-step nzTitle="Step 2" nzStatus="process" />
      <nz-step nzTitle="Step 3" nzStatus="wait" />
      <nz-step nzTitle="Step 4" nzStatus="wait" />
    </nz-steps>
    <nz-steps nzType="navigation" nzSize="small" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="finish 1" nzStatus="finish" />
      <nz-step nzTitle="finish 2" nzStatus="finish" />
      <nz-step nzTitle="current process" nzStatus="process" />
      <nz-step nzTitle="wait" nzStatus="wait" nzDisabled />
    </nz-steps>
  `,
  styles: `
    nz-steps {
      margin-bottom: 60px;
      box-shadow: rgb(232, 232, 232) 0 -1px 0 0 inset;
    }
  `
})
export class NzDemoStepsNavComponent {
  index = 0;

  onIndexChange(event: number): void {
    this.index = event;
  }
}
