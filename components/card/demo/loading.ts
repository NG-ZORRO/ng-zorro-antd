import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-loading',
  template: `
    <nz-card style="width:34%;" nzLoading nzTitle="Card title">
      Whatever content
    </nz-card>
  `
})
export class NzDemoCardLoadingComponent {
}
