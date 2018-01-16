import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="small"><span>Small</span></label>
      <label nz-radio-button nzValue="default"><span>Default</span></label>
      <label nz-radio-button nzValue="large"><span>Large</span></label>
    </nz-radio-group>
    <nz-tabset [nzSize]="size">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          Tab {{ tab.index }}
        </ng-template>
        <span>Content of tab {{ tab.index }}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsSizeComponent {
  size = 'small';
  tabs = [ { index: 1 }, { index: 2 }, { index: 3 } ];
}
