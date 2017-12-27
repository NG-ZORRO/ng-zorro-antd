import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-simple',
  template: `
    <nz-card style="width:300px;">
      <ng-template #body>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardSimpleComponent { }
