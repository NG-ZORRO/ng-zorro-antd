import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-text',
  template: `
    <span nz-text>Ant Design</span>
    <br>
    <span nz-text nzType="secondary">Ant Design</span>
    <br>
    <span nz-text nzType="warning">Ant Design</span>
    <br>
    <span nz-text nzType="danger">Ant Design</span>
    <br>
    <span nz-text nzDisabled>Ant Design</span>
    <br>
    <span nz-text><mark>Ant Design</mark></span>
    <br>
    <span nz-text><code>Ant Design</code></span>
    <br>
    <span nz-text><u>Ant Design</u></span>
    <br>
    <span nz-text><del>Ant Design</del></span>
    <br>
    <span nz-text><strong>Ant Design</strong></span>
  `,
  styles  : []
})
export class NzDemoTypographyTextComponent {

}
