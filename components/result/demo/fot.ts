import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-fot',
  template: `
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="Sorry, you are not authorized to access this page.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultFotComponent {}
