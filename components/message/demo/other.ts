import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-message-other',
  imports: [NzButtonModule],
  template: `
    <button nz-button (click)="createMessage('success')">Success</button>
    <button nz-button (click)="createMessage('error')">Error</button>
    <button nz-button (click)="createMessage('warning')">Warning</button>
  `,
  styles: `
    [nz-button] {
      margin-right: 8px;
    }
  `
})
export class NzDemoMessageOtherComponent {
  private readonly message = inject(NzMessageService);

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }
}
