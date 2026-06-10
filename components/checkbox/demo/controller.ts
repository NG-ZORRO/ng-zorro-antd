import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'nz-demo-checkbox-controller',
  imports: [FormsModule, NzButtonModule, NzCheckboxModule],
  template: `
    <label nz-checkbox [(ngModel)]="checked" [nzDisabled]="disabled()">
      {{ checked() ? 'Checked' : 'Unchecked' }} - {{ disabled() ? 'Disabled' : 'Enabled' }}
    </label>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="toggleChecked()" nzSize="small">
      {{ checked() ? 'Uncheck' : 'Check' }}
    </button>
    <button nz-button nzType="primary" (click)="toggleDisabled()" nzSize="small">
      {{ disabled() ? 'Enable' : 'Disable' }}
    </button>
  `,
  styles: `
    button {
      margin-right: 8px;
    }
  `
})
export class NzDemoCheckboxControllerComponent {
  readonly checked = signal(true);
  readonly disabled = signal(false);

  toggleChecked(): void {
    this.checked.update(checked => !checked);
  }

  toggleDisabled(): void {
    this.disabled.update(disabled => !disabled);
  }
}
