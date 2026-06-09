import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-control',
  imports: [FormsModule, NzSwitchModule],
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzControl]="true" (click)="clickSwitch()" [nzLoading]="loading()" />
  `
})
export class NzDemoSwitchControlComponent {
  readonly switchValue = signal(false);
  readonly loading = signal(false);

  clickSwitch(): void {
    if (!this.loading()) {
      this.loading.set(true);
      setTimeout(() => {
        this.switchValue.update(value => !value);
        this.loading.set(false);
      }, 3000);
    }
  }
}
