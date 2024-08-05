import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-extra',
  template: `
    <nz-tabset [nzTabBarExtraContent]="extraTemplate">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab ' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabset>
    <ng-template #extraTemplate>
      <button nz-button>Extra Action</button>
    </ng-template>
  `
})
export class NzDemoTabsExtraComponent {
  tabs = [1, 2, 3];
}
