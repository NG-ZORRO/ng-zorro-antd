import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-upload-observable',
  template: `
  <nz-upload class="avatar-uploader"
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    nzName="avatar"
    nzListType="picture-card"
    [nzShowUploadList]="false"
    [nzBeforeUpload]="beforeUpload"
    (nzChange)="handleChange($event)">
    <ng-container *ngIf="!avatarUrl">
      <i class="anticon anticon-plus"></i>
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
export class NzDemoUploadObservableComponent {
  loading = false;
  avatarUrl: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: File): Observable<boolean> => {
    const img = new Image();
	img.src = window['URL'].createObjectURL(file);
	return Observable.fromEvent(img, 'load', (event) => {
	  const isOK = event.path[0].width >= 100 && event.path[0].height >= 100;
	  if (!isOK) {
	    this.msg.error('Min. image size is 100x100px!');
	  }
	  return isOK;
	});
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
