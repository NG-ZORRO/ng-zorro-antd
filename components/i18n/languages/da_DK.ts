/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/da_DK';
import DatePicker from './date-picker/da_DK';
import Pagination from './pagination/da_DK';
import TimePicker from './time-picker/da_DK';

export default {
  locale: 'da',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  Table: {
    filterTitle: 'Filtermenu',
    filterConfirm: 'OK',
    filterReset: 'Nulstil',
    selectAll: 'Vælg alle',
    selectInvert: 'Inverter valg'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Afbryd',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Afbryd'
  },
  Transfer: {
    searchPlaceholder: 'Søg her',
    itemUnit: 'element',
    itemsUnit: 'elementer'
  },
  Upload: {
    uploading: 'Uploader...',
    removeFile: 'Fjern fil',
    uploadError: 'Fejl ved upload',
    previewFile: 'Forhåndsvisning'
  },
  Empty: {
    description: 'Ingen data'
  }
};
