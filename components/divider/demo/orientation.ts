import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-divider-orientation',
  template: `
    <div>
      <nz-divider nzText="Left Text" nzOrientation="left"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
      <nz-divider nzText="Right Text" nzOrientation="right"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
    </div>
  `
})
export class NzDemoDividerOrientationComponent {}
