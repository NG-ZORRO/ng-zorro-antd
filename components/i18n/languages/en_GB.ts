import Calendar from './calendar/en_GB';
import DatePicker from './date-picker/en_GB';
import Pagination from './pagination/en_GB';
import TimePicker from './time-picker/en_GB';

export default {
  locale: 'en-gb',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
  Transfer: {
    notFoundContent: 'Not Found',
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Not Found',
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
  },
};
