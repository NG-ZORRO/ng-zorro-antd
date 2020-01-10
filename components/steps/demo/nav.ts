import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-nav',
  template: `
    <nz-steps nzType="navigation" nzSize="small" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Step 1" nzSubtitle="00:00:05" nzStatus="finish" nzDescription="This is a description."> </nz-step>
      <nz-step nzTitle="Step 2" nzSubtitle="00:01:02" nzStatus="process" nzDescription="This is a description."> </nz-step>
      <nz-step nzTitle="Step 3" nzSubtitle="waiting for long long time" nzStatus="wait" nzDescription="This is a description."> </nz-step>
    </nz-steps>
    <nz-steps nzType="navigation" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="Step 1" nzStatus="finish"></nz-step>
      <nz-step nzTitle="Step 2" nzStatus="process"></nz-step>
      <nz-step nzTitle="Step 3" nzStatus="wait"></nz-step>
      <nz-step nzTitle="Step 4" nzStatus="wait"></nz-step>
    </nz-steps>
    <nz-steps nzType="navigation" nzSize="small" [nzCurrent]="index" (nzIndexChange)="onIndexChange($event)">
      <nz-step nzTitle="finish 1" nzStatus="finish"></nz-step>
      <nz-step nzTitle="finish 2" nzStatus="finish"></nz-step>
      <nz-step nzTitle="current process" nzStatus="process"></nz-step>
      <nz-step nzTitle="wait" nzStatus="wait" nzDisabled></nz-step>
    </nz-steps>
  `,
  styles: [
    `
      nz-steps {
        display: block;
        margin-bottom: 60px;
        box-shadow: rgb(232, 232, 232) 0px -1px 0px 0 inset;
      }
    `
  ]
})
export class NzDemoStepsNavComponent {
  index = 0;

  onIndexChange(event: number): void {
    this.index = event;
  }
}
