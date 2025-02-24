import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-avatar',
  imports: [NzIconModule, NzUploadModule],
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
      @if (!avatarUrl) {
        <nz-icon class="upload-icon" [nzType]="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      } @else {
        <img [src]="avatarUrl" style="width: 100%" />
      }
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

  constructor(private messageService: NzMessageService) {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

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
        this.messageService.error('Network error');
        this.loading = false;
        break;
    }
  }
}
