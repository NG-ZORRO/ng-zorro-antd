import Calendar from './calendar/ja_JP';
import DatePicker from './date-picker/ja_JP';
import Pagination from './pagination/ja_JP';
import TimePicker from './time-picker/ja_JP';

export default {
  locale: 'ja',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'メニューをフィルター',
    filterConfirm: 'OK',
    filterReset: 'リセット',
    emptyText: 'データがありません',
    selectAll: 'すべてを選択',
    selectInvert: '選択を反転',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },
  Transfer: {
    notFoundContent: '結果はありません',
    searchPlaceholder: 'ここを検索',
    itemUnit: 'アイテム',
    itemsUnit: 'アイテム',
  },
  Select: {
    notFoundContent: '結果はありません',
  },
  Upload: {
    uploading: 'アップロード中...',
    removeFile: 'ファイルを削除',
    uploadError: 'アップロードエラー',
    previewFile: 'ファイルをプレビュー',
  },
};
