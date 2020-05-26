import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-default-file-list',
  template: `
    <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" [nzFileList]="fileList">
      <button nz-button><i nz-icon nzType="upload"></i>Upload</button>
    </nz-upload>
  `
})
export class NzDemoUploadDefaultFileListComponent {
  fileList: NzUploadFile[] = [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
}
