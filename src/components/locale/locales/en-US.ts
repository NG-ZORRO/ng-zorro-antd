import { NzLocale } from '../nz-locale.class';
import * as moment from 'moment';

const LOCALE = 'en-US';

moment.locale(LOCALE);

export const enUS: NzLocale = {
  locale: LOCALE,

  Pagination: {
    itemsPerPage: '%num% / page',
    jumpTo: 'Goto',
    page: '',
    forwardPage: '%num% pages forward',
    backwardPage: '%num% pages backward',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    firstPage: 'First page',
    lastPage: 'Last page: %page%',
    totalItems: '%total% items',
  },

  DateTime: {
    clear: 'Clear',
    chooseMonth: 'Choose a month',
    chooseYear: 'Choose a year',
    chooseDecade: 'Choose a decade',
    nYear: '%num%',
    nMonth: '%num%',
    nDay: '%num%',
    prevYear: 'Previous year',
    nextYear: 'Next year',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    prevDecade: 'Previous decade',
    nextDecade: 'Next decade',
    chooseTime: 'Select time',
    chooseDate: 'Select date',
    chooseTimePlease: 'Select time',
    chooseDatePlease: 'Select date',
    thisMoment: 'This moment',
    today: 'Today',
    ok: 'Ok',
  },

  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    understood: 'Got it',
  },

  Table: {
    emptyText: 'No data',
  },

  Select: {
    notFoundContent: 'Not Found',
  },
};
