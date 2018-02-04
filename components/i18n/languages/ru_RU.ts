import Calendar from './calendar/ru_RU';
import DatePicker from './date-picker/ru_RU';
import Pagination from './pagination/ru_RU';
import TimePicker from './time-picker/ru_RU';

export default {
  locale: 'ru',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'OK',
    filterReset: 'Сбросить',
    emptyText: 'Нет данных',
    selectAll: 'Выбрать всё',
    selectInvert: 'Инвертировать выбор',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Отмена',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Отмена',
  },
  Transfer: {
    notFoundContent: 'Ничего не найдено',
    searchPlaceholder: 'Введите название для поиска',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Ничего не найдено',
  },
  Upload: {
    uploading: 'Закачиваю...',
    removeFile: 'Удалить файл',
    uploadError: 'Ошибка при закачке',
    previewFile: 'Предпросмотр файла',
  },
};
