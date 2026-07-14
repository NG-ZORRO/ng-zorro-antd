import { Component, computed, signal, TemplateRef, viewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-custom-action-icon',
  imports: [NzUploadModule, NzIconModule, NzButtonModule],
  template: `
    <nz-upload [nzShowUploadList]="showUploadList()" [nzFileList]="fileList()">
      <button nz-button>Upload</button>
    </nz-upload>

    <ng-template #extra let-file>
      <span>({{ file.size }} KB)</span>
    </ng-template>
    <ng-template #downloadIcon><nz-icon nzType="snippets" /></ng-template>
    <ng-template #removeIcon><nz-icon nzType="github" /></ng-template>
    <ng-template #previewIcon><nz-icon nzType="apple" /></ng-template>
  `
})
export class NzDemoUploadCustomActionIconComponent {
  protected readonly downloadIcon = viewChild<TemplateRef<{ $implicit: NzUploadFile }>>('downloadIcon');
  protected readonly removeIcon = viewChild<TemplateRef<{ $implicit: NzUploadFile }>>('removeIcon');
  protected readonly previewIcon = viewChild<TemplateRef<{ $implicit: NzUploadFile }>>('previewIcon');
  protected readonly extra = viewChild<TemplateRef<{ $implicit: NzUploadFile }>>('extra');

  protected readonly fileList = signal<NzUploadFile[]>([
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      size: 100,
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: '2',
      name: 'yyy.png',
      size: 200,
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: '3',
      name: 'zzz.png',
      size: 300,
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ]);

  protected readonly showUploadList = computed(() => ({
    extra: this.extra(),
    downloadIcon: this.downloadIcon(),
    removeIcon: this.removeIcon(),
    previewIcon: this.previewIcon(),
    showRemoveIcon: true,
    showPreviewIcon: true,
    showDownloadIcon: true
  }));
}
