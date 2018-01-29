import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-button-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <button nz-button nzType="primary">
      <span>Primary</span>
    </button>
    <button nz-button nzType="default">
      <span>Default</span>
    </button>
    <button nz-button nzType="dashed">
      <span>Dashed</span>
    </button>
    <button nz-button nzType="danger">
      <span>Danger</span>
    </button>`,
  styles       : [
      `
      [id^=components-button-demo-] [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      [id^=components-button-demo-] nz-button-group [nz-button] {
        margin-right: 0;
      }
    `
  ]
})
export class NzDemoButtonBasicComponent {
}
