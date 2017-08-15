import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-event',
  template: `
    <nz-slider
      [nzDefaultValue]="30"
      [(ngModel)]="singleValue" (ngModelChange)="onChange($event)"
      (nzOnAfterChange)="onAfterChange($event)"
    ></nz-slider>
    <nz-slider
      nzRange
      [nzStep]="10"
      [nzDefaultValue]="[20, 50]"
      [(ngModel)]="rangeValue" (ngModelChange)="onChange($event)"
      (nzOnAfterChange)="onAfterChange($event)"
    ></nz-slider>
  `
})
export class NzDemoSliderEventComponent {

  singleValue;
  rangeValue;

  onChange(value) {
    console.log(`onChange: ${value}`);
  }

  onAfterChange(value) {
    console.log(`onAfterChange: ${value}`);
  }

}
