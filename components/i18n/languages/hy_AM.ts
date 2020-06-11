/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/hy_AM';
import DatePicker from './date-picker/hy_AM';
import Pagination from './pagination/hy_AM';
import TimePicker from './time-picker/hy_AM';

export default {
  locale: 'hy',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Ընտրեք'
  },
  Table: {
    filterTitle: 'ֆիլտրի ընտրացանկ',
    filterConfirm: 'ֆիլտրել',
    filterReset: 'Զրոյացնել',
    selectAll: 'Ընտրեք ընթացիկ էջը',
    selectInvert: 'Փոխարկել ընթացիկ էջը',
    sortTitle: 'Տեսակավորել',
    expand: 'Ընդլայնեք տողը',
    collapse: 'Կրճատել տողը'
  },
  Modal: {
    okText: 'Օկ',
    cancelText: 'Չեղարկել',
    justOkText: 'Օկ'
  },
  Popconfirm: {
    okText: 'Հաստատել',
    cancelText: 'Մերժել'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Որոնեք այստեղ',
    itemUnit: 'պարագան',
    itemsUnit: 'պարագաները'
  },
  Upload: {
    uploading: 'Ներբեռնում...',
    removeFile: 'Հեռացնել ֆայլը',
    uploadError: 'Ներբեռնման սխալ',
    previewFile: 'Դիտել ֆայլը'
  },
  Empty: {
    description: 'Տվյալներ չկան'
  },
  Icon: {
    icon: 'պատկեր'
  },
  Text: {
    edit: 'Խմբագրել',
    copy: 'Պատճենել',
    copied: 'Պատճենվել է',
    expand: 'Տեսնել ավելին'
  },
  PageHeader: {
    back: 'Հետ'
  }
};
