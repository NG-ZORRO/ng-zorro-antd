// tslint:disable
import { Component } from '@angular/core';
import { NzMessageService } from './../../components/message/nz-message.service';
import { UploadFile } from './../../components/upload/interface';

@Component({
  selector: 'nz-demo-upload-avatar',
  template: `
  <nz-upload class="avatar-uploader"
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    nzName="avatar"
    [nzShowUploadList]="false"
    [nzBeforeUpload]="beforeUpload"
    (nzChange)="handleChange($event)">
    <i *ngIf="!avatarUrl" class="anticon anticon-plus avatar-uploader-trigger"></i>
    <img *ngIf="avatarUrl" [src]="avatarUrl" class="avatar">
  </nz-upload>
  `,
  styles: [`
  :host ::ng-deep .avatar-uploader,
  :host ::ng-deep .avatar-uploader-trigger,
  :host ::ng-deep .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  :host ::ng-deep .avatar-uploader {
    display: block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }

  :host ::ng-deep .avatar-uploader-trigger {
    display: table-cell;
    vertical-align: middle;
    font-size: 28px;
    color: #999;
  }
  `]
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

  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: any) => {
        this.loading = false;
        this.avatarUrl = img;
      });
    }
  }

}
