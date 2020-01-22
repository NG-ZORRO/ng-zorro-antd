import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-flex-order',
  template: `
    <div>
      <div nz-row>
        <div nz-col nzSpan="6" nzOrder="4">
          1 col-order-4
        </div>
        <div nz-col nzSpan="6" nzOrder="3">
          2 col-order-3
        </div>
        <div nz-col nzSpan="6" nzOrder="2">
          3 col-order-2
        </div>
        <div nz-col nzSpan="6" nzOrder="1">
          4 col-order-1
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      [nz-row] {
        background-color: rgba(128, 128, 128, 0.08);
      }
    `
  ]
})
export class NzDemoGridFlexOrderComponent {}
