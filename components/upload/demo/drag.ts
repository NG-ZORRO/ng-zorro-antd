import { Component } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-upload-drag',
  template: `
  <nz-upload
    nzType="drag"
    [nzMultiple]="true"
    [nzLimit]="2"
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    (nzChange)="handleChange($event)">
    <p class="ant-upload-drag-icon">
      <i nz-icon type="inbox"></i>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  </nz-upload>
  `,
  styles: [
    `
  :host ::ng-deep nz-upload { display: block; }
  :host ::ng-deep .ant-upload.ant-upload-drag { height: 180px; }
  `
  ]
})
export class NzDemoUploadDragComponent {
  constructor(private msg: NzMessageService) {}
  // tslint:disable-next-line:typedef
  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
