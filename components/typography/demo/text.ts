import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-text',
  template: `
    <span nz-typography>Ant Design</span>
    <br />
    <span nz-typography nzType="secondary">Ant Design</span>
    <br />
    <span nz-typography nzType="warning">Ant Design</span>
    <br />
    <span nz-typography nzType="danger">Ant Design</span>
    <br />
    <span nz-typography nzDisabled>Ant Design</span>
    <br />
    <span nz-typography><mark>Ant Design</mark></span>
    <br />
    <span nz-typography><code>Ant Design</code></span>
    <br />
    <span nz-typography><u>Ant Design</u></span>
    <br />
    <span nz-typography><del>Ant Design</del></span>
    <br />
    <span nz-typography><strong>Ant Design</strong></span>
  `,
  styles: []
})
export class NzDemoTypographyTextComponent {}
