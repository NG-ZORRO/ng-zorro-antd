import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-space-basic',
  imports: [NzButtonModule, NzIconModule, NzSpaceModule, NzPopconfirmModule, NzUploadModule],
  template: `
    <nz-space>
      <button *nzSpaceItem nz-button nzType="primary">Button</button>
      <nz-upload *nzSpaceItem nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76">
        <button nz-button>
          <nz-icon nzType="upload" />
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
