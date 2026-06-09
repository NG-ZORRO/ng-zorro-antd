import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-icon-slider',
  imports: [FormsModule, NzIconModule, NzSliderModule],
  template: `
    <div class="icon-wrapper test-class">
      <nz-icon nzType="frown" [class.icon-highlight]="preHighLight()" />
      <nz-slider [nzMin]="0" [nzMax]="20" [ngModel]="sliderValue()" (ngModelChange)="sliderValue.set($event)" />
      <nz-icon nzType="smile" [class.icon-highlight]="nextHighLight()" />
    </div>
  `,
  styles: `
    .icon-wrapper {
      position: relative;
      padding: 0 30px;
    }

    nz-icon {
      position: absolute;
      top: -2px;
      width: 16px;
      height: 16px;
      line-height: 1;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.25);
    }

    nz-icon:first-child {
      left: 0;
    }

    nz-icon:last-child {
      right: 0;
    }

    .icon-highlight {
      color: rgba(0, 0, 0, 0.45);
    }
  `
})
export class NzDemoSliderIconSliderComponent {
  readonly min = 0;
  readonly max = 20;
  readonly mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  readonly sliderValue = signal(0);
  readonly preHighLight = computed(() => this.sliderValue() < this.mid);
  readonly nextHighLight = computed(() => this.sliderValue() >= this.mid);
}
