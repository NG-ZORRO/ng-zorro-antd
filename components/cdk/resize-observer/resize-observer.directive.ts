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
  Output,
  SimpleChanges,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NzResizeObserver, NzResizeObserverFactory } from './resize-observer.service';

@Directive({
  selector: '[nzResizeObserver]',
  providers: [NzResizeObserverFactory]
})
export class NzResizeObserverDirective implements AfterContentInit, OnChanges {
  private nzResizeObserver = inject(NzResizeObserver);
  private elementRef = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);

  @Output() readonly nzResizeObserve = new EventEmitter<ResizeObserverEntry[]>();
  @Input({ transform: booleanAttribute }) nzResizeObserverDisabled = false;
  private currentSubscription: Subscription | null = null;

  private subscribe(): void {
    this.unsubscribe();
    this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
  }

  private unsubscribe(): void {
    this.currentSubscription?.unsubscribe();
  }

  constructor() {
    this.destroyRef.onDestroy(() => this.unsubscribe());
  }

  ngAfterContentInit(): void {
    if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
      this.subscribe();
    }
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
