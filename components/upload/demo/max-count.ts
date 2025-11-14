import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule, type NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-max-count',
  imports: [NzUploadModule, NzButtonModule, NzFlexModule],
  template: `
    <div nz-flex nzVertical nzGap="2rem">
      <nz-upload
        nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        [nzHeaders]="{ authorization: 'authorization-text' }"
        [nzMaxCount]="1"
        (nzChange)="handleChange($event)"
      >
        <button nz-button>Upload (Max: 1)</button>
      </nz-upload>
      <nz-upload
        nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        [nzHeaders]="{ authorization: 'authorization-text' }"
        [nzMaxCount]="3"
        (nzChange)="handleChange($event)"
      >
        <button nz-button>Upload (Max: 3)</button>
      </nz-upload>
    </div>
  `
})
export class NzDemoUploadMaxCountComponent {
  readonly #messageService = inject(NzMessageService);
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.#messageService.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.#messageService.error(`${info.file.name} file upload failed.`);
    }
  }
}
