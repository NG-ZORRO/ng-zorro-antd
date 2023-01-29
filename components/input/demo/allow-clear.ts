import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-allow-clear',
  template: `
    <nz-input-group [nzSuffix]="inputClearTpl">
      <input type="text" nz-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </nz-input-group>
    <ng-template #inputClearTpl>
      <span
        nz-icon
        class="ant-input-clear-icon"
        nzTheme="fill"
        nzType="close-circle"
        *ngIf="inputValue"
        (click)="inputValue = null"
      ></span>
    </ng-template>
    <br />
    <br />
    <nz-input-group [nzSuffix]="textAreaClearTpl" class="ant-input-affix-wrapper-textarea-with-clear-btn">
      <textarea nz-input [(ngModel)]="textValue" placeholder="textarea with clear icon"></textarea>
    </nz-input-group>
    <ng-template #textAreaClearTpl>
      <span
        nz-icon
        class="ant-input-clear-icon"
        nzTheme="fill"
        nzType="close-circle"
        *ngIf="textValue"
        (click)="textValue = null"
      ></span>
    </ng-template>
  `
})
export class NzDemoInputAllowClearComponent {
  inputValue: string | null = null;
  textValue: string | null = null;
}
