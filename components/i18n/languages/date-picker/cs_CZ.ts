import CalendarLocale from '../calendar/cs_CZ';
import TimePickerLocale from '../time-picker/cs_CZ';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
