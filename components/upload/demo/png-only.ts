import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule, type NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-png-only',
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload [nzBeforeUpload]="beforeUpload">
      <button nz-button>
        <nz-icon nzType="upload" />
        Upload only png
      </button>
    </nz-upload>
  `
})
export class NzDemoUploadPngOnlyComponent {
  readonly #messageService = inject(NzMessageService);
  beforeUpload = (file: NzUploadFile): boolean => {
    const isPng = file.type === 'image/png';
    if (!isPng) {
      this.#messageService.error('You can only upload png file!');
    }
    return isPng;
  };
}
