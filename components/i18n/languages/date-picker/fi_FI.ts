/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/fi_FI';
import TimePickerLocale from '../time-picker/fi_FI';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
