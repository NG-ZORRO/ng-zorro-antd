import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-upload',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-upload.html'
})
export class NzDemoUploadComponent {
  NzDemoUploadBasicCode = require('!!raw-loader!./nz-demo-upload-basic.component');
  NzDemoUploadAvatarCode = require('!!raw-loader!./nz-demo-upload-avatar.component');
  NzDemoUploadFileListCode = require('!!raw-loader!./nz-demo-upload-file-list.component');
  NzDemoUploadPictureCardComponentCode = require('!!raw-loader!./nz-demo-upload-picture-card.component');
  NzDemoUploadFilterComponentCode = require('!!raw-loader!./nz-demo-upload-filter.component');
  NzDemoUploadPictureStyleComponentCode = require('!!raw-loader!./nz-demo-upload-picture-style.component');
  NzDemoUploadDragComponentCode = require('!!raw-loader!./nz-demo-upload-drag.component');
  NzDemoUploadManuallyComponentCode = require('!!raw-loader!./nz-demo-upload-manually.component');

  changeDEMO = `
  {
    file: { /* ... */ },
    fileList: [ /* ... */ ],
    event: { /* ... */ },
  }
  `;
  uploadFileDEMO = `
  {
    uid: 'uid',      // 文件唯一标识
    name: 'xx.png'   // 文件名
    status: 'done', // 状态有：uploading done error removed
    response: '{"status": "success"}' // 服务端响应内容
 }`;
}
