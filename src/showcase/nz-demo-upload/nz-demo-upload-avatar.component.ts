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
    nzListType="picture-card"
    [nzShowUploadList]="false"
    [nzBeforeUpload]="beforeUpload"
    (nzChange)="handleChange($event)">
    <ng-container *ngIf="!avatarUrl">
      <i class="anticon anticon-{{ loading ? 'loading' : 'plus' }}"></i>
      <div class="ant-upload-text">Upload</div>
    </ng-container>
    <img *ngIf="avatarUrl" [src]="avatarUrl">
  </nz-upload>
  `,
  styles: [`
  :host ::ng-deep .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  :host ::ng-deep i {
    font-size: 32px;
    color: #999;
    /* 2.x */
    display: block;
    margin-top: 16px;
  }

  :host ::ng-deep .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  `]
})
export class NzDemoUploadAvatarComponent {
  loading = false;
  avatarUrl: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload(file: File): boolean {
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
