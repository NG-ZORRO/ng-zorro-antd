import Calendar from './calendar/ca_ES';
import DatePicker from './date-picker/ca_ES';
import Pagination from './pagination/ca_ES';
import TimePicker from './time-picker/ca_ES';

export default {
  locale: 'ca',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrar Menu',
    filterConfirm: 'OK',
    filterReset: 'Restablir',
    selectAll: 'Seleccionar tot',
    selectInvert: 'Invertir selecció',
  },
  Modal: {
    okText: 'Acceptar',
    cancelText: 'Cancel·lar',
    justOkText: 'Acceptar',
  },
  Popconfirm: {
    okText: 'Acceptar',
    cancelText: 'Cancel·lar',
  },
  Transfer: {
    searchPlaceholder: 'Cercar aquí',
    itemUnit: 'element',
    itemsUnit: 'elements',
  },
  Upload: {
    uploading: 'Pujant...',
    removeFile: 'Eliminar fitxer',
    uploadError: 'Error al pujar el fitxer',
    previewFile: 'Vista prèvia',
  },
  Empty: {
    description: 'No hi ha dades',
  },
};
