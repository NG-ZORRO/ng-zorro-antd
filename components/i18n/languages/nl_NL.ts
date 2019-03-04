import Calendar from './calendar/nl_NL';
import DatePicker from './date-picker/nl_NL';
import Pagination from './pagination/nl_NL';
import TimePicker from './time-picker/nl_NL';

export default {
  locale: 'nl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filteren',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Selecteer huidige pagina',
    selectInvert: 'Deselecteer huidige pagina',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleren',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleren',
  },
  Transfer: {
    searchPlaceholder: 'Zoeken',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Upload: {
    uploading: 'Uploaden...',
    removeFile: 'Verwijder bestand',
    uploadError: 'Fout tijdens uploaden',
    previewFile: 'Bekijk bestand',
  },
  Empty: {
    description: 'Geen gegevens',
  },
};
