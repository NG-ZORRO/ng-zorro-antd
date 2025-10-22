import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-basic',
  imports: [FormsModule, NzInputNumberLegacyModule],
  template: `<nz-input-number [(ngModel)]="value" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>`
})
export class NzDemoInputNumberLegacyBasicComponent {
  value = 3;
}
