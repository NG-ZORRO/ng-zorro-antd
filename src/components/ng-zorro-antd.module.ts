// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------

// Common of angular
import { NgModule, ModuleWithProviders } from '@angular/core';

// Modules
import { LoggerModule } from './util/logger/index';
import { NzLocaleModule } from './locale/index';
// import { NzLocaleProviderModule } from './locale-provider';
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
import { NzTransferModule } from './transfer/nz-transfer.module';

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

// Mixes
export * from './locale/index';
// export { NZ_DEFAULT_LOCALE } from './locale-provider';
// export * from './locale-provider/locale';
export { NZ_LOGGER_STATE } from './util/logger/index';

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
export { NzTransferModule } from './transfer/nz-transfer.module';

// Components
export { NzRowComponent } from './grid/nz-row.component';
export { NzColComponent } from './grid/nz-col.component';
export { NzColDirective } from './grid/nz-col.directive';
export { NzButtonGroupComponent } from './button/nz-button-group.component';
export { NzButtonComponent } from './button/nz-button.component';
export { NzAlertComponent } from './alert/nz-alert.component';
export { NzBadgeComponent } from  './badge/nz-badge.component';
export { NzCalendarComponent } from './calendar/nz-calendar.component';
export { NzCascaderComponent } from './cascader/nz-cascader.component';
export { NzCheckboxGroupComponent } from './checkbox/nz-checkbox-group.component';
export { NzCheckboxComponent } from './checkbox/nz-checkbox.component';
export { NzDatePickerComponent } from './datepicker/nz-datepicker.component';
export { NzFormControlComponent } from './form/nz-form-control.component';
export { NzFormExplainComponent } from './form/nz-form-explain.directive';
export { NzFormExtraDirective } from './form/nz-form-extra.directive';
export { NzFormItemRequiredDirective } from './form/nz-form-item-required.directive';
export { NzFormItemDirective } from './form/nz-form-item.directive';
export { NzFormLabelDirective } from './form/nz-form-label.directive';
export { NzFormSplitDirective } from './form/nz-form-split.directive';
export { NzFormTextDirective } from './form/nz-form-text.directive';
export { NzFormComponent } from './form/nz-form.component';
export { NzInputGroupComponent } from './input/nz-input-group.component';
export { NzInputComponent } from './input/nz-input.component';
export { NzInputDirectiveComponent } from './input/nz-input.directive.component';
export { NzMessageContainerComponent } from './message/nz-message-container.component';
export { NzMessageComponent } from './message/nz-message.component';
export { NzConfirmComponent } from './modal/nz-confirm.component';
export { NzModalComponent } from './modal/nz-modal.component';
export { NzNotificationContainerComponent } from './notification/nz-notification-container.component';
export { NzNotificationComponent } from './notification/nz-notification.component';
export { NzPaginationComponent } from './pagination/nz-pagination.component';
export { NzPopconfirmComponent } from './popconfirm/nz-popconfirm.component';
export { NzPopconfirmDirective } from './popconfirm/nz-popconfirm.directive';
export { NzPopoverComponent } from './popover/nz-popover.component';
export { NzPopoverDirective } from './popover/nz-popover.directive';
export { NzRadioButtonComponent } from './radio/nz-radio-button.component';
export { NzRadioGroupComponent } from './radio/nz-radio-group.component';
export { NzRadioComponent } from './radio/nz-radio.component';
export { NzRateComponent } from './rate/nz-rate.component';
export { NzOptionComponent } from './select/nz-option.component';
export { NzSelectComponent } from './select/nz-select.component';
export { NzSpinComponent } from './spin/nz-spin.component';
export { NzProgressComponent } from './progress/nz-progress.component';
export { NzSliderComponent } from './slider/nz-slider.component';
export { NzSliderHandleComponent } from './slider/nz-slider-handle.component';
export { NzSliderMarksComponent } from './slider/nz-slider-marks.component';
export { NzSliderStepComponent } from './slider/nz-slider-step.component';
export { NzSliderTrackComponent } from './slider/nz-slider-track.component';
export { NzSwitchComponent } from './switch/nz-switch.component';
export { NzThDirective } from './table/nz-th.directive';
export { NzRowIndentComponent } from './table/nz-row-indent.component';
export { NzTableFilterComponent } from './table/nz-table-filter.component';
export { NzTableComponent } from './table/nz-table.component';
export { NzTheadDirective } from './table/nz-thead.directive';
export { NzTableSortComponent } from './table/nz-table-sort.component';
export { NzRowExpandIconComponent } from './table/nz-row-expand-icon.component';
export { NzTableDividerDirective } from './table/nz-table-divider.directive';
export { NzTbodyTrDirective } from './table/nz-tbody-tr.directive';
export { NzTbodyDirective } from './table/nz-tbody.directive';
export { NzTdDirective } from './table/nz-td.directive';
export { NzTabSetComponent } from './tabs/nz-tabset.component';
export { NzTabsNavComponent } from './tabs/nz-tabs-nav.component';
export { NzTabLabelDirective } from './tabs/nz-tab-label.directive';
export { NzTabPositionMode } from './tabs/nz-tabs-ink-bar.directive';
export { NzTabBodyComponent } from './tabs/nz-tab-body.component';
export { NzTabComponent } from './tabs/nz-tab.component';
export { NzCheckableTagComponent } from './tag/nz-checkable-tag.component';
export { NzTagComponent } from './tag/nz-tag.component';
export { NzTimePickerInnerComponent } from './time-picker/nz-timepicker-inner.component';
export { NzTimePickerComponent } from './time-picker/nz-timepicker.component';
export { NzStepComponent } from './steps/nz-step.component';
export { NzStepsComponent } from './steps/nz-steps.component';
export { NzDropDownComponent } from './dropdown/nz-dropdown.component';
export { NzDropDownDirective } from './dropdown/nz-dropdown.directive';
export { NzDropDownButtonComponent } from './dropdown/nz-dropdown-button.component';
export { NzMenuDividerComponent } from './menu/nz-menu-divider.component';
export { NzMenuGroupComponent } from './menu/nz-menu-group.component';
export { NzMenuItemComponent } from './menu/nz-menu-item.component';
export { NzMenuComponent } from './menu/nz-menu.component';
export { NzSubMenuComponent } from './menu/nz-submenu.component';
export { NzBreadCrumbItemComponent } from './breadcrumb/nz-breadcrumb-item.component';
export { NzBreadCrumbComponent } from './breadcrumb/nz-breadcrumb.component';
export { NzContentComponent } from './layout/nz-content.component';
export { NzFooterComponent } from './layout/nz-footer.component';
export { NzHeaderComponent } from './layout/nz-header.component';
export { NzLayoutComponent } from './layout/nz-layout.component';
export { NzBreakPoinit } from './layout/nz-sider.component';
export { NzCarouselContentDirective } from './carousel/nz-carousel-content.directive';
export { NzCarouselComponent } from './carousel/nz-carousel.component';
export { NzCardGridDirective } from './card/nz-card-grid.directive';
export { NzCardComponent } from './card/nz-card.component';
export { NzCollapseComponent } from './collapse/nz-collapse.component';
export { NzCollapsesetComponent } from './collapse/nz-collapseset.component';
export { NzTimelineItemComponent } from './timeline/nz-timeline-item.component';
export { NzTimelineComponent } from './timeline/nz-timeline.component';
export { NzToolTipComponent } from './tooltip/nz-tooltip.component';
export { NzTooltipDirective } from './tooltip/nz-tooltip.directive';
export { NzBackTopComponent } from './back-top/nz-back-top.component';
export { NzAffixComponent } from './affix/nz-affix.component';
export { NzAnchorLinkComponent } from './anchor/nz-anchor-link.component';
export { NzAnchorComponent } from './anchor/nz-anchor.component';
export { NzAvatarComponent } from './avatar/nz-avatar.component';
export { NzTransferComponent } from './transfer/nz-transfer.component';

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
    LoggerModule,
    NzLocaleModule,
    // NzLocaleProviderModule,
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
    NzAvatarModule,
    NzTransferModule
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
