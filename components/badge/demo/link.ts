import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-link',
  template: `
    <a href="#here">
      <nz-badge [nzCount]="5">
        <ng-template #content>
          <a class="head-example"></a>
        </ng-template>
      </nz-badge>
    </a>
  `,
  styles  : []
})
export class NzDemoBadgeLinkComponent {
}
