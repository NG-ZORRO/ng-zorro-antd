import Calendar from './calendar/et_EE';
import DatePicker from './date-picker/et_EE';
import Pagination from './pagination/et_EE';
import TimePicker from './time-picker/et_EE';

export default {
  locale: 'et',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtri menüü',
    filterConfirm: 'OK',
    filterReset: 'Nulli',
    emptyText: 'Andmed puuduvad',
    selectAll: 'Vali kõik',
    selectInvert: 'Inverteeri valik',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Tühista',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Tühista',
  },
  Transfer: {
    notFoundContent: 'Ei leitud',
    searchPlaceholder: 'Otsi siit',
    itemUnit: 'kogus',
    itemsUnit: 'kogus',
  },
  Select: {
    notFoundContent: 'Ei leitud',
  },
  Upload: {
    uploading: 'Üleslaadimine...',
    removeFile: 'Eemalda fail',
    uploadError: 'Üleslaadimise tõrge',
    previewFile: 'Faili eelvaade',
  },
};
