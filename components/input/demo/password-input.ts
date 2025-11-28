import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-password-input',
  imports: [FormsModule, NzInputModule, NzIconModule, NzFlexModule, NzButtonModule],
  template: `
    <nz-input-password>
      <input nz-input placeholder="input password" [(ngModel)]="password" />
    </nz-input-password>
    <br />
    <br />
    <nz-input-password>
      <input nz-input placeholder="input password" [(ngModel)]="password" />
      <ng-template nzInputPasswordIcon let-visible>
        @if (visible) {
          <nz-icon nzType="eye" nzTheme="twotone" />
        } @else {
          <nz-icon nzType="eye-invisible" nzTheme="outline" />
        }
      </ng-template>
    </nz-input-password>
    <br />
    <br />
    <nz-flex nzGap="8px">
      <nz-input-password [(nzVisible)]="passwordVisible" [style.flex]="1">
        <input nz-input placeholder="input password" [(ngModel)]="password" />
      </nz-input-password>
      <button nz-button (click)="passwordVisible.set(!passwordVisible())">
        {{ passwordVisible() ? 'Hide' : 'Show' }}
      </button>
    </nz-flex>
    <br />
    <nz-input-password>
      <input nz-input placeholder="input password" [(ngModel)]="password" disabled />
    </nz-input-password>
  `
})
export class NzDemoInputPasswordInputComponent {
  readonly passwordVisible = signal(false);
  readonly password = signal('');
}
