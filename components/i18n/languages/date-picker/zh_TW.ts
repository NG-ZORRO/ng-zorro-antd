/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/zh_TW';
import TimePickerLocale from '../time-picker/zh_TW';

const locale = {
  lang: {
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

locale.lang.ok = '確 定';

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
