/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/ka_GE';
import DatePicker from './date-picker/ka_GE';
import Pagination from './pagination/ka_GE';
import TimePicker from './time-picker/ka_GE';

export default {
  locale: 'ka',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'აირჩიეთ'
  },
  Table: {
    filterTitle: 'ფილტრი',
    filterConfirm: 'დიახ',
    filterReset: 'განულება',
    selectAll: 'აირჩიეთ მიმდინარე გვერდი',
    selectInvert: 'გვერდის მიმართულების შეცვლა',
    sortTitle: 'სორტირება'
  },
  Modal: {
    okText: 'დიახ',
    cancelText: 'გაუქმება',
    justOkText: 'დიახ'
  },
  Popconfirm: {
    okText: 'დიახ',
    cancelText: 'გაუქმება'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ძიება',
    itemUnit: 'ელემ.',
    itemsUnit: 'ელემ.'
  },
  Upload: {
    uploading: 'იტვირტება...',
    removeFile: 'ფაილის წაშლა',
    uploadError: 'ატვირთვის შეცდომა',
    previewFile: 'ფაილის გადახედვა'
  },
  Empty: {
    description: 'მონაცემი არ არის'
  },
  Icon: {
    icon: 'ხატულა'
  },
  Text: {
    edit: 'რედაქტირება',
    copy: 'კოპირება',
    copied: 'წარმატებით დაკოპირდა',
    expand: 'გახსნა'
  },
  PageHeader: {
    back: 'უკან'
  }
};
