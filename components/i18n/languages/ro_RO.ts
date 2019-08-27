/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/ro_RO';
import DatePicker from './date-picker/ro_RO';
import Pagination from './pagination/ro_RO';
import TimePicker from './time-picker/ro_RO';

export default {
  locale: 'ro',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Selectează'
  },
  Table: {
    filterTitle: 'Filtrează',
    filterConfirm: 'OK',
    filterReset: 'Resetează',
    selectAll: 'Selectează pagina curentă',
    selectInvert: 'Inversează pagina curentă',
    sortTitle: 'Ordonează',
    expand: 'Extinde rândul',
    collapse: 'Micșorează rândul'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anulare',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anulare'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Căutare',
    itemUnit: 'element',
    itemsUnit: 'elemente'
  },
  Upload: {
    uploading: 'Se transferă...',
    removeFile: 'Înlătură fișierul',
    uploadError: 'Eroare la upload',
    previewFile: 'Previzualizare fișier'
  },
  Empty: {
    description: 'Fără date'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'editează',
    copy: 'copiază',
    copied: 'copiat',
    expand: 'extinde'
  },
  PageHeader: {
    back: 'înapoi'
  }
};
