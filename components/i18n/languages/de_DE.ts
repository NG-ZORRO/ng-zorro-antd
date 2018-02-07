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
    emptyText: 'Keine Daten',
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
    notFoundContent: 'Nicht gefunden',
    searchPlaceholder: 'Suchen',
    itemUnit: 'Eintrag',
    itemsUnit: 'Einträge',
  },
  Select: {
    notFoundContent: 'Nicht gefunden',
  },
  Upload: {
    uploading: 'Hochladen...',
    removeFile: 'Datei entfernen',
    uploadError: 'Fehler beim Hochladen',
    previewFile: 'Dateivorschau',
  },
};
