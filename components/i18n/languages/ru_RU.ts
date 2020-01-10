/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/ru_RU';
import DatePicker from './date-picker/ru_RU';
import Pagination from './pagination/ru_RU';
import TimePicker from './time-picker/ru_RU';

export default {
  locale: 'ru',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Пожалуйста, выберите'
  },
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'OK',
    filterReset: 'Сбросить',
    selectAll: 'Выбрать всё',
    selectInvert: 'Инвертировать выбор',
    sortTitle: 'Сортировка'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Отмена',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Отмена'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Поиск',
    itemUnit: 'элем.',
    itemsUnit: 'элем.'
  },
  Upload: {
    uploading: 'Загрузка...',
    removeFile: 'Удалить файл',
    uploadError: 'При загрузке произошла ошибка',
    previewFile: 'Предпросмотр файла'
  },
  Empty: {
    description: 'Нет данных'
  },
  Icon: {
    icon: 'иконка'
  },
  Text: {
    edit: 'редактировать',
    copy: 'копировать',
    copied: 'скопировано',
    expand: 'раскрыть'
  },
  PageHeader: {
    back: 'назад'
  }
};
