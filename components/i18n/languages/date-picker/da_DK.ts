import CalendarLocale from '../calendar/da_DK';
import TimePickerLocale from '../time-picker/da_DK';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
