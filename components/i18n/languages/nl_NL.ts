/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/nl_NL';
import DatePicker from './date-picker/nl_NL';
import Pagination from './pagination/nl_NL';
import TimePicker from './time-picker/nl_NL';

export default {
  locale: 'nl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Maak een selectie'
  },
  Table: {
    filterTitle: 'Filteren',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Selecteer huidige pagina',
    selectInvert: 'Deselecteer huidige pagina',
    sortTitle: 'Sorteren',
    expand: 'Rij uitklappen',
    collapse: 'Rij inklappen'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleren',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleren'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Zoeken',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Upload: {
    uploading: 'Uploaden...',
    removeFile: 'Verwijder bestand',
    uploadError: 'Fout tijdens uploaden',
    previewFile: 'Bekijk bestand',
    downloadFile: 'Downloaden bestand'
  },
  Empty: {
    description: 'Geen gegevens'
  },
  Icon: {
    icon: 'icoon'
  },
  Text: {
    edit: 'Bewerken',
    copy: 'Kopieren',
    copied: 'Gekopieerd',
    expand: 'Uitklappen'
  },
  PageHeader: {
    back: 'Terug'
  }
};
