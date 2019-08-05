/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import TimePickerLocale from '../time-picker/ms_MY';

const CalendarLocale = {
  today: 'Hari ini',
  now: 'Sekarang',
  backToToday: 'Kembali ke hari ini',
  ok: 'Ok',
  timeSelect: 'Pilih masa',
  dateSelect: 'Pilih tarikh',
  weekSelect: 'Pilih minggu',
  clear: 'Padam',
  month: 'Bulan',
  year: 'Tahun',
  previousMonth: 'Bulan lepas',
  nextMonth: 'Bulan depan',
  monthSelect: 'Pilih bulan',
  yearSelect: 'Pilih tahun',
  decadeSelect: 'Pilih dekad',
  yearFormat: 'YYYY',
  dayFormat: 'D',
  dateFormat: 'M/D/YYYY',
  dateTimeFormat: 'M/D/YYYY HH:mm:ss',
  previousYear: 'Tahun lepas (Ctrl+left)',
  nextYear: 'Tahun depan (Ctrl+right)',
  previousDecade: 'Dekad lepas',
  nextDecade: 'Dekad depan',
  previousCentury: 'Abad lepas',
  nextCentury: 'Abad depan'
};

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Pilih tarikh',
    rangePlaceholder: ['Tarikh mula', 'Tarikh akhir'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
