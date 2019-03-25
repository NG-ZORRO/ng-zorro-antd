import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-flexible-content',
  template: `
    <nz-card nzHoverable style="width:240px" [nzCover]="coverTemplate">
      <nz-card-meta nzTitle="Europe Street beat" nzDescription="www.instagram.com"></nz-card-meta>
    </nz-card>
    <ng-template #coverTemplate>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </ng-template>
  `
})
export class NzDemoCardFlexibleContentComponent {}
