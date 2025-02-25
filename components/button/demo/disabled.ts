import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-disabled',
  imports: [NzButtonModule],
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
    <a nz-button nzType="text">Text</a>
    <a nz-button nzType="text" disabled>Text(disabled)</a>
    <br />
    <a nz-button nzType="link">Link</a>
    <a nz-button nzType="link" disabled>Link(disabled)</a>
    <br />
    <a nz-button nzType="text" nzDanger>Danger Text</a>
    <a nz-button nzType="text" disabled nzDanger>Danger Text(disabled)</a>
    <br />
    <a nz-button nzType="link" nzDanger>Danger Link</a>
    <a nz-button nzType="link" disabled nzDanger>Danger Link(disabled)</a>
    <br />
    <button nz-button nzType="default" nzDanger>Danger Default</button>
    <button nz-button nzType="default" disabled nzDanger>Danger Default(disabled)</button>
    <div class="ghost-background">
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

      .ghost-background {
        padding: 8px;
        background: rgb(190, 200, 200);
      }

      .ghost-background [nz-button] {
        margin-right: 8px;
        margin-bottom: 0;
      }
    `
  ]
})
export class NzDemoButtonDisabledComponent {}
