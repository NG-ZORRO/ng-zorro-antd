import Calendar from './calendar/zh_TW';
import DatePicker from './date-picker/zh_TW';
import Pagination from './pagination/zh_TW';
import TimePicker from './time-picker/zh_TW';

export default {
  locale: 'zh-tw',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '篩選器',
    filterConfirm: '確 定',
    filterReset: '重 置',
    emptyText: '目前尚無資料',
    selectAll: '全部選取',
    selectInvert: '反向選取',
  },
  Modal: {
    okText: '確 定',
    cancelText: '取 消',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: '確 定',
    cancelText: '取 消',
  },
  Transfer: {
    notFoundContent: '查無此資料',
    searchPlaceholder: '搜尋資料',
    itemUnit: '項目',
    itemsUnit: '項目',
  },
  Select: {
    notFoundContent: '查無此資料',
  },
  Upload: {
    uploading: '正在上傳...',
    removeFile: '刪除檔案',
    uploadError: '上傳失敗',
    previewFile: '檔案預覽',
  },
};
