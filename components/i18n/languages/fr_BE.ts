/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/fr_BE';
import DatePicker from './date-picker/fr_BE';
import Pagination from './pagination/fr_BE';
import TimePicker from './time-picker/fr_BE';

export default {
  locale: 'fr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler'
  },
  Transfer: {
    searchPlaceholder: 'Recherche',
    itemUnit: 'élément',
    itemsUnit: 'éléments'
  },
  Empty: {
    description: 'Aucune donnée'
  },
  Text: {
    edit: 'éditer',
    copy: 'copier',
    copied: 'copie effectuée',
    expand: 'développer'
  }
};
