import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzDescriptionListItemComponent } from './nz-description-list-item.component';
import { NzDescriptionListComponent } from './nz-description-list.component';

@NgModule({
  imports     : [
    CommonModule,
    NzAddOnModule
  ],
  declarations: [
    NzDescriptionListComponent,
    NzDescriptionListItemComponent
  ],
  exports: [
    NzDescriptionListComponent,
    NzDescriptionListItemComponent
  ]
})
export class NzDescriptionListModule {
}
