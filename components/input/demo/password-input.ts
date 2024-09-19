import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-password-input',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input
        [type]="passwordVisible ? 'text' : 'password'"
        nz-input
        placeholder="input password"
        [(ngModel)]="password"
      />
    </nz-input-group>
    <ng-template #suffixTemplate>
      <span
        nz-icon
        class="ant-input-password-icon"
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      ></span>
    </ng-template>
  `
})
export class NzDemoInputPasswordInputComponent {
  passwordVisible = false;
  password?: string;
}
