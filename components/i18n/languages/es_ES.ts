/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  global: {
    placeholder: 'Seleccione'
  },
  Table: {
    filterTitle: 'Filtrar menú',
    filterConfirm: 'Aceptar',
    filterReset: 'Reiniciar',
    selectAll: 'Seleccionar todo',
    selectInvert: 'Invertir selección',
    sortTitle: 'Ordenar'
  },
  Modal: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Aceptar'
  },
  Popconfirm: {
    okText: 'Aceptar',
    cancelText: 'Cancelar'
  },
  Transfer: {
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'elemento',
    itemsUnit: 'elementos'
  },
  Upload: {
    uploading: 'Subiendo...',
    removeFile: 'Eliminar archivo',
    uploadError: 'Error al subir el archivo',
    previewFile: 'Vista previa'
  },
  Empty: {
    description: 'No hay datos'
  },
  Icon: {
    icon: 'ícono'
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiado',
    expand: 'expandir'
  },
  PageHeader: {
    back: 'volver'
  }
};
