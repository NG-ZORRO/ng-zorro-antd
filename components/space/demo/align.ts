import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-align',
  imports: [NzButtonModule, NzSpaceModule],
  template: `
    <div class="space-align-container">
      <div nz-space nzAlign="center" class="space-align-block">
        <ng-container *nzSpaceItem>center</ng-container>
        <button *nzSpaceItem nz-button nzType="primary">Button</button>
        <span *nzSpaceItem class="mock-block">Block</span>
      </div>

      <div nz-space nzAlign="start" class="space-align-block">
        <ng-container *nzSpaceItem>start</ng-container>
        <button *nzSpaceItem nz-button nzType="primary">Button</button>
        <span *nzSpaceItem class="mock-block">Block</span>
      </div>

      <div nz-space nzAlign="end" class="space-align-block">
        <ng-container *nzSpaceItem>end</ng-container>
        <button *nzSpaceItem nz-button nzType="primary">Button</button>
        <span *nzSpaceItem class="mock-block">Block</span>
      </div>

      <div nz-space nzAlign="baseline" class="space-align-block">
        <ng-container *nzSpaceItem>baseline</ng-container>
        <button *nzSpaceItem nz-button nzType="primary">Button</button>
        <span *nzSpaceItem class="mock-block">Block</span>
      </div>
    </div>
  `,
  styles: [
    `
      .space-align-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .space-align-block {
        margin: 8px 4px;
        border: 1px solid #40a9ff;
        padding: 4px;
        flex: none;
      }
      .space-align-block .mock-block {
        display: inline-block;
        padding: 32px 8px 16px;
        background: rgba(150, 150, 150, 0.2);
      }
    `
  ]
})
export class NzDemoSpaceAlignComponent {}
