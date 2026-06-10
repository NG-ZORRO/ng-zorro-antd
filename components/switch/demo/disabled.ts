import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-disabled',
  imports: [FormsModule, NzButtonModule, NzSwitchModule],
  template: `
    <nz-switch [(ngModel)]="value" [nzDisabled]="disabled()" />
    <br />
    <br />
    <button nz-button nzType="primary" (click)="toggleDisabled()">Toggle disabled</button>
  `
})
export class NzDemoSwitchDisabledComponent {
  readonly value = signal(false);
  readonly disabled = signal(true);

  toggleDisabled(): void {
    this.disabled.update(value => !value);
  }
}
