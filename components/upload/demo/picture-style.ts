import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-picture-style',
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload
      nzAction="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      nzListType="picture"
      [(nzFileList)]="fileList"
    >
      <button nz-button>
        <nz-icon nzType="upload" />
        Upload
      </button>
    </nz-upload>
  `
})
export class NzDemoUploadPictureStyleComponent {
  fileList: NzUploadFile[] = [
    {
      uid: '0',
      name: 'xxx.png',
      status: 'uploading',
      percent: 33
    },
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'zzz.png',
      status: 'error'
    }
  ];
}
