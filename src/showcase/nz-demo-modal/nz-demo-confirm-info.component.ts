import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';
@Component({
  selector: 'nz-demo-confirm-info',
  template: `
    <button nz-button [nzType]="'info'" (click)="info(contentTpl)">
      <span> Message tip </span>
    </button>
    <ng-template #contentTpl>
      <div>
        <p> Some additional information Some additional information Some additional information </p>
        <p> Some additional information Some additional information Some additional information </p>
      </div>
    </ng-template>
    <button nz-button [nzType] = "'info'" (click) = "success ()">
      <span> Success Tips </span>
    </button>
    <button nz-button [nzType] = "'info'" (click) = "error ()">
      <span> failed tip </span>
    </button>
    <button nz-button [nzType] = "'info'" (click) = "warning ()">
      <span> Warning </span>
    </button>
  `,
  styles: []
})
export class NzDemoConfirmInfoComponent {
  info(contentTpl: string): void {
    this.confirmServ.info({
      title: 'This is a notification message',
      content: contentTpl
    });
  }

  success(): void {
    this.confirmServ.success ({
      title: 'This is a successful message',
      content: 'some additional information some additional information some additional information'
    });
  }

  error(): void {
    this.confirmServ.error ({
      title: 'This is a failure message',
      content: 'some additional information some additional information some additional information'
    });
  }

  warning(): void {
    this.confirmServ.warning ({
      title: 'This is a warning message',
      content: 'some additional information some additional information some additional information'
    });
  }

  constructor (private confirmServ: NzModalService) {}
}
