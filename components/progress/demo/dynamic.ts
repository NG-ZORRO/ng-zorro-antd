import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-dynamic',
  template: `
    <nz-progress [ngModel]="_percent"></nz-progress>
    <nz-button-group>
      <button nz-button (click)="decline()" [nzType]="'ghost'"><i class="anticon anticon-minus"></i></button>
      <button nz-button [nzType]="'ghost'" (click)="increase()"><i class="anticon anticon-plus"></i></button>
    </nz-button-group>
  `,
  styles  : []
})
export class NzDemoProgressDynamicComponent {
  _percent = 0;

  increase(): void {
    this._percent = this._percent + 10;
    if (this._percent > 100) {
      this._percent = 100;
    }
  }

  decline(): void {
    this._percent = this._percent - 10;
    if (this._percent < 0) {
      this._percent = 0;
    }
  }
}
