import { Component } from '@angular/core';
import { UploadFile, UploadFilter, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-upload-filter',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    [nzFileList]="fileList"
    nzMultiple
    [nzLimit]="2"
    [nzFilter]="filters"
    (nzChange)="handleChange($event)">
    <button nz-button>
      <i nz-icon type="upload"></i><span>Upload</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadFilterComponent {

  constructor(private msg: NzMessageService) {}

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn  : (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['image/png'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.msg.error(`包含文件格式不正确，只支持 png 格式`);
          return filterFiles;
        }
        return fileList;
      }
    }
  ];

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
