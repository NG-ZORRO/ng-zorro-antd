import Calendar from './calendar/de_DE';
import DatePicker from './date-picker/de_DE';
import Pagination from './pagination/de_DE';
import TimePicker from './time-picker/de_DE';

export default {
  locale: 'de',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter-Menü',
    filterConfirm: 'OK',
    filterReset: 'Zurücksetzen',
    selectAll: 'Selektiere Alle',
    selectInvert: 'Selektion Invertieren',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  Transfer: {
    searchPlaceholder: 'Suchen',
    itemUnit: 'Eintrag',
    itemsUnit: 'Einträge',
  },
  Upload: {
    uploading: 'Hochladen...',
    removeFile: 'Datei entfernen',
    uploadError: 'Fehler beim Hochladen',
    previewFile: 'Dateivorschau',
  },
  Empty: {
    description: 'Keine Daten',
  },
};
