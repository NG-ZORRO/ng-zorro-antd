import Calendar from './calendar/en_US';
import DatePicker from './date-picker/tr_TR';
import Pagination from './pagination/en_US';
import TimePicker from './time-picker/tr_TR';

export default {
  locale: 'tr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Menü Filtrele',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    emptyText: 'Veri Yok',
    selectAll: 'Hepsini Seç',
    selectInvert: 'Tersini Seç',
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam',
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal',
  },
  Transfer: {
    notFoundContent: 'Bulunamadı',
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler',
  },
  Select: {
    notFoundContent: 'Bulunamadı',
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: `Dosyayı kaldır`,
    uploadError: 'Yükleme Hatası',
    previewFile: `Dosyayı Önizle`,
  },
};
