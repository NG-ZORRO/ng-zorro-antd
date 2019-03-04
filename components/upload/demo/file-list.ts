import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-file-list',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    [nzFileList]="fileList">
    <button nz-button>
      <i nz-icon type="upload"></i><span>Upload</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadFileListComponent {
  fileList = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
}
