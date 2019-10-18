/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core';

import { NzMessageBaseService } from './nz-message-base.service';
import { NzMessageConfigLegacy } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
import { NzMessageServiceModule } from './nz-message.service.module';

@Injectable({
  providedIn: NzMessageServiceModule
})
export class NzMessageService extends NzMessageBaseService<
  NzMessageContainerComponent,
  NzMessageData,
  NzMessageConfigLegacy
> {
  constructor(
    nzSingletonService: NzSingletonService,
    overlay: Overlay,
    injector: Injector,
    cfr: ComponentFactoryResolver,
    appRef: ApplicationRef
  ) {
    super(nzSingletonService, overlay, NzMessageContainerComponent, injector, cfr, appRef, 'message');
  }

  // Shortcut methods
  success(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'success', content }, options);
  }

  error(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'error', content }, options);
  }

  info(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'info', content }, options);
  }

  warning(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'warning', content }, options);
  }

  loading(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'loading', content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string,
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageDataFilled {
    return this.createMessage({ type, content }, options);
  }
}
