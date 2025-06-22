import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-button-variant',
  imports: [NzButtonModule, NzFlexModule],
  template: `
    <nz-flex nzVertical nzGap="small">
      <nz-flex nzGap="small" nzWrap="wrap">
        <button nz-button nzColor="default" nzVariant="solid">Solid</button>
        <button nz-button nzColor="default" nzVariant="outlined">Outlined</button>
        <button nz-button nzColor="default" nzVariant="dashed">Dashed</button>
        <button nz-button nzColor="default" nzVariant="filled">Filled</button>
        <button nz-button nzColor="default" nzVariant="text">Text</button>
        <button nz-button nzColor="default" nzVariant="link">Link</button>
      </nz-flex>
      <nz-flex nzGap="small" nzWrap="wrap">
        <button nz-button nzColor="danger" nzVariant="solid">Solid</button>
        <button nz-button nzColor="danger" nzVariant="outlined">Outlined</button>
        <button nz-button nzColor="danger" nzVariant="dashed">Dashed</button>
        <button nz-button nzColor="danger" nzVariant="filled">Filled</button>
        <button nz-button nzColor="danger" nzVariant="text">Text</button>
        <button nz-button nzColor="danger" nzVariant="link">Link</button>
      </nz-flex>
      <nz-flex nzGap="small" nzWrap="wrap">
        <button nz-button nzColor="pink" nzVariant="solid">Solid</button>
        <button nz-button nzColor="pink" nzVariant="outlined">Outlined</button>
        <button nz-button nzColor="pink" nzVariant="dashed">Dashed</button>
        <button nz-button nzColor="pink" nzVariant="filled">Filled</button>
        <button nz-button nzColor="pink" nzVariant="text">Text</button>
        <button nz-button nzColor="pink" nzVariant="link">Link</button>
      </nz-flex>
      <nz-flex nzGap="small" nzWrap="wrap">
        <button nz-button nzColor="purple" nzVariant="solid">Solid</button>
        <button nz-button nzColor="purple" nzVariant="outlined">Outlined</button>
        <button nz-button nzColor="purple" nzVariant="dashed">Dashed</button>
        <button nz-button nzColor="purple" nzVariant="filled">Filled</button>
        <button nz-button nzColor="purple" nzVariant="text">Text</button>
        <button nz-button nzColor="purple" nzVariant="link">Link</button>
      </nz-flex>
      <nz-flex nzGap="small" nzWrap="wrap">
        <button nz-button nzColor="cyan" nzVariant="solid">Solid</button>
        <button nz-button nzColor="cyan" nzVariant="outlined">Outlined</button>
        <button nz-button nzColor="cyan" nzVariant="dashed">Dashed</button>
        <button nz-button nzColor="cyan" nzVariant="filled">Filled</button>
        <button nz-button nzColor="cyan" nzVariant="text">Text</button>
        <button nz-button nzColor="cyan" nzVariant="link">Link</button>
      </nz-flex>
    </nz-flex>
  `
})
export class NzDemoButtonVariantComponent {}
