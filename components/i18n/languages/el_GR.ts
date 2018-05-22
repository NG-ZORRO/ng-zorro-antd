import Calendar from './calendar/el_GR';
import DatePicker from './date-picker/el_GR';
import Pagination from './pagination/el_GR';
import TimePicker from './time-picker/el_GR';

export default {
  locale: 'el',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Μενού φίλτρων',
    filterConfirm: 'ΟΚ',
    filterReset: 'Επαναφορά',
    emptyText: 'Δεν υπάρχουν δεδομένα',
    selectAll: 'Επιλογή τρέχουσας σελίδας',
    selectInvert: 'Αντιστροφή τρέχουσας σελίδας',
  },
  Modal: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
    justOkText: 'ΟΚ',
  },
  Popconfirm: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
  },
  Transfer: {
    notFoundContent: 'Δεν βρέθηκε',
    searchPlaceholder: 'Αναζήτηση',
    itemUnit: 'αντικείμενο',
    itemsUnit: 'αντικείμενα',
  },
  Select: {
    notFoundContent: 'Δεν βρέθηκε',
  },
  Upload: {
    uploading: 'Μεταφόρτωση...',
    removeFile: 'Αφαίρεση αρχείου',
    uploadError: 'Σφάλμα μεταφόρτωσης',
    previewFile: 'Προεπισκόπηση αρχείου',
  },
};
