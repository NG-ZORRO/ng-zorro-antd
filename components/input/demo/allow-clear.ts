import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-allow-clear',
  template: `
    <nz-input-group [nzSuffix]="inputClearTpl">
      <input type="text" nz-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </nz-input-group>
    <ng-template #inputClearTpl
      ><i nz-icon class="ant-input-clear-icon" nzTheme="fill" nzType="close-circle" *ngIf="inputValue" (click)="inputValue = null"></i
    ></ng-template>
    <br />
    <br />
    <nz-input-group [nzSuffix]="textAreaClearTpl" class="ant-input-affix-wrapper-textarea-with-clear-btn">
      <textarea nz-input [(ngModel)]="textValue" placeholder="textarea with clear icon"></textarea>
    </nz-input-group>
    <ng-template #textAreaClearTpl
      ><i
        nz-icon
        class="ant-input-textarea-clear-icon"
        nzTheme="fill"
        nzType="close-circle"
        *ngIf="textValue"
        (click)="textValue = null"
      ></i
    ></ng-template>
  `
})
export class NzDemoInputAllowClearComponent {
  inputValue: string | null;
  textValue: string | null;
}
