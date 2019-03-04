/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */

import CalendarLocale from '../calendar/ru_RU';
import TimePickerLocale from '../time-picker/ru_RU';

const locale = {
  lang: {
    placeholder: 'Выберите дату',
    rangePlaceholder: ['Начальная дата', 'Конечная дата'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
