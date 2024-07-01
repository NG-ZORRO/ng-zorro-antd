import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-borderless',
  template: ` <nz-input-number nzBorderless [(ngModel)]="demoValue"></nz-input-number> `
})
export class NzDemoInputNumberBorderlessComponent {
  demoValue = 3;
}
