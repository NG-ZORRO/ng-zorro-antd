/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzOptionContainerComponent } from './option-container.component';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionItemGroupComponent } from './option-item-group.component';
import { NzOptionItemComponent } from './option-item.component';
import { NzOptionComponent } from './option.component';
import { NzSelectArrowComponent } from './select-arrow.component';
import { NzSelectClearComponent } from './select-clear.component';
import { NzSelectItemComponent } from './select-item.component';
import { NzSelectPlaceholderComponent } from './select-placeholder.component';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent } from './select.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    NzI18nModule,
    FormsModule,
    PlatformModule,
    OverlayModule,
    NzIconModule,
    NzOutletModule,
    NzEmptyModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzTransitionPatchModule,
    NzFormPatchModule,
    ScrollingModule,
    A11yModule
  ],
  declarations: [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionContainerComponent,
    NzOptionGroupComponent,
    NzOptionItemComponent,
    NzSelectTopControlComponent,
    NzSelectSearchComponent,
    NzSelectItemComponent,
    NzSelectClearComponent,
    NzSelectArrowComponent,
    NzSelectPlaceholderComponent,
    NzOptionItemGroupComponent
  ],
  exports: [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionGroupComponent,
    NzSelectArrowComponent,
    NzSelectClearComponent,
    NzSelectItemComponent,
    NzSelectPlaceholderComponent,
    NzSelectSearchComponent
  ]
})
export class NzSelectModule {}
