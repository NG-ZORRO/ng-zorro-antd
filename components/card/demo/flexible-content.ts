import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-flexible-content',
  template: `
    <nz-card nzHoverable style="width:240px" [nzCover]="coverTemplate">
      <div nz-card-meta nzTitle="Europe Street beat" nzDescription="www.instagram.com"></div>
    </nz-card>
    <ng-template #coverTemplate>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
    </ng-template>
  `
})
export class NzDemoCardFlexibleContentComponent {
}
