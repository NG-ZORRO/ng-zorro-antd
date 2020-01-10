/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/it_IT';
import TimePickerLocale from '../time-picker/it_IT';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Selezionare la data',
    rangePlaceholder: ["Data d'inizio", 'Data di fine'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
