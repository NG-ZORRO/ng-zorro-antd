/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/hi_IN';
import DatePicker from './date-picker/hi_IN';
import Pagination from './pagination/hi_IN';
import TimePicker from './time-picker/hi_IN';

export default {
  locale: 'hi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: 'कृपया चुनें'
  },
  Table: {
    filterTitle: 'सूची बंद करें',
    filterConfirm: 'अच्छी तरह से',
    filterReset: 'रीसेट',
    emptyText: 'कोई जानकारी नहीं',
    selectAll: 'वर्तमान पृष्ठ का चयन करें',
    selectInvert: 'वर्तमान पृष्ठ घुमाएं',
    sortTitle: 'द्वारा क्रमबद्ध करें'
  },
  Modal: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना',
    justOkText: 'अच्छी तरह से'
  },
  Popconfirm: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'नहीं मिला',
    searchPlaceholder: 'यहां खोजें',
    itemUnit: 'तत्त्व',
    itemsUnit: 'विषय-वस्तु'
  },
  Select: {
    notFoundContent: 'नहीं मिला'
  },
  Upload: {
    uploading: 'अपलोडिंग...',
    removeFile: 'फ़ाइल निकालें',
    uploadError: 'अपलोड में त्रुटि',
    previewFile: 'फ़ाइल पूर्वावलोकन'
  }
};
