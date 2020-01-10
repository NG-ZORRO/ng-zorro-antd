import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-grid-card',
  template: `
    <nz-card nzTitle="Cart Title">
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
    </nz-card>
  `
})
export class NzDemoCardGridCardComponent {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
}
