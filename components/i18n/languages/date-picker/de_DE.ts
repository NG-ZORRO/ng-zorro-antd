import CalendarLocale from '../calendar/de_DE';
import TimePickerLocale from '../time-picker/de_DE';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
