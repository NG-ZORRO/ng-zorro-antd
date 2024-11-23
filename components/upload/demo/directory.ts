import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-directory',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" nzDirectory>
      <button nz-button>
        <span nz-icon nzType="upload"></span>
        Upload Directory
      </button>
    </nz-upload>
  `
})
export class NzDemoUploadDirectoryComponent {}
