/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/kn_IN';
import DatePicker from './date-picker/kn_IN';
import Pagination from './pagination/kn_IN';
import TimePicker from './time-picker/kn_IN';

export default {
  locale: 'kn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: 'ದಯವಿಟ್ಟು ಆರಿಸಿ'
  },
  Table: {
    filterTitle: 'ಪಟ್ಟಿ ಸೋಸಿ',
    filterConfirm: 'ಸರಿ',
    filterReset: 'ಮರುಹೊಂದಿಸಿ',
    emptyText: 'ಮಾಹಿತಿ ಇಲ್ಲ',
    selectAll: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectInvert: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ತಿರುಗಿಸಿ',
    sortTitle: 'ವಿಂಗಡಿಸಿ'
  },
  Modal: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು',
    justOkText: 'ಸರಿ'
  },
  Popconfirm: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'ದೊರೆತಿಲ್ಲ',
    searchPlaceholder: 'ಇಲ್ಲಿ ಹುಡುಕಿ',
    itemUnit: 'ವಿಷಯ',
    itemsUnit: 'ವಿಷಯಗಳು'
  },
  Select: {
    notFoundContent: 'ದೊರೆತಿಲ್ಲ'
  },
  Upload: {
    uploading: 'ಏರಿಸಿ...',
    removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
    uploadError: 'ಏರಿಸುವ ದೋಷ',
    previewFile: 'ಫೈಲ್ ಮುನ್ನೋಟ'
  }
};
