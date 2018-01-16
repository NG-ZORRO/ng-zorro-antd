import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-basic',
  template: `
    <nz-tooltip [nzTitle]="'prompt text'">
      <span nz-tooltip>Tooltip will show when mouse enter.</span>
    </nz-tooltip>
    <br>
    <br>
    <a nz-tooltip="Most simple prompt text" href="#">Most simple way to trigger a tooltip!</a>
    <br>
    <br>
    <nz-tooltip>
      <button nz-button nz-tooltip>This Tooltip Have Icon</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>带图标的Tooltip</span>
      </ng-template>
    </nz-tooltip>
  `,
  styles  : []
})
export class NzDemoTooltipBasicComponent {
}
