/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import { DestroyRef, ElementRef, inject, Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
@Injectable({ providedIn: 'root' })
export class NzResizeObserverFactory {
  create(callback: ResizeObserverCallback): ResizeObserver | null {
    return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
  }
}

/** An injectable service that allows watching elements for changes to their content. */
@Injectable({ providedIn: 'root' })
export class NzResizeObserver {
  private nzResizeObserverFactory = inject(NzResizeObserverFactory);
  private destroyRef = inject(DestroyRef);
  /** Keeps track of the existing ResizeObservers so they can be reused. */
  private observedElements = new Map<
    Element,
    {
      observer: ResizeObserver | null;
      stream: Subject<ResizeObserverEntry[]>;
      count: number;
    }
  >();

  constructor() {
    this.destroyRef.onDestroy(() => this.observedElements.forEach((_, element) => this.cleanupObserver(element)));
  }

  observe(elementOrRef: Element | ElementRef<Element>): Observable<ResizeObserverEntry[]> {
    const element = coerceElement(elementOrRef);

    return new Observable((observer: Observer<ResizeObserverEntry[]>) => {
      const stream = this.observeElement(element);
      const subscription = stream.subscribe(observer);

      return () => {
        subscription.unsubscribe();
        this.unobserveElement(element);
      };
    });
  }

  /**
   * Observes the given element by using the existing ResizeObserver if available, or creating a
   * new one if not.
   */
  private observeElement(element: Element): Subject<ResizeObserverEntry[]> {
    if (!this.observedElements.has(element)) {
      const stream = new Subject<ResizeObserverEntry[]>();
      const observer = this.nzResizeObserverFactory.create((mutations: ResizeObserverEntry[]) =>
        stream.next(mutations)
      );
      if (observer) {
        observer.observe(element);
      }
      this.observedElements.set(element, { observer, stream, count: 1 });
    } else {
      this.observedElements.get(element)!.count++;
    }
    return this.observedElements.get(element)!.stream;
  }

  /**
   * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
   * observing this element.
   */
  private unobserveElement(element: Element): void {
    if (this.observedElements.has(element)) {
      this.observedElements.get(element)!.count--;
      if (!this.observedElements.get(element)!.count) {
        this.cleanupObserver(element);
      }
    }
  }

  /** Clean up the underlying ResizeObserver for the specified element. */
  private cleanupObserver(element: Element): void {
    if (this.observedElements.has(element)) {
      const { observer, stream } = this.observedElements.get(element)!;
      if (observer) {
        observer.disconnect();
      }
      stream.complete();
      this.observedElements.delete(element);
    }
  }
}
