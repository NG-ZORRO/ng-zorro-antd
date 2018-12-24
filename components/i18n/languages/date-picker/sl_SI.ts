import CalendarLocale from '../calendar/sl_SI';
import TimePickerLocale from '../time-picker/sl_SI';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Izberite datum',
    rangePlaceholder: ['Začetni datum', 'Končni datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
