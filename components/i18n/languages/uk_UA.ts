import Calendar from './calendar/uk_UA';
import DatePicker from './date-picker/uk_UA';
import Pagination from './pagination/uk_UA';
import TimePicker from './time-picker/uk_UA';

export default {
  locale: 'uk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Фільтрувати',
    filterConfirm: 'OK',
    filterReset: 'Скинути',
    emptyText: 'Даних немає',
    selectAll: 'Обрати всі',
    selectInvert: 'Інвертувати вибір',
  },
  Modal: {
    okText: 'Гаразд',
    cancelText: 'Скасувати',
    justOkText: 'Гаразд',
  },
  Popconfirm: {
    okText: 'Гаразд',
    cancelText: 'Скасувати',
  },
  Transfer: {
    notFoundContent: 'Нічого не знайдено',
    searchPlaceholder: 'Введіть текст для пошуку',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Нічого не знайдено',
  },
  Upload: {
    uploading: 'Завантаження ...',
    removeFile: 'Видалити файл',
    uploadError: 'Помилка завантаження',
    previewFile: 'Попередній перегляд файлу',
  },
};
