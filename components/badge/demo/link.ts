import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-link',
  template: `
    <a>
      <nz-badge [nzCount]="5">
        <a class="head-example"></a>
      </nz-badge>
    </a>
  `
})
export class NzDemoBadgeLinkComponent {
}
