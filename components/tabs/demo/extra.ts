import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-extra',
  template: `
    <nz-tabset [nzTabBarExtraContent]="extraTemplate">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab ">
        <span>Content of tab {{ tab }}</span>
      </nz-tab>
    </nz-tabset>
    <ng-template #extraTemplate>
      <button nz-button>Extra Action</button>
    </ng-template>
  `
})
export class NzDemoTabsExtraComponent {
  tabs = [ 1, 2, 3 ];
}
