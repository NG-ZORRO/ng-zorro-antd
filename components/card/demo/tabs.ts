import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-card-tabs',
  imports: [NzCardModule, NzTabsModule],
  template: `
    <nz-card style="width: 100%;" nzTitle="Card title" [nzExtra]="extraTemplate">
      <nz-card-tab>
        <nz-tabs nzSize="large" [(nzSelectedIndex)]="index1">
          <nz-tab nzTitle="tab1"></nz-tab>
          <nz-tab nzTitle="tab2"></nz-tab>
        </nz-tabs>
      </nz-card-tab>
      content{{ index1 }}
    </nz-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
    <br />
    <br />
    <nz-card style="width: 100%;">
      <nz-card-tab>
        <nz-tabs nzSize="large" [(nzSelectedIndex)]="index2">
          <nz-tab nzTitle="article"></nz-tab>
          <nz-tab nzTitle="app"></nz-tab>
          <nz-tab nzTitle="project"></nz-tab>
        </nz-tabs>
      </nz-card-tab>
      content{{ index2 }}
    </nz-card>
  `
})
export class NzDemoCardTabsComponent {
  index1 = 0;
  index2 = 0;
}
