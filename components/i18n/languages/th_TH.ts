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
    emptyText: 'ไม่มีข้อมูล',
    selectAll: 'เลือกทั้งหมดในหน้านี้',
    selectInvert: 'เลือกสถานะตรงกันข้าม',
  },
  Modal: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
    justOkText: 'ตกลง',
  },
  Popconfirm: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
  },
  Transfer: {
    notFoundContent: 'ไม่พบข้อมูล',
    searchPlaceholder: 'ค้นหา',
    itemUnit: 'ชิ้น',
    itemsUnit: 'ชิ้น',
  },
  Select: {
    notFoundContent: 'ไม่พบข้อมูล',
  },
  Upload: {
    uploading: 'กำลังอัปโหลด...',
    removeFile: 'ลบไฟล์',
    uploadError: 'เกิดข้อผิดพลาดในการอัปโหลด',
    previewFile: 'ดูตัวอย่างไฟล์',
  },
};
