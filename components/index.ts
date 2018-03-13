import { ModuleWithProviders, NgModule } from '@angular/core';

import { NzAffixModule } from './affix/nz-affix.module';
import { NzAlertModule } from './alert';
import { NzAnchorModule } from './anchor/nz-anchor.module';
import { NzAvatarModule } from './avatar';
import { NzBadgeModule } from './badge';
import { NzBreadCrumbModule } from './breadcrumb';
import { NzButtonModule } from './button';
import { NzCalendarModule } from './calendar';
import { NzCardModule } from './card';
import { NzCarouselModule } from './carousel';
import { NzCheckboxModule } from './checkbox';
import { NzCollapseModule } from './collapse';
import { NzDividerModule } from './divider';
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
import { NzModalModule } from './modal';
import { NzNotificationModule } from './notification/nz-notification.module';
import { NzPaginationModule } from './pagination';
import { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
import { NzPopoverModule } from './popover/nz-popover.module';
import { NzProgressModule } from './progress';
import { NzRadioModule } from './radio';
import { NzRateModule } from './rate';
import { NzSelectModule } from './select';
import { NzSliderModule } from './slider/nz-slider.module';
import { NzSpinModule } from './spin';
import { NzStepsModule } from './steps';
import { NzSwitchModule } from './switch';
import { NzTableModule } from './table';
import { NzTabsModule } from './tabs';
import { NzTagModule } from './tag/nz-tag.module';
import { NzTimelineModule } from './timeline';
import { NzToolTipModule } from './tooltip/nz-tooltip.module';
import { NzTransferModule } from './transfer';
import { NzUploadModule } from './upload';

export * from './button';
export * from './divider';
export * from './grid';
export * from './layout';
export * from './dropdown';
export * from './menu';
export * from './upload';
export * from './transfer';
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
export * from './modal/public-api';

@NgModule({
  exports: [
    NzButtonModule,
    NzCalendarModule,
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
