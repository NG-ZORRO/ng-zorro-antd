import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzSizeLDSType } from '../core/types/size';

import { InputBoolean, InputNumber } from '../core/util/convert';

@Component({
  selector: 'nz-spin',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-spin.component.html',
  host: {
    '[class.ant-spin-nested-loading]': '!nzSimple'
  },
  styles: [
    `
      nz-spin {
        display: block;
      }
    `
  ]
})
export class NzSpinComponent implements OnChanges, OnDestroy, OnInit {
  @Input() nzIndicator: TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzTip: string;
  @Input() @InputNumber() nzDelay = 0;
  @Input() @InputBoolean() nzSimple = false;
  @Input() @InputBoolean() nzSpinning = true;
  loading = true;
  private spinning$ = new BehaviorSubject(this.nzSpinning);
  private loading$: Observable<boolean> = this.spinning$.pipe(debounceTime(this.nzDelay));
  private loading_: Subscription | null;

  subscribeLoading(): void {
    this.unsubscribeLoading();
    this.loading_ = this.loading$.subscribe(data => {
      this.loading = data;
      this.cdr.markForCheck();
    });
  }

  unsubscribeLoading(): void {
    if (this.loading_) {
      this.loading_.unsubscribe();
      this.loading_ = null;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeLoading();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSpinning) {
      if (changes.nzSpinning.isFirstChange()) {
        this.loading = this.nzSpinning;
      }
      this.spinning$.next(this.nzSpinning);
    }
    if (changes.nzDelay) {
      this.loading$ = this.spinning$.pipe(debounceTime(this.nzDelay));
      this.subscribeLoading();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeLoading();
  }
}
