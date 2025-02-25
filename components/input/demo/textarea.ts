import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-textarea',
  imports: [FormsModule, NzInputModule],
  template: `<textarea rows="4" nz-input [(ngModel)]="inputValue"></textarea>`
})
export class NzDemoInputTextareaComponent {
  inputValue?: string;
}
