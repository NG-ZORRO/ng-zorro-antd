/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/zh_TW';
import DatePicker from './date-picker/zh_TW';
import Pagination from './pagination/zh_TW';
import TimePicker from './time-picker/zh_TW';

export default {
  locale: 'zh-tw',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: '請選擇'
  },
  Table: {
    filterTitle: '篩選器',
    filterConfirm: '確 定',
    filterReset: '重 置',
    selectAll: '全部選取',
    selectInvert: '反向選取'
  },
  Modal: {
    okText: '確 定',
    cancelText: '取 消',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: '確 定',
    cancelText: '取 消'
  },
  Transfer: {
    searchPlaceholder: '搜尋資料',
    itemUnit: '項目',
    itemsUnit: '項目'
  },
  Upload: {
    uploading: '正在上傳...',
    removeFile: '刪除檔案',
    uploadError: '上傳失敗',
    previewFile: '檔案預覽'
  },
  Empty: {
    description: '無此資料'
  },
  Icon: {
    icon: '圖標'
  },
  Text: {
    edit: '編輯',
    copy: '複製',
    copied: '複製成功',
    expand: '展開'
  },
  PageHeader: {
    back: '返回'
  }
};
