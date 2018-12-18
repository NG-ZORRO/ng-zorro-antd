import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAddOnModule } from '../core/addon/addon.module';

import { NzIconModule } from '../icon/nz-icon.module';

import { PlatformModule } from '@angular/cdk/platform';
import { NzAutoResizeDirective } from './nz-autoresize.directive';
import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputDirective } from './nz-input.directive';

@NgModule({
  declarations: [ NzInputDirective, NzInputGroupComponent, NzAutoResizeDirective ],
  exports     : [ NzInputDirective, NzInputGroupComponent, NzAutoResizeDirective ],
  imports     : [ CommonModule, FormsModule, NzIconModule, PlatformModule, NzAddOnModule ]
})
export class NzInputModule {
}
