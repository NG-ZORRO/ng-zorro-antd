/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { REFRESH_INTERVAL } from './nz-statistic-definitions';
import { NzStatisticComponent } from './nz-statistic.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-countdown',
  exportAs: 'nzCountdown',
  templateUrl: './nz-countdown.component.html'
})
export class NzCountdownComponent extends NzStatisticComponent implements OnInit, OnChanges, OnDestroy {
  /** @override */
  @Input() nzFormat: string = 'HH:mm:ss';
  @Output() readonly nzCountdownFinish = new EventEmitter<void>();

  diff: number;

  private target: number;
  private updater_: Subscription | null;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private platform: Platform) {
    super();
  }

  /** @override */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzValue) {
      this.target = Number(changes.nzValue.currentValue);
      if (!changes.nzValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  ngOnInit(): void {
    this.syncTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
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
        this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
          this.updateValue();
          this.cdr.detectChanges();
        });
      });
    }
  }

  stopTimer(): void {
    if (this.updater_) {
      this.updater_.unsubscribe();
      this.updater_ = null;
    }
  }

  /**
   * Update time that should be displayed on the screen.
   */
  protected updateValue(): void {
    this.diff = Math.max(this.target - Date.now(), 0);

    if (this.diff === 0) {
      this.stopTimer();
      this.nzCountdownFinish.emit();
    }
  }
}
