import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-message-custom-style',
  imports: [NzButtonModule],
  template: `<button nz-button nzType="primary" (click)="createNotification()">Open the notification box</button>`
})
export class NzDemoMessageCustomStyleComponent {
  readonly #messageService = inject(NzMessageService);

  createNotification(): void {
    this.#messageService.success('This is the content of the notification', {
      nzStyle: {
        'margin-top': '20vh'
      },
      nzClass: 'custom-class'
    });
  }
}
