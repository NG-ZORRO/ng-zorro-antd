import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-basic',
  imports: [FormsModule, NzInputModule],
  template: ` <input nz-input placeholder="Basic usage" [(ngModel)]="value" /> `
})
export class NzDemoInputBasicComponent {
  value?: string;
}
