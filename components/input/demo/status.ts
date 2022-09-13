import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-status',
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input placeholder="Error" [(ngModel)]="value" nzStatus="error" />
      <input *nzSpaceItem nz-input placeholder="Warning" [(ngModel)]="value" nzStatus="warning" />
      <nz-input-group *nzSpaceItem [nzPrefix]="prefixTemplateClock" nzStatus="error">
        <input type="text" nz-input placeholder="Error with prefix" />
      </nz-input-group>
      <nz-input-group *nzSpaceItem [nzPrefix]="prefixTemplateClock" nzStatus="warning">
        <input type="text" nz-input placeholder="Warning with prefix" />
      </nz-input-group>
      <ng-template #prefixTemplateClock><span nz-icon nzType="clock-circle" nzTheme="outline"></span></ng-template>
    </nz-space>
  `
})
export class NzDemoInputStatusComponent {
  value?: string;
}
