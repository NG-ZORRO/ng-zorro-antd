import { Component } from '@angular/core';

@Component({
  selector     : 'nz-demo-badge-basic',
  template     : `
    <nz-badge [nzCount]="5">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="0" nzShowZero>
      <a class="head-example"></a>
    </nz-badge>
  `
})
export class NzDemoBadgeBasicComponent {
}
