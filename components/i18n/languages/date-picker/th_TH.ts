import CalendarLocale from '../calendar/th_TH';
import TimePickerLocale from '../time-picker/th_TH';

// Merge into a locale object
const locale = {
  lang            : {
    placeholder     : 'เลือกวันที่',
    rangePlaceholder: [ 'วันเริ่มต้น', 'วันสิ้นสุด' ],
    ...CalendarLocale
  },
  timePickerLocale: { ...TimePickerLocale }
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
