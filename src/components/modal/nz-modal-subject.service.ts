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
/* tslint:disable-next-line:no-any */
export class NzModalSubject extends Subject<any> {
  modalId: string;
  eventsQueue = {};

  /* tslint:disable-next-line:no-any */
  destroy(type: any = 'onCancel'): void {
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
