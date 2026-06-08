/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NzPipesModule } from 'ng-zorro-antd/core/pipe';

import { NzStatisticComponent } from './statistic.component';

const REFRESH_INTERVAL = 1000 / 30;

@Component({
  selector: 'nz-countdown',
  exportAs: 'nzCountdown',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    />

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `,
  imports: [NzStatisticComponent, NzPipesModule]
})
export class NzCountdownComponent extends NzStatisticComponent implements OnInit, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly platform = inject(Platform);

  @Input() nzFormat: string = 'HH:mm:ss';
  @Output() readonly nzCountdownFinish = new EventEmitter<void>();

  diff!: number;

  private target: number = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    super();

    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzValue } = changes;
    if (nzValue) {
      this.target = Number(nzValue.currentValue);
      if (!nzValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  ngOnInit(): void {
    this.syncTimer();
  }

  syncTimer(): void {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.stopTimer();
        this.intervalId = setInterval(() => {
          this.updateValue();
          this.cdr.detectChanges();
        }, REFRESH_INTERVAL);
      });
    }
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Update time that should be displayed on the screen.
   */
  protected updateValue(): void {
    this.diff = Math.max(this.target - Date.now(), 0);

    if (this.diff === 0) {
      this.stopTimer();

      if (this.nzCountdownFinish.observers.length) {
        this.ngZone.run(() => this.nzCountdownFinish.emit());
      }
    }
  }
}
