import { Component } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-picture-card',
  template: `
    <div class="clearfix">
      <nz-upload
        nzAction="https://jsonplaceholder.typicode.com/posts/"
        nzListType="picture-card"
        [(nzFileList)]="fileList"
        [nzShowButton]="fileList.length < 8"
        [nzPreview]="handlePreview"
      >
        <i nz-icon nzType="plus"></i>
        <div class="ant-upload-text">Upload</div>
      </nz-upload>
      <nz-modal [nzVisible]="previewVisible" [nzContent]="modalContent" [nzFooter]="null" (nzOnCancel)="previewVisible = false">
        <ng-template #modalContent>
          <img [src]="previewImage" [ngStyle]="{ width: '100%' }" />
        </ng-template>
      </nz-modal>
    </div>
  `,
  styles: [
    `
      i[nz-icon] {
        font-size: 32px;
        color: #999;
      }
      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    `
  ]
})
export class NzDemoUploadPictureCardComponent {
  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -2,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -3,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -4,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -5,
      name: 'xxx.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor() {}

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
}
