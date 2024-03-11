import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-open',
  template: `
    <div class="open">
      <nz-float-button-group [nzIcon]="icon" [nzOpen]="isOpen" nzType="primary" nzTrigger="hover" style="right: 24px">
        <nz-float-button></nz-float-button>
        <nz-float-button [nzIcon]="inner"></nz-float-button>
      </nz-float-button-group>
      <nz-switch [(ngModel)]="isOpen"></nz-switch>
      <ng-template #icon>
        <span nz-icon nzType="customer-service" nzTheme="outline"></span>
      </ng-template>
      <ng-template #inner>
        <span nz-icon nzType="comment" nzTheme="outline"></span>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .open {
        height: 300px;
        position: relative;
      }
      nz-float-button-group,
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonOpenComponent {
  isOpen: boolean = true;
}
