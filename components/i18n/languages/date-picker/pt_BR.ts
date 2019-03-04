import CalendarLocale from '../calendar/pt_BR';
import TimePickerLocale from '../time-picker/pt_BR';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Selecionar data',
    rangePlaceholder: ['Data de início', 'Data de fim'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
