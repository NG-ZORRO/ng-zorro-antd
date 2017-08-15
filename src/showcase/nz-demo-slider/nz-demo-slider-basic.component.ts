import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-basic',
  template: `
    <nz-slider [nzDefaultValue]="30" [nzDisabled]="disabled"></nz-slider>
    <nz-slider nzRange [nzDefaultValue]="[20, 50]" [nzDisabled]="disabled"></nz-slider>
    Disabled: <nz-switch nzSize="small" [(ngModel)]="disabled"></nz-switch>
  `
})
export class NzDemoSliderBasicComponent {

  disabled = false;

}
