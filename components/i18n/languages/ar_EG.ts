/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import Calendar from './calendar/ar_EG';
import DatePicker from './date-picker/ar_EG';
import Pagination from './pagination/ar_EG';
import TimePicker from './time-picker/ar_EG';

export default {
  locale: 'ar',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'يرجى اختيار'
  },
  Table: {
    filterTitle: 'الفلاتر',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة ضبط',
    selectAll: 'اختيار الكل',
    selectInvert: 'إلغاء الاختيار',
    sortTitle: 'فرز'
  },
  Modal: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
    justOkText: 'تأكيد'
  },
  Popconfirm: {
    okText: 'تأكيد',
    cancelText: 'إلغاء'
  },
  Transfer: {
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر'
  },
  Upload: {
    uploading: 'جاري الرفع...',
    removeFile: 'احذف الملف',
    uploadError: 'مشكلة فى الرفع',
    previewFile: 'استعرض الملف'
  },
  Empty: {
    description: 'لا توجد بيانات'
  },
  Icon: {
    icon: 'أيقونة'
  },
  Text: {
    edit: 'تعديل',
    copy: 'نسخ',
    copied: 'نسخ النجاح',
    expand: 'مدد'
  },
  PageHeader: {
    back: 'خلف'
  }
};
