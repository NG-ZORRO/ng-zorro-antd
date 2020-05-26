import { Component } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-file-list',
  template: `
    <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" [nzFileList]="fileList" (nzChange)="handleChange($event)">
      <button nz-button><i nz-icon nzType="upload"></i>Upload</button>
    </nz-upload>
  `
})
export class NzDemoUploadFileListComponent {
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}
