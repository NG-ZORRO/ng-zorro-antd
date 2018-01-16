import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-grid-card',
  template: `
    <nz-card>
      <ng-template #title>Cart Title</ng-template>
      <ng-template #body>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
        <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardGridCardComponent {
  gridStyle = {
    width    : '25%',
    textAlign: 'center',
  };
}
