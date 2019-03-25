import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-info',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicMessage()">Display normal message</button>
  `,
  styles: []
})
export class NzDemoMessageInfoComponent {
  constructor(private message: NzMessageService) {}

  createBasicMessage(): void {
    this.message.info('This is a normal message');
  }
}
