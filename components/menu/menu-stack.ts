/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Observable, Subject } from 'rxjs';

export interface NzMenuStackItem {
  menuStack: NzMenuStack | null;
  triggerOn?: 'hover' | 'click' | null;
  keepOpen?: boolean;
}

export class NzMenuStack {
  private readonly elements: NzMenuStackItem[] = [];
  private close$ = new Subject<NzMenuStackItem>();
  private empty$ = new Subject<void>();

  closed(): Observable<NzMenuStackItem> {
    return this.close$.asObservable();
  }

  emptied(): Observable<void> {
    return this.empty$.asObservable();
  }

  push(menu: NzMenuStackItem): void {
    this.elements.push(menu);
  }

  close(lastItem: NzMenuStackItem) {
    if (this.elements.indexOf(lastItem) >= 0) {
      let poppedElement: NzMenuStackItem | undefined;
      do {
        poppedElement = this.elements.pop();
        this.close$.next(poppedElement);
      } while (poppedElement !== lastItem);

      if (this.isEmpty()) {
        this.empty$.next();
      }
    }
  }

  closeSubMenuOf(lastItem: NzMenuStackItem) {
    let removed = false;
    if (this.elements.indexOf(lastItem) >= 0) {
      removed = this.peek() !== lastItem;
      while (this.peek() !== lastItem) {
        this.close$.next(this.elements.pop());
      }
    }
    return removed;
  }

  closeAll() {
    if (!this.isEmpty()) {
      while (!this.isEmpty()) {
        const menuStackItem = this.elements.pop();
        if (menuStackItem) {
          this.close$.next(menuStackItem);
        }
      }

      this.empty$.next();
    }
  }

  isEmpty(): boolean {
    return !this.elements.length;
  }

  peek(): NzMenuStackItem | undefined {
    return this.elements[this.elements.length - 1];
  }
}
