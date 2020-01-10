/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/hr_HR';
import DatePicker from './date-picker/hr_HR';
import Pagination from './pagination/hr_HR';
import TimePicker from './time-picker/hr_HR';

export default {
  locale: 'hr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Molimo označite'
  },
  Table: {
    filterTitle: 'Filter meni',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Označi trenutnu stranicu',
    selectInvert: 'Invertiraj trenutnu stranicu',
    sortTitle: 'Sortiraj'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Odustani',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Odustani'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Pretraži ovdje',
    itemUnit: 'stavka',
    itemsUnit: 'stavke'
  },
  Upload: {
    uploading: 'Upload u tijeku...',
    removeFile: 'Makni datoteku',
    uploadError: 'Greška kod uploada',
    previewFile: 'Pogledaj datoteku'
  },
  Empty: {
    description: 'Nema podataka'
  },
  Icon: {
    icon: 'ikona'
  },
  Text: {
    edit: 'uredi',
    copy: 'kopiraj',
    copied: 'kopiranje uspješno',
    expand: 'proširi'
  }
};
