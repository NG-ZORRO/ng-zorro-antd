import Calendar from './calendar/cs_CZ';
import DatePicker from './date-picker/cs_CZ';
import Pagination from './pagination/cs_CZ';
import TimePicker from './time-picker/cs_CZ';

export default {
  locale: 'cs',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit',
    emptyText: 'Žádná data',
  },
  Modal: {
    okText: 'Ok',
    cancelText: 'Storno',
    justOkText: 'Ok',
  },
  Popconfirm: {
    okText: 'Ok',
    cancelText: 'Storno',
  },
  Transfer: {
    notFoundContent: 'Nenalezeno',
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek',
  },
  Select: {
    notFoundContent: 'Nenalezeno',
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor',
  },
};
