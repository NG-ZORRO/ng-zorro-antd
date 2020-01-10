/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/hi_IN';
import TimePickerLocale from '../time-picker/hi_IN';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'तारीख़ चुनें',
    rangePlaceholder: ['प्रारंभ तिथि', 'समाप्ति तिथि'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
