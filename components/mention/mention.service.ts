/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NzMentionTriggerDirective } from './mention-trigger';

@Injectable()
export class NzMentionService {
  private trigger?: NzMentionTriggerDirective;
  private triggerChange$ = new Subject<NzMentionTriggerDirective>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.triggerChange$.complete();
    });
  }

  triggerChanged(): Observable<NzMentionTriggerDirective> {
    return this.triggerChange$.asObservable();
  }

  registerTrigger(trigger: NzMentionTriggerDirective): void {
    if (this.trigger !== trigger) {
      this.trigger = trigger;
      this.triggerChange$.next(trigger);
    }
  }
}
