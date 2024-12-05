import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-radio-basic',
  imports: [FormsModule, NzRadioModule],
  template: `<label nz-radio ngModel>Radio</label>`
})
export class NzDemoRadioBasicComponent {}
