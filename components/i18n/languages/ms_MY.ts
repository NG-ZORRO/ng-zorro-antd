/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/ms_MY';
import DatePicker from './date-picker/ms_MY';
import Pagination from './pagination/ms_MY';
import TimePicker from './time-picker/ms_MY';

export default {
  locale: 'ms-my',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Sila pilih'
  },
  PageHeader: {
    back: 'Kembali'
  },
  Text: {
    edit: 'Sunting',
    copy: 'Salin',
    copied: 'Berjaya menyalin',
    expand: 'Kembang'
  },
  Empty: {
    description: 'Tiada data'
  },
  Table: {
    filterTitle: 'Cari dengan tajuk',
    filterConfirm: 'Ok',
    filterReset: 'Menetapkan semula',
    emptyText: 'Tiada data',
    selectAll: 'Pilih semua',
    selectInvert: 'Terbalikkan'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Batal',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Batal'
  },
  Transfer: {
    notFoundContent: 'Tidak dijumpai',
    searchPlaceholder: 'Carian di sini',
    itemUnit: 'item',
    itemsUnit: 'item'
  },
  Icon: {
    icon: 'ikon'
  },
  Select: {
    notFoundContent: 'Tidak Dijumpai'
  },
  Upload: {
    uploading: 'Sedang memuat naik...',
    removeFile: 'Buang fail',
    uploadError: 'Masalah muat naik',
    previewFile: 'Tengok fail'
  }
};
