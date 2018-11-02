import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-block',
  template: `
    <button nz-button nzType="primary" nzBlock>Primary</button>
    <button nz-button nzType="default" nzBlock>Default</button>
    <button nz-button nzType="dashed" nzBlock>Dashed</button>
    <button nz-button nzType="danger" nzBlock>Danger</button>`,
  styles  : [
      `
      [nz-button] {
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonBlockComponent {
}
