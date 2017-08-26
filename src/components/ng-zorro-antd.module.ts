// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------

// Common of angular
import { NgModule, ModuleWithProviders } from '@angular/core';

// Modules
import { NzGridModule } from './grid/nz-grid.module';
import { NzButtonModule } from './button/nz-button.module';
import { NzAlertModule } from './alert/nz-alert.module';
import { NzBadgeModule } from './badge/nz-badge.module';
import { NzCalendarModule } from './calendar/nz-calendar.module';
import { NzCascaderModule } from './cascader/nz-cascader.module';
import { NzCheckboxModule } from './checkbox/nz-checkbox.module';
import { NzDatePickerModule } from './datepicker/nz-datepicker.module';
import { NzFormModule } from './form/nz-form.module';
import { NzInputModule } from './input/nz-input.module';
import { NzInputNumberModule } from './input-number/nz-input-number.module';
import { NzMessageModule } from './message/nz-message.module';
import { NzModalModule } from './modal/nz-modal.module';
import { NzNotificationModule } from './notification/nz-notification.module';
import { NzPaginationModule } from './pagination/nz-pagination.module';
import { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
import { NzPopoverModule } from './popover/nz-popover.module';
import { NzRadioModule } from './radio/nz-radio.module';
import { NzRateModule } from './rate/nz-rate.module';
import { NzSelectModule } from './select/nz-select.module';
import { NzSpinModule } from './spin/nz-spin.module';
import { NzSliderModule } from './slider/nz-slider.module';
import { NzSwitchModule } from './switch/nz-switch.module';
import { NzTableModule } from './table/nz-table.module';
import { NzTabsModule } from './tabs/nz-tabs.module';
import { NzTagModule } from './tag/nz-tag.module';
import { NzTimePickerModule } from './time-picker/nz-timepicker.module';
import { NzUtilModule } from './util/nz-util.module';
import { NzProgressModule } from './progress/nz-progress.module';
import { NzStepsModule } from './steps/nz-steps.module';
import { NzDropDownModule } from './dropdown/nz-dropdown.module';
import { NzMenuModule } from './menu/nz-menu.module';
import { NzBreadCrumbModule } from './breadcrumb/nz-breadcrumb.module';
import { NzLayoutModule } from './layout/nz-layout.module';
import { NzRootModule } from './root/nz-root.module';
import { NzCarouselModule } from './carousel/nz-carousel.module';
import { NzCardModule } from './card/nz-card.module';
import { NzCollapseModule } from './collapse/nz-collapse.module';
import { NzTimelineModule } from './timeline/nz-timeline.module';
import { NzToolTipModule } from './tooltip/nz-tooltip.module';
import { NzBackTopModule } from './back-top/nz-back-top.module';
import { NzAffixModule } from './affix/nz-affix.module';
import { NzAnchorModule } from './anchor/nz-anchor.module';
import { NzAvatarModule } from './avatar/nz-avatar.module';

// Services
import { NzNotificationService } from './notification/nz-notification.service';
import { NzMessageService } from './message/nz-message.service';
import { NzModalService } from './modal/nz-modal.service';
import { NzModalSubject } from './modal/nz-modal-subject.service';

// Tokens (eg. global services' config)
import { NZ_ROOT_CONFIG, NzRootConfig } from './root/nz-root-config'

// ---------------------------------------------------------
// | Exports
// ---------------------------------------------------------

// Modules
export { NzGridModule } from './grid/nz-grid.module';
export { NzButtonModule } from './button/nz-button.module';
export { NzAlertModule } from './alert/nz-alert.module';
export { NzBadgeModule } from  './badge/nz-badge.module';
export { NzCalendarModule } from './calendar/nz-calendar.module';
export { NzCascaderModule } from './cascader/nz-cascader.module';
export { NzCheckboxModule } from './checkbox/nz-checkbox.module';
export { NzDatePickerModule } from './datepicker/nz-datepicker.module';
export { NzFormModule } from './form/nz-form.module';
export { NzInputModule } from './input/nz-input.module';
export { NzInputNumberModule } from './input-number/nz-input-number.module';
export { NzMessageModule } from './message/nz-message.module';
export { NzModalModule } from './modal/nz-modal.module';
export { NzNotificationModule } from './notification/nz-notification.module';
export { NzPaginationModule } from './pagination/nz-pagination.module';
export { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
export { NzPopoverModule } from './popover/nz-popover.module';
export { NzRadioModule } from './radio/nz-radio.module';
export { NzRateModule } from './rate/nz-rate.module';
export { NzSelectModule } from './select/nz-select.module';
export { NzSpinModule } from './spin/nz-spin.module';
export { NzProgressModule } from './progress/nz-progress.module';
export { NzSliderModule } from './slider/nz-slider.module';
export { NzSwitchModule } from './switch/nz-switch.module';
export { NzTableModule } from './table/nz-table.module';
export { NzTabsModule } from './tabs/nz-tabs.module';
export { NzTagModule } from './tag/nz-tag.module';
export { NzTimePickerModule } from './time-picker/nz-timepicker.module';
export { NzUtilModule } from './util/nz-util.module';
export { NzStepsModule } from './steps/nz-steps.module';
export { NzDropDownModule } from './dropdown/nz-dropdown.module';
export { NzMenuModule } from './menu/nz-menu.module';
export { NzBreadCrumbModule } from './breadcrumb/nz-breadcrumb.module';
export { NzLayoutModule } from './layout/nz-layout.module';
export { NzRootModule } from './root/nz-root.module';
export { NzCarouselModule } from './carousel/nz-carousel.module';
export { NzCardModule } from './card/nz-card.module';
export { NzCollapseModule } from './collapse/nz-collapse.module';
export { NzTimelineModule } from './timeline/nz-timeline.module';
export { NzToolTipModule } from './tooltip/nz-tooltip.module';
export { NzBackTopModule } from './back-top/nz-back-top.module';
export { NzAffixModule } from './affix/nz-affix.module';
export { NzAnchorModule } from './anchor/nz-anchor.module';
export { NzAvatarModule } from './avatar/nz-avatar.module';

// Services
export { NzNotificationService } from './notification/nz-notification.service';
export { NzMessageService } from './message/nz-message.service';
export { NzModalService } from './modal/nz-modal.service';
export { NzModalSubject } from './modal/nz-modal-subject.service';

// Tokens (eg. global services' config)
export { NZ_MESSAGE_CONFIG } from './message/nz-message-config';
export { NZ_NOTIFICATION_CONFIG } from './notification/nz-notification-config';
export { NZ_ROOT_CONFIG, NzRootConfig } from './root/nz-root-config';

// ---------------------------------------------------------
// | Root module
// ---------------------------------------------------------

@NgModule({
  exports: [
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzRootModule,
    NzCarouselModule,
    NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    NzBackTopModule,
    NzAffixModule,
    NzAnchorModule,
    NzAvatarModule
  ]
})
export class NgZorroAntdModule {

  static forRoot(options?: NzRootConfig): ModuleWithProviders {
    return {
      ngModule: NgZorroAntdModule,
      providers: [
        // Services
        NzNotificationService,
        NzMessageService,
        { provide: NZ_ROOT_CONFIG, useValue: options },
      ]
    };
  }
}
