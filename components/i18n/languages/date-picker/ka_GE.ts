/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/ka_GE';
import TimePickerLocale from '../time-picker/ka_GE';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'აირჩიეთ თარიღი',
    rangePlaceholder: ['საწყისი თარიღი', 'ბოლო თარიღი'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
