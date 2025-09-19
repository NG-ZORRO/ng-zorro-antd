import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-password-input',
  imports: [FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-wrapper>
      <input
        nz-input
        [type]="passwordVisible ? 'text' : 'password'"
        placeholder="input password"
        [(ngModel)]="password"
      />
      <nz-icon
        nzInputSuffix
        class="ant-input-password-icon"
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input
        nz-input
        [type]="passwordVisible ? 'text' : 'password'"
        placeholder="input password"
        [(ngModel)]="password"
        disabled
      />
      <nz-icon
        nzInputSuffix
        class="ant-input-password-icon"
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      />
    </nz-input-wrapper>
  `
})
export class NzDemoInputPasswordInputComponent {
  passwordVisible = false;
  password?: string;
}
