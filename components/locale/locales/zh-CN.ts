import { NzLocale } from '../nz-locale.class';

export const zhCN: NzLocale = {
  locale: 'zh-CN',

  Pagination: {
    itemsPerPage: '%num% 条/页',
    jumpTo: '跳至',
    page: '页',
    forwardPage: '向前 %num% 页',
    backwardPage: '向后 %num% 页',
    prevPage: '上一页',
    nextPage: '下一页',
    firstPage: '第一页',
    lastPage: '最后一页: %page%',
    totalItems: '共 %total% 条',
  },

  DateTime: {
    clear: '清除',
    chooseMonth: '选择月份',
    chooseYear: '选择年份',
    nYear: '%num%年',
    nMonth: '%num%月',
    nDay: '%num%日',
    prevYear: '上一年',
    nextYear: '下一年',
    prevMonth: '上个月',
    nextMonth: '下个月',
    prevDecade: '上一年代',
    nextDecade: '下一年代',
    chooseDecade: '选择年代',
    chooseTime: '选择时间',
    chooseDate: '选择日期',
    chooseTimePlease: '请选择时间',
    chooseDatePlease: '请选择日期',
    thisMoment: '此刻',
    today: '今天',
    ok: '确 定',
  },

  Modal: {
    okText: '确定',
    cancelText: '取消',
    understood: '知道了',
  },

  Table: {
    emptyText: '没有数据',
  },

  Select: {
    notFoundContent: '无法找到',
  },

  Transfer: {
    titles: ',',
    notFoundContent: '无匹配结果',
    searchPlaceholder: '请输入',
    itemUnit: '项目',
    itemsUnit: '项目',
  }
};
