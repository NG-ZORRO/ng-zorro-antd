import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-directory',
  template: `
    <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" nzDirectory>
      <button nz-button><i nz-icon nzType="upload"></i> Upload Directory</button>
    </nz-upload>
  `
})
export class NzDemoUploadDirectoryComponent {}
