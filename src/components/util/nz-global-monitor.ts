import { EventEmitter } from '@angular/core';

export interface Position {
  x: number;
  y: number;
}

export class NzGlobalMonitorService {
  counter = 0;
  lastClickPos: Position = {
    x: 0,
    y: 0
  };

  _navItemSource: EventEmitter<any> = new EventEmitter();

  getGlobalCount(): number {
    return ++this.counter;
  }

  setDocumentOverflowHidden(status: Boolean) {
    document.body.style.overflow = status ? 'hidden' : '';
  }

  _observeGlobalEvents() {
    // 监听document的点击事件，记录点击坐标，并抛出 documentClick 事件
    document.addEventListener('click', (e) => {
      this.lastClickPos = {
        x: e.clientX,
        y: e.clientY
      }
      this._navItemSource.emit('documentClick');
    });
  }

  constructor() {
    this._observeGlobalEvents();
  }
}

export default new NzGlobalMonitorService();
