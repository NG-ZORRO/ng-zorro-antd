import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-control',
  imports: [FormsModule, NzSwitchModule],
  template: `<nz-switch [(ngModel)]="value" nzControl (click)="clickSwitch()" [nzLoading]="loading()" />`
})
export class NzDemoSwitchControlComponent {
  readonly value = signal(false);
  readonly loading = signal(false);

  clickSwitch(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      this.value.update(value => !value);
      this.loading.set(false);
    }, 3000);
  }
}
