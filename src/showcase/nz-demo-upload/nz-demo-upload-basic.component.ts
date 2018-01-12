import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-basic',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/">
    <button nz-button>
      <span><i class="anticon anticon-upload"></i>Click to Upload</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadBasicComponent {
}
