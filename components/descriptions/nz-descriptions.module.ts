import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzDescriptionsItemComponent } from './nz-descriptions-item.component';
import { NzDescriptionsComponent } from './nz-descriptions.component';

@NgModule({
  imports: [CommonModule, NzAddOnModule],
  declarations: [NzDescriptionsComponent, NzDescriptionsItemComponent],
  exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
})
export class NzDescriptionsModule {}
