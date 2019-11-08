/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/en_US';
import DatePicker from './date-picker/en_US';
import Pagination from './pagination/en_US';
import TimePicker from './time-picker/en_US';

export default {
  locale: 'ne-np',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'फिल्टर मेनु',
    filterConfirm: 'हो',
    filterReset: 'रीसेट',
    selectAll: 'सबै छान्नुुहोस्',
    selectInvert: 'छनौट उल्टाउनुहोस'
  },
  Modal: {
    okText: 'हो',
    cancelText: 'होईन',
    justOkText: 'हो'
  },
  Popconfirm: {
    okText: 'हो',
    cancelText: 'होईन'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'यहाँ खोज्नुहोस्',
    itemUnit: 'वस्तु',
    itemsUnit: 'वस्तुहरू'
  },
  Upload: {
    uploading: 'अपलोड गर्दै...',
    removeFile: 'फाइल हटाउनुहोस्',
    uploadError: 'अप्लोडमा समस्या भयो',
    previewFile: 'फाइल पूर्वावलोकन गर्नुहोस्',
    downloadFile: 'डाउनलोड फाइल'
  },
  Empty: {
    description: 'डाटा छैन'
  }
};
