import Calendar from './calendar/sr_RS';
import DatePicker from './date-picker/sr_RS';
import Pagination from './pagination/sr_RS';
import TimePicker from './time-picker/sr_RS';

export default {
  locale: 'sr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Primeni filter',
    filterReset: 'Resetuj filter',
    selectAll: 'Obeleži sve na trenutnoj strani',
    selectInvert: 'Obrni selekciju na trenutnoj stranici',
  },
  Modal: {
    okText: 'U redu',
    cancelText: 'Otkaži',
    justOkText: 'U redu',
  },
  Popconfirm: {
    okText: 'U redu',
    cancelText: 'Otkaži',
  },
  Transfer: {
    searchPlaceholder: 'Pretražite ovde',
    itemUnit: 'stavka',
    itemsUnit: 'stavki',
  },
  Upload: {
    uploading: 'Slanje...',
    removeFile: 'Ukloni fajl',
    uploadError: 'Greška prilikom slanja',
    previewFile: 'Pogledaj fajl',
  },
  Empty: {
    description: 'Nema podataka',
  },
};
