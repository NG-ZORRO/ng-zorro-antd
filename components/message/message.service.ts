/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';

import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageServiceModule } from './message.service.module';
import { NzMessageData, NzMessageDataOptions, NzMessageRef } from './typings';

@Injectable({
  providedIn: NzMessageServiceModule
})
export class NzMessageService extends NzMNService {
  protected container?: NzMessageContainerComponent;
  protected componentPrefix = 'message-';

  constructor(nzSingletonService: NzSingletonService, overlay: Overlay, injector: Injector) {
    super(nzSingletonService, overlay, injector);
  }

  success(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'success', content }, options);
  }

  error(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'error', content }, options);
  }

  info(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'info', content }, options);
  }

  warning(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'warning', content }, options);
  }

  loading(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef {
    return this.createInstance({ type: 'loading', content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string,
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
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
