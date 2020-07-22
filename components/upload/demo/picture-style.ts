import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-picture-style',
  template: `
    <div class="clearfix">
      <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" nzListType="picture" [(nzFileList)]="fileList1">
        <button nz-button><i nz-icon nzType="upload"></i>Upload</button>
      </nz-upload>
    </div>
    <br /><br />
    <div class="clearfix">
      <nz-upload
        class="upload-list-inline"
        nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        nzListType="picture"
        [(nzFileList)]="fileList2"
      >
        <button nz-button>
          <span><i nz-icon nzType="upload"></i> Upload</span>
        </button>
      </nz-upload>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .upload-list-inline .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
      }
      :host ::ng-deep .upload-list-inline [class*='-upload-list-rtl'] .ant-upload-list-item {
        float: right;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-enter {
        animation-name: uploadAnimateInlineIn;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-leave {
        animation-name: uploadAnimateInlineOut;
      }
    `
  ]
})
export class NzDemoUploadPictureStyleComponent {
  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error'
    }
  ];

  fileList1 = [...this.defaultFileList];
  fileList2 = [...this.defaultFileList];
}
