import { Component } from '@angular/core';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-upload-with-aliyun-oss',
  template: `
    <nz-upload
      nzName="file"
      [(nzFileList)]="files"
      [nzTransformFile]="transformFile"
      [nzData]="getExtraData"
      [nzAction]="mockOSSData.host"
      (nzChange)="onChange($event)"
    >
      Photos: <button nz-button><i nz-icon nzType="upload"></i> Click to Upload</button>
    </nz-upload>
  `
})
export class NzDemoUploadUploadWithAliyunOssComponent {
  files: UploadFile[] = [];
  mockOSSData = {
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw=='
  };

  transformFile = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.mockOSSData.dir + filename;

    return file;
  };

  getExtraData = (file: UploadFile) => {
    const { accessId, policy, signature } = this.mockOSSData;

    return {
      key: file.url,
      OSSAccessKeyId: accessId,
      policy: policy,
      Signature: signature
    };
  };

  onChange(e: UploadChangeParam): void {
    console.log('Aliyun OSS:', e.fileList);
  }
}
