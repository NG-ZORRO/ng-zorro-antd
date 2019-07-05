import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-button-group',
  template: `
    <h4>Basic</h4>
    <nz-button-group>
      <button nz-button>Cancel</button>
      <button nz-button nzType="primary">OK</button>
    </nz-button-group>
    <nz-button-group>
      <button nz-button nzType="default" disabled>L</button>
      <button nz-button nzType="default" disabled>M</button>
      <button nz-button nzType="default" disabled>R</button>
    </nz-button-group>
    <nz-button-group>
      <button nz-button nzType="primary" disabled>L</button>
      <button nz-button nzType="default" disabled>M</button>
      <button nz-button nzType="default">M</button>
      <button nz-button nzType="dashed" disabled>R</button>
    </nz-button-group>
    <h4>With Icon</h4>
    <nz-button-group>
      <button nz-button nzType="primary"><i nz-icon nzType="left"></i> Go back</button>
      <button nz-button nzType="primary">Go forward<i nz-icon nzType="right"></i></button>
    </nz-button-group>
    <nz-button-group>
      <button nz-button nzType="primary"><i nz-icon nzType="cloud"></i></button>
      <button nz-button nzType="primary"><i nz-icon nzType="cloud-download"></i></button>
    </nz-button-group>
  `,
  styles: [
    `
      h4 {
        margin: 16px 0;
        font-size: 14px;
        line-height: 1;
        font-weight: normal;
      }

      h4:first-child {
        margin-top: 0;
      }

      [nz-button] {
        margin-bottom: 12px;
      }

      nz-button-group {
        margin-bottom: 8px;
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoButtonButtonGroupComponent {}
