import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-type',
  template: `
    <div class="type">
      <nz-float-button nzType="primary" style="right: 24px" [nzIcon]="icon"></nz-float-button>
      <nz-float-button nzType="default" style="right: 94px" [nzIcon]="icon"></nz-float-button>
    </div>
    <ng-template #icon>
      <span nz-icon nzType="question-circle" nzTheme="outline"></span>
    </ng-template>
  `,
  styles: [
    `
      .type {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonTypeComponent {}
