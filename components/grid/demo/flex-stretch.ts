import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'nz-demo-grid-flex-stretch',
  imports: [NzDividerModule, NzGridModule],
  template: `
    <nz-divider nzText="Percentage columns" nzOrientation="left" />
    <div nz-row>
      <div nz-col nzFlex="2">2 / 5</div>
      <div nz-col nzFlex="3">3 / 5</div>
    </div>
    <nz-divider nzText="Fill rest" nzOrientation="left" />
    <div nz-row>
      <div nz-col nzFlex="100px">100px</div>
      <div nz-col nzFlex="auto">Fill Rest</div>
    </div>
    <nz-divider nzText="Raw flex style" nzOrientation="left" />
    <div nz-row>
      <div nz-col nzFlex="1 1 200px">1 1 200px</div>
      <div nz-col nzFlex="0 1 300px">0 1 300px</div>
    </div>

    <div nz-row [nzWrap]="false">
      <div nz-col nzFlex="none">
        <div [style.padding-inline.px]="16">none</div>
      </div>
      <div nz-col nzFlex="auto">auto with no-wrap</div>
    </div>
  `,
  styles: `
    [nz-row] {
      background-color: rgba(128, 128, 128, 0.08);
    }
  `
})
export class NzDemoGridFlexStretchComponent {}
