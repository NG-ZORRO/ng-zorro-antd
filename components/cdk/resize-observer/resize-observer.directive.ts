/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzResizeObserver } from './resize-observer.service';

@Directive({
  selector: '[nzResizeObserver]'
})
export class NzResizeObserverDirective implements AfterContentInit, OnDestroy, OnChanges {
  static ngAcceptInputType_nzResizeObserverDisabled: BooleanInput;
  @Output() readonly nzResizeObserve = new EventEmitter<ResizeObserverEntry[]>();
  @Input() @InputBoolean() nzResizeObserverDisabled = false;
  private currentSubscription: Subscription | null = null;

  private subscribe(): void {
    this.unsubscribe();
    this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
  }

  private unsubscribe(): void {
    this.currentSubscription?.unsubscribe();
  }

  constructor(private nzResizeObserver: NzResizeObserver, private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
      this.subscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzResizeObserve } = changes;
    if (nzResizeObserve) {
      if (this.nzResizeObserverDisabled) {
        this.unsubscribe();
      } else {
        this.subscribe();
      }
    }
  }
}
