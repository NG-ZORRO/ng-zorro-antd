import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-divider-horizontal',
  template: `
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
      <nz-divider></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
      <nz-divider nzText="With Text"></nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
      <nz-divider nzDashed [nzText]="text">
        <ng-template #text><i nz-icon nzType="plus"></i> Add</ng-template>
      </nz-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert
        tamen, quo modo.
      </p>
    </div>
  `
})
export class NzDemoDividerHorizontalComponent {}
