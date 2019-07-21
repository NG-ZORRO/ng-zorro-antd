/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { warnDeprecation, NzNoAnimationModule, NzTransButtonModule, NzWaveModule } from 'ng-zorro-antd/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';

export * from 'ng-zorro-antd/affix';
export * from 'ng-zorro-antd/alert';
export * from 'ng-zorro-antd/anchor';
export * from 'ng-zorro-antd/auto-complete';
export * from 'ng-zorro-antd/avatar';
export * from 'ng-zorro-antd/back-top';
export * from 'ng-zorro-antd/badge';
export * from 'ng-zorro-antd/breadcrumb';
export * from 'ng-zorro-antd/button';
export * from 'ng-zorro-antd/calendar';
export * from 'ng-zorro-antd/card';
export * from 'ng-zorro-antd/carousel';
export * from 'ng-zorro-antd/cascader';
export * from 'ng-zorro-antd/checkbox';
export * from 'ng-zorro-antd/collapse';
export * from 'ng-zorro-antd/comment';
export * from 'ng-zorro-antd/core';
export * from 'ng-zorro-antd/date-picker';
export * from 'ng-zorro-antd/descriptions';
export * from 'ng-zorro-antd/divider';
export * from 'ng-zorro-antd/drawer';
export * from 'ng-zorro-antd/dropdown';
export * from 'ng-zorro-antd/empty';
export * from 'ng-zorro-antd/form';
export * from 'ng-zorro-antd/grid';
export * from 'ng-zorro-antd/i18n';
export * from 'ng-zorro-antd/icon';
export * from 'ng-zorro-antd/input';
export * from 'ng-zorro-antd/input-number';
export * from 'ng-zorro-antd/layout';
export * from 'ng-zorro-antd/list';
export * from 'ng-zorro-antd/mention';
export * from 'ng-zorro-antd/menu';
export * from 'ng-zorro-antd/message';
export * from 'ng-zorro-antd/modal';
export * from 'ng-zorro-antd/notification';
export * from 'ng-zorro-antd/page-header';
export * from 'ng-zorro-antd/pagination';
export * from 'ng-zorro-antd/popconfirm';
export * from 'ng-zorro-antd/popover';
export * from 'ng-zorro-antd/progress';
export * from 'ng-zorro-antd/radio';
export * from 'ng-zorro-antd/rate';
export * from 'ng-zorro-antd/result';
export * from 'ng-zorro-antd/select';
export * from 'ng-zorro-antd/skeleton';
export * from 'ng-zorro-antd/slider';
export * from 'ng-zorro-antd/spin';
export * from 'ng-zorro-antd/statistic';
export * from 'ng-zorro-antd/steps';
export * from 'ng-zorro-antd/switch';
export * from 'ng-zorro-antd/table';
export * from 'ng-zorro-antd/tabs';
export * from 'ng-zorro-antd/tag';
export * from 'ng-zorro-antd/time-picker';
export * from 'ng-zorro-antd/timeline';
export * from 'ng-zorro-antd/tooltip';
export * from 'ng-zorro-antd/transfer';
export * from 'ng-zorro-antd/tree';
export * from 'ng-zorro-antd/tree-select';
export * from 'ng-zorro-antd/typography';
export * from 'ng-zorro-antd/upload';

export * from 'ng-zorro-antd/version';

@NgModule({
  exports: [
    NzAffixModule,
    NzAlertModule,
    NzAnchorModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzCardModule,
    NzCarouselModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzCommentModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzI18nModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMentionModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    NzNoAnimationModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzProgressModule,
    NzRadioModule,
    NzRateModule,
    NzResultModule,
    NzSelectModule,
    NzSkeletonModule,
    NzSliderModule,
    NzSpinModule,
    NzStatisticModule,
    NzStepsModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzTimelineModule,
    NzToolTipModule,
    NzTransButtonModule,
    NzTransferModule,
    NzTreeModule,
    NzTreeSelectModule,
    NzTypographyModule,
    NzUploadModule,
    NzWaveModule
  ]
})
export class NgZorroAntdModule {
  /**
   * @deprecated Use `NgZorroAntdModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    warnDeprecation(
      `'forRoot' is not recommended if you are using Angular 6.0.0+. This API is going to be removed in 9.0.0.`
    );
    return {
      ngModule: NgZorroAntdModule
    };
  }
}
