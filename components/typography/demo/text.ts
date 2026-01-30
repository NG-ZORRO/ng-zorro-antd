import { Component } from '@angular/core';

import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-typography-text',
  imports: [NzTypographyModule],
  template: `
    <span nz-typography>Ant Design (default)</span>
    <span nz-typography nzType="secondary">Ant Design (secondary)</span>
    <span nz-typography nzType="success">Ant Design (success)</span>
    <span nz-typography nzType="warning">Ant Design (warning)</span>
    <span nz-typography nzType="danger">Ant Design (danger)</span>
    <span nz-typography nzDisabled>Ant Design (disabled)</span>
    <span nz-typography><mark>Ant Design (mark)</mark></span>
    <span nz-typography><code>Ant Design (code)</code></span>
    <span nz-typography><kbd>Ant Design (keyboard)</kbd></span>
    <span nz-typography><u>Ant Design (underline)</u></span>
    <span nz-typography><del>Ant Design (delete)</del></span>
    <span nz-typography><strong>Ant Design (strong)</strong></span>
    <span nz-typography>
      <a href="https://ng.ant.design/" target="_blank">Ant Design</a>
    </span>
  `,
  styles: `
    span[nz-typography] {
      display: block;
    }
    span[nz-typography] + span[nz-typography] {
      margin-top: 8px;
    }
  `
})
export class NzDemoTypographyTextComponent {}
