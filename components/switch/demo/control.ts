import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-control',
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzControl]="true" (click)="clickSwitch()" [nzLoading]="loading"></nz-switch>
  `
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
