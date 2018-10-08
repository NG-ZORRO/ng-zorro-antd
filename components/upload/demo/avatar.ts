import { Component } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-upload-avatar',
  template: `
  <nz-upload class="avatar-uploader"
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    nzName="avatar"
    nzListType="picture-card"
    [nzShowUploadList]="false"
    [nzBeforeUpload]="beforeUpload"
    (nzChange)="handleChange($event)">
    <ng-container *ngIf="!avatarUrl">
      <i nz-icon type="plus"></i>
      <div class="ant-upload-text">Upload</div>
    </ng-container>
    <img *ngIf="avatarUrl" [src]="avatarUrl" class="avatar">
  </nz-upload>
  `,
  styles: [
    `
    :host ::ng-deep .avatar-uploader > .ant-upload {
      width: 128px;
      height: 128px;
    }
    :host ::ng-deep .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }
    :host ::ng-deep .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  `
  ]
})
export class NzDemoUploadAvatarComponent {
  loading = false;
  avatarUrl: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.msg.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        this.avatarUrl = img;
      });
    }
  }
}
