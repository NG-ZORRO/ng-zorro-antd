import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-steps-icon',
  template: `
    <nz-steps>
      <nz-step [nzTitle]="'Login'" [nzStatus]="'finish'">
        <ng-template #nzIcon>
          <i class="anticon anticon-user"></i>
        </ng-template>
      </nz-step>
      <nz-step [nzTitle]="'Verification'" [nzStatus]="'finish'">
        <ng-template #nzIcon>
          <i class="anticon anticon-solution"></i>
        </ng-template>
      </nz-step>
      <nz-step [nzTitle]="'Pay'" [nzStatus]="'process'">
        <ng-template #nzIcon>
          <i class="anticon anticon-credit-card"></i>
        </ng-template>
      </nz-step>
      <nz-step [nzTitle]="'Done'" [nzStatus]="'wait'">
        <ng-template #nzIcon>
          <i class="anticon anticon-smile-o"></i>
        </ng-template>
      </nz-step>
    </nz-steps>
  `
})
export class NzDemoStepsIconComponent { }
