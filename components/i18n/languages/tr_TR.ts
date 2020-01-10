/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/tr_TR';
import DatePicker from './date-picker/tr_TR';
import Pagination from './pagination/tr_TR';
import TimePicker from './time-picker/tr_TR';

export default {
  locale: 'tr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Lütfen seçiniz'
  },
  Table: {
    filterTitle: 'Menü Filtrele',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    selectAll: 'Hepsini Seç',
    selectInvert: 'Tersini Seç',
    sortTitle: 'Sırala'
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam'
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler'
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: `Dosyayı kaldır`,
    uploadError: 'Yükleme Hatası',
    previewFile: `Dosyayı Önizle`
  },
  Empty: {
    description: 'Veri Yok'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'düzenle',
    copy: 'kopyala',
    copied: 'kopyalandı',
    expand: 'genişlet'
  }
};
