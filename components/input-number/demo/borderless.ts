import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-borderless',
  template: ` <nz-input-number nzBorderless [nzMin]="1" [nzMax]="3" [ngModel]="value"></nz-input-number> `
})
export class NzDemoInputNumberBorderlessComponent {
  value = 3;
}
