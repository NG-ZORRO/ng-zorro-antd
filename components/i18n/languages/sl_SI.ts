import Calendar from './calendar/sl_SI';
import DatePicker from './date-picker/sl_SI';
import Pagination from './pagination/sl_SI';
import TimePicker from './time-picker/sl_SI';

export default {
  locale: 'sl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Potrdi',
    filterReset: 'Ponastavi',
    emptyText: 'Ni podataka',
    selectAll: 'Izberi trenutno stran',
    selectInvert: 'Obrni vrstni red izbora',
  },
  Modal: {
    okText: 'V redu',
    cancelText: 'Prekliči',
    justOkText: 'V redu',
  },
  Popconfirm: {
    okText: 'V redu',
    cancelText: 'Prekliči',
  },
  Transfer: {
    notFoundContent: 'Ni zadetkov',
    searchPlaceholder: 'Išči tukaj',
    itemUnit: 'vnos',
    itemsUnit: 'vnosi',
  },
  Select: {
    notFoundContent: 'Ni zadetkov',
  },
  Upload: {
    uploading: 'Nalaganje...',
    removeFile: 'Odstrani datoteko',
    uploadError: 'Napaka pri nalaganju',
    previewFile: 'Predogled datoteke',
  },
};
