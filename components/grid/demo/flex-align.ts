import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-flex-align',
  template: `
    <div>
      <p>Align Top</p>
      <div nz-row nzJustify="center" nzAlign="top">
        <div nz-col nzSpan="4"><p class="height-100">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-50">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-120">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-80">col-4</p></div>
      </div>
      <p>Align Center</p>
      <div nz-row nzJustify="space-around" nzAlign="middle">
        <div nz-col nzSpan="4"><p class="height-100">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-50">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-120">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-80">col-4</p></div>
      </div>
      <p>Align Bottom</p>
      <div nz-row nzJustify="space-between" nzAlign="bottom">
        <div nz-col nzSpan="4"><p class="height-100">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-50">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-120">col-4</p></div>
        <div nz-col nzSpan="4"><p class="height-80">col-4</p></div>
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
export class NzDemoGridFlexAlignComponent {}
