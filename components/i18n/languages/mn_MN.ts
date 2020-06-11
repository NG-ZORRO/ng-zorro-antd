/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/mn_MN';
import DatePicker from './date-picker/mn_MN';
import Pagination from './pagination/mn_MN';
import TimePicker from './time-picker/mn_MN';

export default {
  locale: 'mn-mn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Хайх цэс',
    filterConfirm: 'OK',
    filterReset: 'Цэвэрлэх',
    selectAll: 'Бүгдийг сонгох',
    selectInvert: 'Бусдыг сонгох'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Цуцлах',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Цуцлах'
  },
  Transfer: {
    searchPlaceholder: 'Хайх',
    itemUnit: 'Зүйл',
    itemsUnit: 'Зүйлүүд'
  },
  Upload: {
    uploading: 'Хуулж байна...',
    removeFile: 'Файл устгах',
    uploadError: 'Хуулахад алдаа гарлаа',
    previewFile: 'Файлыг түргэн үзэх',
    downloadFile: 'Файлыг татах'
  },
  Empty: {
    description: 'Мэдээлэл байхгүй байна'
  }
};
