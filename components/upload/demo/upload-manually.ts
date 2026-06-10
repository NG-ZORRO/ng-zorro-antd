import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { filter } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-upload-manually',
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload [(nzFileList)]="fileList" [nzBeforeUpload]="beforeUpload">
      <button nz-button>
        <nz-icon nzType="upload" />
        Select File
      </button>
    </nz-upload>
    <br />
    <br />
    <button
      nz-button
      nzType="primary"
      [nzLoading]="uploading()"
      (click)="handleUpload()"
      [disabled]="fileList().length === 0"
    >
      {{ uploading() ? 'Uploading' : 'Start Upload' }}
    </button>
  `
})
export class NzDemoUploadUploadManuallyComponent {
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(NzMessageService);

  readonly uploading = signal(false);
  readonly fileList = signal<NzUploadFile[]>([]);

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList.update(fileList => fileList.concat(file));
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList().forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading.set(true);
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe({
        next: () => {
          this.uploading.set(false);
          this.fileList.set([]);
          this.messageService.success('upload successfully.');
        },
        error: () => {
          this.uploading.set(false);
          this.messageService.error('upload failed.');
        }
      });
  }
}
