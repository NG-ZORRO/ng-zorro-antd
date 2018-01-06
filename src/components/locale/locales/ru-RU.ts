import { NzLocale } from '../nz-locale.class';

export const ruRU: NzLocale = {
  locale: 'ru-RU',

  Pagination: {
    itemsPerPage: '%num% / страниц',
    jumpTo: 'Перейти',
    page: '',
    forwardPage: '%num% страниц вперед',
    backwardPage: '%num% страниц назад',
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    firstPage: 'Первая страница',
    lastPage: 'Последняя страница: %page%',
    totalItems: 'Всего %total%',
  },

  DateTime: {
    clear: 'Очистить',
    chooseMonth: 'Выберите месяц',
    chooseYear: 'Выберите год',
    chooseDecade: 'Выберите десятилетие',
    nYear: '%num%',
    nMonth: '%num%',
    nDay: '%num%',
    prevYear: 'Предыдущий год',
    nextYear: 'Следующий год',
    prevMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    prevDecade: 'Предыдущее десятилетие',
    nextDecade: 'Следующее десятилетие',
    chooseTime: 'Выберите время',
    chooseDate: 'Выберите дату',
    chooseTimePlease: 'Выберите время',
    chooseDatePlease: 'Выберите дату',
    thisMoment: 'Сейчас',
    today: 'Сегодня',
    ok: 'Ок',
  },

  Modal: {
    okText: 'Ок',
    cancelText: 'Отмена',
    understood: 'Ок',
  },

  Table: {
    emptyText: 'Нет данных',
  },

  Select: {
    notFoundContent: 'Ничего не найдено',
  },

  Transfer: {
    titles: ',',
    notFoundContent: 'Нет данных',
    searchPlaceholder: 'Поиск',
    itemUnit: 'элемент',
    itemsUnit: 'элементов',
  }
};
