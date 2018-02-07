import CalendarLocale from '../calendar/et_EE';
import TimePickerLocale from '../time-picker/et_EE';

// 统一合并为完整的 Locale
const locale = {
  lang: {
    placeholder: 'Vali kuupäev',
    rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
