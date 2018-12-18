import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-directory',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    nzDirectory>
    <button nz-button>
      <i nz-icon type="upload"></i> Upload Directory
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadDirectoryComponent {}
