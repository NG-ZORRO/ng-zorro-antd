// tslint:disable
import { Component } from '@angular/core';
import { NzMessageService } from './../../components/message/nz-message.service';
import { UploadFile } from './../../components/upload/interface';

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
      <i class="anticon anticon-inbox"></i>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  </nz-upload>
  `,
  styles: [`
  :host ::ng-deep nz-upload { display: block; }
  :host ::ng-deep .ant-upload.ant-upload-drag { height: 180px; }
  `]
})
export class NzDemoUploadDragComponent {
  constructor(private msg: NzMessageService) {}
  handleChange({ file, fileList }) {
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
