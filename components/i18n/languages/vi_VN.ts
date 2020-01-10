/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/vi_VN';
import DatePicker from './date-picker/vi_VN';
import Pagination from './pagination/vi_VN';
import TimePicker from './time-picker/vi_VN';

export default {
  locale: 'vi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Bộ ',
    filterConfirm: 'OK',
    filterReset: 'Tạo Lại',
    selectAll: 'Chọn Tất Cả',
    selectInvert: 'Chọn Ngược Lại'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Huỷ',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Huỷ'
  },
  Transfer: {
    searchPlaceholder: 'Tìm ở đây',
    itemUnit: 'mục',
    itemsUnit: 'mục'
  },
  Upload: {
    uploading: 'Đang tải lên...',
    removeFile: 'Gỡ bỏ tập tin',
    uploadError: 'Lỗi tải lên',
    previewFile: 'Xem thử tập tin'
  },
  Empty: {
    description: 'Trống'
  }
};
