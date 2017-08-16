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
export class NzModalSubject extends Subject<any> {
  modalId: string;
  eventsQueue = {}

  destroy(type: any = 'onCancel') {
    if (!this.isStopped && !this.closed) {
      this.next(type);
    }
  }

  on(eventType: string, cb: Function) {
    if (this.eventsQueue[ eventType ]) {
      this.eventsQueue[ eventType ].push(cb);
    } else {
      this.eventsQueue[ eventType ] = [ cb ];
    }
  }

  constructor() {
    super();
    this.subscribe((value: string) => {
      const eventQueue: Array<Function> = this.eventsQueue[ value ] || [];
      eventQueue.forEach(cb => {
        if (cb) {
          cb();
        }
      });
    });
  }
}
