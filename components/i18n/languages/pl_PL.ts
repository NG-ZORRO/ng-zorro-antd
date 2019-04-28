/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/pl_PL';
import DatePicker from './date-picker/pl_PL';
import Pagination from './pagination/pl_PL';
import TimePicker from './time-picker/pl_PL';

export default {
  locale: 'pl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Menu filtra',
    filterConfirm: 'OK',
    filterReset: 'Wyczyść',
    selectAll: 'Zaznacz bieżącą stronę',
    selectInvert: 'Odwróć zaznaczenie'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anuluj',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anuluj'
  },
  Transfer: {
    searchPlaceholder: 'Szukaj',
    itemUnit: 'obiekt',
    itemsUnit: 'obiekty'
  },
  Upload: {
    uploading: 'Wysyłanie...',
    removeFile: 'Usuń plik',
    uploadError: 'Błąd wysyłania',
    previewFile: 'Podejrzyj plik'
  },
  Empty: {
    description: 'Brak danych'
  }
};
