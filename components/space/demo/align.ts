import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-align',
  template: `
    <div class="space-align-container">
      <div nz-space nzAlign="center" class="space-align-block">
        <nz-space-item>center</nz-space-item>
        <nz-space-item>
          <button nz-button nzType="primary">Button</button>
        </nz-space-item>
        <span nz-space-item class="mock-block">Block</span>
      </div>
      <div nz-space nzAlign="start" class="space-align-block">
        <nz-space-item>start</nz-space-item>
        <nz-space-item>
          <button nz-button nzType="primary">Button</button>
        </nz-space-item>
        <span nz-space-item class="mock-block">Block</span>
      </div>
      <div nz-space nzAlign="end" class="space-align-block">
        <nz-space-item>end</nz-space-item>
        <nz-space-item>
          <button nz-button nzType="primary">Button</button>
        </nz-space-item>
        <span nz-space-item class="mock-block">Block</span>
      </div>
      <div nz-space nzAlign="baseline" class="space-align-block">
        <nz-space-item>baseline</nz-space-item>
        <nz-space-item>
          <button nz-button nzType="primary">Button</button>
        </nz-space-item>
        <span nz-space-item class="mock-block">Block</span>
      </div>
    </div>
  `,
  styles: [
    `
      .space-align-container {
        display: flex;
        align-item: flex-start;
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
