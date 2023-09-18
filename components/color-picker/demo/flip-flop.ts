import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-color-picker-flip-flop',
  template: `
    <nz-color-picker [nzFlipFlop]="flipFlop" [(ngModel)]="color"></nz-color-picker>
    <ng-template #flipFlop>
      <button nz-button nzType="primary" [style.background-color]="color">Color</button>
    </ng-template>
  `
})
export class NzDemoColorPickerFlipFlopComponent {
  color = '#1677ff';
}
