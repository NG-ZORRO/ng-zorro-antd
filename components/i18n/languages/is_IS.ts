import Calendar from './calendar/is_IS';
import DatePicker from './date-picker/is_IS';
import Pagination from './pagination/is_IS';
import TimePicker from './time-picker/is_IS';

export default {
  locale: 'is',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Afmarkanir',
    filterConfirm: 'Staðfesta',
    filterReset: 'Núllstilla',
    emptyText: 'Engin gögn',
    selectAll: 'Velja allt',
    selectInvert: 'Viðsnúa vali',
  },
  Modal: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
    justOkText: 'Í lagi',
  },
  Popconfirm: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
  },
  Transfer: {
    notFoundContent: 'Engar færslur',
    searchPlaceholder: 'Leita hér',
    itemUnit: 'færsla',
    itemsUnit: 'færslur',
  },
  Select: {
    notFoundContent: 'Ekkert finnst',
  },
  Upload: {
    uploading: 'Hleð upp...',
    removeFile: 'Fjarlægja skrá',
    uploadError: 'Villa við að hlaða upp',
    previewFile: 'Forskoða skrá',
  },
};
