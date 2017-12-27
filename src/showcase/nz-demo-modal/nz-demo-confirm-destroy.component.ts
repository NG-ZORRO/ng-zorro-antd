import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-destroy',
  template: `
    <button nz-button [nzType]="'info'" (click)="success()">
      <span>Success tips</span>
    </button>
  `,
  styles: []
})
export class NzDemoConfirmDestroyComponent {
  success = () => {
    const modal = this.confirmServ.success({
      title: 'This is a success message',
      content: 'Remove automatically after one second'
    });

    setTimeout(() => modal.destroy(), 1000);
  };

  constructor(private confirmServ: NzModalService) {}
}
