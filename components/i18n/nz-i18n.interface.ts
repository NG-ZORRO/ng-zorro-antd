/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Locale } from 'date-fns';

export interface NzPaginationI18nInterface {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;

  // Pagination.jsx
  prev_page: string;
  next_page: string;
  prev_5: string;
  next_5: string;
  prev_3: string;
  next_3: string;
}

export interface NzGlobalI18nInterface {
  placeholder: string;
}

export interface NzDatePickerI18nInterface {
  lang: NzDatePickerLangI18nInterface;
  timePickerLocale: NzTimePickerI18nInterface;
}

export interface NzCalendarI18nInterface {
  today: string;
  now: string;
  backToToday: string;
  ok: string;
  clear: string;
  month: string;
  year: string;
  timeSelect: string;
  dateSelect: string;
  monthSelect: string;
  yearSelect: string;
  decadeSelect: string;
  yearFormat: string;
  monthFormat?: string;
  dateFormat: string;
  dayFormat: string;
  dateTimeFormat: string;
  monthBeforeYear?: boolean;
  previousMonth: string;
  nextMonth: string;
  previousYear: string;
  nextYear: string;
  previousDecade: string;
  nextDecade: string;
  previousCentury: string;
  nextCentury: string;
}

export interface NzDatePickerLangI18nInterface extends NzCalendarI18nInterface {
  placeholder?: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangePlaceholder?: string[];
  rangeYearPlaceholder?: string[];
  rangeQuarterPlaceholder?: string[];
  rangeMonthPlaceholder?: string[];
  rangeWeekPlaceholder?: string[];
}

export interface NzTimePickerI18nInterface {
  placeholder?: string;
  rangePlaceholder?: string[];
}

export type ValidateMessage = string | (() => string);

export type NzCascaderI18nInterface = NzGlobalI18nInterface;

export interface NzTableI18nInterface {
  filterTitle?: string;
  filterConfirm?: string;
  filterReset?: string;
  selectAll?: string;
  selectInvert?: string;
  selectionAll?: string;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
  triggerDesc?: string;
  triggerAsc?: string;
  cancelSort?: string;
}

export interface NzModalI18nInterface {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export interface NzPopconfirmI18nInterface {
  okText: string;
  cancelText: string;
}

export interface NzTransferI18nInterface {
  titles?: string[];
  searchPlaceholder?: string;
  itemUnit?: string;
  itemsUnit?: string;
}

export interface NzUploadI18nInterface {
  uploading?: string;
  removeFile?: string;
  uploadError?: string;
  previewFile?: string;
  downloadFile?: string;
}

export interface NzEmptyI18nInterface {
  description: string;
}

export interface NzTextI18nInterface {
  edit: string;
  copy: string;
  copied: string;
  expand: string;
}

export interface NzCronExpressionLabelI18n {
  second?: string;
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  week?: string;
}

export interface NzCronExpressionCronErrorI18n {
  cronError?: string;
}

export type NzCronExpressionI18nInterface = NzCronExpressionCronErrorI18n & NzCronExpressionLabelI18n;

export interface NzQRCodeI18nInterface {
  expired: string;
  refresh: string;
  scanned: string;
}

export interface NzCheckListI18nInterface {
  checkList: string;
  checkListFinish: string;
  checkListClose: string;
  checkListFooter: string;
  checkListCheck: string;
  ok: string;
  cancel: string;
  checkListCheckOther: string;
}

export interface NzFormI18nInterface {
  optional: string;
}

export interface NzI18nInterface {
  locale: string;
  Pagination: NzPaginationI18nInterface;
  DatePicker: NzDatePickerI18nInterface;
  TimePicker: NzTimePickerI18nInterface;
  Calendar: NzDatePickerI18nInterface;
  global?: NzGlobalI18nInterface;
  Table: NzTableI18nInterface;
  Modal: NzModalI18nInterface;
  Popconfirm: NzPopconfirmI18nInterface;
  Transfer: NzTransferI18nInterface;
  Upload: NzUploadI18nInterface;
  Empty: NzEmptyI18nInterface;
  Form: NzFormI18nInterface;
  Text?: NzTextI18nInterface;
  CronExpression?: NzCronExpressionI18nInterface;
  QRCode?: NzQRCodeI18nInterface;
  CheckList?: NzCheckListI18nInterface;
}

export type DateLocale = Locale;
