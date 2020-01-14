import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-danger',
  template: `
    <button nz-button nzType="primary" nzDanger>Primary</button>
    <button nz-button nzType="default" nzDanger>Default</button>
    <button nz-button nzType="dashed" nzDanger>Dashed</button>
    <a nz-button nzType="link" nzDanger>Link</a>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonDangerComponent {}
