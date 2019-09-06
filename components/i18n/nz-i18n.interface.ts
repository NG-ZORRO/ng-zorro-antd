/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  placeholder: string;
  rangePlaceholder: string[];
}

export interface NzTimePickerI18nInterface {
  placeholder: string;
}

export type NzCascaderI18nInterface = NzGlobalI18nInterface;

export interface NzI18nInterface {
  locale: string;
  Pagination: NzPaginationI18nInterface;
  DatePicker: NzDatePickerI18nInterface;
  TimePicker: NzTimePickerI18nInterface;
  Calendar: NzCalendarI18nInterface;
  global?: NzGlobalI18nInterface;
  Table: {
    filterTitle: string;
    filterConfirm: string;
    filterReset: string;
    selectAll: string;
    selectInvert: string;
  };
  Modal: {
    okText: string;
    cancelText: string;
    justOkText: string;
  };
  Popconfirm: {
    okText: string;
    cancelText: string;
  };
  Transfer: {
    titles?: string[];
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
  };
  Upload: {
    uploading: string;
    removeFile: string;
    uploadError: string;
    previewFile: string;
  };
  Empty: {
    description: string;
  };
  // TODO: make this required in the future.
  // Temporarily optional to make sure not break anything.
  Text?: {
    edit: string;
    copy: string;
    copied: string;
    expand: string;
  };
}

// tslint:disable-next-line:no-any
export type DateLocale = any; // TODO: Implement this type definition when date-fns is stable
