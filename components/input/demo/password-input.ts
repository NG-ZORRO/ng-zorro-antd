import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-password-input',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input [type]="passwordVisible ? 'text' : 'password'" nz-input placeholder="input password" [(ngModel)]="password" />
    </nz-input-group>
    <ng-template #suffixTemplate>
      <i nz-icon [nzType]="passwordVisible ? 'eye-invisible' : 'eye'" (click)="passwordVisible = !passwordVisible"></i>
    </ng-template>
  `,
  styles: [
    `
      i {
        cursor: pointer;
      }
    `
  ]
})
export class NzDemoInputPasswordInputComponent {
  passwordVisible = false;
  password: string;
}
