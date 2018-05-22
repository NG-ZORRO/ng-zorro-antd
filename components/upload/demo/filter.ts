import { Component } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-upload-filter',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    [nzFileList]="fileList"
    nzMultiple
    [nzLimit]="2"
    (nzChange)="handleChange($event)">
    <button nz-button>
      <i class="anticon anticon-upload"></i><span>Upload</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadFilterComponent {
  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];

  // tslint:disable-next-line:no-any
  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    this.fileList = fileList.filter(item => {
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }
}
