import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'nz-demo-upload-picture-card',
  template: `
    <div class="clearfix">
      <nz-upload
        nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
}
