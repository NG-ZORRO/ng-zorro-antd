import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-allow-clear',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input type="text" nz-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </nz-input-group>
    <ng-template #suffixTemplate
      ><i
        nz-icon
        nz-tooltip
        class="ant-input-clear-icon"
        nzTheme="fill"
        nzType="close-circle"
        *ngIf="inputValue"
        (click)="inputValue = null"
      ></i
    ></ng-template>
  `
})
export class NzDemoInputAllowClearComponent {
  inputValue: string | null;
}
