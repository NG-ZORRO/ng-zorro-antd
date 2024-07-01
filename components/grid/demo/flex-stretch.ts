import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-flex-stretch',
  template: `
    <div>
      <p>Percentage columns</p>
      <div nz-row>
        <div nz-col nzFlex="2">2 / 5</div>
        <div nz-col nzFlex="3">3 / 5</div>
      </div>
      <p>Fill rest</p>
      <div nz-row>
        <div nz-col nzFlex="100px">100px</div>
        <div nz-col nzFlex="auto">Fill Rest</div>
      </div>
      <p>Raw flex style</p>
      <div nz-row>
        <div nz-col nzFlex="1 1 200px">1 1 200px</div>
        <div nz-col nzFlex="0 1 300px">0 1 300px</div>
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
export class NzDemoGridFlexStretchComponent {}
