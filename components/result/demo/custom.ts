import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-custom',
  template: `
    <nz-result [nzIcon]="'smile-twotone'" [nzTitle]="'Great, we have done all the operators!'">
      <div nz-result-extra>
        <button nz-button nzType="primary">Next</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultCustomComponent {}
