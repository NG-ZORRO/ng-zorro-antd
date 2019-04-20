import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAddOnModule, NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzOptionContainerComponent } from './nz-option-container.component';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';
import { NzFilterGroupOptionPipe, NzFilterOptionPipe } from './nz-option.pipe';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectUnselectableDirective } from './nz-select-unselectable.directive';
import { NzSelectComponent } from './nz-select.component';

@NgModule({
  imports: [
    CommonModule,
    NzI18nModule,
    FormsModule,
    OverlayModule,
    NzIconModule,
    NzAddOnModule,
    NzEmptyModule,
    NzOverlayModule,
    NzNoAnimationModule
  ],
  declarations: [
    NzFilterGroupOptionPipe,
    NzFilterOptionPipe,
    NzOptionComponent,
    NzSelectComponent,
    NzOptionContainerComponent,
    NzOptionGroupComponent,
    NzOptionLiComponent,
    NzSelectTopControlComponent,
    NzSelectUnselectableDirective
  ],
  exports: [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionContainerComponent,
    NzOptionGroupComponent,
    NzSelectTopControlComponent
  ]
})
export class NzSelectModule {}
