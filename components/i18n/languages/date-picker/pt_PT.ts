/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import CalendarLocale from '../calendar/pt_PT';
import TimePickerLocale from '../time-picker/pt_PT';

// Merge into a locale object
const locale = {
  lang: {
    ...CalendarLocale,
    placeholder: 'Data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    today: 'Hoje',
    now: 'Agora',
    backToToday: 'Hoje',
    ok: 'Ok',
    clear: 'Limpar',
    month: 'Mês',
    year: 'Ano',
    timeSelect: 'Hora',
    dateSelect: 'Selecionar data',
    monthSelect: 'Selecionar mês',
    yearSelect: 'Selecionar ano',
    decadeSelect: 'Selecionar década',
    yearFormat: 'YYYY',
    dateFormat: 'D/M/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'D/M/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: false,
    previousMonth: 'Mês anterior (PageUp)',
    nextMonth: 'Mês seguinte (PageDown)',
    previousYear: 'Ano anterior (Control + left)',
    nextYear: 'Ano seguinte (Control + right)',
    previousDecade: 'Última década',
    nextDecade: 'Próxima década',
    previousCentury: 'Último século',
    nextCentury: 'Próximo século'
  },
  timePickerLocale: {
    ...TimePickerLocale,
    placeholder: 'Hora'
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
