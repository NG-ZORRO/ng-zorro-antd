/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';

import { NzTSType } from 'ng-zorro-antd/core/types';

import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageData, NzMessageDataOptions, NzMessageRef, NzMessageType } from './typings';

@Injectable({
  providedIn: 'root'
})
export class NzMessageService extends NzMNService<NzMessageContainerComponent> {
  protected componentPrefix = 'message-';

  constructor(overlay: Overlay, injector: Injector) {
    super(overlay, injector);
  }

  success(content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'success', content }, options);
  }

  error(content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'error', content }, options);
  }

  info(content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'info', content }, options);
  }

  warning(content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'warning', content }, options);
  }

  loading(content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'loading', content }, options);
  }

  create(type: NzMessageType | string, content: NzTSType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type, content }, options);
  }

  private createInstance(message: NzMessageData, options?: NzMessageDataOptions): NzMessageRef {
    this.container = this.withContainer(NzMessageContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: this.getInstanceId(),
        options
      }
    });
  }
}
