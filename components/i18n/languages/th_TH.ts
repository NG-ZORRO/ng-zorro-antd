/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/th_TH';
import DatePicker from './date-picker/th_TH';
import Pagination from './pagination/th_TH';
import TimePicker from './time-picker/th_TH';

export default {
  locale: 'th',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'ตัวกรอง',
    filterConfirm: 'ยืนยัน',
    filterReset: 'รีเซ็ต',
    selectAll: 'เลือกทั้งหมดในหน้านี้',
    selectInvert: 'เลือกสถานะตรงกันข้าม'
  },
  Modal: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
    justOkText: 'ตกลง'
  },
  Popconfirm: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก'
  },
  Transfer: {
    searchPlaceholder: 'ค้นหา',
    itemUnit: 'ชิ้น',
    itemsUnit: 'ชิ้น'
  },
  Upload: {
    uploading: 'กำลังอัปโหลด...',
    removeFile: 'ลบไฟล์',
    uploadError: 'เกิดข้อผิดพลาดในการอัปโหลด',
    previewFile: 'ดูตัวอย่างไฟล์'
  },
  Empty: {
    description: 'ไม่มีข้อมูล'
  }
};
