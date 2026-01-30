import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-avatar',
  imports: [FormsModule, NzAvatarModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="webFrameworks" [nzValueWith]="valueWith" (nzOnSelect)="onSelect($event)">
      <textarea rows="1" nz-input nzMentionTrigger [(ngModel)]="inputValue"></textarea>
      <ng-container *nzMentionSuggestion="let framework">
        <nz-avatar nzSize="small" [nzText]="framework.name" [nzSrc]="framework.icon" />
        <span>{{ framework.name }} - {{ framework.type }}</span>
      </ng-container>
    </nz-mention>
  `,
  styles: `
    .ant-avatar.ant-avatar-sm {
      width: 14px;
      height: 14px;
      margin-right: 8px;
      position: relative;
    }
  `
})
export class NzDemoMentionAvatarComponent {
  inputValue?: string;
  webFrameworks = [
    { name: 'React', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg' },
    { name: 'Angular', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png' },
    { name: 'Dva', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png' },
    { name: 'Flask', type: 'Python', icon: 'https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png' }
  ];

  valueWith = (data: { name: string; type: string; icon: string }): string => data.name;

  onSelect(value: string): void {
    console.log(value);
  }
}
