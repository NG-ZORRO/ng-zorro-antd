import { ModuleWithProviders, NgModule } from '@angular/core';

import { NzAffixModule } from './affix/nz-affix.module';
import { NzAlertModule } from './alert/nz-alert.module';
import { NzAnchorModule } from './anchor/nz-anchor.module';
import { NzAvatarModule } from './avatar/nz-avatar.module';
import { NzBadgeModule } from './badge';
import { NzBreadCrumbModule } from './breadcrumb/nz-breadcrumb.module';
import { NzButtonModule } from './button';
import { NzCardModule } from './card';
import { NzCarouselModule } from './carousel';
import { NzCheckboxModule } from './checkbox';
import { NzCollapseModule } from './collapse';
import { NzDividerModule } from './divider/nz-divider.module';
import { NzDropdownService, NzDropDownModule } from './dropdown';
import { NzFormModule } from './form/nz-form.module';
import { NzGridModule } from './grid';
import { NzI18nModule } from './i18n';
import { NzInputModule } from './input';
import { NzInputNumberModule } from './input-number';
import { NzLayoutModule } from './layout';
import { NzListModule } from './list';
import { NzLocaleModule } from './locale';
import { NzMenuModule } from './menu';
import { NzMessageModule } from './message/nz-message.module';
import { NzNotificationModule } from './notification/nz-notification.module';
import { NzPaginationModule } from './pagination/nz-pagination.module';
import { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
import { NzPopoverModule } from './popover/nz-popover.module';
import { NzProgressModule } from './progress/nz-progress.module';
import { NzRadioModule } from './radio';
import { NzRateModule } from './rate';
import { NzSelectModule } from './select/nz-select.module';
import { NzSliderModule } from './slider/nz-slider.module';
import { NzSpinModule } from './spin/nz-spin.module';
import { NzStepsModule } from './steps/nz-steps.module';
import { NzSwitchModule } from './switch';
import { NzTableModule } from './table/nz-table.module';
import { NzTabsModule } from './tabs/nz-tabs.module';
import { NzTagModule } from './tag/nz-tag.module';
import { NzTimelineModule } from './timeline/nz-timeline.module';
import { NzToolTipModule } from './tooltip/nz-tooltip.module';
import { NzTransferModule } from './transfer/nz-transfer.module';

export * from './button';
export * from './grid';
export * from './layout';
export * from './dropdown';
export * from './menu';
export * from './checkbox';
export * from './input';
export * from './i18n';
export * from './locale/index';
export * from './list/index';

import { NzMessageService } from './message/nz-message.service';
import { NzNotificationService } from './notification/nz-notification.service';

export { NzNotificationService } from './notification/nz-notification.service';
export { NzMessageService } from './message/nz-message.service';

// Tokens (eg. global services' config)
export { NZ_MESSAGE_CONFIG } from './message/nz-message-config';
export { NZ_NOTIFICATION_CONFIG } from './notification/nz-notification-config';

@NgModule({
  exports: [
    NzButtonModule,
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
    NzI18nModule
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
