import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-message-close',
  template: `
    <button nz-button [nzType]="'default'" (click)="startShowMessages()">Display a sequence of messages</button>
  `
})
export class NzDemoMessageCloseComponent {
  constructor(private message: NzMessageService) {}

  startShowMessages(): void {
    this.message
      .loading('Action in progress', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Loading finished', { nzDuration: 2500 }).onClose!),
        concatMap(() => this.message.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }
}
