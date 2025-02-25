import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-message-template',
  imports: [NzButtonModule],
  template: `
    <button nz-button nzType="default" (click)="showMessage()">Display a custom template</button>
    <ng-template #customTemplate let-data="data">My Favorite Framework is {{ data }}</ng-template>
  `
})
export class NzDemoMessageTemplateComponent {
  @ViewChild('customTemplate', { static: true }) customTemplate!: TemplateRef<{
    $implicit: NzMessageComponent;
    data: string;
  }>;

  constructor(private message: NzMessageService) {}

  showMessage(): void {
    this.message.success(this.customTemplate, { nzData: 'Angular' });
  }
}
