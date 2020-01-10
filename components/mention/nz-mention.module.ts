/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMentionSuggestionDirective } from './nz-mention-suggestions';
import { NzMentionTriggerDirective } from './nz-mention-trigger';
import { NzMentionComponent } from './nz-mention.component';

const COMPONENTS = [NzMentionComponent, NzMentionTriggerDirective, NzMentionSuggestionDirective];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, NzIconModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class NzMentionModule {}
