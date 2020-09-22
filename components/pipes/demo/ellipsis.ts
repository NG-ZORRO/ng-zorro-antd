import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-ellipsis',
  template: `
    <input type="text" nz-input [(ngModel)]="str" />
    <br />
    <p>{{ str | nzEllipsis: 36:'...' }}</p>
  `,
  styles: [
    `
      p {
        padding: 8px 12px;
      }
    `
  ]
})
export class NzDemoPipesEllipsisComponent {
  str = 'Ant Design, a design language for background applications';
}
