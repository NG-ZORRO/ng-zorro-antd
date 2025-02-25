import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-divider-plain',
  imports: [NzDividerModule],
  template: `
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
        sunt a te dicta? Refert tamen, quo modo.
      </p>
      <nz-divider nzPlain nzText="Text"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
        sunt a te dicta? Refert tamen, quo modo.
      </p>
      <nz-divider nzPlain nzText="Left Text" nzOrientation="left"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
        sunt a te dicta? Refert tamen, quo modo.
      </p>
      <nz-divider nzPlain nzText="Right Text" nzOrientation="right"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
        sunt a te dicta? Refert tamen, quo modo.
      </p>
    </div>
  `
})
export class NzDemoDividerPlainComponent {}
