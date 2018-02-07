import Calendar from './calendar/pt_PT';
import DatePicker from './date-picker/pt_PT';
import Pagination from './pagination/pt_PT';
import TimePicker from './time-picker/pt_PT';

export default {
  locale: 'pt',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'Aplicar',
    filterReset: 'Reiniciar',
    emptyText: 'Sem resultados',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar',
  },
  Transfer: {
    notFoundContent: 'Sem resultados',
    searchPlaceholder: 'Procurar...',
    itemUnit: 'item',
    itemsUnit: 'itens',
  },
  Select: {
    notFoundContent: 'Sem resultados',
  },
  Upload: {
    uploading: 'A carregar...',
    removeFile: 'Remover',
    uploadError: 'Erro ao carregar',
    previewFile: 'Pré-visualizar',
  },
};
