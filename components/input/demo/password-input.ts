import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-password-input',
  imports: [FormsModule, NzInputModule, NzIconModule],
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
      <nz-icon
        class="ant-input-password-icon"
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      />
    </ng-template>
  `
})
export class NzDemoInputPasswordInputComponent {
  passwordVisible = false;
  password?: string;
}
