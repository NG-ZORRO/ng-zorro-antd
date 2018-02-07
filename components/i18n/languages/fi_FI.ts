import Calendar from './calendar/fi_FI';
import DatePicker from './date-picker/fi_FI';
import Pagination from './pagination/fi_FI';
import TimePicker from './time-picker/fi_FI';

export default {
  locale: 'fi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Suodatus valikko',
    filterConfirm: 'OK',
    filterReset: 'Tyhjennä',
    emptyText: 'Ei kohteita',
    selectAll: 'Valitse kaikki',
    selectInvert: 'Valitse päinvastoin',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Peruuta',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Peruuta',
  },
  Transfer: {
    notFoundContent: 'Ei löytynyt',
    searchPlaceholder: 'Etsi täältä',
    itemUnit: 'kohde',
    itemsUnit: 'kohdetta',
  },
  Select: {
    notFoundContent: 'Ei löytynyt',
  },
  Upload: {
    uploading: 'Lähetetään...',
    removeFile: 'Poista tiedosto',
    uploadError: 'Virhe lähetyksessä',
    previewFile: 'Esikatsele tiedostoa',
  },
};
