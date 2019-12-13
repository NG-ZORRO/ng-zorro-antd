import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-event',
  template: `
    <nz-slider [(ngModel)]="singleValue" (ngModelChange)="onChange($event)" (nzOnAfterChange)="onAfterChange($event)"></nz-slider>
    <nz-slider
      nzRange
      [nzStep]="10"
      [(ngModel)]="rangeValue"
      (ngModelChange)="onChange($event)"
      (nzOnAfterChange)="onAfterChange($event)"
    ></nz-slider>
  `
})
export class NzDemoSliderEventComponent {
  singleValue = 30;
  rangeValue = [20, 50];

  onChange(value: number): void {
    console.log(`onChange: ${value}`);
  }

  onAfterChange(value: number): void {
    console.log(`onAfterChange: ${value}`);
  }
}
