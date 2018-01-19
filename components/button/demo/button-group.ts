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
      <button nz-button nzType="default" disabled>
        <span>L</span>
      </button>
      <button nz-button nzType="default" disabled>
        <span>M</span>
      </button>
      <button nz-button nzType="default" disabled>
        <span>R</span>
      </button>
    </nz-button-group>
    <nz-button-group>
      <button nz-button nzType="primary" disabled>
        <span>L</span>
      </button>
      <button nz-button nzType="default" disabled>
        <span>M</span>
      </button>
      <button nz-button nzType="default">
        <span>M</span>
      </button>
      <button nz-button nzType="dashed" disabled>
        <span>R</span>
      </button>
    </nz-button-group>
    <h4>With Icon</h4>
    <nz-button-group>
      <button nz-button nzType="primary">
        <i class=" anticon anticon-left"></i>
        <span>Go back</span>
      </button>
      <button nz-button nzType="primary">
        <span>Go forward</span>
        <i class=" anticon anticon-right"></i>
      </button>
    </nz-button-group>
    <nz-button-group>
      <button nz-button nzType="primary">
        <i class=" anticon anticon-cloud"></i>
      </button>
      <button nz-button nzType="primary">
        <i class=" anticon anticon-cloud-download"></i>
      </button>
    </nz-button-group>`,
  styles  : [
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
      nz-button-group{
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoButtonButtonGroupComponent {
}
