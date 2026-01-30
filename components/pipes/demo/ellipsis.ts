import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEllipsisPipe } from 'ng-zorro-antd/pipes';

@Component({
  selector: 'nz-demo-pipes-ellipsis',
  imports: [FormsModule, NzInputModule, NzEllipsisPipe],
  template: `
    <input type="text" nz-input [(ngModel)]="str" />
    <br />
    <p>{{ str | nzEllipsis: 36 : '...' }}</p>
  `,
  styles: `
    p {
      padding: 8px 12px;
    }
  `
})
export class NzDemoPipesEllipsisComponent {
  str = 'Ant Design, a design language for background applications';
}
