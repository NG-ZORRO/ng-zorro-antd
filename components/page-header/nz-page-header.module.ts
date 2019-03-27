import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzDividerModule } from '../divider/nz-divider.module';
import { NzIconModule } from '../icon/nz-icon.module';
import {
  NzPageHeaderBreadcrumbDirective,
  NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective,
  NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective,
  NzPageHeaderTitleDirective
} from './nz-page-header-cells';
import { NzPageHeaderComponent } from './nz-page-header.component';

const NzPageHeaderCells = [
  NzPageHeaderTitleDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderContentDirective,
  NzPageHeaderTagDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderFooterDirective,
  NzPageHeaderBreadcrumbDirective
];

@NgModule({
  imports     : [ CommonModule, NzAddOnModule, NzIconModule, NzDividerModule ],
  exports     : [ NzPageHeaderComponent, ...NzPageHeaderCells ],
  declarations: [ NzPageHeaderComponent, ...NzPageHeaderCells ]
})
export class NzPageHeaderModule {
}
