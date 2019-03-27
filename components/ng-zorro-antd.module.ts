import { ModuleWithProviders, NgModule } from '@angular/core';

import { NzAffixModule } from './affix/nz-affix.module';
import { NzAlertModule } from './alert/nz-alert.module';
import { NzAnchorModule } from './anchor/nz-anchor.module';
import { NzAutocompleteModule } from './auto-complete/nz-autocomplete.module';
import { NzAvatarModule } from './avatar/nz-avatar.module';
import { NzBackTopModule } from './back-top/nz-back-top.module';
import { NzBadgeModule } from './badge/nz-badge.module';
import { NzBreadCrumbModule } from './breadcrumb/nz-breadcrumb.module';
import { NzButtonModule } from './button/nz-button.module';
import { NzCalendarModule } from './calendar/nz-calendar.module';
import { NzCardModule } from './card/nz-card.module';
import { NzCarouselModule } from './carousel/nz-carousel.module';
import { NzCascaderModule } from './cascader/nz-cascader.module';
import { NzCheckboxModule } from './checkbox/nz-checkbox.module';
import { NzCollapseModule } from './collapse/nz-collapse.module';
import { NzCommentModule } from './comment/nz-comment.module';
import { NzNoAnimationModule } from './core/no-animation/nz-no-animation.module';
import { NzWaveModule } from './core/wave/nz-wave.module';
import { NzDatePickerModule } from './date-picker/date-picker.module';
import { NzDividerModule } from './divider/nz-divider.module';
import { NzDrawerModule } from './drawer/nz-drawer.module';
import { NzDropDownModule } from './dropdown/nz-dropdown.module';
import { NzEmptyModule } from './empty/nz-empty.module';
import { NzFormModule } from './form/nz-form.module';
import { NzGridModule } from './grid/nz-grid.module';
import { NzI18nModule } from './i18n/nz-i18n.module';
import { NzIconModule } from './icon/nz-icon.module';
import { NzInputNumberModule } from './input-number/nz-input-number.module';
import { NzInputModule } from './input/nz-input.module';
import { NzLayoutModule } from './layout/nz-layout.module';
import { NzListModule } from './list/nz-list.module';
import { NzMentionModule } from './mention/nz-mention.module';
import { NzMenuModule } from './menu/nz-menu.module';
import { NzMessageModule } from './message/nz-message.module';
import { NzModalModule } from './modal/nz-modal.module';
import { NzNotificationModule } from './notification/nz-notification.module';
import { NzPageHeaderModule } from './page-header/nz-page-header.module';
import { NzPaginationModule } from './pagination/nz-pagination.module';
import { NzPopconfirmModule } from './popconfirm/nz-popconfirm.module';
import { NzPopoverModule } from './popover/nz-popover.module';
import { NzProgressModule } from './progress/nz-progress.module';
import { NzRadioModule } from './radio/nz-radio.module';
import { NzRateModule } from './rate/nz-rate.module';
import { NzSelectModule } from './select/nz-select.module';
import { NzSkeletonModule } from './skeleton/nz-skeleton.module';
import { NzSliderModule } from './slider/nz-slider.module';
import { NzSpinModule } from './spin/nz-spin.module';
import { NzStatisticModule } from './statistic/nz-statistic.module';
import { NzStepsModule } from './steps/nz-steps.module';
import { NzSwitchModule } from './switch/nz-switch.module';
import { NzTableModule } from './table/nz-table.module';
import { NzTabsModule } from './tabs/nz-tabs.module';
import { NzTagModule } from './tag/nz-tag.module';
import { NzTimePickerModule } from './time-picker/nz-time-picker.module';
import { NzTimelineModule } from './timeline/nz-timeline.module';
import { NzToolTipModule } from './tooltip/nz-tooltip.module';
import { NzTransferModule } from './transfer/nz-transfer.module';
import { NzTreeSelectModule } from './tree-select/nz-tree-select.module';
import { NzTreeModule } from './tree/nz-tree.module';
import { NzUploadModule } from './upload/nz-upload.module';

export * from './affix';
export * from './alert';
export * from './anchor';
export * from './avatar';
export * from './back-top';
export * from './badge';
export * from './breadcrumb';
export * from './button';
export * from './calendar';
export * from './card';
export * from './carousel';
export * from './checkbox';
export * from './collapse';
export * from './comment';
export * from './date-picker';
export * from './divider';
export * from './drawer';
export * from './dropdown';
export * from './drawer';
export * from './empty';
export * from './form';
export * from './grid';
export * from './i18n';
export * from './icon';
export * from './input';
export * from './input-number';
export * from './layout';
export * from './list';
export * from './mention';
export * from './menu';
export * from './page-header';
export * from './pagination';
export * from './progress';
export * from './radio';
export * from './rate';
export * from './select';
export * from './spin';
export * from './statistic';
export * from './steps';
export * from './switch';
export * from './table';
export * from './tabs';
export * from './timeline';
export * from './transfer';
export * from './upload';
export * from './tag';
export * from './auto-complete';
export * from './message';
export * from './time-picker';
export * from './tooltip';
export * from './skeleton';
export * from './slider';
export * from './popover';
export * from './notification';
export * from './popconfirm';
export * from './modal';
export * from './cascader';
export * from './tree';
export * from './tree-select';
export * from './time-picker';
export * from './version';
export * from './core/wave';
export * from './core/util';
export * from './core/no-animation';

@NgModule({
  exports: [
    NzButtonModule,
    NzCalendarModule,
    NzGridModule,
    NzSwitchModule,
    NzSelectModule,
    NzMenuModule,
    NzMentionModule,
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
    NzSliderModule,
    NzRateModule,
    NzBadgeModule,
    NzRadioModule,
    NzAlertModule,
    NzSpinModule,
    NzPageHeaderModule,
    NzProgressModule,
    NzTabsModule,
    NzIconModule,
    NzCardModule,
    NzAvatarModule,
    NzTimelineModule,
    NzTransferModule,
    NzCarouselModule,
    NzCollapseModule,
    NzCommentModule,
    NzTableModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDrawerModule,
    NzFormModule,
    NzListModule,
    NzI18nModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzTagModule,
    NzMessageModule,
    NzNotificationModule,
    NzPopoverModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzModalModule,
    NzBackTopModule,
    NzCascaderModule,
    NzTreeModule,
    NzTreeSelectModule,
    NzTimePickerModule,
    NzWaveModule,
    NzNoAnimationModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzEmptyModule
  ]
})
export class NgZorroAntdModule {
  /**
   * @deprecated Use `NgZorroAntdModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgZorroAntdModule
    };
  }
}
