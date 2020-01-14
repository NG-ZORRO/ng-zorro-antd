import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-flex',
  template: `
    <div>
      <p>sub-element align left</p>
      <div nz-row nzJustify="start">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align center</p>
      <div nz-row nzJustify="center">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align right</p>
      <div nz-row nzJustify="end">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element monospaced arrangement</p>
      <div nz-row nzJustify="space-between">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align full</p>
      <div nz-row nzJustify="space-around">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
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
export class NzDemoGridFlexComponent {}
