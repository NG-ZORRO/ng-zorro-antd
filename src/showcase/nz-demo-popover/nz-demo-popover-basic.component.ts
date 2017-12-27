import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'nz-demo-popover-basic',
  template: `
    <nz-popover [nzTitle]="'标题'">
      <button nz-button [nzType]="'primary'" nz-popover>弹出卡片</button>
      <ng-template #nzTemplate>
        <div><p>内容</p>
          <p>内容</p></div>
      </ng-template>
    </nz-popover>
  `
})
export class NzDemoPopoverBasicComponent { }
