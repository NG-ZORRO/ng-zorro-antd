import Calendar from './calendar/pl_PL';
import DatePicker from './date-picker/pl_PL';
import Pagination from './pagination/pl_PL';
import TimePicker from './time-picker/pl_PL';

export default {
  locale: 'pl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Menu filtra',
    filterConfirm: 'OK',
    filterReset: 'Wyczyść',
    emptyText: 'Brak danych',
    selectAll: 'Zaznacz bieżącą stronę',
    selectInvert: 'Odwróć zaznaczenie',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anuluj',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anuluj',
  },
  Transfer: {
    notFoundContent: 'Nie znaleziono',
    searchPlaceholder: 'Szukaj',
    itemUnit: 'obiekt',
    itemsUnit: 'obiekty',
  },
  Select: {
    notFoundContent: 'Nie znaleziono',
  },
  Upload: {
    uploading: 'Wysyłanie...',
    removeFile: 'Usuń plik',
    uploadError: 'Błąd wysyłania',
    previewFile: 'Podejrzyj plik',
  },
};
