import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-loading',
  template: `
    <nz-card [nzLoading]="loading" nzTitle="Card title">
      Whatever content
    </nz-card>
    <button nz-button style="margin-top: 16px;" (click)="toggleLoading()">Toggle loading</button>
  `
})
export class NzDemoCardLoadingComponent {
  loading = true;
  toggleLoading(): void {
    this.loading = !this.loading;
  }
}
