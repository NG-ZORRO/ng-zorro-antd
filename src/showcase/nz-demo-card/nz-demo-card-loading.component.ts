import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-loading',
  template: `
    <nz-card style="width:34%;" nzLoading>
      <ng-template #title>
        Card title
      </ng-template>
      <ng-template #body>
        Whatever content
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardLoadingComponent { }
