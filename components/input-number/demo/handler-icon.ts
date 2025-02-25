import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-handler-icon',
  imports: [FormsModule, NzInputNumberModule, NzIconModule],
  template: `
    <nz-input-number [(ngModel)]="value">
      <nz-icon nzInputNumberUpIcon nzType="arrow-up" />
      <nz-icon nzInputNumberDownIcon nzType="arrow-down" />
    </nz-input-number>
  `
})
export class NzDemoInputNumberHandlerIconComponent {
  value = 3;
}
