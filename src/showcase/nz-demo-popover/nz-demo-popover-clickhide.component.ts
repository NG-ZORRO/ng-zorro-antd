import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'nz-demo-popover-clickhide',
  template: `
    <nz-popover [nzTitle]="'标题'" [(nzVisible)]="visible" [nzTrigger]="'click'">
      <button nz-button nz-popover [nzType]="'primary'">点击</button>
      <ng-template #nzTemplate>
        <a (click)='clickMe()'>点击关闭</a>
        <p>内容</p>
        <p>内容</p>
      </ng-template>
    </nz-popover>
  `
})
export class NzDemoPopoverClickHideComponent implements OnInit {
  content: any;
  visible: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  clickMe() {
    this.visible = false;
  }
}
