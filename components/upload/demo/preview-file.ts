import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-upload-preview-file',
  template: `
    <div class="clearfix">
      <nz-upload
        nzAction="https://jsonplaceholder.typicode.com/posts/"
        nzListType="picture"
        [nzPreviewFile]="previewFile"
      >
        <button nz-button>
          <span><i nz-icon nzType="upload"></i> Upload</span>
        </button>
      </nz-upload>
    </div>
  `
})
export class NzDemoUploadPreviewFileComponent {
  constructor(private http: HttpClient) {}

  previewFile = (file: UploadFile) => {
    console.log('Your upload file:', file);
    return this.http
      .post(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
        method: 'POST',
        body: file
      })
      .pipe(
        // tslint:disable-next-line: no-any
        map((res: any) => res.thumbnail)
      );
  };
}
