import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'nz-demo-popover-control',
  template: `
    <nz-popover [nzTitle]="'Title'" [(nzVisible)]="visible" [nzTrigger]="'click'">
      <button nz-button nz-popover [nzType]="'primary'">Click me</button>
      <ng-template #nzTemplate>
        <a (click)='clickMe()'>Close</a>
      </ng-template>
    </nz-popover>
  `
})
export class NzDemoPopoverControlComponent implements OnInit {
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
