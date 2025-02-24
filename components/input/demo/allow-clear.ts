import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-allow-clear',
  imports: [FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-group [nzSuffix]="inputClearTpl">
      <input type="text" nz-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </nz-input-group>
    <ng-template #inputClearTpl>
      @if (inputValue) {
        <nz-icon class="ant-input-clear-icon" nzTheme="fill" nzType="close-circle" (click)="inputValue = null" />
      }
    </ng-template>
    <br />
    <br />
    <nz-input-group [nzSuffix]="textAreaClearTpl" class="ant-input-affix-wrapper-textarea-with-clear-btn">
      <textarea nz-input [(ngModel)]="textValue" placeholder="textarea with clear icon"></textarea>
    </nz-input-group>
    <ng-template #textAreaClearTpl>
      @if (textValue) {
        <nz-icon class="ant-input-clear-icon" nzTheme="fill" nzType="close-circle" (click)="textValue = null" />
      }
    </ng-template>
  `
})
export class NzDemoInputAllowClearComponent {
  inputValue: string | null = null;
  textValue: string | null = null;
}
