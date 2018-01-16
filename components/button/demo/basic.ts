import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-button-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <button nz-button [nzType]="'primary'">
      <span>Primary</span>
    </button>
    <button nz-button [nzType]="'default'">
      <span>Default</span>
    </button>
    <button nz-button [nzType]="'dashed'">
      <span>Dashed</span>
    </button>
    <button nz-button [nzType]="'danger'">
      <span>Danger</span>
    </button>`,
  styles       : [
      `#components-button-demo-button-group h4 {
      margin: 16px 0;
      font-size: 14px;
      line-height: 1;
      font-weight: normal;
    }

    #components-button-demo-button-group h4:first-child {
      margin-top: 0;
    }

    #components-button-demo-button-group .ant-btn-group {
      margin-right: 8px;
    }

    [id^=components-button-demo-] .ant-btn {
      margin-right: 8px;
      margin-bottom: 12px;
    }

    [id^=components-button-demo-] .ant-btn-group > .ant-btn {
      margin-right: 0;
    }
    `
  ]
})
export class NzDemoButtonBasicComponent {
}
