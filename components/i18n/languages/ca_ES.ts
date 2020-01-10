/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  global: {
    placeholder: 'Seleccioni'
  },
  Table: {
    filterTitle: 'Filtrar Menu',
    filterConfirm: 'OK',
    filterReset: 'Restablir',
    selectAll: 'Seleccionar tot',
    selectInvert: 'Invertir selecció',
    sortTitle: 'Ordenar'
  },
  Modal: {
    okText: 'Acceptar',
    cancelText: 'Cancel·lar',
    justOkText: 'Acceptar'
  },
  Popconfirm: {
    okText: 'Acceptar',
    cancelText: 'Cancel·lar'
  },
  Transfer: {
    searchPlaceholder: 'Cercar aquí',
    itemUnit: 'element',
    itemsUnit: 'element'
  },
  Upload: {
    uploading: 'Pujant...',
    removeFile: 'Eliminar fitxer',
    uploadError: 'Error al pujar el fitxer',
    previewFile: 'Vista prèvia'
  },
  Empty: {
    description: 'No hi ha dades'
  },
  Icon: {
    icon: 'ícona'
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiat',
    expand: 'expandir'
  },
  PageHeader: {
    back: 'tornar'
  }
};
