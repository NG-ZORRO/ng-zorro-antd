import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NzStepConnectService {
  lastElementSizeEvent = new EventEmitter();

  currentEvent = new EventEmitter();

  current: number;

  itemIndex = 0;

  id;

  direction = 'horizontal';

  directionEvent = new EventEmitter();

  processDot = false;

  processDotEvent = new EventEmitter();

  errorIndexObject = new EventEmitter();

  errorIndex: string;

  constructor() {
  }
}
