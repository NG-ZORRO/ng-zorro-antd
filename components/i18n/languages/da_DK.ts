import Calendar from './calendar/da_DK';
import DatePicker from './date-picker/da_DK';
import Pagination from './pagination/da_DK';
import TimePicker from './time-picker/da_DK';

export default {
  locale: 'da',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  Table: {
    filterTitle: 'Filtermenu',
    filterConfirm: 'OK',
    filterReset: 'Nulstil',
    emptyText: 'Ingen data',
    selectAll: 'Vælg alle',
    selectInvert: 'Inverter valg',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuller',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuller',
  },
  Transfer: {
    notFoundContent: 'Intet match',
    searchPlaceholder: 'Søg her',
    itemUnit: 'element',
    itemsUnit: 'elementer',
  },
  Select: {
    notFoundContent: 'Intet match',
  },
  Upload: {
    uploading: 'Uploader...',
    removeFile: 'Fjern fil',
    uploadError: 'Fejl ved upload',
    previewFile: 'Forhåndsvisning',
  },
};
