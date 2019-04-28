/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/sk_SK';
import DatePicker from './date-picker/sk_SK';
import Pagination from './pagination/sk_SK';
import TimePicker from './time-picker/sk_SK';

export default {
  locale: 'sk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'OK',
    filterReset: 'Obnoviť',
    selectAll: 'Vybrať všetko',
    selectInvert: 'Vybrať opačné'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Zrušiť',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Zrušiť'
  },
  Transfer: {
    searchPlaceholder: 'Vyhľadávanie',
    itemUnit: 'položka',
    itemsUnit: 'položiek'
  },
  Upload: {
    uploading: 'Nahrávanie...',
    removeFile: 'Odstrániť súbor',
    uploadError: 'Chyba pri nahrávaní',
    previewFile: 'Zobraziť súbor'
  },
  Empty: {
    description: 'Žiadne dáta'
  }
};
