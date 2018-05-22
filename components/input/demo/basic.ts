import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-basic',
  template: `
    <input nz-input placeholder="Basic usage" [(ngModel)]="value">
  `
})
export class NzDemoInputBasicComponent {
  value: string;
}
