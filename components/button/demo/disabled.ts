import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-disabled',
  template: `
    <button nz-button nzType="primary">Primary</button>
    <button nz-button nzType="primary" disabled>Primary(disabled)</button>
    <br />
    <button nz-button nzType="default">Default</button>
    <button nz-button nzType="default" disabled>Default(disabled)</button>
    <br />
    <button nz-button nzType="dashed">Dashed</button>
    <button nz-button nzType="dashed" disabled>Dashed(disabled)</button>
    <br />
    <a nz-button nzType="link">Link</a>
    <a nz-button nzType="link" disabled>Link(disabled)</a>
    <br />
    <a nz-button nzType="link" nzDanger>Danger Link</a>
    <a nz-button nzType="link" disabled nzDanger>Danger Link(disabled)</a>
    <br />
    <button nz-button nzType="default" nzDanger>Danger Default</button>
    <button nz-button nzType="default" disabled nzDanger>Danger Default(disabled)</button>
    <div style="padding: 8px 8px 0px; background: rgb(190, 200, 200);">
      <button nz-button nzGhost>Ghost</button>
      <button nz-button nzGhost disabled>Ghost(disabled)</button>
    </div>
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
export class NzDemoButtonDisabledComponent {}
