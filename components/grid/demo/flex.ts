import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-flex',
  template: `
    <div>
      <p>sub-element align left</p>
      <div nz-row nzType="flex" nzJustify="start">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align center</p>
      <div nz-row nzType="flex" nzJustify="center">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align right</p>
      <div nz-row nzType="flex" nzJustify="end">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element monospaced arrangement</p>
      <div nz-row nzType="flex" nzJustify="space-between">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
      <p>sub-element align full</p>
      <div nz-row nzType="flex" nzJustify="space-around">
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
        <div nz-col nzSpan="4">col-4</div>
      </div>
    </div>
  `
})
export class NzDemoGridFlexComponent {}
