import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-basic',
  template: `
    <nz-space>
      <button *nzSpaceItem nz-button nzType="primary">Button</button>
      <nz-upload *nzSpaceItem nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76">
        <button nz-button>
          <span nz-icon nzType="upload"></span>
          Click to Upload
        </button>
      </nz-upload>
      <button
        *nzSpaceItem
        nz-button
        nz-popconfirm
        nzOkText="Yes"
        nzCancelText="No"
        nzPopconfirmTitle="Are you sure delete this task?"
      >
        Confirm
      </button>
    </nz-space>
  `
})
export class NzDemoSpaceBasicComponent {}
