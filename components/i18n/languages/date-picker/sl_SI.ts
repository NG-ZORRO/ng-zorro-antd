/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import TimePickerLocale from '../time-picker/sl_SI';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Izberite datum',
    rangePlaceholder: ['Začetni datum', 'Končni datum'],
    today: 'Danes',
    now: 'Trenutno',
    backToToday: 'Nazaj na trenutni datum',
    ok: 'Ok',
    clear: 'Počisti',
    month: 'Mesec',
    year: 'Leto',
    timeSelect: 'Izberi čas',
    dateSelect: 'Izberi datum',
    monthSelect: 'Izberite mesec',
    yearSelect: 'Izberite leto',
    decadeSelect: 'Izberite desetletje',
    yearFormat: 'YYYY',
    dateFormat: 'D.M.YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'D.M.YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Prejšnji mesec (PageUp)',
    nextMonth: 'Naslednji mesec (PageDown)',
    previousYear: 'Lansko leto (Control + left)',
    nextYear: 'Naslednje leto (Control + right)',
    previousDecade: 'Prejšnje desetletje',
    nextDecade: 'Naslednje desetletje',
    previousCentury: 'Zadnje stoletje',
    nextCentury: 'Naslednje stoletje'
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
