import { ModuleWithProviders, NgModule } from '@angular/core';
import { NzAffixModule } from './affix/nz-affix.module';
import { NzAlertModule } from './alert/nz-alert.module';
import { NzAnchorModule } from './anchor/nz-anchor.module';
import { NzAvatarModule } from './avatar/nz-avatar.module';
import { NzBadgeModule } from './badge/nz-badge.module';
import { NzBreadCrumbModule } from './breadcrumb/nz-breadcrumb.module';
import { NzButtonModule } from './button/nz-button.module';
import { NzCalendarModule } from './calendar/nz-calendar.module';
import { NzCardModule } from './card/nz-card.module';
import { NzCarouselModule } from './carousel/nz-carousel.module';
import { NzCheckboxModule } from './checkbox/nz-checkbox.module';
import { NzCollapseModule } from './collapse/nz-collapse.module';
import { NzDividerModule } from './divider/nz-divider.module';
import { NzDropDownModule } from './dropdown/nz-dropdown.module';
import { NzDropdownService } from './dropdown/nz-dropdown.service';
import { NzFormModule } from './form/nz-form.module';
import { NzGridModule } from './grid/nz-grid.module';
import { NzI18nModule } from './i18n/nz-i18n.module';
import { NzInputNumberModule } from './input-number/nz-input-number.module';
import { NzInputModule } from './input/nz-input.module';
import { NzLayoutModule } from './layout/nz-layout.module';
import { NzListModule } from './list/nz-list.module';
import { NzLocaleModule } from './locale/nz-locale.module';
import { NzMenuModule } from './menu/nz-menu.module';
import { NzMessageModule } from './message/nz-message.module';
import { NzMessageService } from './message/nz-message.service';
import { NzModalModule } from './modal/nz-modal.module';
import { NzNotificationModule } from './notification/nz-notification.module';
import { NzNotificationService } from './notification/nz-notification.service';
import { NzPaginationModule } from './pagination/nz-pagination.module';
import { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
import { NzPopoverModule } from './popover/nz-popover.module';
import { NzProgressModule } from './progress/nz-progress.module';
import { NzRadioModule } from './radio/nz-radio.module';
import { NzRateModule } from './rate/nz-rate.module';
import { NzSelectModule } from './select/nz-select.module';
import { NzSliderModule } from './slider/nz-slider.module';
import { NzSpinModule } from './spin/nz-spin.module';
import { NzStepsModule } from './steps/nz-steps.module';
import { NzSwitchModule } from './switch/nz-switch.module';
import { NzTableModule } from './table/nz-table.module';
import { NzTabsModule } from './tabs/nz-tabs.module';
import { NzTagModule } from './tag/nz-tag.module';
import { NzTimelineModule } from './timeline/nz-timeline.module';
import { NzToolTipModule } from './tooltip/nz-tooltip.module';
import { NzTransferModule } from './transfer/nz-transfer.module';
import { NzUploadModule } from './upload/nz-upload.module';

@NgModule({
  exports: [
    NzButtonModule,
//    NzCalendarModule,
    NzGridModule,
    NzSwitchModule,
    NzSelectModule,
    NzMenuModule,
    NzAnchorModule,
    NzAffixModule,
    NzDropDownModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    NzStepsModule,
    NzInputModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzToolTipModule,
    NzLocaleModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSliderModule,
    NzRateModule,
    NzBadgeModule,
    NzRadioModule,
    NzNotificationModule,
    NzMessageModule,
    NzAlertModule,
    NzSpinModule,
    NzProgressModule,
    NzTabsModule,
    NzCardModule,
    NzAvatarModule,
    NzTagModule,
    NzTimelineModule,
    NzTransferModule,
    NzCarouselModule,
    NzCollapseModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzListModule,
    NzI18nModule,
    NzUploadModule,
    NzModalModule
  ]
})
export class NgZorroAntdModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule : NgZorroAntdModule,
      providers: [
        // Services
        NzNotificationService,
        NzMessageService,
        NzDropdownService
      ]
    };
  }
}
