import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-basic',
  template: `
    <nz-space>
      <nz-space-item>
        <button nz-button nzType="primary">Button</button>
      </nz-space-item>
      <nz-space-item>
        <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <button nz-button><i nz-icon nzType="upload"></i>Click to Upload</button>
        </nz-upload>
      </nz-space-item>
      <nz-space-item>
        <button nz-button nz-popconfirm nzOkText="Yes" nzCancelText="No" nzPopconfirmTitle="Are you sure delete this task?">Confirm</button>
      </nz-space-item>
    </nz-space>
  `
})
export class NzDemoSpaceBasicComponent {}
