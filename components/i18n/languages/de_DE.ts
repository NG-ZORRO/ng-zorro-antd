/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/de_DE';
import DatePicker from './date-picker/de_DE';
import Pagination from './pagination/de_DE';
import TimePicker from './time-picker/de_DE';

export default {
  locale: 'de',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Bitte auswählen'
  },
  Table: {
    filterTitle: 'Filter-Menü',
    filterConfirm: 'OK',
    filterReset: 'Zurücksetzen',
    selectAll: 'Alle auswählen',
    selectInvert: 'Auswahl Invertieren',
    sortTitle: 'Sortieren'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Abbrechen'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Suchen',
    itemUnit: 'Eintrag',
    itemsUnit: 'Einträge'
  },
  Upload: {
    uploading: 'Hochladen...',
    removeFile: 'Datei entfernen',
    uploadError: 'Fehler beim Hochladen',
    previewFile: 'Dateivorschau'
  },
  Empty: {
    description: 'Keine Daten'
  },
  Icon: {
    icon: 'Symbol'
  },
  Text: {
    edit: 'Bearbeiten',
    copy: 'Kopieren',
    copied: 'Kopieren erfolgreich',
    expand: 'Aufklappen'
  },
  PageHeader: {
    back: 'Zurück'
  }
};
