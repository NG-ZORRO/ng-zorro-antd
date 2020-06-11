/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/hy_AM';
import TimePickerLocale from '../time-picker/hy_AM';

// Merge into a locale object
export const locale = {
  lang: {
    placeholder: 'Ընտրեք ամսաթիվը',
    rangePlaceholder: ['Մեկնարկի ամսաթիվ', 'Ավարտի ամսաթիվը'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
