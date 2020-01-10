/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/sv_SE';
import DatePicker from './date-picker/sv_SE';
import Pagination from './pagination/sv_SE';
import TimePicker from './time-picker/sv_SE';

export default {
  locale: 'sv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Rensa'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Avbryt',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Avbryt'
  },
  Transfer: {
    searchPlaceholder: 'Sök',
    itemUnit: 'element',
    itemsUnit: 'element'
  },
  Empty: {
    description: 'Ingen information'
  },
  Text: {
    edit: 'editera',
    copy: 'kopiera',
    copied: 'kopierad',
    expand: 'expandera'
  }
};
