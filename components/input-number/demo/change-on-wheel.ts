import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-change-on-wheel',
  imports: [FormsModule, NzInputNumberModule, NzButtonModule],
  template: ` <nz-input-number nzChangeOnWheel [(ngModel)]="value" (ngModelChange)="onChange($event)" /> `
})
export class NzDemoInputNumberChangeOnWheelComponent {
  value = 3;

  onChange(value: number): void {
    console.log(value);
  }
}
