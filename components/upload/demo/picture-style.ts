import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-picture-style',
  template: `
    <div class="clearfix">
      <nz-upload nzAction="https://jsonplaceholder.typicode.com/posts/" nzListType="picture" [(nzFileList)]="fileList1">
        <button nz-button><i nz-icon nzType="upload"></i><span>Upload</span></button>
      </nz-upload>
    </div>
    <br /><br />
    <div class="clearfix">
      <nz-upload
        class="upload-list-inline"
        nzAction="https://jsonplaceholder.typicode.com/posts/"
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
    `
  ]
})
export class NzDemoUploadPictureStyleComponent {
  defaultFileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  fileList1 = [...this.defaultFileList];
  fileList2 = [...this.defaultFileList];
}
