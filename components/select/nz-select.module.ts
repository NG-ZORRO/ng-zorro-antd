import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzEmptyModule } from '../empty/nz-empty.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzOptionContainerComponent } from './nz-option-container.component';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';
import { NzFilterGroupOptionPipe, NzFilterOptionPipe } from './nz-option.pipe';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectUnselectableDirective } from './nz-select-unselectable.directive';
import { NzSelectComponent } from './nz-select.component';

@NgModule({
  imports     : [
    CommonModule,
    NzI18nModule,
    FormsModule,
    OverlayModule,
    NzIconModule,
    NzAddOnModule,
    NzEmptyModule
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
  exports     : [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionContainerComponent,
    NzOptionGroupComponent,
    NzSelectTopControlComponent
  ]
})
export class NzSelectModule {
}
