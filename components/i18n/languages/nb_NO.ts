import Calendar from './calendar/nb_NO';
import DatePicker from './date-picker/nb_NO';
import Pagination from './pagination/nb_NO';
import TimePicker from './time-picker/nb_NO';

export default {
  locale: 'nb',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Nullstill',
    emptyText: 'Ingen data',
    selectAll: 'Velg alle',
    selectInvert: 'Inverter valg',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Avbryt',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Avbryt',
  },
  Transfer: {
    notFoundContent: 'Ingen treff',
    searchPlaceholder: 'Søk her',
    itemUnit: 'element',
    itemsUnit: 'elementer',
  },
  Select: {
    notFoundContent: 'Ingen treff',
  },
  Upload: {
    uploading: 'Laster opp...',
    removeFile: 'Fjern fil',
    uploadError: 'Feil ved opplastning',
    previewFile: 'Forhåndsvisning',
  },
};
