import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'nz-demo-upload-avatar',
  template: `
    <nz-upload
      class="avatar-uploader"
      nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      nzName="avatar"
      nzListType="picture-card"
      [nzShowUploadList]="false"
      [nzBeforeUpload]="beforeUpload"
      (nzChange)="handleChange($event)"
    >
      <ng-container *ngIf="!avatarUrl">
        <i class="upload-icon" nz-icon [nzType]="loading ? 'loading' : 'plus'"></i>
        <div class="ant-upload-text">Upload</div>
      </ng-container>
      <img *ngIf="avatarUrl" [src]="avatarUrl" style="width: 100%" />
    </nz-upload>
  `,
  styles: [
    `
      :host ::ng-deep .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
      }
    `
  ]
})
export class NzDemoUploadAvatarComponent {
  loading = false;
  avatarUrl?: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
