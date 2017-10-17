import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-upload-pictureswall',
  template: `
     <div class="clearfix">
        <nz-upload
          [action]="action"
          [fileList]="fileList"
          [listType]="listType"
          [onPreview]="handlePreview"
          [onChange]="handleChange"
        >
        <div *ngIf="fileList.length < 3" >
          <i class="anticon anticon-plus"></i>
          <div class="ant-upload-text">Upload</div>
        </div>
        </nz-upload>
        <nz-modal [nzVisible]="previewVisible" [nzFooter]="" [nzContent]="modalContent" (nzOnCancel)="handleCancel()">
          <ng-template #modalContent>
            <img alt="example" style=" width: 100% " [src]="previewImage" />
          </ng-template>
        </nz-modal>
      </div>
  `,
  styles: []
})
export class NzDemoUploadPictureswallComponent implements OnInit {
  action = 'http://localhost:3000/posts';
  listType = 'picture-card';
  previewVisible = false;
  previewImage = '';
  fileList = [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }];

  handlePreview = (file) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  handleCancel = () => {
    this.previewVisible = false;
  };
  handleChange = ({fileList}) => {
    this.fileList = fileList;
  };

  constructor() {
  }

  ngOnInit() {
  }
}
