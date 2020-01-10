/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/fi_FI';
import DatePicker from './date-picker/fi_FI';
import Pagination from './pagination/fi_FI';
import TimePicker from './time-picker/fi_FI';

export default {
  locale: 'fi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Suodatus valikko',
    filterConfirm: 'OK',
    filterReset: 'Tyhjennä',
    selectAll: 'Valitse kaikki',
    selectInvert: 'Valitse päinvastoin',
    sortTitle: 'Lajittele'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Peruuta',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Peruuta'
  },
  Transfer: {
    searchPlaceholder: 'Etsi täältä',
    itemUnit: 'kohde',
    itemsUnit: 'kohdetta'
  },
  Upload: {
    uploading: 'Lähetetään...',
    removeFile: 'Poista tiedosto',
    uploadError: 'Virhe lähetyksessä',
    previewFile: 'Esikatsele tiedostoa'
  },
  Empty: {
    description: 'Ei kohteita'
  }
};
