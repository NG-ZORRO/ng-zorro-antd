import { NzLocale } from '../nz-locale.class';

export const zhTW: NzLocale = {
  locale: 'zh-TW',

  Pagination: {
    itemsPerPage: '%num% 條/頁',
    jumpTo: '跳至',
    page: '頁',
    forwardPage: '向前 %num% 頁',
    backwardPage: '向後 %num% 頁',
    prevPage: '上一頁',
    nextPage: '下一頁',
    firstPage: '第一頁',
    lastPage: '最后一頁: %page%',
    totalItems: '共 %total% 條',
  },

  DateTime: {
    clear: '清除',
    chooseMonth: '選擇月份',
    chooseYear: '選擇年份',
    nYear: '%num%年',
    nMonth: '%num%月',
    nDay: '%num%日',
    prevYear: '上一年',
    nextYear: '下一年',
    prevMonth: '上个月',
    nextMonth: '下个月',
    prevDecade: '上一年代',
    nextDecade: '下一年代',
    chooseDecade: '選擇年代',
    chooseTime: '選擇時間',
    chooseDate: '選擇日期',
    chooseTimePlease: '请選擇時間',
    chooseDatePlease: '请選擇日期',
    thisMoment: '此刻',
    today: '今天',
    ok: '確 定',
  },

  Modal: {
    okText: '確定',
    cancelText: '取消',
    understood: 'OK',
  },

  Table: {
    emptyText: '目前尚無資料',
  },

  Select: {
    notFoundContent: '查無此資料',
  },

  Transfer: {
    titles: ',',
    notFoundContent: '查無此資料',
    searchPlaceholder: '搜尋資料',
    itemUnit: '項目',
    itemsUnit: '項目',
  }
};
