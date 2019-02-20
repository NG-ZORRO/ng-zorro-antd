import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-back-top-custom',
  template: `
    <nz-back-top [nzTemplate]="tpl" [nzVisibilityHeight]="100" (nzOnClick)="notify()">
      <ng-template #tpl>
        <div class="ant-back-top-inner">UP</div>
      </ng-template>
    </nz-back-top>
    Scroll down to see the bottom-right
    <strong> blue </strong>
    button.
  `,
  styles  : [ `
    .ant-back-top-inner {
      height: 40px;
      width: 40px;
      line-height: 40px;
      border-radius: 4px;
      background-color: #1088e9;
      color: #fff;
      text-align: center;
      font-size: 20px;
    }

    strong {
      color: #1088e9;
    }
  ` ]
})
export class NzDemoBackTopCustomComponent {
  notify(): void {
    console.log('notify');
  }
}
