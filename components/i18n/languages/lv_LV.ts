/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/lv_LV';
import DatePicker from './date-picker/lv_LV';
import Pagination from './pagination/lv_LV';
import TimePicker from './time-picker/lv_LV';

export default {
  locale: 'lv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrēšanas izvēlne',
    filterConfirm: 'OK',
    filterReset: 'Atiestatīt',
    selectAll: 'Atlasiet pašreizējo lapu',
    selectInvert: 'Pārvērst pašreizējo lapu'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Atcelt',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Atcelt'
  },
  Transfer: {
    searchPlaceholder: 'Meklēt šeit',
    itemUnit: 'vienumu',
    itemsUnit: 'vienumus'
  },
  Upload: {
    uploading: 'Augšupielāde...',
    removeFile: 'Noņemt failu',
    uploadError: 'Augšupielādes kļūda',
    previewFile: 'Priekšskatiet failu'
  },
  Empty: {
    description: 'Nav datu'
  }
};
