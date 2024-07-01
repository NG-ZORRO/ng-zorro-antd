import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-size',
  template: `
    <div class="example-input">
      <input nz-input placeholder="large size" nzSize="large" />
      <input nz-input placeholder="default size" nzSize="default" />
      <input nz-input placeholder="small size" nzSize="small" />
    </div>
  `,
  styles: [
    `
      .example-input .ant-input {
        width: 200px;
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class NzDemoInputSizeComponent {}
