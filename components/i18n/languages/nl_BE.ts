import Calendar from './calendar/nl_BE';
import DatePicker from './date-picker/nl_BE';
import Pagination from './pagination/nl_BE';
import TimePicker from './time-picker/nl_BE';

export default {
  locale: 'nl-be',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'FilterMenu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Selecteer huidige pagina',
    selectInvert: 'Selecteer huidige pagina',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleer',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleer',
  },
  Transfer: {
    searchPlaceholder: 'Zoek hier',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Upload: {
    uploading: 'Uploaden...',
    removeFile: 'Bestand verwijderen',
    uploadError: 'Upload fout',
    previewFile: 'Preview bestand',
  },
  Empty: {
    description: 'Geen gegevens',
  },
};
