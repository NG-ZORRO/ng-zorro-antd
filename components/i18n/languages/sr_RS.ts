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
    emptyText: 'Nema podataka',
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
    notFoundContent: 'Nisu pronađeni rezultati pretrage',
    searchPlaceholder: 'Pretražite ovde',
    itemUnit: 'stavka',
    itemsUnit: 'stavki',
  },
  Select: {
    notFoundContent: 'Nije pronađeno',
  },
  Upload: {
    uploading: 'Slanje...',
    removeFile: 'Ukloni fajl',
    uploadError: 'Greška prilikom slanja',
    previewFile: 'Pogledaj fajl',
  },
};
