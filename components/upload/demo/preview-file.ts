import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-preview-file',
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload
      nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      nzListType="picture"
      [nzPreviewFile]="previewFile"
    >
      <button nz-button>
        <nz-icon nzType="upload" />
        Upload
      </button>
    </nz-upload>
  `
})
export class NzDemoUploadPreviewFileComponent {
  constructor(private http: HttpClient) {}

  previewFile = (file: NzUploadFile): Observable<string> => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };
}
