import Calendar from './calendar/es_ES';
import DatePicker from './date-picker/es_ES';
import Pagination from './pagination/es_ES';
import TimePicker from './time-picker/es_ES';

export default {
  locale: 'es',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrar menú',
    filterConfirm: 'Aceptar',
    filterReset: 'Reiniciar',
    selectAll: 'Seleccionar todo',
    selectInvert: 'Invertir selección',
  },
  Modal: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Aceptar',
  },
  Popconfirm: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
  },
  Transfer: {
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'elemento',
    itemsUnit: 'elementos',
  },
  Upload: {
    uploading: 'Subiendo...',
    removeFile: 'Eliminar archivo',
    uploadError: 'Error al subir el archivo',
    previewFile: 'Vista previa',
  },
  Empty: {
    description: 'No hay datos',
  },
};
