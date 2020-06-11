import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-upload-preview-file',
  template: `
    <div class="clearfix">
      <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" nzListType="picture" [nzPreviewFile]="previewFile">
        <button nz-button><i nz-icon nzType="upload"></i> Upload</button>
      </nz-upload>
    </div>
  `
})
export class NzDemoUploadPreviewFileComponent {
  constructor(private http: HttpClient) {}

  previewFile = (file: NzUploadFile) => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
        method: 'POST',
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };
}
