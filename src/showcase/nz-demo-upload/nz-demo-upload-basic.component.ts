import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-basic',
  template: `
        <nz-upload
          [nzAction]="action"
          [nzOnChange]="onChange"
        >
          <button nz-button [nzType]="'default'">
            <i class="anticon anticon-upload"></i><span>Click to Upload</span>
          </button>
        </nz-upload>
    `,
  styles  : [],
})
export class NzDemoUploadBasicComponent implements OnInit {
  action = '//jsonplaceholder.typicode.com/posts/';
  constructor() {
  }

  ngOnInit() {
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
}

