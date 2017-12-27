import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle-dynamic',
  template: `
    <nz-progress [ngModel]="_percent" [nzType]="'circle'"></nz-progress>
    <nz-button-group>
      <button nz-button (click)="decline()" [nzType]="'ghost'"><i class="anticon anticon-minus"></i></button><button nz-button [nzType]="'ghost'" (click)="increase()"><i class="anticon anticon-plus"></i></button>
    </nz-button-group>
  `,
  styles  : []
})
export class NzDemoProgressCircleDynamicComponent {
  _percent = 0;

  increase() {
    this._percent = this._percent + 10;
    if (this._percent > 100) {
      this._percent = 100;
    }
  }

  decline() {
    this._percent = this._percent - 10;
    if (this._percent < 0) {
      this._percent = 0;
    }
  }
}

