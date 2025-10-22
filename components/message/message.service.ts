/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageContentType, NzMessageData, NzMessageDataOptions, NzMessageRef, NzMessageType } from './typings';

@Injectable({
  providedIn: 'root'
})
export class NzMessageService extends NzMNService<NzMessageContainerComponent> {
  protected componentPrefix = 'message-';

  success(content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'success', content }, options);
  }

  error(content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'error', content }, options);
  }

  info(content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'info', content }, options);
  }

  warning(content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'warning', content }, options);
  }

  loading(content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'loading', content }, options);
  }

  create(type: NzMessageType | string, content: NzMessageContentType, options?: NzMessageDataOptions): NzMessageRef {
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
