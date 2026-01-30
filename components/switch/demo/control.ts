import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-control',
  imports: [FormsModule, NzSwitchModule],
  template: ` <nz-switch [(ngModel)]="switchValue" [nzControl]="true" (click)="clickSwitch()" [nzLoading]="loading" /> `
})
export class NzDemoSwitchControlComponent {
  switchValue = false;
  loading = false;

  clickSwitch(): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 3000);
    }
  }
}
