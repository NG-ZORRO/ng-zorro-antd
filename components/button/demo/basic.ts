import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-basic',
  template: `
    <button nz-button nzType="primary">Primary</button>
    <button nz-button nzType="default">Default</button>
    <button nz-button nzType="dashed">Dashed</button>
    <button nz-button nzType="danger">Danger</button>`,
  styles  : [
      `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonBasicComponent {
}
