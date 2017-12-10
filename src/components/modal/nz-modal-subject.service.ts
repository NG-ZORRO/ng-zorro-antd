import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/* modal的事件枚举 */
const enum modalEvent {
  onShow,
  onShown,
  onHide,
  onHidden,
  onOk,
  onCancel,
  onDestroy
}

@Injectable()
export class NzModalSubject extends Subject<string | object> {
  modalId: string;
  eventsQueue = {};

  destroy(type: string = 'onCancel'): void {
    if (!this.isStopped && !this.closed) {
      this.next(type);
    }
  }

  on(eventType: string, cb: () => void): void {
    if (this.eventsQueue[ eventType ]) {
      this.eventsQueue[ eventType ].push(cb);
    } else {
      this.eventsQueue[ eventType ] = [ cb ];
    }
  }

  constructor() {
    super();
    this.subscribe((value: string) => {
      const eventQueue: Array<() => void> = this.eventsQueue[ value ] || [];
      eventQueue.forEach(cb => {
        if (cb) {
          cb();
        }
      });
    });
  }
}
