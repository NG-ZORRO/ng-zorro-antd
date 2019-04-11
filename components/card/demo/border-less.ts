import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-border-less',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <nz-card style="width:300px;" [nzBordered]="false" nzTitle="Card title" [nzExtra]="extraTemplate">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </nz-card>
    </div>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class NzDemoCardBorderLessComponent {}
