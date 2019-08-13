import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-upload-drag',
  template: `
    <nz-upload
      nzType="drag"
      [nzMultiple]="true"
      [nzLimit]="2"
      nzAction="https://jsonplaceholder.typicode.com/posts/"
      (nzChange)="handleChange($event)"
    >
      <p class="ant-upload-drag-icon">
        <i nz-icon nzType="inbox"></i>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </nz-upload>
  `
})
export class NzDemoUploadDragComponent {
  constructor(private msg: NzMessageService) {}
  // tslint:disable-next-line:no-any
  handleChange({ file, fileList }: { [key: string]: any }): void {
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
