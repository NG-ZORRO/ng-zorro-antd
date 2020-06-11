/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/it_IT';
import DatePicker from './date-picker/it_IT';
import Pagination from './pagination/it_IT';
import TimePicker from './time-picker/it_IT';

export default {
  locale: 'it',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Selezionare'
  },
  Table: {
    filterTitle: 'Menù Filtro',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Seleziona pagina corrente',
    selectInvert: 'Inverti selezione nella pagina corrente',
    sortTitle: 'Ordina'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annulla',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annulla'
  },
  Transfer: {
    searchPlaceholder: 'Cerca qui',
    itemUnit: 'elemento',
    itemsUnit: 'elementi'
  },
  Upload: {
    uploading: 'Caricamento...',
    removeFile: 'Rimuovi il file',
    uploadError: 'Errore di caricamento',
    previewFile: 'Anteprima file',
    downloadFile: 'Download file'
  },
  Empty: {
    description: 'Nessun dato'
  },
  Icon: {
    icon: 'icona'
  },
  Text: {
    edit: 'modifica',
    copy: 'copia',
    copied: 'copia effettuata',
    expand: 'espandi'
  }
};
